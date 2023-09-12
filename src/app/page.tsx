"use client";

import { combineArray, slideArray } from "@/utils/array-helpers";
import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewGame from "../components/NewGame";

const BOARD_SIZE = 16;

type Grid = number[][];
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

/**
 *
 * @look Olek this is a JSDoc comment!
 * You can add nice formatting `here` for other devs.
 *
 * Some comments in this function would help readability!!! :)
 */
function move(
  grid: Grid,
  direction: Direction
): { newGrid: Grid; totalScore: number } {
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
}

function isMoveAvailable(grid: Grid): boolean {
  //zero check
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) return true;
    }
  }

  //horizontal move check
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === grid[row][col + 1]) return true;
    }
  }

  // vertical move check
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (grid[row][col] === grid[row + 1][col]) return true;
    }
  }

  return false;
}

const initializeBoard = () => {
  let newBoard = Array.from({ length: BOARD_SIZE }, () => 0);
  let index1 = Math.floor(Math.random() * BOARD_SIZE);
  let index2 = Math.floor(Math.random() * BOARD_SIZE);

  newBoard[index1] = Math.random() > 0.5 ? 2 : 4;
  newBoard[index2] = Math.random() > 0.5 ? 2 : 4;
  return newBoard;
};

export default function Home() {
  const [board, setBoard] = useState<number[]>(initializeBoard());

  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  type Direction = "LEFT" | "UP" | "RIGHT" | "DOWN" | undefined;
  type Grid = number[][];
  type Board = number[];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      let direction: Direction;

      switch (event.key) {
        case "ArrowLeft":
          direction = "LEFT";
          break;
        case "ArrowUp":
          direction = "UP";
          break;
        case "ArrowRight":
          direction = "RIGHT";
          break;
        case "ArrowDown":
          direction = "DOWN";
          break;
        default:
          break;
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

        let flatNewGrid: Board = newGrid.flat();
        let emptyCells: number[] = flatNewGrid.reduce((acc, value, index) => {
          if (value === 0) acc.push(index);
          return acc;
        }, [] as number[]);

        let isGameOver: boolean = !isMoveAvailable(newGrid);
        if (emptyCells.length === 0 || isGameOver) {
          setGameOver(true);
        } else {
          let randomCell: number =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];
          let randomNumber: number = Math.random() < 0.9 ? 2 : 4;
          flatNewGrid[randomCell] = randomNumber;
          setBoard(flatNewGrid);
          setGameOver(false);
        }
      }
    },
    [board]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, setScore, setGameOver]);

  const handleNewGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
  };

  return (
    <main>
      {gameOver ? (
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
