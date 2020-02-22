import React from "react";
import { drawers as iBlockDrawers } from "./blocks/IBlock";
import { drawers as jBlockDrawers } from "./blocks/JBlock";
import { drawers as zBlockDrawers } from "./blocks/ZBlock";
import { drawers as tBlockDrawers } from "./blocks/TBlock";
import { drawers as sBlockDrawers } from "./blocks/SBlock";
import { drawers as lBlockDrawers } from "./blocks/LBlock";
import { Piece, DrawableAction } from "./BlockDrawer";
import { BlockState, BoardPiece } from "./DrawableGrid";
import { GameAction, GameActionType, CheckScoreAction } from "./actions";
import { Store } from "./store";

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
  completedLines: number;
  lines: DrawableAction[];
  boardPiece?: BoardPiece;
};

const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  return pieces[pieceIndex];
};

//TODO: assumes a board height
const findFullRows = (actions: DrawableAction[]): number[] =>
  actions
    .reduce((prev, cur) => {
      prev[cur.y] += 1;
      return prev;
    }, Array(20).fill(0))
    .reduce(
      (prev, row, index) => (row === 10 ? prev.concat([index]) : prev),
      [] as number[]
    );

export const highlightLines = (actions: DrawableAction[]): DrawableAction[] => {
  const rowCounts = findFullRows(actions);
  return actions.reduce((prev, action) => {
    const newAction = rowCounts.reduce(
      (prev, row) =>
        prev.y === row ? { ...prev, state: BlockState.highlight } : prev,
      { ...action }
    );
    return prev.concat(newAction);
  }, [] as DrawableAction[]);
};

export const initialGameState = (): GameState => ({
  paused: true,
  current: pickNewPiece(),
  next: pickNewPiece(),
  level: 1,
  completedLines: 0,
  lines: []
});

export const reducer = (state: GameState, action: GameAction): GameState => {
  return action.type === GameActionType.pause
    ? { ...state, paused: true }
    : action.type === GameActionType.resume
    ? { ...state, paused: false }
    : action.type === GameActionType.checkScore
    ? {
        ...state,
        lines: highlightLines(
          state.lines.concat((action as CheckScoreAction).actions)
        )
      }
    : action.type === GameActionType.start
    ? {
        ...initialGameState(),
        paused: false
      }
    : action.type === GameActionType.nextPiece
    ? {
        ...state,
        current: state.next,
        next: pickNewPiece()
      }
    : { ...state };
};

export const useGameState = ([
  store,
  { checkScore, nextPiece, setPiece }
]: Store): void => {
  React.useEffect(() => {
    const { piece, game } = store;
    if (piece.isAtBottom) {
      setPiece(game.next);
      checkScore();
      nextPiece();
    }
  }, [store, checkScore, nextPiece, setPiece]);
};
