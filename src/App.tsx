import React from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import NextPiece from "./containers/NextPiece";

const App: React.FC<{}> = () => {
  return (
    <div id="main" className="App">
      <Header />
      <div id="gameArea" className="row">
        <Controls />
        <GameBoard />
        <div id="nextpiece" className="col-md-4 col-4">
          <div className="d-none d-md-block">
            <b>Next Piece</b>
            <br />
          </div>
          <br />
          <NextPiece />
        </div>
      </div>
    </div>
  );
};

export default App;
