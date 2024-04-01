import { useEffect, useRef, useState } from 'react';
import './Adsr.css';
import { useDragHandler } from './useDragHandler';
import { Voice } from '../../store/voice';
import { observer } from 'mobx-react-lite';

const TOTAL_TIME = 0.5;

const WIDTH = 1000;
const HEIGHT = 400;

interface AdsrProps {
  voice: Voice;
}

export const Adsr = observer(({ voice }: AdsrProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const {
    startTime,
    attackTime,
    attackValue,
    decayTime,
    sustainValue,
    sustainTime,
    releaseTime,
  } = voice.adsr;

  const setStartTime = (v: number) => voice.adsr.setStartTime(v);
  const setAttackTime = (v: number) => voice.adsr.setAttackTime(v);
  const setAttackValue = (v: number) => voice.adsr.setAttackValue(v);
  const setDecayTime = (v: number) => voice.adsr.setDecayTime(v);
  const setSustainValue = (v: number) => voice.adsr.setSustainValue(v);
  const setSustainTime = (v: number) => voice.adsr.setSustainTime(v);
  const setReleaseTime = (v: number) => voice.adsr.setReleaseTime(v);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        setContext(ctx);
      }
      canvasRef.current.width = WIDTH;
      canvasRef.current.height = HEIGHT;
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, WIDTH, HEIGHT);

      context.strokeStyle = 'blue';
      context.lineWidth = 2;

      context.beginPath();

      // pre-attack
      context.moveTo(0, HEIGHT);
      context.lineTo((startTime / TOTAL_TIME) * WIDTH, HEIGHT);

      // attack
      context.lineTo(
        ((startTime + attackTime) / TOTAL_TIME) * WIDTH,
        HEIGHT - attackValue * HEIGHT
      );

      // decay
      context.lineTo(
        ((startTime + attackTime + decayTime) / TOTAL_TIME) * WIDTH,
        HEIGHT - HEIGHT * sustainValue
      );

      // sustain
      context.lineTo(
        ((startTime + attackTime + decayTime + sustainTime) / TOTAL_TIME) *
          WIDTH,
        HEIGHT - HEIGHT * sustainValue
      );

      // release
      context.lineTo(
        ((startTime + attackTime + decayTime + sustainTime + releaseTime) /
          TOTAL_TIME) *
          WIDTH,
        HEIGHT
      );

      context.stroke();
    }
  }, [
    startTime,
    attackTime,
    attackValue,
    sustainValue,
    sustainTime,
    releaseTime,
    context,
    decayTime,
  ]);

  const preAttackMousedown = useDragHandler({
    xValue: startTime,
    WIDTH,
    HEIGHT,
    xMaxValue: TOTAL_TIME - attackTime - sustainTime - decayTime - releaseTime,
    xSetter: setStartTime,
  });

  const attackMouseDown = useDragHandler({
    xValue: attackTime,
    yValue: attackValue,
    WIDTH,
    HEIGHT,
    xMaxValue: TOTAL_TIME - startTime - sustainTime - decayTime - releaseTime,
    yMaxValue: 1,
    xSetter: setAttackTime,
    ySetter: setAttackValue,
  });

  const decayMouseDown = useDragHandler({
    xValue: decayTime,
    yValue: attackValue,
    WIDTH,
    HEIGHT,
    xMaxValue: TOTAL_TIME - startTime - attackTime - sustainTime - releaseTime,
    yMaxValue: 1,
    xSetter: setDecayTime,
    ySetter: setAttackValue,
  });

  const sustainMouseDown = useDragHandler({
    xValue: sustainTime,
    yValue: sustainValue,
    WIDTH,
    HEIGHT,
    xMaxValue: TOTAL_TIME - startTime - attackTime - decayTime - releaseTime,
    yMaxValue: 1,
    xSetter: setSustainTime,
    ySetter: setSustainValue,
  });

  const releaseMouseDown = useDragHandler({
    xValue: releaseTime,
    WIDTH,
    HEIGHT,
    xMaxValue: TOTAL_TIME - startTime - attackTime - decayTime - sustainTime,
    xSetter: setReleaseTime,
  });

  return (
    <div
      className="adsr-outer"
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
      }}
    >
      <canvas
        ref={canvasRef}
        className="canvas"
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
        }}
      />
      <div
        className="adsr-height adsr-border"
        style={{
          width: `${(startTime / TOTAL_TIME) * WIDTH}px`,
        }}
        onMouseDown={preAttackMousedown}
      ></div>
      <div
        className="adsr-height adsr-border"
        style={{
          width: `${(attackTime / TOTAL_TIME) * WIDTH}px`,
        }}
        onMouseDown={attackMouseDown}
      ></div>
      <div
        className="adsr-height adsr-border"
        // specify in px
        style={{
          width: `${(decayTime / TOTAL_TIME) * WIDTH}px`,
          left: `${(startTime + attackTime) / WIDTH}px`,
        }}
        onMouseDown={decayMouseDown}
      ></div>
      <div
        className="adsr-height adsr-border"
        style={{
          width: `${(sustainTime / TOTAL_TIME) * WIDTH}px`,
          left: `${((startTime + attackTime + decayTime) / TOTAL_TIME) * WIDTH}px`,
        }}
        onMouseDown={sustainMouseDown}
      ></div>
      <div
        className="adsr-height"
        style={{
          width: `${(releaseTime / TOTAL_TIME) * WIDTH}px`,
          left: `${((attackTime + decayTime + sustainTime) / TOTAL_TIME) * WIDTH}px`,
        }}
        onMouseDown={releaseMouseDown}
      ></div>
    </div>
  );
});
