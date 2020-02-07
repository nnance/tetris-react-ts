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

export const moveBlock = (
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  drawer: BlockDrawer
): DrawableAction[] => {
  const erase = drawer(prevX, prevY, BlockState.off);
  const draw = drawer(x, y, BlockState.on);
  return erase.concat(draw);
};

export const rotateBlock = (
  x: number,
  y: number,
  eraser: BlockDrawer,
  drawer: BlockDrawer
): DrawableAction[] => {
  const erase = eraser(x, y, BlockState.off);
  const draw = drawer(x, y, BlockState.on);
  return erase.concat(draw);
};
