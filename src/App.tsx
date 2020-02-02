import React from "react";
import "./App.css";
import NextPiece, { StraightPiece } from "./components/NextPiece";

const App = (): React.ReactElement => {
  return (
    <div id="gameArea" className="row">
      <div id="controls" className="col-md-4 d-none d-md-block"></div>
      <div id="gameboard" className="col-md-4 col-8"></div>
      <div id="nextpiece" className="col-md-4 col-4">
        <div className="d-none d-md-block">
          <b>Next Piece</b>
          <br />
        </div>
        <br />
        <NextPiece piece={StraightPiece} />
      </div>
    </div>
  );
};

export default App;
