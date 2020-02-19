import React, { useReducer } from "react";
import { GameAction, BoardPieceAction } from "./actions";
import { AppState, reducer } from "./app";
import { initialGameState } from "./game";
import { pieceToBoardPiece } from "./reducers";

export type Action = GameAction | BoardPieceAction;

export type AppContext = [AppState, React.Dispatch<Action>];

const initialState: AppState = {
  game: initialGameState,
  piece: pieceToBoardPiece(initialGameState.current)
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