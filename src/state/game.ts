import React, { Dispatch } from "react";
import { drawers as iBlockDrawers } from "./IBlock";
import { drawers as jBlockDrawers } from "./JBlock";
import { Piece } from "./BlockDrawer";

const pieces: Piece[] = [jBlockDrawers, iBlockDrawers];

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
  end
}

export type GameAction = { type: GameActionType };

const reducer = (state: GameState, action: GameAction): GameState => {
  return action.type === GameActionType.pause
    ? { ...state, paused: true }
    : action.type === GameActionType.start
    ? { ...state, paused: false }
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
