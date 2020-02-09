import React, { Dispatch } from "react";
import { drawers as iBlockDrawers } from "./IBlock";
import { drawers as jBlockDrawers } from "./JBlock";
import { Piece } from "./BlockDrawer";

const pieces: Piece[] = [jBlockDrawers, iBlockDrawers];

export type GameState = {
  paused: boolean;
  current: Piece;
  next: Piece;
  fps: number;
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
  end,
  setFPS
}

type SetFPSAction = {
  type: GameActionType.setFPS;
  fps: number;
};

export type GameAction = SetFPSAction | { type: GameActionType };

function isSetFPSAction(action: GameAction): action is SetFPSAction {
  return (action as SetFPSAction).type === GameActionType.setFPS;
}

const reducer = (state: GameState, action: GameAction): GameState => {
  return action.type === GameActionType.pause
    ? { ...state, paused: true }
    : action.type === GameActionType.start
    ? { ...state, paused: false }
    : isSetFPSAction(action)
    ? { ...state, fps: action.fps }
    : { ...state };
};

const useGameState = (): [GameState, Dispatch<GameAction>] => {
  return React.useReducer(reducer, {
    paused: true,
    current: pickNewPiece(),
    next: pickNewPiece(),
    fps: 60,
    level: 1,
    lines: 0
  });
};

export default useGameState;
