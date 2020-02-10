import React, { Dispatch } from "react";
import { drawers as iBlockDrawers } from "./IBlock";
import { drawers as jBlockDrawers } from "./JBlock";
import { drawers as zBlockDrawers } from "./ZBlock";
import { drawers as tBlockDrawers } from "./TBlock";
import { drawers as sBlockDrawers } from "./SBlock";
import { drawers as lBlockDrawers } from "./LBlock";
import { Piece } from "./BlockDrawer";

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

export type GameAction = { type: GameActionType };

const reducer = (state: GameState, action: GameAction): GameState => {
  return action.type === GameActionType.pause
    ? { ...state, paused: true }
    : action.type === GameActionType.start
    ? { ...state, paused: false }
    : action.type === GameActionType.nextPiece
    ? { ...state, current: state.next, next: pickNewPiece() }
    : { ...state };
};

const useGameState = (): [GameState, Dispatch<GameAction>] => {
  return React.useReducer(reducer, {
    paused: true,
    current: pickNewPiece(),
    next: pickNewPiece(),
    level: 1,
    lines: 0
  });
};

export default useGameState;
