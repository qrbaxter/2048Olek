import { BOARD_SIZE } from "@/constants";
import { Direction, Grid } from "@/types";
import { combineArray, slideArray } from "@/utils/array-helpers";
import { useCallback, useState } from "react";

export type MoveFn = (direction: Direction) => {
  newGrid: number[][];
  totalScore: number;
};

const initializeBoard = () => {
  let newBoard = Array.from({ length: BOARD_SIZE }, () => 0);
  let index1 = Math.floor(Math.random() * BOARD_SIZE);
  let index2 = Math.floor(Math.random() * BOARD_SIZE);

  newBoard[index1] = Math.random() > 0.5 ? 2 : 4;
  newBoard[index2] = Math.random() > 0.5 ? 2 : 4;

  return newBoard;
};

/**
 * This hook handles all of the logic for 2048!
 */
const useGameLogic = (grid: Grid) => {
  const [board, setBoard] = useState<number[]>(initializeBoard());
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  /**
   *
   * @look Olek this is a JSDoc comment!
   * You can add nice formatting `here` for other devs.
   *
   * Some comments in this function would help readability!!! :)
   */
  const move: MoveFn = useCallback(
    (direction: Direction) => {
      let newGrid = grid.map((row) => [...row]);

      let totalScore = 0;

      if (direction === "UP" || direction === "DOWN") {
        for (let col = 0; col < 4; col++) {
          let column: number[] = [];
          for (let row = 0; row < 4; row++) {
            column.push(newGrid[row][col]);
          }

          if (direction === "DOWN") {
            column = slideArray(column);
            let result = combineArray(column);
            column = result.arr;
            totalScore += result.combinedScore;
            column = slideArray(column);
          } else {
            column = slideArray(column.reverse());
            let result = combineArray(column);
            column = result.arr;
            totalScore += result.combinedScore;
            column = slideArray(column).reverse();
          }

          for (let row = 0; row < 4; row++) {
            newGrid[row][col] = column[row];
          }
        }
      } else {
        for (let row = 0; row < 4; row++) {
          if (direction === "RIGHT") {
            newGrid[row] = slideArray(newGrid[row]);
            let result = combineArray(newGrid[row]);
            newGrid[row] = result.arr;
            totalScore += result.combinedScore;
            newGrid[row] = slideArray(newGrid[row]);
          } else {
            newGrid[row] = slideArray(newGrid[row].reverse());
            let result = combineArray(newGrid[row]);
            newGrid[row] = result.arr;
            totalScore += result.combinedScore;
            newGrid[row] = slideArray(newGrid[row]).reverse();
          }
        }
      }

      return { newGrid, totalScore };
    },
    [grid]
  );

  const getIsMoveAvailable = useCallback(() => {
    //zero check
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          return true;
        }
      }
    }

    //horizontal move check
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] === grid[row][col + 1]) {
          return true;
        }
      }
    }

    // vertical move check
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (grid[row][col] === grid[row + 1][col]) {
          return true;
        }
      }
    }

    return false;
  }, [grid]);

  const startNewGame = () => {
    setBoard(initializeBoard());
    setIsGameOver(false);
  };

  return {
    move,
    startNewGame,
    getIsMoveAvailable,
    board,
    score,
    setBoard,
    setScore,
    isGameOver,
    setIsGameOver,
  };
};

export default useGameLogic;
