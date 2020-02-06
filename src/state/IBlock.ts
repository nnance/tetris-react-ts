import { BlockState } from "./DrawableGrid";
import { DrawableAction, BlockDrawer, Piece } from "./BlockDrawer";

const verticalIBlock = (
  x: number,
  y: number,
  state: BlockState
): DrawableAction[] => [
  { x, y, state },
  { x, y: y + 1, state },
  { x, y: y + 2, state },
  { x, y: y + 3, state }
];

const horizontalIBlock = (
  x: number,
  y: number,
  state: BlockState
): DrawableAction[] => [
  { x, y, state },
  { x: x + 1, y, state },
  { x: x + 2, y, state },
  { x: x + 3, y, state }
];

export const drawers: Piece = [verticalIBlock, horizontalIBlock];

export const drawIBlock = (x: number, y: number): DrawableAction[] => {
  return verticalIBlock(x, y, BlockState.on);
};

export const moveIBlock = (
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

export const rotateIBlock = (
  x: number,
  y: number,
  eraser: BlockDrawer,
  drawer: BlockDrawer
): DrawableAction[] => {
  const erase = eraser(x, y, BlockState.off);
  const draw = drawer(x, y, BlockState.on);
  return erase.concat(draw);
};
