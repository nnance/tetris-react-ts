import { cloneDeep } from "lodash";

type GameRow = [number, number, number, number, number];
export type GamePiece = [GameRow, GameRow, GameRow, GameRow, GameRow];

// TODO: create drawers for all pieces and delete this file

export const Block: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

export const IBlock: GamePiece = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]
];

export const JBlock: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

export const ZBlock: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

export const TBlock: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

export const SBlock: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

export const LBlock: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

export const OBlock: GamePiece = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

export const AllBlocks = [
  IBlock,
  JBlock,
  ZBlock,
  TBlock,
  SBlock,
  LBlock,
  OBlock
];

export const rotateRight = (piece: GamePiece): GamePiece => {
  const gridSize = piece.length;
  return piece.reduce((prev, row, rowIdx) => {
    row.forEach((col, idx) => {
      if (idx < gridSize) prev[idx][gridSize - 1 - rowIdx] = col;
    });
    return prev;
  }, cloneDeep(Block));
};
