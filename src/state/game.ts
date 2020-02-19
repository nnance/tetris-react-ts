import { drawers as iBlockDrawers } from "./IBlock";
import { drawers as jBlockDrawers } from "./JBlock";
import { drawers as zBlockDrawers } from "./ZBlock";
import { drawers as tBlockDrawers } from "./TBlock";
import { drawers as sBlockDrawers } from "./SBlock";
import { drawers as lBlockDrawers } from "./LBlock";
import { Piece, DrawableAction } from "./BlockDrawer";
import { BlockState, BoardPiece } from "./DrawableGrid";
import { GameAction, GameActionType, CheckScoreAction } from "./actions";

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

//TODO: assumes a board hight
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

export const reducer = (state: GameState, action: GameAction): GameState => {
  return action.type === GameActionType.pause
    ? { ...state, paused: true }
    : action.type === GameActionType.start
    ? { ...state, paused: false }
    : action.type === GameActionType.checkScore
    ? {
        ...state,
        lines: highlightLines(
          state.lines.concat((action as CheckScoreAction).actions)
        )
      }
    : action.type === GameActionType.nextPiece
    ? {
        ...state,
        current: state.next,
        next: pickNewPiece()
      }
    : { ...state };
};

export const initialGameState = {
  paused: true,
  current: pickNewPiece(),
  next: pickNewPiece(),
  level: 1,
  completedLines: 0,
  lines: []
};
