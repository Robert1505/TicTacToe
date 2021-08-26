import React, { ReactElement, useState } from "react";
import "./App.css";

interface Props {}

export default function App({}: Props): ReactElement {
  const [cellsContent, setCellsContent] = useState<string[]>(
    new Array(9).fill("")
  );
  const [nextChar, setNextChar] = useState("X");

  const fillCell = (cellIndex: number) => {
    const newCellsContent = [...cellsContent];
    newCellsContent[cellIndex] = nextChar;
    // if X is was the previous char, set the next one to O
    // otherwise, set the next to X
    if(nextChar === "X") setNextChar("O")
    else setNextChar("X");

    setCellsContent(newCellsContent);
  };

  const renderGridItem = (cellIndex: number) => {
    return (
      <div className="grid-item" onClick={() => fillCell(cellIndex)}>
        {cellsContent[cellIndex]}
      </div>
    );
  };

  return (
    <div className="grid">
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
  );
}
