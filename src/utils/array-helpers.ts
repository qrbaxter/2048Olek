export function slideArray(arr: number[]): number[] {
  let numbers = arr.filter((v) => v !== 0);
  let zeros = new Array(4 - numbers.length).fill(0);
  return zeros.concat(numbers);
}

export function combineArray(arr: number[]): {
  arr: number[];
  combinedScore: number;
} {
  let combinedScore = 0;
  for (let i = 3; i > 0; i--) {
    if (arr[i] === arr[i - 1] && arr[i] !== 0) {
      arr[i] = arr[i] * 2;
      combinedScore += arr[i];
      arr[i - 1] = 0;
      i--;
    }
  }
  return { arr, combinedScore };
}
