import React from "react";
import { GameAction, GameActionType, GameState } from "./game";
import { PieceAction, BoardPieceAction } from "./reducers";

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
      pieceDispatch({ type: PieceAction.setPiece, piece: state.current });
      dispatch({ type: GameActionType.start });
    } else dispatch(action);
  };
};

export default applyMiddleware;
