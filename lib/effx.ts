import { Voice, VoiceDescription } from './Voice';
import { OscillatorTypes } from './Voice';
export { OscillatorTypes };

export interface Sound {
  voices: VoiceDescription[];
}

interface EffxParams {
  outputGain: number;
}

export class Effx {
  private context: AudioContext;
  private outputNode: GainNode;
  private voices: Voice[] = [];

  constructor({ outputGain }: EffxParams) {
    const context = new window.AudioContext({
      sampleRate: 44100,
    });
    this.context = context;

    // output node
    const outputNode = this.context.createGain();
    this.outputNode = outputNode;
    outputNode.gain.value = outputGain;
    outputNode.connect(context.destination);
    outputNode.gain.value = outputGain;
  }

  playSound(sound: Sound) {
    sound.voices.forEach((voiceDescription) => {
      const voice = new Voice({
        context: this.context,
        outputNode: this.outputNode,
        voiceDescription,
      });
      this.voices.push(voice);
    });
  }

  destroy() {
    this.context.close();
  }
}
