import { BlockState } from "./DrawableGrid";
import { DrawableAction, Piece } from "./BlockDrawer";

const verticalJBlock = (
  x: number,
  y: number,
  state: BlockState
): DrawableAction[] => [
  { x, y, state },
  { x: x + 1, y, state },
  { x, y: y + 1, state },
  { x, y: y + 2, state }
];

const horizontalJBlock = (
  x: number,
  y: number,
  state: BlockState
): DrawableAction[] => [
  { x, y, state },
  { x, y: y + 1, state },
  { x: x + 1, y: y + 1, state },
  { x: x + 2, y: y + 1, state }
];

export const drawers: Piece = [verticalJBlock, horizontalJBlock];

export const drawJBlock = (x: number, y: number): DrawableAction[] => {
  return horizontalJBlock(x, y, BlockState.on);
};

export const moveJBlock = (x: number, y: number): DrawableAction[] => {
  const erase = horizontalJBlock(x, y, BlockState.off);
  const draw = horizontalJBlock(x, y + 1, BlockState.on);
  return erase.concat(draw);
};

export const rotateJBlock = (x: number, y: number): DrawableAction[] => {
  const erase = horizontalJBlock(x, y, BlockState.off);
  const draw = verticalJBlock(x, y, BlockState.on);
  return erase.concat(draw);
};
