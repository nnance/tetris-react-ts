import {
  drawBlock,
  moveBlock,
  rotateBlock,
  BlockDrawer,
  Piece
} from "./BlockDrawer";
import { BoardPiece, DrawableGrid } from "./DrawableGrid";

// TODO: implement edge detection for right and left movement

export enum PieceAction {
  start,
  moveRight,
  moveLeft,
  moveDown,
  rotate
}

export const pickNewPiece = (pieces: Piece[]): BoardPiece => {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  const pos = { x: 1, y: 0 };
  const piece = pieces[pieceIndex];
  return {
    pos,
    piece,
    drawer: piece[0]
  };
};

const atBottom = (piece: BoardPiece, board: DrawableGrid): boolean => {
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return actions.find(action => action.y >= board.length - 1) !== undefined;
}

const getNewDrawer = (state: BoardPiece): BlockDrawer => {
  const idx = state.piece.findIndex(drawer => drawer === state.drawer);
  return state.piece[idx === state.piece.length - 1 ? 0 : idx + 1];
};

export const pieceReducer = (pieces: Piece[]) => (
  state: BoardPiece,
  action: { type: PieceAction; board?: DrawableGrid }
): BoardPiece => {
  const isAtBottom = action.board && atBottom(state, action.board);
  const newPiece = isAtBottom && pickNewPiece(pieces);
  const newDrawer = action.type === PieceAction.rotate && getNewDrawer(state);

  const {
    pos: { x, y },
    drawer
  } = state;

  return newPiece
    ? {
        ...newPiece,
        actions: drawBlock(newPiece.pos.x, newPiece.pos.y, newPiece.drawer)
      }
    : action.type === PieceAction.start
    ? {
      ...state,
      actions: drawBlock(state.pos.x, state.pos.y, state.drawer)
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
