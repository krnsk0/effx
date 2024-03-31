export interface ADSR {
  startTime: number;
  startValue: number;
  attackTime: number;
  attackValue: number;
  decayTime: number;
  sustainTime: number;
  sustainValue: number;
  releaseTime: number;
}

export type OscillatorTypes =
  | 'sawtooth'
  | 'sine'
  | 'square'
  | 'triangle'
  | 'whiteNoise';

export interface VoiceDescription {
  oscillatorType: OscillatorTypes;
  frequency: number;
  adsr: ADSR;
}

interface VoiceParams {
  context: AudioContext;
  outputNode: GainNode;
  voiceDescription: VoiceDescription;
}

interface VoiceSource {
  connect: (node: AudioNode) => void;
}

export class Voice {
  private context: AudioContext;
  private outputNode: GainNode;
  private source?: VoiceSource;
  private gainNode?: GainNode;

  constructor({ context, outputNode, voiceDescription }: VoiceParams) {
    this.context = context;
    this.outputNode = outputNode;
    this.buildVoice(voiceDescription);
    this.scheduleGainADSR(voiceDescription.adsr);
  }

  private buildSource(voiceDescription: VoiceDescription) {
    if (voiceDescription.oscillatorType === 'whiteNoise') {
      const bufferSize = 2 * this.context.sampleRate;
      const noiseBuffer = this.context.createBuffer(
        1,
        bufferSize,
        this.context.sampleRate
      );
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.context.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      whiteNoise.start();
      this.source = whiteNoise;
    } else {
      const oscillator = this.context.createOscillator();
      oscillator.type = voiceDescription.oscillatorType;
      oscillator.frequency.value = voiceDescription.frequency;
      oscillator.start();
      const now = this.context.currentTime;
      oscillator.stop(now + this.getTotalVoiceTime(voiceDescription.adsr));
      this.source = oscillator;
    }
  }

  private buildVoice(voiceDescription: VoiceDescription) {
    this.buildSource(voiceDescription);
    if (!this.source) return;

    const gainNode = this.context.createGain();
    this.gainNode = gainNode;
    gainNode.gain.value = 0;

    this.source.connect(gainNode);
    gainNode.connect(this.outputNode);

    this.scheduleGainADSR(voiceDescription.adsr);
  }

  private getTotalVoiceTime(adsr: ADSR) {
    return (
      adsr.attackTime + adsr.decayTime + adsr.sustainTime + adsr.releaseTime
    );
  }

  private scheduleGainADSR(adsr: ADSR) {
    const now = this.context.currentTime;
    const {
      startTime,
      startValue,
      attackTime,
      attackValue,
      decayTime,
      sustainTime,
      sustainValue,
      releaseTime,
    } = adsr;
    const gainNode = this.gainNode;
    if (!gainNode) return;
    // attack
    gainNode.gain.setValueAtTime(startValue, now + startTime);
    gainNode.gain.linearRampToValueAtTime(
      attackValue,
      now + startTime + attackTime
    );

    // decay / sustain
    gainNode.gain.linearRampToValueAtTime(
      sustainValue,
      now + startTime + attackTime + decayTime
    );

    // release
    gainNode.gain.linearRampToValueAtTime(
      0,
      now + startTime + attackTime + decayTime + sustainTime + releaseTime
    );
  }
}
