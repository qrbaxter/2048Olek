import { slideArray, combineArray } from '@/utils/array.helpers';
import { Grid, Direction } from '@/types';


export const useGameLogic = () => {
    const move = (grid: Grid, direction: Direction) => {
      let newGrid = grid.map(row => [...row]);

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
      };




      const isMoveAvailable = (grid: Grid): boolean => {
        // zero check
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) return true;
          }
        }
        // horizontal check
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 3; col++) {
            if (grid[row][col] === grid[row][col + 1]) return true;
          }
        }
      
        // vertical check
        for (let col = 0; col < 4; col++) {
          for (let row = 0; row < 3; row++) {
            if (grid[row][col] === grid[row + 1][col]) return true;
          }
        }
      
        return false;
      };
      
  






      return {move, isMoveAvailable}
      
}
