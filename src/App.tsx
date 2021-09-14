import React, { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { checkColumn, checkDiagonals, checkDraw, checkRow } from "./Helpers";

interface Props {}

export enum GameState {
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

  const [score, setScore] = useState({
    x: 0,
    o: 0,
  });

  const fillCell = (cellIndex: number) => {
    if (gameState !== GameState.IN_PROGRESS) return;
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

  const modifyScore = () => {
    if (nextChar === "X") setScore({ ...score, x: score.x + 1 });
    if (nextChar === "O") setScore({ ...score, o: score.o + 1 });
  };

  const checkGameState = () => {
    if (
      checkRow(cellsContent, 0) ||
      checkRow(cellsContent, 1) ||
      checkRow(cellsContent, 2)
    ) {
      setGameState(GameState.WON);
      modifyScore();
      return;
    }
    if (checkColumn(cellsContent, 0) || checkColumn(cellsContent, 1) || checkColumn(cellsContent, 2)) {
      setGameState(GameState.WON);
      modifyScore();
      return;
    }
    if (checkDiagonals(cellsContent)) {
      setGameState(GameState.WON);
      modifyScore();
      return;
    }
    if (checkDraw(cellsContent, gameState)) {
      setGameState(GameState.DRAW);
      return;
    }

    if (gameState === GameState.IN_PROGRESS)
      if (nextChar === "X") setNextChar("O");
      else setNextChar("X");
  };

  const restartGame = () => {
    setCellsContent(new Array(9).fill(""));
    setGameState(GameState.IN_PROGRESS);
  };

  const renderRestartButton = () => {
    if (gameState !== GameState.IN_PROGRESS)
      return (
        <>
          <button className = "restartButton" onClick={restartGame}>Restart</button>
        </>
      );
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
        <div className = "score">
          <span className = "scorex">X: {score.x}</span>
          <span>O: {score.o}</span>
        </div>
        <div className="text">{renderText()}</div>
        <div>{renderRestartButton()}</div>
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
