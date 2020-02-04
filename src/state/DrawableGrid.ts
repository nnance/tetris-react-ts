import { cloneDeep } from "lodash";

export enum BlockState {
  off = 0,
  on = 1,
  shaded = 2
}

export type DrawableAction = {
  x: number;
  y: number;
  state: BlockState;
};

export type DrawableGrid = BlockState[][];

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
