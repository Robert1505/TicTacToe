import React, { ReactElement, useEffect, useState } from "react";
import "./App.css";

interface Props {}

enum GameState {
  IN_PROGRESS,
  WON,
  DRAW,
}

export default function App({}: Props): ReactElement {
  const [cellsContent, setCellsContent] = useState<string[]>(
    new Array(9).fill("")
  );
  const [nextChar, setNextChar] = useState("O");
  const [gameState, setGameState] = useState(GameState.IN_PROGRESS);

  const fillCell = (cellIndex: number) => {
    if(gameState !== GameState.IN_PROGRESS) return;
    if (cellsContent[cellIndex] !== "") return;
    const newCellsContent = [...cellsContent];
    newCellsContent[cellIndex] = nextChar;
    setCellsContent(newCellsContent);
  };

  useEffect(() => {
    checkGameState();
  }, [cellsContent]);

  const renderGridItem = (cellIndex: number) => {
    return (
      <div className="grid-item" onClick={() => fillCell(cellIndex)}>
        {cellsContent[cellIndex]}
      </div>
    );
  };

  const checkRow = (rowIndex: number): boolean => {
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

  const checkColumn = (columnIndex: number): boolean => {
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

  const checkDiagonals = () => {
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
  const checkDraw = () => {
    return (
      cellsContent.findIndex((x) => x === "") === -1 &&
      gameState !== GameState.WON
    );

    // let ok: boolean = true;
    // for (let i = 0; i < 9; i++) if (cellsContent[i] === "") ok = false;
    // if (ok === true && gameState !== GameState.WON) return true;
    // return false;
  };

  const checkGameState = () => {
    if (checkRow(0) || checkRow(1) || checkRow(2)) {
      setGameState(GameState.WON);
      return;
    }
    if (checkColumn(0) || checkColumn(1) || checkColumn(2)) {
      setGameState(GameState.WON);
      return;
    }
    if (checkDiagonals()) {
      setGameState(GameState.WON);
      return;
    }
    if (checkDraw()) {
      setGameState(GameState.DRAW);
      return;
    }

    if (gameState === GameState.IN_PROGRESS)
      if (nextChar === "X") setNextChar("O");
      else setNextChar("X");
  };

  const renderText = () => {
    if (GameState.IN_PROGRESS === gameState)
      return (
        <>
          Player <span className="character">{nextChar}</span>'s turn!
        </>
      );
    if (GameState.WON === gameState) return <>Game Won by {nextChar}!</>;
    if (GameState.DRAW === gameState) return <>Draw!</>;
  };

  return (
    <div className="background">
      <div className="grid">
        <div className="text">{renderText()}</div>
        <div className="grid-3">
          {renderGridItem(0)}
          {renderGridItem(1)}
          {renderGridItem(2)}
        </div>
        <div className="grid-3">
          {renderGridItem(3)}
          {renderGridItem(4)}
          {renderGridItem(5)}
        </div>
        <div className="grid-3">
          {renderGridItem(6)}
          {renderGridItem(7)}
          {renderGridItem(8)}
        </div>
      </div>
    </div>
  );
}
