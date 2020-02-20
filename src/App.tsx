import React from "react";
import Header from "./components/Header";
import Controls from "./containers/Controls";
import GameBoard from "./containers/GameBoard";
import NextPiece from "./containers/NextPiece";
import { GameActionType, gameActions } from "./state/actions";
import { StoreProvider, StoreConsumer } from "./state/store";

// TODO: make middleware work for all actions
// TODO: fix background color

const App: React.FC<{}> = () => {
  return (
    <StoreProvider>
      <StoreConsumer>
        {([state, dispatch]) => (
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
              startHandler={(): void =>
                gameActions(state, dispatch).startGame()
              }
              pauseHandler={(): void =>
                dispatch({ type: GameActionType.pause })
              }
              resumeHandler={(): void =>
                dispatch({ type: GameActionType.resume })
              }
              isPaused={state.game.paused}
            />
            <div className="row">
              <Controls
                level={state.game.level}
                lines={state.game.completedLines}
              />
              <GameBoard store={[state, dispatch]} />
              <NextPiece piece={state.game.next} />
            </div>
          </div>
        )}
      </StoreConsumer>
    </StoreProvider>
  );
};

export default App;
