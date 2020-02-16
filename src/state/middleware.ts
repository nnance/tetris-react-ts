import React from "react";
import { GameAction, GameActionType } from "./game";

type GameMiddleWare = (action: GameAction) => void;

const dispatchNextPiece = (dispatch: React.Dispatch<GameAction>) => (): void =>
  dispatch({ type: GameActionType.nextPiece });

const applyMiddleware = (
  dispatch: React.Dispatch<GameAction>
): GameMiddleWare => {
  const nextPiece = dispatchNextPiece(dispatch);
  return (action: GameAction): void => {
    dispatch(action);
  };
};

export default applyMiddleware;
