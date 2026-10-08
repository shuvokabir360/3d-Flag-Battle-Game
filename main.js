// Flag Battle 3D - Three.js Application & Scene Controller
// Features: Floating Winner Flags Celebration, Dynamic Volume/Mute Controls, Auto 3-sec Next Round Draw

class FlagBattleThreeApp {
  constructor() {
    this.container = document.getElementById('canvasContainer');
    this.flagsContainer = document.getElementById('floatingFlagsContainer');
    this.physics = new ThreePhysicsWorld();

    this.totalParticipants = 195;
    this.balls = []; // { mesh, body, country }
    this.particles = [];
    this.orbitingFlags3D = []; // 3D floating flag sprites
    this.eliminatedList = [];

    this.winner = null;
    this.winnerBallObj = null;
    this.isWinnerRising = false;
    this.elapsedSeconds = 0;
    this.lastTime = performance.now();

    // Auto Play Timer Configuration (3s, 5s, 10s, 15s, Custom, or OFF)
    this.autoLoopDelay = this.loadAutoLoopDelay();
    this.isAutoLoop = this.loadIsAutoLoop();
    this.autoCountdownInterval = null;
    this.countdownSecs = this.autoLoopDelay;

    // Championship Wins Tally Persistence
    this.totalRounds = this.loadTotalRounds();
    this.winsTally = this.loadWinsTally();
    this.leftPanelMode = 'alltime';
    this.lastRoundTop10 = [];

    // Dynamic Moving & Closing Gaps Infrastructure
    this.ringSegments = [];
    this.gapHazards = [];
    this.outerAccent = null;
    this.physics.gapEventCallback = (type, gap) => this.onGapEvent(type, gap);

    this.initThree();
    this.createArena();
    this.bindEvents();
    this.restart();
    this.renderWinsTally();
    this.renderLeftTopPanel();

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initThree() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060812);
    this.scene.fog = new THREE.FogExp2(0x060812, 0.015);

    // 2. Camera
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(48, aspect, 0.1, 1000);
    this.baseCameraZ = 47.0;
    this.updateCameraFit();

    // 3. Renderer (Tuned for 100% Rich, Punchy Color Saturation - Zero Bleach/Washout)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (THREE.sRGBEncoding) {
      this.renderer.outputEncoding = THREE.sRGBEncoding;
    }
    this.renderer.toneMapping = THREE.LinearToneMapping; // Clean saturation without highlight clipping
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights (Warm, vibrant daylight with balanced soft highlights)
    const ambient = new THREE.AmbientLight(0xFFFFFF, 1.25);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.65);
    dirLight.position.set(10, 16, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    // Subtle Neon Rim Lights
    this.cyanLight = new THREE.PointLight(0x00E5FF, 1.8, 35);
    this.cyanLight.position.set(0, 14, 8);
    this.scene.add(this.cyanLight);

    this.magentaLight = new THREE.PointLight(0xFF007F, 1.4, 35);
    this.magentaLight.position.set(0, -14, 8);
    this.scene.add(this.magentaLight);

    // Golden Champion Spotlight
    this.champLight = new THREE.PointLight(0xFFD700, 0, 35);
    this.champLight.position.set(0, 4, 18);
    this.scene.add(this.champLight);

    // 5. Golden Halo Ring
    const haloGeo = new THREE.TorusGeometry(4.4, 0.14, 16, 64);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      emissive: 0xFFAA00,
      emissiveIntensity: 2.0,
      roughness: 0.15,
      metalness: 0.9,
      transparent: true,
      opacity: 0
    });
    this.haloMesh = new THREE.Mesh(haloGeo, haloMat);
    this.scene.add(this.haloMesh);

    // 6. Backplate / Stadium Cylinder Background
    const backplateGeo = new THREE.CylinderGeometry(18, 18, 2.5, 64, 1, true);
    const backplateMat = new THREE.MeshStandardMaterial({
      color: 0x0c1124,
      roughness: 0.8,
      metalness: 0.3,
      side: THREE.BackSide
    });
    const backplate = new THREE.Mesh(backplateGeo, backplateMat);
    backplate.rotation.x = Math.PI / 2;
    backplate.position.z = -1.2;
    this.scene.add(backplate);

    // Faint grid floor
    const gridHelper = new THREE.GridHelper(34, 34, 0x00E5FF, 0x112244);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -1.3;
    this.scene.add(gridHelper);

    // Mouse interactive tilt
    this.mouseTilt = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
      this.mouseTilt.targetX = (e.clientX / window.innerWidth - 0.5) * 0.25;
      this.mouseTilt.targetY = (e.clientY / window.innerHeight - 0.5) * 0.25;
    });
  }

  createArena() {
    if (this.ringGroup) {
      this.scene.remove(this.ringGroup);
    }

    this.ringGroup = new THREE.Group();
    const R = this.physics.arenaRadius;

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00E5FF,
      emissive: 0x00E5FF,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      metalness: 0.85
    });

    // 120 Modular ring segments for seamless dynamic gap rendering
    this.ringSegments = [];
    const segmentCount = 120;
    const sector = (2 * Math.PI) / segmentCount;
    const segGeo = new THREE.TorusGeometry(R, 0.45, 16, 8, sector * 1.03);

    for (let i = 0; i < segmentCount; i++) {
      const segMesh = new THREE.Mesh(segGeo, ringMat);
      segMesh.rotation.z = i * sector;
      segMesh.castShadow = true;
      segMesh.receiveShadow = true;
      this.ringGroup.add(segMesh);
      this.ringSegments.push({
        mesh: segMesh,
        angle: i * sector + sector / 2
      });
    }

    // Dynamic glowing hazard end-caps for each dynamic gap
    this.gapHazards = [];
    const tipGeo = new THREE.SphereGeometry(0.55, 16, 16);

    for (let g = 0; g < this.physics.gaps.length; g++) {
      const mat1 = new THREE.MeshStandardMaterial({
        color: 0xFF2255,
        emissive: 0xFF2255,
        emissiveIntensity: 1.0,
        roughness: 0.2,
        metalness: 0.5
      });
      const mat2 = new THREE.MeshStandardMaterial({
        color: 0xFF2255,
        emissive: 0xFF2255,
        emissiveIntensity: 1.0,
        roughness: 0.2,
        metalness: 0.5
      });

      const tip1 = new THREE.Mesh(tipGeo, mat1);
      const tip2 = new THREE.Mesh(tipGeo, mat2);
      this.ringGroup.add(tip1);
      this.ringGroup.add(tip2);

      this.gapHazards.push({ tip1, tip2, mat1, mat2 });
    }

    // Outer subtle guide boundary ring
    const outerAccentGeo = new THREE.TorusGeometry(R + 1.2, 0.08, 8, 80);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.35 });
    this.outerAccent = new THREE.Mesh(outerAccentGeo, outerMat);
    this.ringGroup.add(this.outerAccent);

    this.scene.add(this.ringGroup);
  }

  onGapEvent(type, gap) {
    const R = this.physics.arenaRadius;
    const x = R * Math.cos(gap.angle);
    const y = R * Math.sin(gap.angle);

    if (type === 'warning') {
      sfx.playGateWarning();
    } else if (type === 'closed') {
      sfx.playGateClose();
      // Burst of energetic metallic lock sparks at closure point
      for (let i = 0; i < 16; i++) {
        const pGeo = new THREE.SphereGeometry(0.12, 6, 6);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xFF2255 });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.set(x, y, 0);
        this.scene.add(pMesh);

        const a = Math.random() * 2 * Math.PI;
        const spd = 2 + Math.random() * 5;
        this.particles.push({
          mesh: pMesh,
          vel: { x: Math.cos(a) * spd, y: Math.sin(a) * spd, z: (Math.random() - 0.5) * 3 },
          life: 0.8,
          decay: 1.5
        });
      }
    } else if (type === 'opening') {
      sfx.playGateOpen();
      // Glowing cyan plasma energy portal sparks at new open location
      for (let i = 0; i < 20; i++) {
        const pGeo = new THREE.SphereGeometry(0.14, 6, 6);
        const pMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.set(x, y, 0);
        this.scene.add(pMesh);

        const a = Math.random() * 2 * Math.PI;
        const spd = 3 + Math.random() * 6;
        this.particles.push({
          mesh: pMesh,
          vel: { x: Math.cos(a) * spd, y: Math.sin(a) * spd, z: (Math.random() - 0.5) * 4 },
          life: 0.9,
          decay: 1.2
        });
      }
    }
  }

  restart() {
    this.elapsedSeconds = 0;
    this.eliminatedList = [];
    this.winner = null;
    this.winnerBallObj = null;
    this.isWinnerRising = false;

    // Reset dynamic moving & closing gaps for new round
    if (this.physics && this.physics.initGaps) {
      this.physics.initGaps();
    }

    // Clear auto countdown if running
    if (this.autoCountdownInterval) {
      clearInterval(this.autoCountdownInterval);
      this.autoCountdownInterval = null;
    }

    // Stop floating flags celebration
    this.stopFloatingFlagsCelebration();

    // Reset Halo & Champ light
    if (this.haloMesh) {
      this.haloMesh.material.opacity = 0;
    }
    if (this.champLight) {
      this.champLight.intensity = 0;
    }

    // Clear old ball meshes
    for (const b of this.balls) {
      this.scene.remove(b.mesh);
      b.mesh.geometry.dispose();
      b.mesh.material.map.dispose();
      b.mesh.material.dispose();
    }
    this.balls = [];
    this.physics.bodies = [];

    // Clear particles
    for (const p of this.particles) {
      this.scene.remove(p.mesh);
    }
    this.particles = [];

    this.createArena();
    this.spawnBalls();
    this.updateUI();
    this.renderEliminatedList();
    this.hideWinnerModal();
  }

  spawnBalls() {
    const pool = getCountryPool(this.totalParticipants);
    const ballRadius = 0.62;
    const spacing = ballRadius * 2.12;

    let index = 0;
    let ringRadius = spacing * 0.9;

    const sphereGeo = new THREE.SphereGeometry(ballRadius, 32, 24);

    while (index < pool.length) {
      const circ = 2 * Math.PI * ringRadius;
      const countInRing = Math.max(1, Math.floor(circ / spacing));

      for (let i = 0; i < countInRing && index < pool.length; i++) {
        const country = pool[index];
        const angle = (i / countInRing) * 2 * Math.PI + ringRadius * 0.35;
        const x = ringRadius * Math.cos(angle);
        const y = ringRadius * Math.sin(angle);
        const z = (Math.random() - 0.5) * 0.6;

        const randAngle = Math.random() * 2 * Math.PI;
        const randSpeed = 3.5 + Math.random() * 3.5;
        const body = {
          pos: { x, y, z },
          vel: {
            x: Math.cos(randAngle) * randSpeed,
            y: Math.sin(randAngle) * randSpeed,
            z: (Math.random() - 0.5) * 0.5
          },
          radius: ballRadius,
          mass: 1.0,
          isEliminated: false,
          country
        };

        const canvas = createFlagTextureCanvas(country);
        const texture = new THREE.CanvasTexture(canvas);
        if (THREE.sRGBEncoding) {
          texture.encoding = THREE.sRGBEncoding;
        }
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;

        // Satin-matte finish: 0.88 roughness eliminates blinding white specular glare!
        // emissive 0x000000 ensures deep pure blacks and 100% rich color saturation!
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.88,
          metalness: 0.0,
          emissive: 0x000000,
        });

        const mesh = new THREE.Mesh(sphereGeo, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(x, y, z);
        mesh.rotation.set(0, -Math.PI / 2, 0);
        this.scene.add(mesh);

        this.balls.push({ mesh, body, country });
        this.physics.bodies.push(body);

        index++;
      }
      ringRadius += spacing;
    }

    this.physics.eliminatedCallback = (body) => this.onElimination(body);
  }

  onElimination(body) {
    const ballObj = this.balls.find(b => b.body === body);
    if (!ballObj) return;

    // Remaining non-eliminated bodies (excluding this one)
    const remaining = this.physics.bodies.filter(b => !b.isEliminated && b !== body);

    // Guaranteed single-winner rule ("jebabei hok ek desh win hobe"):
    // If no other ball is left, this ball CANNOT be eliminated - it is the CHAMPION!
    if (remaining.length === 0) {
      body.isEliminated = false;
      body.isWinner = true;
      this.declareWinner(body);
      return;
    }

    const rank = remaining.length + 1;
    this.eliminatedList.unshift({
      rank,
      country: body.country,
      time: Math.floor(this.elapsedSeconds)
    });

    sfx.playElimination();
    this.renderEliminatedList();

    // 3D Spark Particle Explosion
    const color = new THREE.Color(body.country.colors[0]);
    for (let i = 0; i < 24; i++) {
      const pGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(body.pos.x, body.pos.y, body.pos.z);
      this.scene.add(pMesh);

      const angle = Math.random() * 2 * Math.PI;
      const speed = 4 + Math.random() * 10;
      this.particles.push({
        mesh: pMesh,
        vel: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
          z: (Math.random() - 0.5) * 6
        },
        life: 1.0,
        decay: 1.2 + Math.random() * 1.0
      });
    }

    // When exactly 1 survivor remains, crown it immediately!
    if (remaining.length === 1 && !this.winner) {
      const survivor = remaining[0];
      survivor.isWinner = true;
      this.declareWinner(survivor);
    }
  }

  declareWinner(winnerBody) {
    if (this.winner) return;

    const country = winnerBody.country;
    this.winner = country;
    winnerBody.isWinner = true;
    winnerBody.isEliminated = false;
    this.winnerBallObj = this.balls.find(b => b.body === winnerBody);
    this.isWinnerRising = true;

    // Remove champion from eliminated list in case it was briefly queued
    this.eliminatedList = this.eliminatedList.filter(item => item.country.code !== country.code);

    // Capture this round's Top 10 Finishers
    this.lastRoundTop10 = [country];
    for (let i = 0; i < Math.min(9, this.eliminatedList.length); i++) {
      this.lastRoundTop10.push(this.eliminatedList[i].country);
    }

    // Record victory in Championship Wins Tally & persist
    this.recordWin(country);
    this.renderLeftTopPanel();

    sfx.playVictory();
    this.startFloatingFlagsCelebration(country);
    this.showWinnerModal(country);
  }

  startFloatingFlagsCelebration(winner) {
    // 1. DOM Floating Flags Particle Storm all across the screen
    if (this.flagsContainer) {
      this.flagsContainer.innerHTML = '';
      const flagCount = 28;
      for (let i = 0; i < flagCount; i++) {
        const flagEl = document.createElement('div');
        flagEl.className = 'floating-flag-item';
        flagEl.innerHTML = `<span>${winner.emoji}</span><span>${winner.code}</span>`;
        flagEl.style.left = `${Math.random() * 92 + 4}%`;
        flagEl.style.animationDelay = `${Math.random() * 2.2}s`;
        flagEl.style.animationDuration = `${3.2 + Math.random() * 2.0}s`;
        flagEl.style.fontSize = `${18 + Math.random() * 14}px`;
        this.flagsContainer.appendChild(flagEl);
      }
    }

    // 2. 3D Floating & Orbiting Flag Planes around the Winner
    const flagCanvas = createFlagTextureCanvas(winner);
    const flagTexture = new THREE.CanvasTexture(flagCanvas);
    flagTexture.colorSpace = THREE.SRGBColorSpace;

    const planeGeo = new THREE.PlaneGeometry(1.6, 0.95);
    const planeMat = new THREE.MeshBasicMaterial({
      map: flagTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92
    });

    const orbitCount = 12;
    for (let i = 0; i < orbitCount; i++) {
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 6.2 + Math.random() * 3.5;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 5,
        12 + (Math.random() - 0.5) * 4
      );
      mesh.rotation.y = Math.random() * Math.PI;
      this.scene.add(mesh);
      this.orbitingFlags3D.push({
        mesh,
        angle,
        radius,
        speed: 0.8 + Math.random() * 1.2,
        yOffset: mesh.position.y
      });
    }
  }

  stopFloatingFlagsCelebration() {
    if (this.flagsContainer) {
      this.flagsContainer.innerHTML = '';
    }
    for (const item of this.orbitingFlags3D) {
      this.scene.remove(item.mesh);
      item.mesh.geometry.dispose();
      item.mesh.material.dispose();
    }
    this.orbitingFlags3D = [];
  }

  spawnWinnerConfetti(centerPos) {
    const confettiColors = [0xFFD700, 0x00E5FF, 0xFF007F, 0x00FF87, 0xFFFFFF];
    const col = confettiColors[Math.floor(Math.random() * confettiColors.length)];

    const pGeo = new THREE.BoxGeometry(0.2, 0.2, 0.05);
    const pMat = new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide });
    const pMesh = new THREE.Mesh(pGeo, pMat);

    pMesh.position.set(
      centerPos.x + (Math.random() - 0.5) * 5.0,
      centerPos.y + (Math.random() - 0.5) * 5.0,
      centerPos.z + (Math.random() - 0.5) * 3.0
    );
    this.scene.add(pMesh);

    const angle = Math.random() * 2 * Math.PI;
    const speed = 3 + Math.random() * 8;
    this.particles.push({
      mesh: pMesh,
      vel: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed + 2.0,
        z: (Math.random() - 0.5) * 4
      },
      rotSpeed: {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10
      },
      life: 1.6,
      decay: 0.7 + Math.random() * 0.5
    });
  }

  animate(time) {
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    // Physics step
    this.physics.step(dt);
    if (!this.physics.isPaused && !this.isWinnerRising) {
      this.elapsedSeconds += dt * this.physics.speedMultiplier;
    }

    // Single-winner guarantee check ("jebabei hok ek desh win hobe")
    if (!this.winner && this.balls.length > 0) {
      const active = this.physics.bodies.filter(b => !b.isEliminated);
      if (active.length === 1) {
        this.declareWinner(active[0]);
      } else if (active.length === 0) {
        const lastBody = this.balls[this.balls.length - 1].body;
        lastBody.isEliminated = false;
        this.declareWinner(lastBody);
      }
    }

    // Sync Dynamic Moving, Closing, & Reopening Arena Gaps
    const R = this.physics.arenaRadius;
    if (this.ringSegments) {
      for (let i = 0; i < this.ringSegments.length; i++) {
        const seg = this.ringSegments[i];
        const inGap = this.physics.isSegmentInGap(seg.angle);
        seg.mesh.visible = !inGap;
      }
    }

    if (this.outerAccent) {
      this.outerAccent.rotation.z = this.physics.ringAngle;
    }

    if (this.gapHazards && this.physics.gaps) {
      for (let g = 0; g < this.physics.gaps.length; g++) {
        const gap = this.physics.gaps[g];
        const haz = this.gapHazards[g];
        if (!haz) continue;

        if (gap.width > 0.04) {
          haz.tip1.visible = true;
          haz.tip2.visible = true;

          const a1 = gap.angle - gap.width / 2;
          const a2 = gap.angle + gap.width / 2;
          haz.tip1.position.set(R * Math.cos(a1), R * Math.sin(a1), 0);
          haz.tip2.position.set(R * Math.cos(a2), R * Math.sin(a2), 0);

          if (gap.state === 'CLOSING' || gap.isWarning) {
            // Flashing warning red / amber alert
            const pulse = (Math.sin(time * 0.018) > 0);
            const alertColor = pulse ? 0xFF0033 : 0xFFAA00;
            haz.mat1.color.setHex(alertColor);
            haz.mat1.emissive.setHex(alertColor);
            haz.mat1.emissiveIntensity = 2.4;
            haz.mat2.color.setHex(alertColor);
            haz.mat2.emissive.setHex(alertColor);
            haz.mat2.emissiveIntensity = 2.4;
          } else if (gap.state === 'OPENING') {
            // Neon cyan / plasma energy unseal glow
            haz.mat1.color.setHex(0x00FFFF);
            haz.mat1.emissive.setHex(0x00E5FF);
            haz.mat1.emissiveIntensity = 2.2;
            haz.mat2.color.setHex(0x00FFFF);
            haz.mat2.emissive.setHex(0x00E5FF);
            haz.mat2.emissiveIntensity = 2.2;
          } else {
            // Normal open neon crimson
            haz.mat1.color.setHex(0xFF2255);
            haz.mat1.emissive.setHex(0xFF2255);
            haz.mat1.emissiveIntensity = 1.2;
            haz.mat2.color.setHex(0xFF2255);
            haz.mat2.emissive.setHex(0xFF2255);
            haz.mat2.emissiveIntensity = 1.2;
          }
        } else {
          // Gap fully sealed shut
          haz.tip1.visible = false;
          haz.tip2.visible = false;
        }
      }
    }

    // Orbiting 3D Flags Celebration Animation
    for (const item of this.orbitingFlags3D) {
      item.angle += item.speed * dt;
      item.mesh.position.x = Math.cos(item.angle) * item.radius;
      item.mesh.position.y = item.yOffset + Math.sin(time * 0.003 + item.angle) * 1.2;
      item.mesh.rotation.y += 0.03;
      item.mesh.rotation.z = Math.sin(time * 0.004 + item.angle) * 0.2;
    }

    // Sync Balls
    for (const b of this.balls) {
      if (this.isWinnerRising && b === this.winnerBallObj) {
        // 1. Smoothly rise and float in the center of the arena: (0, 1.2, 5.0)
        b.mesh.position.lerp(new THREE.Vector3(0, 1.2, 5.0), 0.045);

        // 2. Scale gracefully to 3.2x size (crystal-clear champion ball without blocking the arena or UI)
        b.mesh.scale.lerp(new THREE.Vector3(3.2, 3.2, 3.2), 0.04);

        // 3. Keep the authentic flag facing forward with gentle celebration tilt
        b.mesh.rotation.set(0, -Math.PI / 2 + Math.sin(time * 0.002) * 0.25, 0);

        // 4. Golden Halo Ring follows and circles around the champion
        if (this.haloMesh) {
          this.haloMesh.position.copy(b.mesh.position);
          this.haloMesh.scale.set(4.5, 4.5, 4.5);
          this.haloMesh.rotation.x = Math.PI / 2 + Math.sin(time * 0.003) * 0.25;
          this.haloMesh.rotation.z += 0.025;
          this.haloMesh.material.opacity = Math.min(0.95, this.haloMesh.material.opacity + 0.025);
        }

        // 5. Golden Champion Spotlight shines brightly
        if (this.champLight) {
          this.champLight.position.set(0, 5.0, 14.0);
          this.champLight.intensity = Math.min(4.0, this.champLight.intensity + 0.08);
        }

        // 6. Continuous fountain of celebratory 3D confetti sparks
        if (Math.random() < 0.65) {
          this.spawnWinnerConfetti(b.mesh.position);
        }
        continue;
      }

      b.mesh.position.set(b.body.pos.x, b.body.pos.y, b.body.pos.z);
      // Fixed upright orientation: Flag NEVER spins or rolls upside down!
      b.mesh.rotation.set(0, -Math.PI / 2, 0);

      if (b.body.isEliminated) {
        b.mesh.scale.multiplyScalar(0.985);
        if (b.mesh.scale.x < 0.05) {
          b.mesh.visible = false;
        }
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.mesh.position.x += p.vel.x * dt;
      p.mesh.position.y += p.vel.y * dt;
      p.mesh.position.z += p.vel.z * dt;

      if (p.rotSpeed) {
        p.mesh.rotation.x += p.rotSpeed.x * dt;
        p.mesh.rotation.y += p.rotSpeed.y * dt;
      }

      p.life -= p.decay * dt;
      p.mesh.scale.setScalar(Math.max(0.01, p.life));

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
      }
    }

    // Smooth camera mouse parallax (subtle so arena stays strictly inside margins)
    this.mouseTilt.x += (this.mouseTilt.targetX - this.mouseTilt.x) * 0.05;
    this.mouseTilt.y += (this.mouseTilt.targetY - this.mouseTilt.y) * 0.05;
    this.camera.position.x = this.mouseTilt.x * 4;
    this.camera.position.y = -this.mouseTilt.y * 4;
    this.camera.position.z = this.baseCameraZ || 47.0;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
    this.updateUI();

    requestAnimationFrame(this.animate);
  }

  updateUI() {
    const active = this.physics.bodies.filter(b => !b.isEliminated);
    const remaining = this.winner ? 1 : Math.max(1, active.length);
    const total = this.totalParticipants;

    const remEl = document.getElementById('remainingText');
    if (remEl) {
      if (this.winner) {
        remEl.innerHTML = `<span style="color:var(--accent-gold); font-weight:800;">👑 1 / ${total} - ${this.winner.name.toUpperCase()} WINS!</span>`;
      } else {
        remEl.textContent = `${remaining} / ${total} Remaining`;
      }
    }

    const barEl = document.getElementById('progressBar');
    if (barEl) {
      const pct = Math.max(0, Math.min(100, (remaining / total) * 100));
      barEl.style.width = `${pct}%`;
    }

    const timerEl = document.getElementById('timerText');
    if (timerEl) {
      const m = String(Math.floor(this.elapsedSeconds / 60)).padStart(2, '0');
      const s = String(Math.floor(this.elapsedSeconds % 60)).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
    }

    const outBadge = document.getElementById('eliminatedCountBadge');
    if (outBadge) outBadge.textContent = `${this.eliminatedList.length} Out`;
  }

  renderEliminatedList() {
    const listEl = document.getElementById('eliminatedList');
    if (!listEl) return;

    if (this.eliminatedList.length === 0) {
      listEl.innerHTML = `<div class="empty-state">No flags escaped yet.<br>Monitoring perimeter...</div>`;
      return;
    }

    listEl.innerHTML = this.eliminatedList
      .slice(0, 50)
      .map(item => `
        <div class="elim-row">
          <span class="elim-rank">#${item.rank}</span>
          <span class="elim-flag">${item.country.emoji}</span>
          <span class="elim-name">${item.country.name}</span>
          <span class="elim-time">${item.time}s</span>
        </div>
      `)
      .join('');
  }

  loadWinsTally() {
    try {
      const data = localStorage.getItem('flag_battle_wins_tally');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveWinsTally() {
    try {
      localStorage.setItem('flag_battle_wins_tally', JSON.stringify(this.winsTally));
    } catch (e) {}
  }

  loadTotalRounds() {
    try {
      const val = localStorage.getItem('flag_battle_total_rounds');
      return val ? parseInt(val) : 0;
    } catch (e) {
      return 0;
    }
  }

  saveTotalRounds() {
    try {
      localStorage.setItem('flag_battle_total_rounds', String(this.totalRounds));
    } catch (e) {}
  }

  clearWinsTally() {
    this.winsTally = {};
    this.totalRounds = 0;
    this.lastRoundTop10 = [];
    this.saveWinsTally();
    this.saveTotalRounds();
    this.renderWinsTally();
    this.renderLeftTopPanel();
  }

  recordWin(winner) {
    if (!this.winsTally[winner.code]) {
      this.winsTally[winner.code] = {
        name: winner.name,
        emoji: winner.emoji,
        code: winner.code,
        colors: winner.colors || ['#FFD700'],
        wins: 0
      };
    }
    this.winsTally[winner.code].wins++;
    this.totalRounds++;
    this.saveWinsTally();
    this.saveTotalRounds();
    this.renderWinsTally();
    this.renderLeftTopPanel();

    // Open sidebar and switch to wins tab so user sees accumulated wins
    const drawer = document.getElementById('leaderboardDrawer');
    if (drawer) {
      drawer.classList.add('open');
      this.switchTab('wins');
    }
  }

  renderWinsTally() {
    const listEl = document.getElementById('winsTallyList');
    const totalEl = document.getElementById('totalRoundsLabel');
    if (totalEl) totalEl.textContent = this.totalRounds;
    if (!listEl) return;

    const entries = Object.values(this.winsTally);
    if (entries.length === 0) {
      listEl.innerHTML = `<div class="empty-state">No victories recorded yet.<br>Play a round to crown a champion!</div>`;
      return;
    }

    // Sort descending by wins count, then alphabetically
    entries.sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));

    listEl.innerHTML = entries
      .map((item, idx) => {
        let rankBadge = `#${idx + 1}`;
        let rowClass = 'win-tally-row';
        if (idx === 0) {
          rankBadge = '🥇 1st';
          rowClass += ' gold-rank';
        } else if (idx === 1) {
          rankBadge = '🥈 2nd';
        } else if (idx === 2) {
          rankBadge = '🥉 3rd';
        }

        const winLabel = item.wins === 1 ? '1 Win' : `${item.wins} Wins`;
        return `
          <div class="${rowClass}">
            <span class="tally-rank">${rankBadge}</span>
            <span class="tally-flag">${item.emoji}</span>
            <div class="tally-name-wrap">
              <span class="tally-name">${item.name}</span>
              <span class="tally-code">${item.code}</span>
            </div>
            <span class="tally-wins-badge">${winLabel}</span>
          </div>
        `;
      })
      .join('');
  }

  renderLeftTopPanel() {
    const goldFlag = document.getElementById('goldFlag');
    const goldName = document.getElementById('goldName');
    const goldWins = document.getElementById('goldWins');

    const silverFlag = document.getElementById('silverFlag');
    const silverName = document.getElementById('silverName');
    const silverWins = document.getElementById('silverWins');

    const bronzeFlag = document.getElementById('bronzeFlag');
    const bronzeName = document.getElementById('bronzeName');
    const bronzeWins = document.getElementById('bronzeWins');

    const list4to10 = document.getElementById('ranks4to10List');
    if (!list4to10) return;

    let displayList = [];

    const setPodiumFlag = (el, country) => {
      if (!el) return;
      el.innerHTML = '';
      if (country && typeof createMiniFlagCanvas === 'function') {
        const mini = createMiniFlagCanvas(country, 44, 28);
        el.appendChild(mini);
      } else {
        el.textContent = country?.emoji || '🏳️';
      }
    };

    if (this.leftPanelMode === 'alltime') {
      const entries = Object.values(this.winsTally);
      entries.sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));
      displayList = entries.map(item => ({
        country: (typeof COUNTRIES_DATA !== 'undefined' ? COUNTRIES_DATA.find(c => c.code === item.code) : null) || item,
        flag: item.emoji,
        name: item.name,
        code: item.code,
        score: item.wins === 1 ? '1 Win' : `${item.wins} Wins`
      }));
    } else {
      // Round mode
      displayList = this.lastRoundTop10.map((item, idx) => {
        const c = item.code && typeof COUNTRIES_DATA !== 'undefined' ? COUNTRIES_DATA.find(x => x.code === item.code) : (item.country || item);
        return {
          country: c,
          flag: c?.emoji || '🏳️',
          name: c?.name || item.name || 'Country',
          code: c?.code || item.code || '',
          score: idx === 0 ? 'Champion' : `Rank #${idx + 1}`
        };
      });
    }

    // Top 1 Gold
    const p1 = displayList[0];
    if (p1) {
      setPodiumFlag(goldFlag, p1.country);
      if (goldName) goldName.textContent = p1.name;
      if (goldWins) goldWins.textContent = p1.score;
    } else {
      if (goldFlag) goldFlag.textContent = '🏳️';
      if (goldName) goldName.textContent = 'Waiting for Champion';
      if (goldWins) goldWins.textContent = '0 Wins';
    }

    // Top 2 Silver
    const p2 = displayList[1];
    if (p2) {
      setPodiumFlag(silverFlag, p2.country);
      if (silverName) silverName.textContent = p2.name;
      if (silverWins) silverWins.textContent = p2.score;
    } else {
      if (silverFlag) silverFlag.textContent = '🏳️';
      if (silverName) silverName.textContent = '--';
      if (silverWins) silverWins.textContent = '0 Wins';
    }

    // Top 3 Bronze
    const p3 = displayList[2];
    if (p3) {
      setPodiumFlag(bronzeFlag, p3.country);
      if (bronzeName) bronzeName.textContent = p3.name;
      if (bronzeWins) bronzeWins.textContent = p3.score;
    } else {
      if (bronzeFlag) bronzeFlag.textContent = '🏳️';
      if (bronzeName) bronzeName.textContent = '--';
      if (bronzeWins) bronzeWins.textContent = '0 Wins';
    }

    // Ranks 4 to 10
    const ranks4to10 = displayList.slice(3, 10);
    if (ranks4to10.length === 0) {
      list4to10.innerHTML = `
        <div style="font-size:10px; color:rgba(255,255,255,0.4); text-align:center; padding:12px 4px;">
          Play rounds to fill Top 10 rankings!
        </div>
      `;
    } else {
      list4to10.innerHTML = '';
      ranks4to10.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'rank-mini-row';
        row.innerHTML = `
          <span class="mini-rank">#${idx + 4}</span>
          <span class="mini-flag"></span>
          <span class="mini-name">${item.name}</span>
          <span class="mini-badge">${item.score}</span>
        `;
        const flagSpan = row.querySelector('.mini-flag');
        if (item.country && typeof createMiniFlagCanvas === 'function') {
          flagSpan.appendChild(createMiniFlagCanvas(item.country, 28, 18));
        } else {
          flagSpan.textContent = item.flag || '🏳️';
        }
        list4to10.appendChild(row);
      });
    }
  }

  switchTab(tab) {
    const tabWinsBtn = document.getElementById('tabWinsBtn');
    const tabElimsBtn = document.getElementById('tabElimsBtn');
    const tabWinsContent = document.getElementById('tabWinsContent');
    const tabElimsContent = document.getElementById('tabElimsContent');

    if (tab === 'wins') {
      tabWinsBtn?.classList.add('active');
      tabElimsBtn?.classList.remove('active');
      if (tabWinsContent) tabWinsContent.style.display = 'flex';
      if (tabElimsContent) tabElimsContent.style.display = 'none';
    } else {
      tabElimsBtn?.classList.add('active');
      tabWinsBtn?.classList.remove('active');
      if (tabElimsContent) tabElimsContent.style.display = 'flex';
      if (tabWinsContent) tabWinsContent.style.display = 'none';
    }
  }

  showWinnerModal(winner) {
    const modal = document.getElementById('winnerModal');
    const nameEl = document.getElementById('winnerName');
    const flagEl = document.getElementById('winnerFlagLarge');
    const codeTag = document.getElementById('winnerCodeTag');
    const winsTag = document.getElementById('winnerWinsTallyTag');
    const timeTag = document.getElementById('winnerTimeTag');

    // Inject Giant High-Res National Flag Banner
    const wrap = document.getElementById('winnerFlagCanvasWrap');
    if (wrap) {
      wrap.innerHTML = '';
      if (typeof createWinnerHighResFlagCanvas === 'function') {
        const flagCanvas = createWinnerHighResFlagCanvas(winner);
        wrap.appendChild(flagCanvas);
      }
    }

    if (flagEl) {
      flagEl.innerHTML = '';
      if (typeof createMiniFlagCanvas === 'function') {
        const flagCanvas = createMiniFlagCanvas(winner, 68, 46);
        flagEl.appendChild(flagCanvas);
      } else {
        flagEl.textContent = winner.emoji;
      }
    }
    if (nameEl) nameEl.textContent = winner.name.toUpperCase();
    if (codeTag) codeTag.textContent = winner.code;

    const winsCount = this.winsTally[winner.code]?.wins || 1;
    if (winsTag) {
      winsTag.textContent = winsCount === 1 ? '🏆 1st Champion Victory' : `🏆 ${winsCount} Total Victories!`;
    }

    if (timeTag) {
      const m = String(Math.floor(this.elapsedSeconds / 60)).padStart(2, '0');
      const s = String(Math.floor(this.elapsedSeconds % 60)).padStart(2, '0');
      timeTag.textContent = `⏱️ ${m}:${s}`;
    }

    // Dynamic national theme accent if colors exist
    if (winner.colors && winner.colors.length > 0) {
      const col = winner.colors[0];
      const heroBox = document.querySelector('.winner-hero-box');
      if (heroBox) {
        heroBox.style.borderColor = col;
        heroBox.style.boxShadow = `0 0 25px ${col}55`;
      }
    }

    modal.classList.add('active');

    // Auto Next Round Countdown or interactive quick trigger
    const badge = document.getElementById('countdownBadge');
    if (this.isAutoLoop) {
      this.startAutoCountdown();
    } else {
      if (badge) {
        badge.style.display = 'inline-flex';
        badge.style.cursor = 'pointer';
        badge.innerHTML = '<span>⏸️ Auto: OFF (Click to start next round automatically)</span>';
        badge.onclick = () => {
          this.isAutoLoop = true;
          this.saveAutoLoopConfig();
          this.updateAutoLoopUI();
          this.startAutoCountdown();
        };
      }
    }
  }

  loadAutoLoopDelay() {
    try {
      const v = localStorage.getItem('flag_battle_auto_delay');
      return v !== null ? Math.max(1, parseInt(v)) : 3;
    } catch (_) {
      return 3;
    }
  }

  loadIsAutoLoop() {
    try {
      const v = localStorage.getItem('flag_battle_auto_enabled');
      return v !== null ? v === '1' : true;
    } catch (_) {
      return true;
    }
  }

  saveAutoLoopConfig() {
    try {
      localStorage.setItem('flag_battle_auto_delay', this.autoLoopDelay);
      localStorage.setItem('flag_battle_auto_enabled', this.isAutoLoop ? '1' : '0');
    } catch (_) {}
  }

  updateAutoLoopUI() {
    const autoLoopBtn = document.getElementById('btnAutoLoop');
    const autoLoopLabel = document.getElementById('autoLoopLabel');
    const autoTimerLabel = document.getElementById('autoTimerLabel');
    const customRow = document.getElementById('customTimerRow');
    const customInput = document.getElementById('customTimerInput');

    const presets = [3, 5, 10, 15];
    const isCustom = this.isAutoLoop && !presets.includes(this.autoLoopDelay);

    // Footer button
    if (autoLoopLabel) {
      autoLoopLabel.textContent = this.isAutoLoop
        ? `🔁 Auto: ${this.autoLoopDelay}s`
        : '🔁 Auto: OFF';
    }
    autoLoopBtn?.classList.toggle('auto-active', this.isAutoLoop);

    // Settings label
    if (autoTimerLabel) {
      autoTimerLabel.textContent = this.isAutoLoop
        ? `${this.autoLoopDelay}s Timer`
        : 'OFF (Manual)';
    }

    // Settings chips
    document.querySelectorAll('.chip-autotimer').forEach(chip => {
      const val = chip.dataset.val;
      if (!this.isAutoLoop) {
        chip.classList.toggle('active', val === 'off');
      } else if (isCustom) {
        chip.classList.toggle('active', val === 'custom');
      } else {
        chip.classList.toggle('active', val === String(this.autoLoopDelay));
      }
    });

    // Custom input row visibility
    if (customRow) {
      customRow.style.display = isCustom ? 'flex' : 'none';
    }
    if (customInput && isCustom) {
      customInput.value = this.autoLoopDelay;
    }
  }

  startAutoCountdown() {
    const badge = document.getElementById('countdownBadge');
    const secsEl = document.getElementById('countdownSecs');

    if (!this.isAutoLoop) {
      if (badge) badge.style.display = 'none';
      if (this.autoCountdownInterval) {
        clearInterval(this.autoCountdownInterval);
        this.autoCountdownInterval = null;
      }
      return;
    }

    if (badge) badge.style.display = 'inline-flex';

    this.countdownSecs = this.autoLoopDelay;
    if (secsEl) secsEl.textContent = this.countdownSecs;

    if (this.autoCountdownInterval) clearInterval(this.autoCountdownInterval);
    this.autoCountdownInterval = setInterval(() => {
      this.countdownSecs--;
      if (secsEl) secsEl.textContent = Math.max(0, this.countdownSecs);

      if (this.countdownSecs <= 0) {
        clearInterval(this.autoCountdownInterval);
        this.autoCountdownInterval = null;
        this.restart();
      }
    }, 1000);
  }

  updateCameraFit() {
    if (!this.container || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w <= 0 || h <= 0) return;

    const aspect = w / h;
    this.camera.aspect = aspect;

    // In the 16:9 middle canvas area (which is physically between header and footer),
    // target a visible vertical frustum of ~31.0 units for the 24-unit arena.
    // This gives a clean, centered arena with generous margin on all sides.
    const targetHeight = aspect < 1.0 ? 44.0 : 31.0;
    const fovRad = (this.camera.fov * Math.PI) / 360.0;
    const requiredDistance = (targetHeight / 2) / Math.tan(fovRad);

    this.baseCameraZ = Math.max(34.0, requiredDistance);
    this.camera.position.z = this.baseCameraZ;
    this.camera.updateProjectionMatrix();
    if (this.renderer) {
      this.renderer.setSize(w, h);
    }
  }

  hideWinnerModal() {
    document.getElementById('winnerModal').classList.remove('active');
  }

  toggleFullscreen() {
    const doc = document;
    const docEl = document.documentElement;

    const isFs = !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      document.body.classList.contains('is-fullscreen')
    );

    if (!isFs) {
      // Enter Fullscreen: Hides browser navigation UI (URL bar, tabs)
      const options = { navigationUI: 'hide' };
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen(options).catch(() => {
          document.body.classList.add('is-fullscreen');
          this.updateFullscreenUI();
        });
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      } else {
        document.body.classList.add('is-fullscreen');
        this.updateFullscreenUI();
      }
    } else {
      // Exit Fullscreen
      document.body.classList.remove('is-fullscreen');
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
      this.updateFullscreenUI();
    }
  }

  updateFullscreenUI() {
    const isFs = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      document.body.classList.contains('is-fullscreen')
    );

    document.body.classList.toggle('is-fullscreen', isFs);
    document.getElementById('gameStage')?.classList.toggle('is-fullscreen', isFs);

    const topBtn = document.getElementById('btnFullscreenTop');
    const bottomBtn = document.getElementById('btnFullscreen');
    const bottomIcon = document.getElementById('fullscreenIcon');
    const bottomText = document.getElementById('fullscreenText');
    const floatingExitBtn = document.getElementById('btnFloatingExitFs');

    if (topBtn) {
      topBtn.textContent = isFs ? '🗗' : '⛶';
      topBtn.title = isFs ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)';
      topBtn.classList.toggle('active-glow', isFs);
    }
    if (bottomIcon) {
      bottomIcon.textContent = isFs ? '🗗' : '⛶';
    }
    if (bottomText) {
      bottomText.textContent = isFs ? 'Exit' : 'Fullscreen';
    }
    if (bottomBtn) {
      bottomBtn.classList.toggle('active', isFs);
      bottomBtn.title = isFs ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)';
    }
    if (floatingExitBtn) {
      floatingExitBtn.style.display = isFs ? 'flex' : 'none';
    }

    // Refresh 3D camera projection to match the new screen dimensions perfectly
    setTimeout(() => this.updateCameraFit(), 80);
    setTimeout(() => this.updateCameraFit(), 250);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.updateCameraFit();
    });

    // Fullscreen Toggle Listeners (Top Header, Bottom Footer, & Floating Exit Button)
    document.getElementById('btnFullscreenTop')?.addEventListener('click', () => {
      this.toggleFullscreen();
    });
    document.getElementById('btnFullscreen')?.addEventListener('click', () => {
      this.toggleFullscreen();
    });
    document.getElementById('btnFloatingExitFs')?.addEventListener('click', () => {
      this.toggleFullscreen();
    });

    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
      document.addEventListener(evt, () => this.updateFullscreenUI());
    });

    // Keyboard Shortcut 'F' for Instant Fullscreen
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
      if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      }
    });

    // Sound Mute Toggle
    const soundBtn = document.getElementById('btnSound');
    const volumeSlider = document.getElementById('volumeSlider');

    soundBtn?.addEventListener('click', () => {
      sfx.init();
      const isMuted = sfx.toggleMute();
      this.updateVolumeIcon(sfx.volume, isMuted);
    });

    // Sound Volume Slider
    volumeSlider?.addEventListener('input', (e) => {
      sfx.init();
      const val = parseInt(e.target.value) / 100;
      sfx.setVolume(val);
      if (sfx.isMuted) sfx.toggleMute();
      this.updateVolumeIcon(val, false);
    });

    // Play / Pause
    document.getElementById('btnPause')?.addEventListener('click', () => {
      this.physics.isPaused = !this.physics.isPaused;
      const icon = document.getElementById('pauseIcon');
      if (icon) icon.textContent = this.physics.isPaused ? '▶' : '⏸';
    });

    // Restart
    document.getElementById('btnRestart')?.addEventListener('click', () => {
      sfx.init();
      this.restart();
    });

    // Auto Loop Toggle Button in Bottom Deck (cycles: 3s -> 5s -> 10s -> 15s -> OFF -> 3s)
    const autoLoopBtn = document.getElementById('btnAutoLoop');
    this.updateAutoLoopUI();

    autoLoopBtn?.addEventListener('click', () => {
      if (!this.isAutoLoop) {
        this.isAutoLoop = true;
        this.autoLoopDelay = 3;
      } else if (this.autoLoopDelay === 3) {
        this.autoLoopDelay = 5;
      } else if (this.autoLoopDelay === 5) {
        this.autoLoopDelay = 10;
      } else if (this.autoLoopDelay === 10) {
        this.autoLoopDelay = 15;
      } else {
        this.isAutoLoop = false;
      }
      this.saveAutoLoopConfig();
      this.updateAutoLoopUI();

      if (this.winner) {
        if (this.isAutoLoop) {
          this.startAutoCountdown();
        } else {
          if (this.autoCountdownInterval) {
            clearInterval(this.autoCountdownInterval);
            this.autoCountdownInterval = null;
          }
          const badge = document.getElementById('countdownBadge');
          if (badge) badge.style.display = 'none';
        }
      }
    });

    // Speed multiplier
    document.getElementById('btnSpeed')?.addEventListener('click', (e) => {
      const cur = this.physics.speedMultiplier;
      const next = cur === 1.0 ? 1.5 : cur === 1.5 ? 2.0 : cur === 2.0 ? 3.0 : 1.0;
      this.physics.speedMultiplier = next;
      e.currentTarget.querySelector('.speed-badge').textContent = `${next.toFixed(1)}x`;
    });

    // Balloon Float Mode / Gravity Toggle
    const gravBtn = document.getElementById('btnGravity');
    const updateFloatModeUI = () => {
      if (gravBtn) {
        gravBtn.classList.toggle('active', this.physics.isBalloonMode);
        gravBtn.innerHTML = this.physics.isBalloonMode
          ? '<span>🎈 Float: ON</span>'
          : '<span>⬇️ Gravity: ON</span>';
      }
    };
    updateFloatModeUI();

    gravBtn?.addEventListener('click', () => {
      this.physics.isBalloonMode = !this.physics.isBalloonMode;
      this.physics.hasGravity = !this.physics.isBalloonMode;
      updateFloatModeUI();
    });

    // Toggle Leaderboard
    document.getElementById('btnToggleLeaderboard')?.addEventListener('click', () => {
      document.getElementById('leaderboardDrawer').classList.toggle('open');
    });

    // Left Top Panel Pills Switching
    document.getElementById('pillAllTime')?.addEventListener('click', () => {
      this.leftPanelMode = 'alltime';
      document.getElementById('pillAllTime')?.classList.add('active');
      document.getElementById('pillRound')?.classList.remove('active');
      this.renderLeftTopPanel();
    });

    document.getElementById('pillRound')?.addEventListener('click', () => {
      this.leftPanelMode = 'round';
      document.getElementById('pillRound')?.classList.add('active');
      document.getElementById('pillAllTime')?.classList.remove('active');
      this.renderLeftTopPanel();
    });

    // Sidebar Tabs Switching
    document.getElementById('tabWinsBtn')?.addEventListener('click', () => {
      this.switchTab('wins');
    });

    document.getElementById('tabElimsBtn')?.addEventListener('click', () => {
      this.switchTab('elims');
    });

    // Reset Wins Tally
    document.getElementById('btnClearTally')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all country championship victory records?')) {
        this.clearWinsTally();
      }
    });

    // Settings Modal
    document.getElementById('btnSettings')?.addEventListener('click', () => {
      document.getElementById('settingsModal').classList.add('active');
    });
    document.getElementById('closeSettings')?.addEventListener('click', () => {
      document.getElementById('settingsModal').classList.remove('active');
    });

    // Participants selector
    document.querySelectorAll('.chip-participants').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.chip-participants').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.totalParticipants = parseInt(e.currentTarget.dataset.val);
        this.restart();
      });
    });

    // Gap count selector
    document.querySelectorAll('.chip-gaps').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.chip-gaps').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.physics.gapCount = parseInt(e.currentTarget.dataset.val);
        this.restart();
      });
    });

    // Auto Play Timer Chips in Settings: 3s, 5s, 10s, 15s, Custom, OFF
    document.querySelectorAll('.chip-autotimer').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const val = e.currentTarget.dataset.val;
        if (val === 'off') {
          this.isAutoLoop = false;
        } else if (val === 'custom') {
          this.isAutoLoop = true;
          const customRow = document.getElementById('customTimerRow');
          if (customRow) customRow.style.display = 'flex';
          const customInput = document.getElementById('customTimerInput');
          if (customInput) {
            customInput.focus();
            const parsed = parseInt(customInput.value);
            if (!isNaN(parsed) && parsed > 0) {
              this.autoLoopDelay = Math.min(180, Math.max(1, parsed));
            }
          }
        } else {
          this.isAutoLoop = true;
          this.autoLoopDelay = parseInt(val);
        }
        this.saveAutoLoopConfig();
        this.updateAutoLoopUI();

        if (this.winner) {
          if (this.isAutoLoop) {
            this.startAutoCountdown();
          } else {
            if (this.autoCountdownInterval) {
              clearInterval(this.autoCountdownInterval);
              this.autoCountdownInterval = null;
            }
            const badge = document.getElementById('countdownBadge');
            if (badge) badge.style.display = 'none';
          }
        }
      });
    });

    // Custom Timer SET button and Enter key handler
    const applyCustomTimer = () => {
      const customInput = document.getElementById('customTimerInput');
      if (!customInput) return;
      const parsed = parseInt(customInput.value);
      if (isNaN(parsed) || parsed < 1) {
        alert('Please enter a valid number of seconds (1 - 180)');
        return;
      }
      this.isAutoLoop = true;
      this.autoLoopDelay = Math.min(180, Math.max(1, parsed));
      this.saveAutoLoopConfig();
      this.updateAutoLoopUI();
      if (this.winner) {
        this.startAutoCountdown();
      }
    };

    document.getElementById('btnApplyCustomTimer')?.addEventListener('click', applyCustomTimer);
    document.getElementById('customTimerInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        applyCustomTimer();
      }
    });

    // Speed Slider
    document.getElementById('speedSlider')?.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      this.physics.ringSpeed = val;
      document.getElementById('speedLabel').textContent = `${val.toFixed(2)} rad/s`;
    });

    // Winner play again
    document.getElementById('btnPlayAgain')?.addEventListener('click', () => {
      this.restart();
    });

    // 10 Soft Background Music Settings ("10 ta background sound add koro ja setting theke set kora jabe")
    const bgmSelect = document.getElementById('bgmTrackSelect');
    const bgmTrackLabel = document.getElementById('bgmTrackLabel');
    const bgmSlider = document.getElementById('bgmVolumeSlider');
    const bgmVolLabel = document.getElementById('bgmVolumeLabel');

    if (bgmSelect && sfx.bgm) {
      bgmSelect.value = sfx.bgm.currentTrackId;
      const curTrack = BGM_TRACKS.find(t => t.id === sfx.bgm.currentTrackId);
      if (bgmTrackLabel && curTrack) {
        bgmTrackLabel.textContent = curTrack.name;
      }

      bgmSelect.addEventListener('change', (e) => {
        sfx.init();
        const tid = e.target.value;
        sfx.bgm.setTrack(tid);
        const trk = BGM_TRACKS.find(t => t.id === tid);
        if (bgmTrackLabel && trk) {
          bgmTrackLabel.textContent = trk.name;
        }
      });
    }

    if (bgmSlider && sfx.bgm) {
      const initVolPct = Math.round(sfx.bgm.volume * 100);
      bgmSlider.value = initVolPct;
      if (bgmVolLabel) bgmVolLabel.textContent = `${initVolPct}%`;

      bgmSlider.addEventListener('input', (e) => {
        sfx.init();
        const pct = parseInt(e.target.value);
        sfx.bgm.setVolume(pct / 100);
        if (bgmVolLabel) bgmVolLabel.textContent = `${pct}%`;
      });
    }

    // Audio context & BGM unlock on first user gesture
    const unlockAudio = () => sfx.init();
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
  }

  updateVolumeIcon(vol, isMuted) {
    const btn = document.getElementById('btnSound');
    if (!btn) return;
    if (isMuted || vol === 0) {
      btn.textContent = '🔇';
      btn.classList.add('muted');
    } else if (vol < 0.35) {
      btn.textContent = '🔈';
      btn.classList.remove('muted');
    } else if (vol < 0.7) {
      btn.textContent = '🔉';
      btn.classList.remove('muted');
    } else {
      btn.textContent = '🔊';
      btn.classList.remove('muted');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new FlagBattleThreeApp();
});
