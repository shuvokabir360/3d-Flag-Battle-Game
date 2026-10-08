// Web Audio API procedural audio synthesizer with Master Gain & Volume Control
class ThreeAudioFX {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.volume = 0.6; // 0.0 to 1.0
    this.isMuted = false;
    this.lastBounceTime = 0;
    this.bgm = new ThreeBackgroundMusic(this);
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.bgm.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.bgm && !this.bgm.isPlaying && this.bgm.currentTrackId !== 'off') {
      this.bgm.play(this.bgm.currentTrackId);
    }
  }

  setVolume(val) {
    this.init();
    this.volume = Math.max(0, Math.min(1, val));
    if (!this.isMuted && this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  playSphereClack(intensity = 0.5) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = performance.now();
    if (now - this.lastBounceTime < 16) return; // throttle to avoid audio clipping
    this.lastBounceTime = now;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 850 + Math.random() * 400;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.035);

      const vol = Math.min(0.24, Math.max(0.02, intensity * 0.16));
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (_) {}
  }

  playRingImpact() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.07);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch (_) {}
  }

  playElimination() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(920, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.22);

      gain.gain.setValueAtTime(0.24, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.24);
    } catch (_) {}
  }

  playVictory() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.14;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.65);
      });
    } catch (_) {}
  }

  playGateWarning() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const t = this.ctx.currentTime;
      // Alert double beep
      [0, 0.12].forEach(offset => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(780, t + offset);
        gain.gain.setValueAtTime(0.12, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.08);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t + offset);
        osc.stop(t + offset + 0.09);
      });
    } catch (_) {}
  }

  playGateClose() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const t = this.ctx.currentTime;
      // Heavy metallic airlock clamp slam
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.28);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch (_) {}
  }

  playGateOpen() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const t = this.ctx.currentTime;
      // Rising plasma unseal chime
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(720, t + 0.24);

      gain.gain.setValueAtTime(0.26, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.26);
    } catch (_) {}
  }
}

// 10 Soft Ambient Background Music Tracks ("soft rakhbe ja sunde valo lage")
const BGM_TRACKS = [
  { id: 'off', name: '🔇 Off / Mute BGM', desc: 'No background music' },
  { id: 'cosmic', name: '🌌 1. Cosmic Serenity', desc: 'Deep warm ambient space pads' },
  { id: 'crystal', name: '✨ 2. Crystal Dreams', desc: 'Soft shimmering celesta & chime harmonics' },
  { id: 'ocean', name: '🌊 3. Ocean Tide', desc: 'Calming wave swells & warm sub chords' },
  { id: 'lofi', name: '🪐 4. Deep Space Lofi', desc: 'Warm mellow jazz piano chords' },
  { id: 'zen', name: '🌿 5. Zen Sanctuary', desc: 'Peaceful bamboo tones & meditation chimes' },
  { id: 'starry', name: '🌙 6. Starry Night', desc: 'Ethereal celestial harp arpeggios' },
  { id: 'twilight', name: '🎹 7. Twilight Rhodes', desc: 'Velvet soft electric piano harmony' },
  { id: 'morning', name: '☀️ 8. Morning Glow', desc: 'Uplifting yet gentle acoustic ambient' },
  { id: 'rain', name: '🌧️ 9. Rainy Reverie', desc: 'Soothing rain wash & soft melodic notes' },
  { id: 'aurora', name: '🧘 10. Aurora Solitude', desc: 'Meditative singing bowl drone & harmonics' }
];

class ThreeBackgroundMusic {
  constructor(audioFX) {
    this.fx = audioFX;
    this.currentTrackId = this.loadSavedTrack();
    this.volume = this.loadSavedVolume(); // 0.0 to 1.0 (default 0.35, soft!)
    this.bgmGain = null;
    this.trackGain = null;
    this.intervalId = null;
    this.stepIndex = 0;
    this.isPlaying = false;
    this.noiseBuffer = null;
  }

  loadSavedTrack() {
    try {
      return localStorage.getItem('flag_battle_bgm_track') || 'cosmic';
    } catch (_) {
      return 'cosmic';
    }
  }

  loadSavedVolume() {
    try {
      const v = localStorage.getItem('flag_battle_bgm_volume');
      return v !== null ? Math.max(0, Math.min(1, parseFloat(v))) : 0.35;
    } catch (_) {
      return 0.35;
    }
  }

  init() {
    if (!this.fx.ctx) return;
    if (!this.bgmGain) {
      this.bgmGain = this.fx.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.volume * 0.45, this.fx.ctx.currentTime);
      this.bgmGain.connect(this.fx.masterGain);
    }
    if (this.currentTrackId !== 'off') {
      this.play(this.currentTrackId);
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    try {
      localStorage.setItem('flag_battle_bgm_volume', this.volume);
    } catch (_) {}
    if (this.bgmGain && this.fx.ctx) {
      this.bgmGain.gain.setValueAtTime(this.volume * 0.45, this.fx.ctx.currentTime);
    }
  }

  setTrack(trackId) {
    this.currentTrackId = trackId;
    try {
      localStorage.setItem('flag_battle_bgm_track', trackId);
    } catch (_) {}
    this.play(trackId);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.trackGain && this.fx.ctx) {
      try {
        const t = this.fx.ctx.currentTime;
        this.trackGain.gain.setValueAtTime(this.trackGain.gain.value, t);
        this.trackGain.gain.linearRampToValueAtTime(0.0001, t + 0.6);
        const oldGain = this.trackGain;
        setTimeout(() => {
          try { oldGain.disconnect(); } catch (_) {}
        }, 700);
      } catch (_) {}
      this.trackGain = null;
    }
  }

  play(trackId) {
    this.stop();
    this.currentTrackId = trackId;
    if (trackId === 'off') return;

    if (!this.fx.ctx) return;
    this.isPlaying = true;
    this.stepIndex = 0;

    const t = this.fx.ctx.currentTime;
    this.trackGain = this.fx.ctx.createGain();
    this.trackGain.gain.setValueAtTime(0.001, t);
    this.trackGain.gain.linearRampToValueAtTime(1.0, t + 0.8);
    this.trackGain.connect(this.bgmGain);

    this._executeStep(trackId);

    const intervals = {
      cosmic: 4800,
      crystal: 3800,
      ocean: 6000,
      lofi: 4000,
      zen: 4600,
      starry: 3600,
      twilight: 4200,
      morning: 4400,
      rain: 4500,
      aurora: 5500
    };
    const intervalMs = intervals[trackId] || 4500;

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.fx.ctx) return;
      this._executeStep(trackId);
    }, intervalMs);
  }

  _executeStep(trackId) {
    if (!this.fx.ctx || !this.trackGain) return;
    try {
      switch (trackId) {
        case 'cosmic': this._playCosmicStep(); break;
        case 'crystal': this._playCrystalStep(); break;
        case 'ocean': this._playOceanStep(); break;
        case 'lofi': this._playLofiStep(); break;
        case 'zen': this._playZenStep(); break;
        case 'starry': this._playStarryStep(); break;
        case 'twilight': this._playTwilightStep(); break;
        case 'morning': this._playMorningStep(); break;
        case 'rain': this._playRainStep(); break;
        case 'aurora': this._playAuroraStep(); break;
      }
    } catch (_) {}
  }

  // 1. COSMIC SERENITY - Deep space warm pads (Cmaj9 -> Fmaj7 -> Am9 -> Gsus4)
  _playCosmicStep() {
    const chords = [
      [130.81, 196.00, 261.63, 329.63, 493.88], // Cmaj9
      [174.61, 261.63, 329.63, 440.00, 523.25], // Fmaj7
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am9
      [196.00, 293.66, 392.00, 493.88, 587.33]  // Gsus4
    ];
    const freqs = chords[this.stepIndex % chords.length];
    this.stepIndex++;
    this._playSoftPadChord(freqs, 4.6, 520, 'triangle', 0.08);
  }

  // 2. CRYSTAL DREAMS - Shimmering soft celesta / music box chimes
  _playCrystalStep() {
    if (this.stepIndex % 4 === 0) {
      this._playSoftPadChord([164.81, 246.94], 5.0, 380, 'sine', 0.06);
    }
    const scale = [659.25, 739.99, 830.61, 987.77, 1174.66, 1318.51];
    for (let i = 0; i < 3; i++) {
      const freq = scale[Math.floor(Math.random() * scale.length)];
      this._playSoftBell(freq, i * 0.45, 1.8, 1200, 0.07);
    }
    this.stepIndex++;
  }

  // 3. OCEAN TIDE - Filtered ocean wave swell with deep warm sub chords
  _playOceanStep() {
    this._playWaveSwell(6.0);
    const subChords = [
      [65.41, 130.81, 196.00], // C2, C3, G3
      [87.31, 174.61, 261.63], // F2, F3, C4
      [73.42, 146.83, 220.00], // D2, D3, A3
      [98.00, 196.00, 293.66]  // G2, G3, D4
    ];
    const freqs = subChords[this.stepIndex % subChords.length];
    this.stepIndex++;
    this._playSoftPadChord(freqs, 5.8, 350, 'sine', 0.09);
  }

  // 4. DEEP SPACE LOFI - Warm vintage electric piano chords with soft tremolo
  _playLofiStep() {
    const chords = [
      [155.56, 233.08, 311.13, 392.00, 466.16], // Ebmaj7
      [207.65, 261.63, 311.13, 392.00],         // Abmaj7
      [174.61, 207.65, 261.63, 311.13],         // Fm7
      [233.08, 293.66, 349.23, 466.16]          // Bb7
    ];
    const freqs = chords[this.stepIndex % chords.length];
    this.stepIndex++;
    this._playRhodesChord(freqs, 3.8, 680, 0.08);
  }

  // 5. ZEN SANCTUARY - Peaceful bamboo flute & meditation temple tone
  _playZenStep() {
    if (this.stepIndex % 3 === 0) {
      this._playSoftPadChord([73.42, 110.00, 220.00], 6.0, 320, 'sine', 0.07);
    }
    const pentatonic = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
    const f1 = pentatonic[this.stepIndex % pentatonic.length];
    const f2 = pentatonic[(this.stepIndex + 2) % pentatonic.length];
    this._playBambooNote(f1, 0, 2.5, 0.09);
    this._playBambooNote(f2, 1.4, 2.2, 0.07);
    this.stepIndex++;
  }

  // 6. STARRY NIGHT - Celestial harp arpeggios
  _playStarryStep() {
    const arps = [
      [261.63, 329.63, 392.00, 523.25, 659.25], // C
      [220.00, 261.63, 329.63, 440.00, 523.25], // Am
      [174.61, 220.00, 261.63, 349.23, 440.00], // F
      [196.00, 246.94, 293.66, 392.00, 493.88]  // G
    ];
    const notes = arps[this.stepIndex % arps.length];
    this.stepIndex++;
    notes.forEach((freq, idx) => {
      this._playSoftPluck(freq, idx * 0.32, 1.5, 850, 0.06);
    });
  }

  // 7. TWILIGHT RHODES - Velvet evening electric piano jazz
  _playTwilightStep() {
    const chords = [
      [146.83, 220.00, 261.63, 329.63, 440.00], // Dm9
      [98.00, 174.61, 246.94, 329.63, 440.00],  // G13
      [130.81, 196.00, 246.94, 293.66, 392.00], // Cmaj9
      [110.00, 196.00, 261.63, 329.63, 392.00]  // Am7
    ];
    const freqs = chords[this.stepIndex % chords.length];
    this.stepIndex++;
    this._playRhodesChord(freqs, 4.0, 720, 0.08);
  }

  // 8. MORNING GLOW - Uplifting yet gentle warm acoustic ambient
  _playMorningStep() {
    const chords = [
      [146.83, 220.00, 293.66, 369.99, 440.00], // Dadd9
      [98.00, 196.00, 246.94, 293.66, 369.99],  // Gmaj9
      [123.47, 185.00, 293.66, 369.99, 440.00], // Bm7
      [110.00, 220.00, 293.66, 440.00, 493.88]  // Asus4
    ];
    const freqs = chords[this.stepIndex % chords.length];
    this.stepIndex++;
    this._playSoftPadChord(freqs, 4.2, 620, 'triangle', 0.07);
  }

  // 9. RAINY REVERIE - Cozy gentle rain wash with soft piano drops
  _playRainStep() {
    this._playRainWash(4.6);
    const pianoNotes = [392.00, 523.25, 659.25, 783.99, 587.33];
    for (let i = 0; i < 2; i++) {
      const f = pianoNotes[Math.floor(Math.random() * pianoNotes.length)];
      this._playSoftBell(f, i * 0.9 + Math.random() * 0.3, 2.0, 800, 0.06);
    }
    this.stepIndex++;
  }

  // 10. AURORA SOLITUDE - Meditative Tibetan singing bowl drone & harmonics
  _playAuroraStep() {
    const roots = [108.0, 120.0, 96.0, 108.0];
    const root = roots[this.stepIndex % roots.length];
    this.stepIndex++;
    const partials = [root, root * 1.5, root * 2.0, root * 2.76];
    this._playSingingBowl(partials, 6.0, 0.08);
  }

  _playSoftPadChord(freqs, duration, cutoff, type = 'sine', gainLevel = 0.08) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime;
    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0.001, t);
    chordGain.gain.linearRampToValueAtTime(gainLevel / freqs.length, t + 1.8);
    chordGain.gain.setValueAtTime(gainLevel / freqs.length, t + duration * 0.6);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, t);

    chordGain.connect(filter);
    filter.connect(this.trackGain);

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      const detune = (idx % 2 === 0 ? 1 : -1) * (1.2 + idx * 0.4);
      osc.detune.setValueAtTime(detune, t);
      osc.connect(chordGain);
      osc.start(t);
      osc.stop(t + duration);
    });

    setTimeout(() => {
      try {
        chordGain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (duration + 0.2) * 1000);
  }

  _playSoftBell(freq, delaySec, duration, cutoff, gainLevel = 0.07) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime + delaySec;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(gainLevel, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, t);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(this.trackGain);

    osc.start(t);
    osc.stop(t + duration);

    setTimeout(() => {
      try {
        gain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (delaySec + duration + 0.2) * 1000);
  }

  _playWaveSwell(duration = 6.0) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime;

    const buffer = this._getNoiseBuffer();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(220, t);
    filter.frequency.linearRampToValueAtTime(620, t + duration * 0.45);
    filter.frequency.linearRampToValueAtTime(220, t + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.09, t + duration * 0.45);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.trackGain);

    source.start(t);
    source.stop(t + duration);

    setTimeout(() => {
      try {
        gain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (duration + 0.2) * 1000);
  }

  _playRhodesChord(freqs, duration, cutoff = 700, gainLevel = 0.08) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime;

    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0.001, t);
    chordGain.gain.linearRampToValueAtTime(gainLevel / freqs.length, t + 0.08);
    chordGain.gain.exponentialRampToValueAtTime(gainLevel * 0.4 / freqs.length, t + 1.2);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, t);

    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(3.2, t);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.2, t);
    lfo.connect(lfoGain);

    chordGain.connect(filter);
    filter.connect(this.trackGain);

    freqs.forEach((freq) => {
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, t);
      osc1.connect(chordGain);
      osc1.start(t);
      osc1.stop(t + duration);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, t);
      const subGain = ctx.createGain();
      subGain.gain.value = 0.25;
      osc2.connect(subGain);
      subGain.connect(chordGain);
      osc2.start(t);
      osc2.stop(t + duration);
    });

    lfo.start(t);
    lfo.stop(t + duration);

    setTimeout(() => {
      try {
        chordGain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (duration + 0.2) * 1000);
  }

  _playBambooNote(freq, delaySec, duration, gainLevel = 0.08) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime + delaySec;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.linearRampToValueAtTime(freq * 1.015, t + 0.3);
    osc.frequency.linearRampToValueAtTime(freq, t + duration * 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(gainLevel, t + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, t);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(this.trackGain);

    osc.start(t);
    osc.stop(t + duration);

    setTimeout(() => {
      try {
        gain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (delaySec + duration + 0.2) * 1000);
  }

  _playSoftPluck(freq, delaySec, duration, cutoff = 850, gainLevel = 0.06) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime + delaySec;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(gainLevel, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, t);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(this.trackGain);

    osc.start(t);
    osc.stop(t + duration);

    const echoDelay = 0.22;
    const echoOsc = ctx.createOscillator();
    echoOsc.type = 'sine';
    echoOsc.frequency.setValueAtTime(freq, t + echoDelay);

    const echoGain = ctx.createGain();
    echoGain.gain.setValueAtTime(0.001, t + echoDelay);
    echoGain.gain.linearRampToValueAtTime(gainLevel * 0.35, t + echoDelay + 0.02);
    echoGain.gain.exponentialRampToValueAtTime(0.0001, t + echoDelay + duration * 0.8);

    echoOsc.connect(echoGain);
    echoGain.connect(filter);

    echoOsc.start(t + echoDelay);
    echoOsc.stop(t + echoDelay + duration * 0.8);

    setTimeout(() => {
      try {
        gain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (delaySec + duration + 0.5) * 1000);
  }

  _playRainWash(duration = 5.0) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime;

    const buffer = this._getNoiseBuffer();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.Q.value = 1.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.035, t + 0.5);
    gain.setValueAtTime(0.035, t + duration - 0.5);
    gain.gain.linearRampToValueAtTime(0.0001, t + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.trackGain);

    source.start(t);
    source.stop(t + duration);

    setTimeout(() => {
      try {
        gain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (duration + 0.2) * 1000);
  }

  _playSingingBowl(partials, duration = 6.0, gainLevel = 0.08) {
    if (!this.trackGain || !this.fx.ctx) return;
    const ctx = this.fx.ctx;
    const t = ctx.currentTime;

    const bowlGain = ctx.createGain();
    bowlGain.gain.setValueAtTime(0.001, t);
    bowlGain.gain.linearRampToValueAtTime(gainLevel / partials.length, t + 1.6);
    bowlGain.gain.setValueAtTime(gainLevel / partials.length, t + duration * 0.5);
    bowlGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);

    bowlGain.connect(filter);
    filter.connect(this.trackGain);

    partials.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      const beatOffset = (idx % 2 === 0 ? 0.15 : -0.15);
      osc.detune.setValueAtTime(beatOffset * 10, t);
      osc.connect(bowlGain);
      osc.start(t);
      osc.stop(t + duration);
    });

    setTimeout(() => {
      try {
        bowlGain.disconnect();
        filter.disconnect();
      } catch (_) {}
    }, (duration + 0.2) * 1000);
  }

  _getNoiseBuffer() {
    if (this.noiseBuffer) return this.noiseBuffer;
    const ctx = this.fx.ctx;
    const sampleRate = ctx.sampleRate || 44100;
    const bufferSize = sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const output = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
      b6 = white * 0.115926;
    }
    this.noiseBuffer = buffer;
    return this.noiseBuffer;
  }
}

const sfx = new ThreeAudioFX();
