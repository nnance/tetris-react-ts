import { DrawableAction, Piece, BlockDrawer } from "./BlockDrawer";

export enum BlockState {
  off,
  on,
  shaded,
  highlight
}

export type DrawableGrid = BlockState[][];

type Pos = {
  x: number;
  y: number;
};

export type BoardPiece = {
  pos: Pos;
  piece: Piece;
  drawer: BlockDrawer;
  isAtBottom: boolean;
  actions?: DrawableAction[];
};

export const drawBoard = (height: number, width: number) => (
  actions: DrawableAction[]
): DrawableGrid => {
  const grid: DrawableGrid = Array(height)
    .fill(BlockState.off)
    .map(() => Array(width).fill(BlockState.off));

  return actions.reduce((prev, { x, y, state }) => {
    if (x > -1 && y > -1 && y < grid.length && x < grid[y].length) {
      prev[y][x] = state;
    }
    return prev;
  }, grid);
};
