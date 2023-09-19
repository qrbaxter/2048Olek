import { Grid, Board as BoardType, Direction } from "@/types";
import { useGameLogic } from "./useGameLogic";
import { useState } from "react";


export const useGameControls = (board: number[], setBoard: Function, setScore: Function) => {
    const {move, isMoveAvailable} = useGameLogic()
    const [gameOver, setGameOver] = useState<boolean>(false);
    
    
    const handleKeyDown = (event: KeyboardEvent): void => {
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
          
          let flatNewGrid: BoardType = newGrid.flat();
          let emptyCells: number[] = flatNewGrid.reduce((acc, value, index) => {
            if(value === 0) acc.push(index);
            return acc;
          }, [] as number[]);

          let randomCell: number = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          let randomNumber: number = Math.random() < 0.9 ? 2 : 4; 
          flatNewGrid[randomCell] = randomNumber;
          setBoard(flatNewGrid);

          let isGameOver: boolean = isMoveAvailable(newGrid)===false
            if (isGameOver) {
              setGameOver(true);
          
  }
  console.log(newGrid);
  console.log(isMoveAvailable(newGrid));
}
    }
    return {handleKeyDown, gameOver, setGameOver}
  }
      
