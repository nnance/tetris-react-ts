import React from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import useBoardState, { BoardAction } from "./state/board";
import { useGamePieceState } from "./state/reducers";

const App: React.FC<{}> = () => {
  const [state, dispatch] = useBoardState();
  const [block, pieceDispatch] = useGamePieceState(state.current);

  return (
    <div id="main" className="App">
      <Header
        startHandler={(): void => dispatch(BoardAction.start)}
        pauseHandler={(): void => dispatch(BoardAction.pause)}
        resumeHandler={(): void => dispatch(BoardAction.start)}
        isPaused={state.paused}
      />
      <div id="gameArea" className="row">
        <Controls />
        <GameBoard game={state} block={block} dispatch={pieceDispatch} />
        <div id="nextpiece" className="col-md-4 col-4">
          <div className="d-none d-md-block">
            <b>Next Piece</b>
            <br />
          </div>
          <br />
          <NextPiece piece={state.next} />
        </div>
      </div>
    </div>
  );
};

export default App;
