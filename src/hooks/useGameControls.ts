import { Grid, Board as BoardType, Direction } from "@/types";
import { useGameLogic } from "./useGameLogic";
import { useState, useEffect, useCallback } from "react";
import { BOARD_SIZE } from "@/constants";

const initializeBoard = () => {
  let newBoard = Array.from({ length: BOARD_SIZE }, () => 0);
  let index1 = Math.floor(Math.random() * BOARD_SIZE);
  let index2 = Math.floor(Math.random() * BOARD_SIZE);
  
  newBoard[index1] = (Math.random() > 0.5 ? 2 : 4);
  newBoard[index2] = (Math.random() > 0.5 ? 2 : 4);
  return newBoard;
}

function chunk<T>(array: T[], size: number): T[][] {
  const chunked: T[][] = [];
  let index = 0;
  while (index < array.length) {
      chunked.push(array.slice(index, size + index));
      index += size;
  }
  return chunked;
}


export const useGameControls = () => {
    const [bestScore, setBestScore] = useState<number>(0);
    const {move, isMoveAvailable} = useGameLogic();
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [board, setBoard] = useState<number[]>(Array.from({ length: BOARD_SIZE }, () => 0));
    const [score, setScore] = useState<number>(0);
    
    const handleKeyDown = useCallback((event: KeyboardEvent): void => {
      let direction: Direction | undefined = undefined;
      
      switch(event.key) {
        case 'ArrowLeft': direction = 'LEFT'; break;
        case 'ArrowUp': direction = 'UP'; break;
        case 'ArrowRight': direction = 'RIGHT'; break;
        case 'ArrowDown': direction = 'DOWN'; break;
        default: break;
      }
      
      if (direction) {
        let oldGrid: Grid = [];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                row.push(0);
            }
            oldGrid.push(row);
        }
    
        board.forEach((value, i) => {
          oldGrid[Math.floor(i / 4)][i % 4] = value; 
        });
    
        let moveResult = move([...oldGrid], direction);
        let newGrid: Grid = moveResult.newGrid;
    
        if (JSON.stringify(oldGrid) === JSON.stringify(newGrid)) {
          return;
        }
    
        setScore((prevScore: number) => prevScore + moveResult.totalScore);
        if(score > bestScore) {
          setBestScore(score);
          localStorage.setItem('bestScore', JSON.stringify(score));
        }
        
        let flatNewGrid: BoardType = newGrid.flat();
        let emptyCells: number[] = flatNewGrid.reduce((acc, value, index) => {
          if(value === 0) acc.push(index);
          return acc;
        }, [] as number[]);

        let randomCell: number = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        let randomNumber: number = Math.random() < 0.9 ? 2 : 4; 
        flatNewGrid[randomCell] = randomNumber;
        newGrid = chunk(flatNewGrid, 4);
        setBoard(flatNewGrid);

        let isGameOver: boolean = !isMoveAvailable(chunk(flatNewGrid, 4));
        if (isGameOver) {
          setGameOver(true);   
        }
        
        console.log(newGrid);
        console.log(isMoveAvailable(newGrid));
      }
    }, [board, move, isMoveAvailable, bestScore, score]);

    const handleNewGame = () => {
      setBoard(initializeBoard());
      setGameOver(false);  
      setScore(0);
    
      const storedBestScore = localStorage.getItem('bestScore');
      if(storedBestScore) {
        setBestScore(JSON.parse(storedBestScore));
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleKeyDown]);

    useEffect(() => {
      setBoard(initializeBoard());
    }, [gameOver]);
  
    return {handleKeyDown, gameOver, setGameOver, handleNewGame, board, score, bestScore};

}