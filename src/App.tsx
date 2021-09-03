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
  const [nextChar, setNextChar] = useState("X");
  const [gameState, setGameState] = useState(GameState.IN_PROGRESS);

  const fillCell = (cellIndex: number) => {
    if (cellsContent[cellIndex] !== "") return;

    const newCellsContent = [...cellsContent];
    newCellsContent[cellIndex] = nextChar;
    if (nextChar === "X") setNextChar("O");
    else setNextChar("X");
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

  const checkGameState = () => {
    if (
      cellsContent[0] === cellsContent[1] &&
      cellsContent[1] === cellsContent[2] &&
      cellsContent[0] !== ""
    ) {
      setGameState(GameState.WON);
    }
  };

  const renderText = () => {
    if (GameState.IN_PROGRESS === gameState)
      return (
        <>
          Player <span className="character">{nextChar}</span>'s turn!
        </>
      );
    if(GameState.WON === gameState)
      return(
        <>
          Game Won!
        </>
      )
  };

  return (
    <div className="background">
      <div className="grid">
        <div className="text">
          {renderText()}
        </div>
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
