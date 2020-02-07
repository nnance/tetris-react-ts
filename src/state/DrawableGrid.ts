import { cloneDeep } from "lodash";
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
  actions?: DrawableAction[];
};

export const updateBoard = (
  actions: DrawableAction[],
  grid: DrawableGrid
): DrawableGrid => {
  return actions.reduce((prev, { x, y, state }) => {
    if (x > -1 && y > -1 && y < grid.length && x < grid[y].length) {
      prev[y][x] = state;
    }
    return prev;
  }, cloneDeep(grid));
};
