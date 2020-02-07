import { BlockState } from "./DrawableGrid";
import { DrawableAction, Piece } from "./BlockDrawer";

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
