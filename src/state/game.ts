import React, { Dispatch } from "react";
import { drawers as iBlockDrawers } from "./IBlock";
import { drawers as jBlockDrawers } from "./JBlock";
import { drawers as zBlockDrawers } from "./ZBlock";
import { drawers as tBlockDrawers } from "./TBlock";
import { drawers as sBlockDrawers } from "./SBlock";
import { drawers as lBlockDrawers } from "./LBlock";
import { Piece, DrawableAction } from "./BlockDrawer";

const pieces: Piece[] = [
  jBlockDrawers,
  iBlockDrawers,
  zBlockDrawers,
  tBlockDrawers,
  sBlockDrawers,
  lBlockDrawers
];

export type GameState = {
  paused: boolean;
  current: Piece;
  next: Piece;
  level: number;
  lines: number;
  pieces: DrawableAction[];
};

const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  return pieces[pieceIndex];
};

export enum GameActionType {
  start,
  pause,
  nextPiece,
  end
}

// TODO: Fix action types such that nextPiece requires a block
type NextPieceAction = {
  type: GameActionType.nextPiece;
  block: DrawableAction[];
};

export type GameAction = { type: GameActionType } | NextPieceAction;

const reducer = (state: GameState, action: GameAction): GameState => {
  return action.type === GameActionType.pause
    ? { ...state, paused: true }
    : action.type === GameActionType.start
    ? { ...state, paused: false }
    : action.type === GameActionType.nextPiece
    ? {
        ...state,
        current: state.next,
        next: pickNewPiece(),
        pieces: state.pieces.concat((action as NextPieceAction).block)
      }
    : { ...state };
};

const useGameState = (): [GameState, Dispatch<GameAction>] => {
  return React.useReducer(reducer, {
    paused: true,
    current: pickNewPiece(),
    next: pickNewPiece(),
    pieces: [],
    level: 1,
    lines: 0
  });
};

export default useGameState;
