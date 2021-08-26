import React, { ReactElement, useState } from "react";
import "./App.css";

interface Props {}

export default function App({}: Props): ReactElement {
  const [cellsContent, setCellsContent] = useState<string[]>(
    new Array(9).fill("")
  );

  const fillCell = (cellIndex: number, char: string) => {
    const newCellsContent = [...cellsContent];
    newCellsContent[cellIndex] = char;

    setCellsContent(newCellsContent);
  };

  const renderGridItem = (cellIndex: number) => {
    return (
      <div className="grid-item" onClick={() => fillCell(cellIndex, "X")}>
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
