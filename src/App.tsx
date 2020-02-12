import React from "react";
import Header from "./components/Header";
import Controls from "./containers/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import useGameState, { GameActionType } from "./state/game";
import { useGamePieceState, PieceAction } from "./state/reducers";
import { BlockState } from "./state/DrawableGrid";

// TODO: fix background color
// TODO: major bug with leaving artifacts on the board

const App: React.FC<{}> = () => {
  const [state, dispatch] = useGameState();
  const [block, pieceDispatch] = useGamePieceState(state);

  React.useEffect(() => {
    if (block.isAtBottom) {
      dispatch({
        type: GameActionType.nextPiece,
        block: block.drawer(block.pos.x, block.pos.y, BlockState.on)
      });
    }
  }, [block, dispatch]);

  const startGame = (): void => {
    pieceDispatch({ type: PieceAction.setPiece, piece: state.current });
    dispatch({ type: GameActionType.start });
  };

  return (
    <div
      id="main"
      className="container-fluid"
      style={{
        textAlign: "center",
        height: "100%",
        backgroundColor: "rgb(231, 245, 255)"
      }}
    >
      <Header
        startHandler={startGame}
        pauseHandler={(): void => dispatch({ type: GameActionType.pause })}
        resumeHandler={(): void => dispatch({ type: GameActionType.start })}
        isPaused={state.paused}
      />
      <div className="row">
        <Controls
          level={state.level}
          lines={state.lines}
          pieces={state.pieces.length}
        />
        <GameBoard game={state} blockState={[block, pieceDispatch]} />
        <NextPiece piece={state.next} />
      </div>
    </div>
  );
};

export default App;
