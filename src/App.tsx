import React from "react";
import "./App.css";
import NextPiece from "./components/NextPiece";
import { IBlock, GamePiece, rotateRight, AllBlocks } from "./state/GamePiece";
import Header from "./components/Header";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";

type NextPieceProps = {
  piece: GamePiece;
};

const NextPieceContainer: React.FC<NextPieceProps> = props => {
  const [state, setState] = React.useState(props.piece);
  const [blockIdx, setBlockIdx] = React.useState(0);

  const keyHandler = React.useCallback(
    (ev: KeyboardEvent): void => {
      if (ev.keyCode === 38) setState(rotateRight(state));
      if (ev.keyCode === 39) {
        blockIdx < AllBlocks.length - 1
          ? setBlockIdx(blockIdx + 1)
          : setBlockIdx(0);
      }
    },
    [state, blockIdx]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return (): void => {
      window.removeEventListener("keydown", keyHandler);
    };
  });

  React.useEffect(() => setState(AllBlocks[blockIdx]), [blockIdx]);

  return <NextPiece piece={state} />;
};

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
          <NextPieceContainer piece={IBlock} />
        </div>
      </div>
    </div>
  );
};

export default App;
