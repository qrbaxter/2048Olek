import Tile from './Tile';

interface BoardProps {
  board: number[];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  
  return (
    <div className="flex justify-center items-center">
      <div className="w-[48vw] h-[48vw] max-w-[56vh] max-h-[56vh]">
        <div
          className="border-1 grid select-none gap-4 rounded-md bg-[#36454F] p-5 h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${Math.sqrt(board.length)}, 1fr)`,
          }}
        >
          {board.map((value, i) => (
            <Tile value={value} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;