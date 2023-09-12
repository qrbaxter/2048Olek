export default function Footer() {
  return (
    <div
      id="footer"
      className="leading-lg text-center font-medium text-black pb-25"
    >
      <h2 className="my-5 text-4xl underline">How to play?</h2>
      <p className="md:text-md text-sm">
        Use the arrow keys to move the tiles. <br />
        <br />
        Double up the same number tiles to join them into the next valued tile.
        Goal is to get a tile with the number <strong>2048</strong>.
      </p>
    </div>
  );
}
