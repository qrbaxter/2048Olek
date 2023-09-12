"use client";

import useGameControls from "@/hooks/useGameControls";
import useGameLogic from "@/hooks/useGameLogic";
import Board from "../components/Board";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewGame from "../components/NewGame";

export default function Home() {
  const { isGameOver, move, board } = useGameLogic();

  useGameControls(board, move);

  return (
    <main>
      {isGameOver ? (
        <div className="flex justify-center items-center flex-col">
          <h1>GAME OVER</h1>
          <h1>BEST:</h1>
        </div>
      ) : (
        <>
          <Header score={score} />
          <Board board={board} />
          <NewGame onNewGame={handleNewGame} />
        </>
      )}
      <Footer />
    </main>
  );
}
