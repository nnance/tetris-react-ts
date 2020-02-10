import React from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import useGameState, { GameActionType } from "./state/game";
import { useGamePieceState, PieceAction } from "./state/reducers";
import useFPS from "./hooks/useFPS";
import { DrawableGrid } from "./state/DrawableGrid";

// TODO: fix background color
// TODO: separate controls from status
// TODO: make status into a table
// TODO: investigate CSS modules vs JS Styling
// TODO: make common CSS module for block colors etc
// TODO: major bug with leaving artifacts on the board

const emptyBoard: DrawableGrid = Array(20)
  .fill(0)
  .map(() => Array(10).fill(0));

const App: React.FC<{}> = () => {
  const [state, dispatch] = useGameState();
  const [board, setBoard] = React.useState(emptyBoard);
  const [block, pieceDispatch] = useGamePieceState(state);
  const fps = useFPS();

  React.useEffect(() => {
    if (block.isAtBottom) {
      dispatch({ type: GameActionType.nextPiece });
    }
  }, [block, dispatch]);

  const startGame = (): void => {
    setBoard(emptyBoard);
    pieceDispatch({ type: PieceAction.setPiece, piece: state.current });
    dispatch({ type: GameActionType.start });
  };

  return (
    <div id="main" className="App container-fluid">
      <Header
        startHandler={startGame}
        pauseHandler={(): void => dispatch({ type: GameActionType.pause })}
        resumeHandler={(): void => dispatch({ type: GameActionType.start })}
        isPaused={state.paused}
      />
      <div id="gameArea" className="row">
        <Controls fps={fps} level={state.level} lines={state.lines} />
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
