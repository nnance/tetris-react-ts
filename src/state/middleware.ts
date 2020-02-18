import React from "react";
import {
  GameAction,
  GameActionType,
  PieceActionType,
  BoardPieceAction
} from "./actions";
import { AppState } from "./app";

type MiddleWare = (
  state: AppState,
  dispatch: React.Dispatch<GameAction | BoardPieceAction>
) => React.Dispatch<GameAction | BoardPieceAction>;

const applyMiddleware: MiddleWare = (state, dispatch) => (action): void => {
  if (action.type === GameActionType.new) {
    dispatch({ type: PieceActionType.setPiece, piece: state.game.current });
    dispatch({ type: GameActionType.start });
  } else dispatch(action);
};

export default applyMiddleware;
