import React, { useReducer } from "react";
import { GameAction, BoardPieceAction, Actions } from "./actions";
import { AppState, reducer } from "./app";
import { initialGameState } from "./game";
import { pieceToBoardPiece } from "./piece";

export type Action = GameAction | BoardPieceAction;

export type AppContext = [AppState, React.Dispatch<Action>];

export type Store = [AppState, Actions];

const game = initialGameState();
const initialState: AppState = {
  game,
  piece: pieceToBoardPiece(game.current)
};

export const Store = React.createContext<AppContext>([
  initialState,
  (action: Action) => {}
]);

export const StoreProvider = (
  props: React.PropsWithChildren<{ value?: AppState }>
) => {
  const { children, value } = props;
  const [state, dispatch]: AppContext = useReducer(reducer, value || initialState);
  const context: AppContext = [state, dispatch];

  return <Store.Provider value={context}>{children}</Store.Provider>;
};

export const StoreConsumer = Store.Consumer;