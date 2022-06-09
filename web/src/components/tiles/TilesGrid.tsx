import React from 'react';
import { useColourTheme } from '../../themeManager';
import { Tile, grid, nCols, nRows, tileSize } from './util/tiles';

const animFrames = 40;

const drawGridLines = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  context.beginPath();
  for (let i = 1; i < nCols; i++) {
    const coord = i * tileSize;
    context.moveTo(coord, 0);
    context.lineTo(coord, canvas.height);
  }
  for (let i = 1; i < nRows; i++) {
    const coord = i * tileSize;
    context.moveTo(0, coord);
    context.lineTo(canvas.width, coord);
  }
  context.lineWidth = 1;
  context.strokeStyle = '#ddd';
  context.stroke();
};

const drawSelected = (context: CanvasRenderingContext2D, x: number, y: number) => {
  const cscheme = useColourTheme();
  context.beginPath();
  context.rect(x, y, tileSize, tileSize);
  context.lineWidth = 2;
  context.strokeStyle = cscheme === 1 ? '#000' : '#fff';
  context.stroke();
};

const drawTiles = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  context.clearRect(-1, -1, canvas.width, canvas.height);
  drawGridLines(canvas, context);
};

const interpolate = (start: number, end: number, x: number) => {
  return (
    start + (end - start) * (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2)
  );
};

//component
export default function TurfGrid({
  selectedTile,
  setSelectedTile,
  grid,
}: {
  selectedTile: {
    x: number;
    y: number;
  };
  setSelectedTile: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  grid: Map<number, Tile>;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const isAnimating = React.useRef(false);
  const prevPos = React.useRef({ x: 0, y: 0 });
  const animProgress = React.useRef(0);
  const animInterval = React.useRef(-1);

  React.useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context === null) return;
    context.translate(1, 1);
  }, []);

  React.useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context === null) return;

    drawTiles(canvas, context);

    if (isAnimating.current) {
      if (animProgress.current === 0) {
        animInterval.current = setInterval(() => {
          animProgress.current++;
          drawTiles(canvas, context);
          drawSelected(
            context,
            interpolate(
              prevPos.current.x * tileSize,
              selectedTile.x * tileSize,
              animProgress.current / animFrames
            ),
            interpolate(
              prevPos.current.y * tileSize,
              selectedTile.y * tileSize,
              animProgress.current / animFrames
            )
          );
          if (animProgress.current === animFrames) {
            clearInterval(animInterval.current);
            animProgress.current = 0;
            isAnimating.current = false;
          }
        }, 1);
      }
    } else {
      drawSelected(context, selectedTile.x * tileSize, selectedTile.y * tileSize);
    }
    console.log(selectedTile);
  }, [selectedTile]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current === null) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / tileSize);
    const y = Math.floor((e.clientY - rect.top) / tileSize);
    prevPos.current = selectedTile;
    setSelectedTile({ x, y });
    isAnimating.current = true;
  };

  return (
    <div className='border-2 w-min rounded-lg overflow-hidden border-slate-400'>
      <canvas
        ref={canvasRef}
        width={`${tileSize * nCols + 2}px`}
        height={`${tileSize * nRows + 2}px`}
        onClick={handleClick}
      />
    </div>
  );
}
