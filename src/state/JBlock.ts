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
