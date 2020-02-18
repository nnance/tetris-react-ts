import React from "react";
import Header from "./components/Header";
import Controls from "./containers/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import { initialGameState } from "./state/game";
import { GameActionType } from "./state/actions";
import { pieceToBoardPiece } from "./state/reducers";
import { drawBlock } from "./state/BlockDrawer";
import applyMiddleware from "./state/middleware";
import { reducer } from "./state/app";

// TODO: make middleware work for all actions
// TODO: use app context to avoid passing reducer
// TODO: fix background color

const App: React.FC<{}> = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    game: initialGameState,
    piece: pieceToBoardPiece(initialGameState.current)
  });

  const middleware = applyMiddleware(state, dispatch);

  React.useEffect(() => {
    const { piece } = state;
    if (piece.isAtBottom) {
      dispatch({
        type: GameActionType.checkScore,
        actions: drawBlock(piece.pos.x, piece.pos.y, piece.drawer)
      });
      dispatch({ type: GameActionType.nextPiece });
    }
  }, [state, dispatch]);

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
        startHandler={(): void => middleware({ type: GameActionType.new })}
        pauseHandler={(): void => dispatch({ type: GameActionType.pause })}
        resumeHandler={(): void => dispatch({ type: GameActionType.start })}
        isPaused={state.game.paused}
      />
      <div className="row">
        <Controls level={state.game.level} lines={state.game.completedLines} />
        <GameBoard game={state.game} blockState={[state.piece, dispatch]} />
        <NextPiece piece={state.game.next} />
      </div>
    </div>
  );
};

export default App;
