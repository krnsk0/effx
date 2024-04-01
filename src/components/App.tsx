import { Effx } from 'effx';
import { Adsr } from './Adsr/Adsr';
import { useStore } from '../store/useStore';
import { useEffect, useRef } from 'react';
import { getSnapshot } from 'mobx-keystone';

function App() {
  const root = useStore();
  const voices = root.sound.voices;
  const effxRef = useRef<Effx | null>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'z') {
        if (!effxRef.current) {
          effxRef.current = new Effx({ outputGain: 0.5 });
        }
        const sound = getSnapshot(root).sound;
        effxRef.current.playSound(sound);
      }
    };
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [root]);

  return (
    <>
      {voices.map((voice, index) => {
        return <Adsr key={index} voice={voice} />;
      })}
    </>
  );
}

export default App;
