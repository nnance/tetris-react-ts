import React from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import useGameState, { GameActionType } from "./state/game";
import { useGamePieceState } from "./state/reducers";
import useFPS from "./hooks/useFPS";

const App: React.FC<{}> = () => {
  const [state, dispatch] = useGameState();
  const [block, pieceDispatch] = useGamePieceState(state.current);
  const fps = useFPS();

  return (
    <div id="main" className="App container-fluid">
      <Header
        startHandler={(): void => dispatch({ type: GameActionType.start })}
        pauseHandler={(): void => dispatch({ type: GameActionType.pause })}
        resumeHandler={(): void => dispatch({ type: GameActionType.start })}
        isPaused={state.paused}
      />
      <div id="gameArea" className="row">
        <Controls fps={fps} level={state.level} lines={state.lines} />
        <GameBoard game={state} block={block} dispatch={pieceDispatch} />
        <NextPiece piece={state.next} />
      </div>
    </div>
  );
};

export default App;
