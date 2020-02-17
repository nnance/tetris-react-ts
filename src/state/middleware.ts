import React from "react";
import { GameState } from "./game";
import {
  GameAction,
  GameActionType,
  PieceActionType,
  BoardPieceAction
} from "./actions";

type MiddleWare = (
  state: GameState,
  dispatch: React.Dispatch<GameAction>,
  pieceDispatch: React.Dispatch<BoardPieceAction>
) => (action: GameAction) => void;

const dispatchNextPiece = (dispatch: React.Dispatch<GameAction>) => (): void =>
  dispatch({ type: GameActionType.nextPiece });

const applyMiddleware: MiddleWare = (state, dispatch, pieceDispatch) => {
  const nextPiece = dispatchNextPiece(dispatch);
  return (action: GameAction): void => {
    if (action.type === GameActionType.new) {
      pieceDispatch({ type: PieceActionType.setPiece, piece: state.current });
      dispatch({ type: GameActionType.start });
    } else dispatch(action);
  };
};

export default applyMiddleware;
