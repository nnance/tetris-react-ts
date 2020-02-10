import React, { Dispatch } from "react";
import {
  drawBlock,
  moveBlock,
  rotateBlock,
  BlockDrawer,
  Piece
} from "./BlockDrawer";
import { BoardPiece, DrawableGrid } from "./DrawableGrid";
import { GameState } from "./game";

// TODO: implement collision detection with previous pieces
// TODO: implement look ahead piece

const atBottom = (piece: BoardPiece, board: DrawableGrid): boolean => {
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return actions.find(action => action.y >= board.length - 1) !== undefined;
};

const atLeft = (piece: BoardPiece): boolean => {
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return actions.find(action => action.x === 0) !== undefined;
};

const atRight = (piece: BoardPiece, board: DrawableGrid): boolean => {
  const actions = drawBlock(piece.pos.x, piece.pos.y, piece.drawer);
  return actions.find(action => action.x >= board[0].length - 1) !== undefined;
};

const getNewDrawer = (state: BoardPiece): BlockDrawer => {
  const idx = state.piece.findIndex(drawer => drawer === state.drawer);
  return state.piece[idx === state.piece.length - 1 ? 0 : idx + 1];
};

export enum PieceAction {
  start,
  moveRight,
  moveLeft,
  moveDown,
  setPiece,
  rotate
}

type SetPieceAction = { type: PieceAction.setPiece; piece: Piece };

export type BoardPieceAction =
  | { type: PieceAction.start }
  | SetPieceAction
  | { type: PieceAction; board: DrawableGrid };

const rotationBlocked = (piece: BoardPiece, board: DrawableGrid): boolean => {
  const drawer = getNewDrawer(piece);
  const actions = drawBlock(piece.pos.x, piece.pos.y, drawer);
  return actions.find(action => action.x >= board[0].length) !== undefined;
};

const pieceReducer = (
  state: BoardPiece,
  action: BoardPieceAction
): BoardPiece => {
  const isAtBottom =
    action.type === PieceAction.moveDown && atBottom(state, action.board);
  const newDrawer =
    action.type === PieceAction.rotate &&
    !rotationBlocked(state, action.board) &&
    getNewDrawer(state);

  const {
    pos: { x, y },
    drawer
  } = state;

  return isAtBottom
    ? { ...state, isAtBottom: true }
    : action.type === PieceAction.setPiece
    ? {
        pos: { x: 1, y: 0 },
        piece: (action as SetPieceAction).piece,
        isAtBottom: false,
        drawer: (action as SetPieceAction).piece[0]
      }
    : action.type === PieceAction.start
    ? {
        ...state,
        actions: drawBlock(state.pos.x, state.pos.y, state.drawer)
      }
    : action.type === PieceAction.moveRight
    ? {
        ...state,
        pos: { ...state.pos, x: atRight(state, action.board) ? x : x + 1 },
        actions: atRight(state, action.board)
          ? []
          : moveBlock(x, y, x + 1, y, drawer)
      }
    : action.type === PieceAction.moveLeft
    ? {
        ...state,
        pos: { ...state.pos, x: atLeft(state) ? x : x - 1 },
        actions: atLeft(state) ? [] : moveBlock(x, y, x - 1, y, drawer)
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

export const useGamePieceState = (
  gameState: GameState
): [BoardPiece, Dispatch<BoardPieceAction>] => {
  const boardPiece: BoardPiece = {
    pos: { x: 1, y: 0 },
    piece: gameState.current,
    isAtBottom: false,
    drawer: gameState.current[0]
  };
  const [piece, dispatch] = React.useReducer(pieceReducer, boardPiece);

  React.useEffect(() => {
    if (piece.isAtBottom) {
      dispatch({ type: PieceAction.setPiece, piece: gameState.next });
    }
  }, [gameState, piece]);
  return [piece, dispatch];
};
