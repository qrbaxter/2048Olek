import { Direction, Grid } from "@/types";
import { useCallback, useEffect } from "react";
import { MoveFn } from "./useGameLogic";

/**
 * This hook separates out the controls of the game so that the parent component
 * doesn't have to worry about HOW it's played - just which moves were made.
 *
 * This abstaction will allow us to add mobile support and touch controls without
 * making the parent component more complicated.
 */
const useGameControls = (board: number[], onMove: MoveFn) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      let direction: Direction | null = null;

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

      if (!direction) {
        return;
      }

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

      let moveResult = onMove(direction);

      // THIS LOGIC BELOW should not be inside the event handler.
      // It should run inside useGameLogic after move()
      // let newGrid: Grid = moveResult.newGrid;

      // if (JSON.stringify(oldGrid) === JSON.stringify(newGrid)) {
      //   return;
      // }

      // setScore((prevScore: number) => prevScore + moveResult.totalScore);

      // let flatNewGrid: Board = newGrid.flat();

      // let emptyCells: number[] = flatNewGrid.reduce((acc, value, index) => {
      //   if (value === 0) acc.push(index);
      //   return acc;
      // }, [] as number[]);

      // let isGameOver: boolean = !isMoveAvailable(newGrid);

      // if (emptyCells.length === 0 || isGameOver) {
      //   setGameOver(true);
      // } else {
      //   let randomCell: number =
      //     emptyCells[Math.floor(Math.random() * emptyCells.length)];
      //   let randomNumber: number = Math.random() < 0.9 ? 2 : 4;
      //   flatNewGrid[randomCell] = randomNumber;
      //   setBoard(flatNewGrid);
      //   setGameOver(false);
      // }
    },
    [board, onMove]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, handleKeyDown]);
};

export default useGameControls;
