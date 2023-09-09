import React from 'react';

export interface NewGameProps {
  onNewGame: () => void;
}

const NewGame: React.FC<NewGameProps> = ({ onNewGame }) => {
  return (
    <div className="flex justify-center items-center">
      <button onClick={onNewGame} className="text-lg font-bold py-2 px-4 md:py-4 md:px-8 text-black rounded">
        New Game
      </button>
    </div>
  );
};

export default NewGame;
