import { drawers as iBlockDrawers } from "./blocks/IBlock";
import { drawers as jBlockDrawers } from "./blocks/JBlock";
import { drawers as zBlockDrawers } from "./blocks/ZBlock";
import { drawers as tBlockDrawers } from "./blocks/TBlock";
import { drawers as sBlockDrawers } from "./blocks/SBlock";
import { drawers as lBlockDrawers } from "./blocks/LBlock";
import { Piece, DrawableAction, drawBlock } from "./BlockDrawer";
import { BlockState, BoardPiece } from "./DrawableGrid";
import { pieceToBoardPiece } from "./piece";
import { GameActions } from "./actions";

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
  boardPiece: BoardPiece;
};

type GameSetter = (
  state: GameState | ((state: GameState) => GameState)
) => void;
type GetGameActions = (state: GameState, setState: GameSetter) => GameActions;

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

const highlightLines = (actions: DrawableAction[]): DrawableAction[] => {
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

const initialGameState = (): GameState => {
  const current = pickNewPiece();
  return {
    paused: true,
    current,
    next: pickNewPiece(),
    level: 1,
    completedLines: 0,
    lines: [],
    boardPiece: pieceToBoardPiece(current)
  };
};

export const gameActions: GetGameActions = (state, setState) => ({
  startGame: (): void => {
    const state = initialGameState();
    setState({
      ...state,
      paused: false,
      boardPiece: {
        pos: { x: 1, y: 0 },
        piece: state.current,
        isAtBottom: false,
        drawer: state.current[0]
      }
    });
  },
  pauseGame: (): void => setState(state => ({ ...state, paused: true })),
  resumeGame: (): void => setState(state => ({ ...state, paused: false })),
  nextPiece: (): void =>
    setState(state => ({
      ...state,
      current: state.next,
      next: pickNewPiece()
    })),
  checkScore: (): void =>
    setState(state => ({
      ...state,
      lines: highlightLines(
        state.lines.concat(
          drawBlock(
            state.boardPiece.pos.x,
            state.boardPiece.pos.y,
            state.boardPiece.drawer
          )
        )
      )
    })),
  end: (): void => setState(state => ({ ...state, paused: true }))
});
