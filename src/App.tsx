import React from "react";
import Header from "./components/Header";
import Controls from "./containers/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import useGameState, { GameActionType } from "./state/game";
import { useGamePieceState } from "./state/reducers";
import { drawBlock } from "./state/BlockDrawer";
import applyMiddleware from "./state/middleware";

// TODO: fix background color

const App: React.FC<{}> = () => {
  const [state, gameDispatch] = useGameState();
  const [block, pieceDispatch] = useGamePieceState(state);
  const dispatch = applyMiddleware(state, gameDispatch, pieceDispatch);

  React.useEffect(() => {
    if (block.isAtBottom) {
      dispatch({
        type: GameActionType.checkScore,
        actions: drawBlock(block.pos.x, block.pos.y, block.drawer)
      });
      dispatch({ type: GameActionType.nextPiece });
    }
  }, [block, dispatch]);

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
        startHandler={(): void => dispatch({ type: GameActionType.new })}
        pauseHandler={(): void => dispatch({ type: GameActionType.pause })}
        resumeHandler={(): void => dispatch({ type: GameActionType.start })}
        isPaused={state.paused}
      />
      <div className="row">
        <Controls level={state.level} lines={state.completedLines} />
        <GameBoard game={state} blockState={[block, pieceDispatch]} />
        <NextPiece piece={state.next} />
      </div>
    </div>
  );
};

export default App;
