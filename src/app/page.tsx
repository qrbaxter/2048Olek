"use client"

import React from 'react';
import Board from "../components/Board";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewGame from "../components/NewGame";
import { useGameControls } from '@/hooks/useGameControls';

export default function Home() {
  const { board, gameOver, handleNewGame, score, bestScore } = useGameControls();

  return (
    <main>
      {
        gameOver ? (
          <div className="flex justify-center items-center flex-col">
            <h1>GAME OVER</h1>
            <h1>BEST: {bestScore} </h1>
            <NewGame onNewGame={handleNewGame}/>
          </div>
        ) : (
          <>
            <Header score={score} bestScore={bestScore}/>
            <Board board={board} />
            <NewGame onNewGame={handleNewGame} />
          </>
        )
      }
      <Footer />
    </main>
  );
}