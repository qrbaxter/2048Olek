"use client"

import React, { useState, useEffect } from 'react';
import Board from "../components/Board";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewGame from "../components/NewGame";
import { BOARD_SIZE } from '@/constants';
import { useGameControls } from '@/hooks/useGameControls';
import { useGameLogic } from '@/hooks/useGameLogic';

const initializeBoard = () => {
  let newBoard = Array.from({ length: BOARD_SIZE }, () => 0);
  let index1 = Math.floor(Math.random() * BOARD_SIZE);
  let index2 = Math.floor(Math.random() * BOARD_SIZE);
  
  newBoard[index1] = (Math.random() > 0.5 ? 2 : 4);
  newBoard[index2] = (Math.random() > 0.5 ? 2 : 4);
  return newBoard;
}



export default function Home() {
  const [board, setBoard] = useState<number[]>(Array.from({ length: BOARD_SIZE }, () => 0));
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const { handleKeyDown } = useGameControls(board, setBoard, setScore, setGameOver);
  const { move, isMoveAvailable } = useGameLogic()

  useEffect(() => {
    setBoard(initializeBoard());
  }, []); 

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  
const handleNewGame = () => {
  setBoard(initializeBoard());
  setGameOver(false);  
  setScore(0)
};


  return (
  <main>
    {
      gameOver ? (
        <div className="flex justify-center items-center flex-col">
          <h1>GAME OVER</h1>
          <h1>BEST:</h1>
        </div>
      ) : (
        <>
          <Header score={score}/>
          <Board board={board} />
          <NewGame onNewGame={handleNewGame} />
          
        </>
      )
    }
    <Footer />
  </main>
  )}