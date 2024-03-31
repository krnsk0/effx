import { Effx } from 'effx';
import { Adsr } from './Adsr/Adsr';
import { useStore } from '../store/useStore';

function App() {
  const root = useStore();
  const voices = root.sound.voices;

  return (
    <>
      {voices.map((voice, index) => {
        return <Adsr key={index} voice={voice} />;
      })}
    </>
  );
}

export default App;

let effx: Effx | undefined = undefined;
window.addEventListener('keydown', (event) => {
  if (event.key === 'z') {
    if (!effx) {
      effx = new Effx({ outputGain: 0.2 });
    }
    effx.playSound({
      voices: [],
    });
  }
});
