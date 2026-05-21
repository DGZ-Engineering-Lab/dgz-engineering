/**
 * DGZ Spatial OS — Procedural Audio Engine v2.0
 * Zero-asset, high-fidelity real-time synthesizers for spatial interfaces.
 * All audio is generated procedurally using the Web Audio API.
 * 
 * @class DGZSynth
 * @author DGZ Engineering Lab
 */
class DGZSynth {
    constructor() {
        /** @type {AudioContext|null} */
        this.ctx = null;
        /** @type {GainNode|null} */
        this.masterGain = null;
        /** @type {DynamicsCompressorNode|null} */
        this.compressor = null;
        /** @type {boolean} */
        this.muted = localStorage.getItem('dgz_audio_muted') === 'true';
        /** @type {number} Master volume 0.0–1.0 */
        this._volume = parseFloat(localStorage.getItem('dgz_audio_volume') || '0.8');
    }

    /**
     * Initialize AudioContext and master signal chain.
     * Safe to call multiple times — only initializes once.
     */
    init() {
        if (this.ctx) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();

            // Master compressor to prevent clipping
            this.compressor = this.ctx.createDynamicsCompressor();
            this.compressor.threshold.setValueAtTime(-24, this.ctx.currentTime);
            this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
            this.compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
            this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
            this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

            // Master gain for global volume
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(this._volume, this.ctx.currentTime);

            // Chain: masterGain → compressor → destination
            this.masterGain.connect(this.compressor);
            this.compressor.connect(this.ctx.destination);
        } catch (e) {
            console.error('DGZSynth: AudioContext init failed:', e);
        }
    }

    /**
     * Get the output node for routing oscillators through the master chain.
     * @returns {AudioNode} The master gain node or ctx.destination as fallback
     * @private
     */
    _getOutput() {
        return this.masterGain || this.ctx.destination;
    }

    /**
     * Set mute state.
     * @param {boolean} state - true to mute, false to unmute
     */
    setMute(state) {
        this.muted = state;
        localStorage.setItem('dgz_audio_muted', state);
    }

    /**
     * Toggle mute state.
     * @returns {boolean} New mute state
     */
    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('dgz_audio_muted', this.muted);
        return this.muted;
    }

    /**
     * Set master volume level.
     * @param {number} level - Volume from 0.0 (silent) to 1.0 (full)
     */
    setVolume(level) {
        this._volume = Math.max(0, Math.min(1, level));
        localStorage.setItem('dgz_audio_volume', this._volume);
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this._volume, this.ctx.currentTime);
        }
    }

    /**
     * Get current master volume.
     * @returns {number} Current volume 0.0–1.0
     */
    getVolume() {
        return this._volume;
    }

    // ──────────────────────────────────────────────────────────────
    // CORE SYNTHS (original)
    // ──────────────────────────────────────────────────────────────

    /**
     * Tactile sub-decibel click for button hovers and toggles.
     * Duration: ~50ms | Waveform: sine | Sweep: 1000→120 Hz
     */
    playClick() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.05);
            
            gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
            
            osc.connect(gain);
            gain.connect(this._getOutput());
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {
            console.warn('DGZSynth click sound fail:', e);
        }
    }

    /**
     * Alarm tone for warning sequences and errors.
     * Duration: ~300ms | Waveform: sawtooth + sine | Dissonant dual-osc
     */
    playWarning() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        
        try {
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc1.type = 'sawtooth';
            osc2.type = 'sine';
            
            osc1.frequency.setValueAtTime(80, this.ctx.currentTime);
            osc1.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 0.25);
            
            osc2.frequency.setValueAtTime(440, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
            
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(this._getOutput());
            
            osc1.start();
            osc2.start();
            osc1.stop(this.ctx.currentTime + 0.3);
            osc2.stop(this.ctx.currentTime + 0.3);
        } catch (e) {
            console.warn('DGZSynth warning sound fail:', e);
        }
    }

    /**
     * Sweep alert sound for deep neural sweeps and diagnostic scans.
     * Duration: ~700ms | Waveform: triangle | Sweep: 320→880→440 Hz
     */
    playScanAlert() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.35);
            osc.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 0.7);
            
            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);
            
            osc.connect(gain);
            gain.connect(this._getOutput());
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.7);
        } catch (e) {
            console.warn('DGZSynth scan alert fail:', e);
        }
    }

    /**
     * Frequency shift sweep tied to slider position drags.
     * Duration: ~100ms | Waveform: sine | Freq: 180–540 Hz (mapped)
     * @param {number} normalizedValue - Value from 0.0 to 1.0 representing slider position
     */
    playSliderHum(normalizedValue) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            const targetFreq = 180 + (normalizedValue * 360);
            osc.frequency.setValueAtTime(targetFreq, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(this._getOutput());
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.1);
        } catch (e) {
            console.warn('DGZSynth slider hum fail:', e);
        }
    }

    /**
     * Haptic feedback tone for hand pinch gestures.
     * Duration: ~80ms | Waveform: sine | Sweep: 800→1500 Hz
     */
    playPinch() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1500, this.ctx.currentTime + 0.08);
            
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            
            osc.connect(gain);
            gain.connect(this._getOutput());
            
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {
            console.warn('DGZSynth pinch fail:', e);
        }
    }

    // ──────────────────────────────────────────────────────────────
    // EXPANDED SYNTHS v2.0
    // ──────────────────────────────────────────────────────────────

    /**
     * Satisfying ascending 3-note arpeggio for successful operations.
     * Notes: C5→E5→G5 | Duration: ~320ms | Waveform: sine
     */
    playSuccess() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
            const t = this.ctx.currentTime;

            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, t + i * 0.08);

                gain.gain.setValueAtTime(0, t);
                gain.gain.setValueAtTime(0.06, t + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.15);

                osc.connect(gain);
                gain.connect(this._getOutput());

                osc.start(t + i * 0.08);
                osc.stop(t + i * 0.08 + 0.15);
            });
        } catch (e) {
            console.warn('DGZSynth success sound fail:', e);
        }
    }

    /**
     * Dramatic boot-up sequence with dual-layer ascending frequency sweep.
     * Duration: ~1500ms | Waveform: triangle + sine | Sweep: 60→2000 Hz
     */
    playBootSequence() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;

            // Primary sweep — triangle wave
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(60, t);
            osc1.frequency.exponentialRampToValueAtTime(2000, t + 1.2);
            osc1.frequency.exponentialRampToValueAtTime(800, t + 1.5);
            gain1.gain.setValueAtTime(0.001, t);
            gain1.gain.linearRampToValueAtTime(0.07, t + 0.3);
            gain1.gain.setValueAtTime(0.07, t + 0.8);
            gain1.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
            osc1.connect(gain1);
            gain1.connect(this._getOutput());
            osc1.start(t);
            osc1.stop(t + 1.5);

            // Secondary harmonic layer — sine wave, octave above
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(120, t + 0.2);
            osc2.frequency.exponentialRampToValueAtTime(1600, t + 1.0);
            gain2.gain.setValueAtTime(0.001, t);
            gain2.gain.linearRampToValueAtTime(0.04, t + 0.5);
            gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
            osc2.connect(gain2);
            gain2.connect(this._getOutput());
            osc2.start(t + 0.2);
            osc2.stop(t + 1.5);

            // Sub-bass rumble
            const osc3 = this.ctx.createOscillator();
            const gain3 = this.ctx.createGain();
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(40, t);
            osc3.frequency.linearRampToValueAtTime(80, t + 1.0);
            gain3.gain.setValueAtTime(0.05, t);
            gain3.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
            osc3.connect(gain3);
            gain3.connect(this._getOutput());
            osc3.start(t);
            osc3.stop(t + 1.3);
        } catch (e) {
            console.warn('DGZSynth boot sequence fail:', e);
        }
    }

    /**
     * Rapid staccato clicks simulating data transmission.
     * Duration: ~210ms | 6 micro-clicks at ~35ms intervals
     */
    playDataStream() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;

            for (let i = 0; i < 6; i++) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'square';
                osc.frequency.setValueAtTime(2400 + Math.random() * 1200, t + i * 0.035);

                gain.gain.setValueAtTime(0.02, t + i * 0.035);
                gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.035 + 0.02);

                osc.connect(gain);
                gain.connect(this._getOutput());

                osc.start(t + i * 0.035);
                osc.stop(t + i * 0.035 + 0.02);
            }
        } catch (e) {
            console.warn('DGZSynth data stream fail:', e);
        }
    }

    /**
     * Digital glitch sound with rapid random frequency modulation.
     * Duration: ~200ms | Waveform: square | Freq: randomized 100–800 Hz
     */
    playGlitch() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            // Rapid random frequency jumps
            for (let i = 0; i < 10; i++) {
                const freq = 100 + Math.random() * 700;
                osc.frequency.setValueAtTime(freq, t + i * 0.02);
            }

            gain.gain.setValueAtTime(0.04, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

            osc.connect(gain);
            gain.connect(this._getOutput());

            osc.start(t);
            osc.stop(t + 0.2);
        } catch (e) {
            console.warn('DGZSynth glitch sound fail:', e);
        }
    }

    /**
     * Secure "lock engaged" descending tone.
     * Duration: ~150ms | Waveform: sine | Sweep: 1200→200 Hz
     */
    playLock() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, t);
            osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);

            gain.gain.setValueAtTime(0.06, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

            osc.connect(gain);
            gain.connect(this._getOutput());

            osc.start(t);
            osc.stop(t + 0.15);
        } catch (e) {
            console.warn('DGZSynth lock sound fail:', e);
        }
    }

    /**
     * "Access granted" ascending sweep for unlock/authorization events.
     * Duration: ~200ms | Waveform: sine | Sweep: 200→1800 Hz
     */
    playUnlock() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, t);
            osc.frequency.exponentialRampToValueAtTime(1800, t + 0.2);

            gain.gain.setValueAtTime(0.06, t);
            gain.gain.linearRampToValueAtTime(0.08, t + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

            osc.connect(gain);
            gain.connect(this._getOutput());

            osc.start(t);
            osc.stop(t + 0.2);
        } catch (e) {
            console.warn('DGZSynth unlock sound fail:', e);
        }
    }

    /**
     * Ambient tonal pad for background atmosphere.
     * Duration: ~3000ms | Waveform: sine + triangle | Low-frequency drone
     */
    playAmbientPad() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;
            
            // Root drone
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(110, t);
            gain1.gain.setValueAtTime(0.001, t);
            gain1.gain.linearRampToValueAtTime(0.03, t + 0.5);
            gain1.gain.setValueAtTime(0.03, t + 2.0);
            gain1.gain.exponentialRampToValueAtTime(0.001, t + 3.0);
            osc1.connect(gain1);
            gain1.connect(this._getOutput());
            osc1.start(t);
            osc1.stop(t + 3.0);

            // Fifth harmonic
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(165, t);
            gain2.gain.setValueAtTime(0.001, t);
            gain2.gain.linearRampToValueAtTime(0.02, t + 0.8);
            gain2.gain.setValueAtTime(0.02, t + 1.8);
            gain2.gain.exponentialRampToValueAtTime(0.001, t + 3.0);
            osc2.connect(gain2);
            gain2.connect(this._getOutput());
            osc2.start(t);
            osc2.stop(t + 3.0);
        } catch (e) {
            console.warn('DGZSynth ambient pad fail:', e);
        }
    }

    /**
     * Notification chime — two-tone ascending bell.
     * Duration: ~400ms | Waveform: sine | Notes: A5→E6
     */
    playNotification() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const t = this.ctx.currentTime;
            const notes = [880, 1318.5]; // A5, E6

            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, t + i * 0.12);
                gain.gain.setValueAtTime(0.05, t + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.25);
                osc.connect(gain);
                gain.connect(this._getOutput());
                osc.start(t + i * 0.12);
                osc.stop(t + i * 0.12 + 0.25);
            });
        } catch (e) {
            console.warn('DGZSynth notification fail:', e);
        }
    }
}

// ──────────────────────────────────────────────────────────────
// GLOBAL INSTANCE & AUTO-UNLOCK
// ──────────────────────────────────────────────────────────────

window.dgzSynth = new DGZSynth();

// Autoplay initialization helper — unlocks AudioContext on first user interaction
document.addEventListener('click', () => {
    if (window.dgzSynth) {
        window.dgzSynth.init();
    }
}, { once: true });

// Also unlock on touch for mobile devices
document.addEventListener('touchstart', () => {
    if (window.dgzSynth) {
        window.dgzSynth.init();
    }
}, { once: true });
