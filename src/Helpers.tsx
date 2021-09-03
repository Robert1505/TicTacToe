import { GameState } from "./App";

export const checkRow = (cellsContent: string[], rowIndex: number): boolean => {
  const startIndex = rowIndex * 3;
  if (
    cellsContent[startIndex] === cellsContent[startIndex + 1] &&
    cellsContent[startIndex + 1] === cellsContent[startIndex + 2] &&
    cellsContent[startIndex] !== ""
  ) {
    return true;
  }
  return false;
};

export const checkColumn = (cellsContent: string[], columnIndex: number): boolean => {
    const startIndex = columnIndex;
    if (
      cellsContent[startIndex] === cellsContent[startIndex + 3] &&
      cellsContent[startIndex] === cellsContent[startIndex + 6] &&
      cellsContent[startIndex] !== ""
    ) {
      return true;
    }
    return false;
};

export const checkDiagonals = (cellsContent: string[]) => {
    if (
      cellsContent[0] === cellsContent[4] &&
      cellsContent[0] === cellsContent[8] &&
      cellsContent[0] !== ""
    )
      return true;
    if (
      cellsContent[2] === cellsContent[4] &&
      cellsContent[2] === cellsContent[6] &&
      cellsContent[2] !== ""
    )
      return true;
};

export const checkDraw = (cellsContent: string[], gameState: GameState) => {
    return (
      cellsContent.findIndex((x) => x === "") === -1 &&
      gameState !== GameState.WON
    );
  };
