interface HeaderProps {
  score: number;
}

const Header: React.FC<HeaderProps> = ({ score }) => {
  const best = score;
  return (
    <div className="flex flex-wrap justify-between py-2 items-center">
      <h1
        style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
        className="font-bold p-0 px-4 md:px-20"
      >
        2048
      </h1>
      <div className="flex gap-5 px-4 md:px-20">
        <div className="m-auto rounded-md p-3 md:p-6 text-center font-bold">
          <div
            style={{ fontSize: "clamp(0.75rem, 2vw, 1.25rem)" }}
            className="font-bold uppercase"
          >
            Score
          </div>
          <div style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.5rem)" }}>
            {score}
          </div>
        </div>
        <div className="m-auto rounded-md p-3 md:p-6 text-center font-bold">
          <div
            style={{ fontSize: "clamp(0.75rem, 2vw, 1.25rem)" }}
            className="font-bold uppercase"
          >
            Best
          </div>
          <div style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.5rem)" }}>
            {best}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
