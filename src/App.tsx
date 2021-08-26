import React, { ReactElement } from "react";
import './App.css';

interface Props {}

export default function App({}: Props): ReactElement {
  return (
    <div className = "grid">
      <div className = "grid-3">
        <div className = "grid-item"></div>
        <div className = "grid-item"></div>
        <div className = "grid-item"></div>
      </div>
      <div className = "grid-3">
        <div className = "grid-item"></div>
        <div className = "grid-item"></div>
        <div className = "grid-item"></div>
      </div>
      <div className = "grid-3">
        <div className = "grid-item"></div>
        <div className = "grid-item"></div>
        <div className = "grid-item"></div>
      </div>
    </div>
  );
}
