// 3D Rigid Body Physics Engine for Flag Battle Arena
// Features: Dynamic moving, closing, & randomly reopening gaps + Balloon-style buoyant floating physics

class DynamicGap {
  constructor(id, initialAngle, maxWidth = 0.52) {
    this.id = id;
    this.angle = initialAngle; // in radians [0, 2PI)
    this.maxWidth = maxWidth;  // ~30 degrees in radians
    this.width = maxWidth;
    this.state = 'OPEN'; // 'OPEN', 'CLOSING', 'CLOSED', 'OPENING'
    this.timer = 5.0 + Math.random() * 5.0; // time until starting to close
    this.moveSpeed = (Math.random() < 0.5 ? 1 : -1) * (0.35 + Math.random() * 0.45); // rad/s drift
    this.targetMoveSpeed = this.moveSpeed;
    this.speedChangeTimer = 2.0 + Math.random() * 3.0;
    this.closingDuration = 1.35; // time to close
    this.openingDuration = 1.25; // time to reopen
    this.closeElapsed = 0;
    this.openElapsed = 0;
    this.warningTime = 1.4; // time before closing to alert
    this.isWarning = false;
  }

  reset(initialAngle, initialTimer = 6.0) {
    this.angle = initialAngle;
    this.width = this.maxWidth;
    this.state = 'OPEN';
    this.timer = initialTimer;
    this.moveSpeed = (Math.random() < 0.5 ? 1 : -1) * (0.35 + Math.random() * 0.45);
    this.targetMoveSpeed = this.moveSpeed;
    this.speedChangeTimer = 2.0 + Math.random() * 3.0;
    this.closeElapsed = 0;
    this.openElapsed = 0;
    this.isWarning = false;
  }

  update(dt, allGaps, onEvent) {
    // 1. Continuous random drift movement around perimeter ("charo pase faka sthan rendom ek ek jaygay move korbe")
    this.speedChangeTimer -= dt;
    if (this.speedChangeTimer <= 0) {
      this.targetMoveSpeed = (Math.random() < 0.5 ? 1 : -1) * (0.35 + Math.random() * 0.60);
      this.speedChangeTimer = 2.5 + Math.random() * 3.0;
    }

    // Smoothly interpolate drift speed
    this.moveSpeed += (this.targetMoveSpeed - this.moveSpeed) * Math.min(1.0, dt * 2.5);

    // Advance angle continuously
    if (this.state !== 'CLOSED') {
      this.angle = (this.angle + this.moveSpeed * dt) % (Math.PI * 2);
      if (this.angle < 0) this.angle += Math.PI * 2;
    }

    // 2. Lifecycle states: warning, closing, picking new location, opening ("faka bondo hobe notun ek sthane faka hobe")
    if (this.state === 'OPEN') {
      this.timer -= dt;
      if (this.timer <= this.warningTime && !this.isWarning) {
        this.isWarning = true;
        if (onEvent) onEvent('warning', this);
      }
      if (this.timer <= 0) {
        this.state = 'CLOSING';
        this.closeElapsed = 0;
        if (onEvent) onEvent('closing', this);
      }
    } else if (this.state === 'CLOSING') {
      this.closeElapsed += dt;
      const progress = Math.min(1.0, this.closeElapsed / this.closingDuration);
      this.width = (1.0 - progress) * this.maxWidth;

      if (progress >= 1.0) {
        this.width = 0;
        this.state = 'CLOSED';
        if (onEvent) onEvent('closed', this);

        // Pick brand new random location around perimeter ("notun ek sthane faka hobe")
        let newAngle = Math.random() * Math.PI * 2;
        for (let attempt = 0; attempt < 12; attempt++) {
          let tooClose = false;
          for (const other of allGaps) {
            if (other.id !== this.id && other.state !== 'CLOSED') {
              let d = (newAngle - other.angle) % (Math.PI * 2);
              if (d < -Math.PI) d += Math.PI * 2;
              if (d > Math.PI) d -= Math.PI * 2;
              if (Math.abs(d) < 1.1) {
                tooClose = true;
                break;
              }
            }
          }
          if (!tooClose) break;
          newAngle = Math.random() * Math.PI * 2;
        }

        this.angle = newAngle;
        this.state = 'OPENING';
        this.openElapsed = 0;
        this.isWarning = false;
        if (onEvent) onEvent('opening', this);
      }
    } else if (this.state === 'OPENING') {
      this.openElapsed += dt;
      const progress = Math.min(1.0, this.openElapsed / this.openingDuration);
      this.width = progress * this.maxWidth;

      if (progress >= 1.0) {
        this.width = this.maxWidth;
        this.state = 'OPEN';
        this.timer = 5.0 + Math.random() * 5.5; // Stays open 5 to 10.5 seconds
        this.isWarning = false;
        if (onEvent) onEvent('opened', this);
      }
    }
  }
}

class ThreePhysicsWorld {
  constructor() {
    this.arenaRadius = 12.0;
    this.arenaDepth = 1.6; // Z boundary thickness for 3D tumbling depth
    this.ringSpeed = 0.85; // rad/s base ambient swirl
    this.isBalloonMode = true; // Balloon floating dynamics ("flag beloner moto urbe")
    this.hasGravity = false; // Free balloon flight
    this.gravityY = -3.5;
    this.speedMultiplier = 1.0;
    this.isPaused = false;

    this.ringAngle = 0;
    this.bodies = [];
    this.eliminatedCallback = null;
    this.gapEventCallback = null;

    // Dynamic moving & closing gaps system
    this.initGaps();
  }

  initGaps() {
    const maxWidth = (29.0 * Math.PI) / 180.0; // ~29 degrees wide
    this.gaps = [
      new DynamicGap(0, 0.0, maxWidth),
      new DynamicGap(1, Math.PI, maxWidth)
    ];
    this.gaps[0].reset(0.0, 5.5);
    this.gaps[1].reset(Math.PI, 11.0); // Staggered timer
  }

  angleDiff(a, b) {
    let d = (a - b) % (Math.PI * 2);
    if (d < -Math.PI) d += Math.PI * 2;
    if (d > Math.PI) d -= Math.PI * 2;
    return Math.abs(d);
  }

  isAngleInGap(angle) {
    for (let i = 0; i < this.gaps.length; i++) {
      const g = this.gaps[i];
      if (g.width < 0.12) continue; // narrower than ball diameter, wall is solid
      if (this.angleDiff(angle, g.angle) < g.width / 2) {
        return true;
      }
    }
    return false;
  }

  isSegmentInGap(segAngle) {
    for (let i = 0; i < this.gaps.length; i++) {
      const g = this.gaps[i];
      if (g.width <= 0.04) continue;
      if (this.angleDiff(segAngle, g.angle) < g.width / 2) {
        return true;
      }
    }
    return false;
  }

  step(dt) {
    if (this.isPaused) return;

    const effectiveDt = Math.min(dt, 0.05) * this.speedMultiplier;

    // Advance dynamic moving, closing, & reopening gaps
    for (let i = 0; i < this.gaps.length; i++) {
      this.gaps[i].update(effectiveDt, this.gaps, this.gapEventCallback);
    }

    const subSteps = 4;
    const subDt = effectiveDt / subSteps;
    const gravY = this.hasGravity ? this.gravityY : 0;

    for (let step = 0; step < subSteps; step++) {
      // 1. Advance Kinematic Ring Rotation
      this.ringAngle += this.ringSpeed * subDt;

      // 2. Integrate Bodies & Boundary Collisions
      for (let i = 0; i < this.bodies.length; i++) {
        const b = this.bodies[i];
        if (b.isEliminated) {
          // Allow escaped bodies to fly away freely with high fling speed
          b.pos.x += b.vel.x * subDt;
          b.pos.y += b.vel.y * subDt;
          b.pos.z += b.vel.z * subDt;
          continue;
        }

        // Balloon Floating Dynamics ("flag beloner moto urbe")
        if (this.isBalloonMode) {
          const distFromCenter = Math.sqrt(b.pos.x * b.pos.x + b.pos.y * b.pos.y);
          const currentAngle = Math.atan2(b.pos.y, b.pos.x);

          // Swirling air current driven by rotating arena ring
          const swirlFactor = Math.min(1.0, distFromCenter / this.arenaRadius);
          const swirlVx = -Math.sin(currentAngle) * this.ringSpeed * swirlFactor * 1.5;
          const swirlVy = Math.cos(currentAngle) * this.ringSpeed * swirlFactor * 1.5;

          // Buoyant air current (floating and fluttering like helium balloons)
          const airWaveX = Math.sin(this.ringAngle * 1.6 + b.pos.y * 0.5) * 1.4;
          const airWaveY = Math.cos(this.ringAngle * 1.6 + b.pos.x * 0.5) * 1.4 + 0.35; // gentle upward lift

          b.vel.x += (swirlVx * 0.45 + airWaveX) * subDt;
          b.vel.y += (swirlVy * 0.45 + airWaveY) * subDt;

          // Smooth balloon air drag
          b.vel.x *= 0.9995;
          b.vel.y *= 0.9995;
          b.vel.z *= 0.992;
        }

        if (this.hasGravity) {
          b.vel.y += gravY * subDt;
        }

        // Position integration
        b.pos.x += b.vel.x * subDt;
        b.pos.y += b.vel.y * subDt;
        b.pos.z += b.vel.z * subDt;

        // Maintain energetic balloon velocity so they never settle or pool at bottom
        const curSpeed = Math.sqrt(b.vel.x * b.vel.x + b.vel.y * b.vel.y);
        if (curSpeed < 3.2) {
          const randAngle = Math.random() * Math.PI * 2;
          const push = (3.2 - curSpeed) * 0.4;
          b.vel.x += Math.cos(randAngle) * push;
          b.vel.y += Math.sin(randAngle) * push;
        } else if (curSpeed > 22.0) {
          b.vel.x *= 0.93;
          b.vel.y *= 0.93;
        }

        // Front / Back Glass Bounds (Z Axis Depth Constraint)
        const halfZ = this.arenaDepth / 2;
        if (b.pos.z + b.radius > halfZ) {
          b.pos.z = halfZ - b.radius;
          b.vel.z = -b.vel.z * 0.5;
        } else if (b.pos.z - b.radius < -halfZ) {
          b.pos.z = -halfZ + b.radius;
          b.vel.z = -b.vel.z * 0.5;
        }

        // Radial in-plane distance
        const dx = b.pos.x;
        const dy = b.pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Check if this ball is already the winner or the sole surviving ball
        // ("jebabei hok ek desh win hobe" - Guaranteed exactly 1 country wins!)
        const activeCount = this.bodies.filter(item => !item.isEliminated).length;
        if (activeCount <= 1 || b.isWinner) {
          b.isWinner = true;
        }

        // Winner ball safety: Gaps are closed for the winner and it smoothly glides inside
        const inGap = b.isWinner ? false : this.isAngleInGap(angle);

        if (b.isWinner) {
          // Softly guide the champion ball towards the arena center
          b.vel.x *= 0.95;
          b.vel.y *= 0.95;
          b.vel.z *= 0.95;

          // If winner drifts near perimeter, gently deflect it inward
          if (dist > this.arenaRadius - b.radius - 0.5) {
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            b.pos.x = nx * (this.arenaRadius - b.radius - 0.6);
            b.pos.y = ny * (this.arenaRadius - b.radius - 0.6);
            b.vel.x = -nx * 1.5;
            b.vel.y = -ny * 1.5;
          }
        }

        // Escape gap outward thrust ("bahire chitke jabe")
        if (!b.isWinner && inGap && dist > this.arenaRadius - 0.7) {
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          // Outward ejection thrust through the escape gap!
          b.vel.x += nx * 6.5;
          b.vel.y += ny * 6.5;
        }

        // Elimination check: Escaped perimeter (Only non-winner balls can be eliminated)
        if (!b.isWinner && dist > this.arenaRadius + b.radius + 0.5) {
          b.isEliminated = true;
          if (this.eliminatedCallback) {
            this.eliminatedCallback(b);
          }
          continue;
        }

        // Collision with Kinematic Ring Wall (if not in gap)
        if (!inGap && dist + b.radius > this.arenaRadius) {
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);

          // Position pushback
          const overlap = (dist + b.radius) - this.arenaRadius;
          b.pos.x -= nx * overlap;
          b.pos.y -= ny * overlap;

          // Wall linear velocity imparted by rotation
          const wallSpeed = this.ringSpeed * this.arenaRadius;
          const wallVx = -Math.sin(angle) * wallSpeed;
          const wallVy = Math.cos(angle) * wallSpeed;

          const rvx = b.vel.x - wallVx;
          const rvy = b.vel.y - wallVy;
          const normalVel = rvx * nx + rvy * ny;

          if (normalVel > 0) {
            const restitution = 0.88; // energetic balloon bounce off ring wall
            const impulse = -(1 + restitution) * normalVel;
            b.vel.x += impulse * nx;
            b.vel.y += impulse * ny;

            // Friction along tangent
            const tx = -ny;
            const ty = nx;
            const tanVel = rvx * tx + rvy * ty;
            const frictionImpulse = -tanVel * 0.2;
            b.vel.x += frictionImpulse * tx;
            b.vel.y += frictionImpulse * ty;

            // Random deflection angle off wall
            const wallScatter = (Math.random() - 0.5) * 1.5;
            b.vel.x += tx * wallScatter;
            b.vel.y += ty * wallScatter;

            sfx.playRingImpact();
          }
        }
      }

      // 3. Sphere-to-Sphere 3D Collisions with Random Deflection Ricochet ("ektar sathe onno ta rendom dakka lekha bahire chitke jabe")
      for (let i = 0; i < this.bodies.length; i++) {
        const b1 = this.bodies[i];
        if (b1.isEliminated) continue;

        for (let j = i + 1; j < this.bodies.length; j++) {
          const b2 = this.bodies[j];
          if (b2.isEliminated) continue;

          const dx = b2.pos.x - b1.pos.x;
          const dy = b2.pos.y - b1.pos.y;
          const dz = b2.pos.z - b1.pos.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const minDist = b1.radius + b2.radius;

          if (distSq < minDist * minDist && distSq > 0.00001) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;

            // Positional overlap resolution
            const overlap = (minDist - dist) * 0.5;
            b1.pos.x -= nx * overlap;
            b1.pos.y -= ny * overlap;
            b1.pos.z -= nz * overlap;
            b2.pos.x += nx * overlap;
            b2.pos.y += ny * overlap;
            b2.pos.z += nz * overlap;

            // Relative velocity
            const kx = b1.vel.x - b2.vel.x;
            const ky = b1.vel.y - b2.vel.y;
            const kz = b1.vel.z - b2.vel.z;
            const p = 2 * (nx * kx + ny * ky + nz * kz) / (b1.mass + b2.mass);

            if (p > 0) {
              const restitution = 0.95; // Super elastic balloon bounce!
              b1.vel.x -= p * b2.mass * nx * restitution;
              b1.vel.y -= p * b2.mass * ny * restitution;
              b1.vel.z -= p * b2.mass * nz * restitution;

              b2.vel.x += p * b1.mass * nx * restitution;
              b2.vel.y += p * b1.mass * ny * restitution;
              b2.vel.z += p * b1.mass * nz * restitution;

              // Random clash deflection kick ("rendom dakka lekha bahire chitke jabe")
              const scatterForce = 1.3 + Math.random() * 2.0;
              const perpX = -ny;
              const perpY = nx;

              b1.vel.x += perpX * scatterForce;
              b1.vel.y += perpY * scatterForce;
              b2.vel.x -= perpX * scatterForce;
              b2.vel.y -= perpY * scatterForce;

              sfx.playSphereClack(p * 0.12);
            }
          }
        }
      }
    }
  }
}
