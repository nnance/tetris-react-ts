import { DrawableAction, BlockState } from "./DrawableGrid";

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

export const drawIBlock = (x: number, y: number): DrawableAction[] => {
  return verticalIBlock(x, y, BlockState.on);
};

export const moveIBlock = (x: number, y: number): DrawableAction[] => {
  const erase = verticalIBlock(x, y, BlockState.off);
  const draw = verticalIBlock(x, y + 1, BlockState.on);
  return erase.concat(draw);
};

export const rotateIBlock = (x: number, y: number): DrawableAction[] => {
  const erase = verticalIBlock(x, y, BlockState.off);
  const draw = horizontalIBlock(x, y, BlockState.on);
  return erase.concat(draw);
};
