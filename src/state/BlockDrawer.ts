import { BlockState } from "./DrawableGrid";

export type DrawableAction = {
  x: number;
  y: number;
  state: BlockState;
};

export type BlockDrawer = (
  x: number,
  y: number,
  state: BlockState
) => DrawableAction[];

export type Piece = BlockDrawer[];

export const drawBlock = (
  x: number,
  y: number,
  drawer: BlockDrawer
): DrawableAction[] => {
  return drawer(x, y, BlockState.on);
};
