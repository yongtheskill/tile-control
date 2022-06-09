import React from 'react';
import { ColourSlider } from '../App/ColourSlider';

export default function Control({
  selectedTile,
  setSelectedTile,
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
}) {
  const [redValue, setRedValue] = React.useState(100);
  const [greenValue, setGreenValue] = React.useState(100);
  const [blueValue, setBlueValue] = React.useState(100);

  return (
    <div className='my-3 mx-4'>
      <div className='text-2xl font-black pr-1 dark:text-primary text-primary-dark'>
        Tile Controls
      </div>
      <div className='my-2'>
        <div className='text-lg font-black pr-1 dark:text-primary text-primary-dark'>Colour</div>
        <div className='text-xs font-sans dark:text-primary text-primary-dark mt-2'>Red</div>
        <ColourSlider value={redValue} setValue={setRedValue} />
        <div className='text-xs font-sans dark:text-primary text-primary-dark mt-1'>Green</div>
        <ColourSlider value={greenValue} setValue={setGreenValue} />
        <div className='text-xs font-sans dark:text-primary text-primary-dark mt-1'>Blue</div>
        <ColourSlider value={blueValue} setValue={setBlueValue} />
      </div>
    </div>
  );
}
