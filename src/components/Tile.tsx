import React from 'react';

export interface TileProps {
  value: number;
  id: string;
}

const colorMap: { [key: number]: string } = {
  2: 'LightCoral', 
  4: 'FireBrick', 
  8: 'DarkOrange', 
  16: 'Chocolate', 
  32: 'Yellow',
  64: 'Gold',
  128: 'PaleGreen',
  256: 'DarkGreen',
  512: 'SkyBlue',
  1024: 'MediumBlue',
  2048: 'Purple'
};


const Tile: React.FC<TileProps> = ({ value, id }) => {
  const backgroundColor = colorMap[value] || '#8A9A5B';
  return (
    <div style={{backgroundColor}} className={`border border-black aspect-w-1 aspect-h-1 flex items-center justify-center`}>
      {value}
    </div>
  );
};

export default Tile;