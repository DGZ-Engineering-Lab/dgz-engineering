/**
 * DGZ Spatial OS — Gestural Audio Feedback (Synthesizer)
 */
(function() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    window.dgzSynth = {
        playPinch() {
            try {
                const ctx = initAudioContext();
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
                
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.13);
            } catch (e) {
                console.error("Error playing pinch sound:", e);
            }
        },

        playScanAlert() {
            try {
                const ctx = initAudioContext();
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
                
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(1500, now);
                filter.frequency.exponentialRampToValueAtTime(600, now + 0.2);
                
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.21);
            } catch (e) {
                console.error("Error playing scan alert sound:", e);
            }
        },

        playClick() {
            try {
                const ctx = initAudioContext();
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1500, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
                
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.05);
            } catch (e) {
                console.error("Error playing click sound:", e);
            }
        }
    };
})();
