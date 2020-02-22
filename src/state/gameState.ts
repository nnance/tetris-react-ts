import { drawers as iBlockDrawers } from "./blocks/IBlock";
import { drawers as jBlockDrawers } from "./blocks/JBlock";
import { drawers as zBlockDrawers } from "./blocks/ZBlock";
import { drawers as tBlockDrawers } from "./blocks/TBlock";
import { drawers as sBlockDrawers } from "./blocks/SBlock";
import { drawers as lBlockDrawers } from "./blocks/LBlock";
import { Piece, DrawableAction } from "./BlockDrawer";
import { BlockState, BoardPiece } from "./DrawableGrid";
import { GameStore } from "./store";
import { GameState } from "./game";

const pieces: Piece[] = [
  jBlockDrawers,
  iBlockDrawers,
  zBlockDrawers,
  tBlockDrawers,
  sBlockDrawers,
  lBlockDrawers
];

type GameActions = {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  nextPiece: () => void;
  checkScore: (actions: DrawableAction[]) => void;
  end: () => void;
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

const initialGameState = (): GameState => ({
  paused: true,
  current: pickNewPiece(),
  next: pickNewPiece(),
  level: 1,
  completedLines: 0,
  lines: []
});

export const gameActions = ([state, setState]: GameStore): GameActions => ({
  startGame: (): void => {
    // dispatch({ type: PieceActionType.setPiece, piece: state.game.current });
    setState({
      ...initialGameState(),
      paused: false
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
  checkScore: (actions): void =>
    setState(state => ({
      ...state,
      lines: highlightLines(state.lines.concat(actions))
    })),
  end: (): void => setState(state => ({ ...state, paused: true }))
});
