import {
  drawBlock,
  moveBlock,
  rotateBlock,
  BlockDrawer,
  Piece
} from "./BlockDrawer";
import { BoardPiece, DrawableGrid } from "./DrawableGrid";
import { drawers as iBlockDrawers } from "../state/IBlock";
import { drawers as jBlockDrawers } from "../state/JBlock";

const pieces: Piece[] = [jBlockDrawers, iBlockDrawers];

export enum PieceAction {
  start,
  moveRight,
  moveLeft,
  moveDown,
  rotate
}

export const pickNewPiece = (): BoardPiece => {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  const pos = { x: 1, y: 0 };
  const piece = pieces[pieceIndex];
  return {
    pos,
    piece,
    drawer: piece[0]
  };
};

const atBottom = (piece: BoardPiece, board: DrawableGrid): boolean =>
  piece.pos.y > board.length - 1;

const getNewDrawer = (state: BoardPiece): BlockDrawer => {
  const idx = state.piece.findIndex(drawer => drawer === state.drawer);
  return state.piece[idx === state.piece.length - 1 ? 0 : idx + 1];
};

export const pieceReducer = (
  state: BoardPiece,
  action: { type: PieceAction; board?: DrawableGrid }
): BoardPiece => {
  const isAtBottom = action.board && atBottom(state, action.board);
  const newPiece = isAtBottom && pickNewPiece();
  const newDrawer = action.type === PieceAction.rotate && getNewDrawer(state);

  const {
    pos: { x, y },
    drawer
  } = state;

  return action.type === (PieceAction.start || PieceAction.moveDown) && newPiece
    ? {
        ...newPiece,
        actions: drawBlock(newPiece.pos.x, newPiece.pos.y, newPiece.drawer)
      }
    : action.type === PieceAction.moveRight
    ? {
        ...state,
        pos: { ...state.pos, x: x + 1 },
        actions: moveBlock(x, y, x + 1, y, drawer)
      }
    : action.type === PieceAction.moveLeft
    ? {
        ...state,
        pos: { ...state.pos, x: x > 0 ? x - 1 : x },
        actions: x > 0 ? moveBlock(x, y, x - 1, y, drawer) : state.actions
      }
    : action.type === PieceAction.moveDown
    ? {
        ...state,
        pos: { ...state.pos, y: isAtBottom ? y : y + 1 },
        actions: isAtBottom ? state.actions : moveBlock(x, y, x, y + 1, drawer)
      }
    : action.type === PieceAction.rotate && newDrawer
    ? {
        ...state,
        drawer: newDrawer,
        actions: rotateBlock(x, y, drawer, newDrawer)
      }
    : { ...state };
};
