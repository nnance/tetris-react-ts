import { DrawableAction, BlockState } from "./DrawableGrid";

type BlockDrawer = (
  x: number,
  y: number,
  state: BlockState
) => DrawableAction[];

export const verticalIBlock = (
  x: number,
  y: number,
  state: BlockState
): DrawableAction[] => [
  { x, y, state },
  { x, y: y + 1, state },
  { x, y: y + 2, state },
  { x, y: y + 3, state }
];

export const horizontalIBlock = (
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

export const rotateIBlock = (x: number, y: number): DrawableAction[] => {
  const erase = verticalIBlock(x, y, BlockState.off);
  const draw = horizontalIBlock(x, y, BlockState.on);
  return erase.concat(draw);
};
