import { useState } from 'react';
import Control from '../components/tiles/Control';
import TilesGrid from '../components/tiles/TilesGrid';
import { grid } from '../components/tiles/util/tiles';

export default function Tiles() {
  const [selectedTile, setSelectedTile] = useState({ x: 0, y: 0 });

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='container'>
        <div className='grid grid-cols-4 gap-6'>
          <div className='col-span-3'>
            <TilesGrid selectedTile={selectedTile} setSelectedTile={setSelectedTile} grid={grid} />
          </div>
          <div className=' rounded-md'>
            <Control selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
          </div>
        </div>
      </div>
    </div>
  );
}
