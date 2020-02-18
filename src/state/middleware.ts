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
) => (action: GameAction | BoardPieceAction) => void;

const dispatchNextPiece = (dispatch: React.Dispatch<GameAction>) => (): void =>
  dispatch({ type: GameActionType.nextPiece });

const applyMiddleware: MiddleWare = (state, dispatch) => {
  const nextPiece = dispatchNextPiece(dispatch);
  return (action): void => {
    if (action.type === GameActionType.new) {
      dispatch({ type: PieceActionType.setPiece, piece: state.game.current });
      dispatch({ type: GameActionType.start });
    } else dispatch(action);
  };
};

export default applyMiddleware;
