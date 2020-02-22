import React, { useReducer } from "react";
import { GameAction, BoardPieceAction, Actions, actions } from "./actions";
import { AppState, reducer } from "./app";
import { initialGameState, GameState } from "./game";
import { pieceToBoardPiece } from "./piece";
import { applyMiddleware } from "./middleware";

export type Action = GameAction | BoardPieceAction;

export type AppContext = [AppState, React.Dispatch<Action>];

export type Store = [AppState, Actions];
export type GameStore = [
  GameState,
  React.Dispatch<React.SetStateAction<GameState>>
];

const game = initialGameState();
const initialState: AppState = {
  game,
  piece: pieceToBoardPiece(game.current)
};

export const Store = React.createContext<Store>([initialState, {} as Actions]);

export const StoreProvider = (
  props: React.PropsWithChildren<{ value?: AppState }>
): React.ReactElement => {
  const { children, value } = props;
  const [state, dispatch]: AppContext = useReducer(
    reducer,
    value || initialState
  );
  const store: Store = [state, actions([state, applyMiddleware(dispatch)])];

  return <Store.Provider value={store}>{children}</Store.Provider>;
};

export const StoreConsumer = Store.Consumer;
