import React, { Dispatch } from "react";
import { drawers as iBlockDrawers } from "../state/IBlock";
import { drawers as jBlockDrawers } from "../state/JBlock";
import { Piece } from "./BlockDrawer";

const pieces: Piece[] = [jBlockDrawers, iBlockDrawers];

export type BoardState = {
  paused: boolean;
  current: Piece;
  next: Piece;
};

const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  return pieces[pieceIndex];
};

export enum BoardAction {
  start,
  pause,
  end
}

const reducer = (state: BoardState, action: BoardAction): BoardState => {
  return action === BoardAction.pause
    ? { ...state, paused: true }
    : action === BoardAction.start
    ? { ...state, paused: false }
    : { ...state };
};

const useBoardState = (): [BoardState, Dispatch<BoardAction>] => {
  return React.useReducer(reducer, {
    paused: true,
    current: pickNewPiece(),
    next: pickNewPiece()
  });
};

export default useBoardState;
