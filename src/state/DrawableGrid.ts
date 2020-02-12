import { DrawableAction, Piece, BlockDrawer } from "./BlockDrawer";

export enum BlockState {
  off = 0,
  on = 1,
  shaded = 2
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

export const updateBoard = (actions: DrawableAction[]): DrawableGrid => {
  const grid = Array(20)
    .fill(0)
    .map(() => Array(10).fill(0));
  return actions.reduce((prev, { x, y, state }) => {
    if (x > -1 && y > -1 && y < grid.length && x < grid[y].length) {
      prev[y][x] = state;
    }
    return prev;
  }, grid);
};
