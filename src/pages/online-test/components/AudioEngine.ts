class AudioEngine {
  private ctx: AudioContext | null = null;
  private currentOsc: OscillatorNode | null = null;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone(freq: number, dbHL: number, durationMs = 1500) {
    this.stop();
    const ctx = this.getCtx();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    const dbFS = -80 + dbHL * 0.6;
    const amp = Math.max(0.0001, Math.pow(10, dbFS / 20));

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(amp, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(amp, ctx.currentTime + durationMs / 1000 - 0.05);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + durationMs / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + durationMs / 1000);

    this.currentOsc = osc;

    osc.onended = () => {
      if (this.currentOsc === osc) {
        this.currentOsc = null;
      }
    };
  }

  stop() {
    if (this.currentOsc) {
      try {
        this.currentOsc.stop();
      } catch {
        // ignore
      }
      this.currentOsc = null;
    }
  }
}

export const audioEngine = new AudioEngine();