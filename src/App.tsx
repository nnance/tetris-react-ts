import React from "react";
import Header from "./components/Header";
import Controls from "./containers/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import useGameState, { GameActionType } from "./state/game";
import { useGamePieceState, PieceAction } from "./state/reducers";
import { DrawableGrid } from "./state/DrawableGrid";
import { drawBlock } from "./state/BlockDrawer";

// TODO: fix background color

const emptyBoard: DrawableGrid = Array(20)
  .fill(0)
  .map(() => Array(10).fill(0));

const App: React.FC<{}> = () => {
  const [state, dispatch] = useGameState();
  const [board, setBoard] = React.useState(emptyBoard);
  const [block, pieceDispatch] = useGamePieceState(state);

  React.useEffect(() => {
    if (block.isAtBottom) {
      dispatch({
        type: GameActionType.checkScore,
        actions: drawBlock(block.pos.x, block.pos.y, block.drawer)
      });
      dispatch({ type: GameActionType.nextPiece });
    }
  }, [block, dispatch]);

  const startGame = (): void => {
    setBoard(emptyBoard);
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
        <Controls level={state.level} lines={state.completedLines} />
        <GameBoard
          game={state}
          boardState={[board, setBoard]}
          blockState={[block, pieceDispatch]}
        />
        <NextPiece piece={state.next} />
      </div>
    </div>
  );
};

export default App;
