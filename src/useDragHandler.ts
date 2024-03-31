interface UseDragHandlerProps {
  xValue?: number;
  yValue?: number;
  WIDTH: number;
  HEIGHT: number;
  xMaxValue?: number;
  yMaxValue?: number;
  xSetter?: (value: number) => void;
  ySetter?: (value: number) => void;
}

export function useDragHandler({
  xValue,
  yValue,
  WIDTH,
  HEIGHT,
  xMaxValue,
  yMaxValue,
  xSetter,
  ySetter,
}: UseDragHandlerProps) {
  const mouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const mousemove = (e: MouseEvent) => {
      if (ySetter) {
        const yDiff = -(e.clientY - startY) / HEIGHT;
        ySetter(Math.max(0, Math.min((yValue ?? 0) + yDiff, yMaxValue ?? 0)));
      }

      if (xSetter) {
        const xDiff = (e.clientX - startX) / WIDTH;
        xSetter(Math.max(0, Math.min((xValue ?? 0) + xDiff, xMaxValue ?? 0)));
      }
    };

    const mouseup = () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseup', mouseup);
    };

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
  };

  return mouseDown;
}
