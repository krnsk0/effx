
import { Effx } from 'effx';

function App() {

  return (
    <>
     hello
    </>
  )
}

export default App


let effx: Effx | undefined = undefined;
window.addEventListener('keydown', (event) => {
  if (event.key === 'z') {
    if (!effx) {
      effx = new Effx({ outputGain: 0.2 });
    }
    effx.playSound({
      voices: [
        {
          oscillatorType: 'whiteNoise',
          frequency: 110,
          adsr: {
            startValue: 0,
            attackTime: 0.005,
            attackValue: 0.8,
            decayTime: 0.02,
            sustainTime: 0.001,
            sustainValue: 0.1,
            releaseTime: 0,
            releaseValue: 0,
          },
        },
        {
          oscillatorType: 'sine',
          frequency: 110,
          adsr: {
            startValue: 0,
            attackTime: 0.03,
            attackValue: 0.3,
            decayTime: 0.04,
            sustainTime: 0.08,
            sustainValue: 0.4,
            releaseTime: 0.05,
            releaseValue: 0,
          },
        },
        {
          oscillatorType: 'sawtooth',
          frequency: 220,
          adsr: {
            startValue: 0,
            attackTime: 0.02,
            attackValue: 0.8,
            decayTime: 0.02,
            sustainTime: 0.1,
            sustainValue: 0.2,
            releaseTime: 0.05,
            releaseValue: 0,
          },
        },
        {
          oscillatorType: 'triangle',
          frequency: 330,
          adsr: {
            startValue: 0,
            attackTime: 0.03,
            attackValue: 0.8,
            decayTime: 0.08,
            sustainTime: 0.08,
            sustainValue: 0.4,
            releaseTime: 0.05,
            releaseValue: 0,
          },
        },
      ],
    });
  }
});
