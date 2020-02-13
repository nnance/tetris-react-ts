import React, { Dispatch } from "react";
import {
  drawBlock,
  BlockDrawer,
  Piece,
  DrawableAction
} from "./BlockDrawer";
import {
  BoardPiece,
  DrawableGrid,
} from "./DrawableGrid";
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

const rotationBlocked = (piece: BoardPiece, board: DrawableGrid): boolean => {
  const drawer = getNewDrawer(piece);
  const actions = drawBlock(piece.pos.x, piece.pos.y, drawer);
  return actions.find(action => action.x >= board[0].length) !== undefined;
};

const didCollide = (
  actions: DrawableAction[],
  board: DrawableGrid
): boolean => {
  // const offActions = actions.filter(action => action.state === BlockState.off);
  // const onActions = actions.filter(action => action.state === BlockState.on);
  // const newBoard = updateBoard(offActions, board);
  // const collisions = onActions.find(
  //   action => newBoard[action.y][action.x] === BlockState.on
  // );
  // return collisions !== undefined;
  return false;
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

const moveBlockDown = ({ pos, drawer }: BoardPiece): DrawableAction[] =>
  drawBlock(pos.x, pos.y + 1, drawer);

const moveBlockLeft = ({ pos, drawer }: BoardPiece): DrawableAction[] =>
  drawBlock(pos.x - 1, pos.y, drawer);

const moveBlockRight = ({ pos, drawer }: BoardPiece): DrawableAction[] =>
  drawBlock(pos.x + 1, pos.y, drawer);

const pieceReducer = (
  state: BoardPiece,
  action: BoardPieceAction
): BoardPiece => {
  const isAtBottom =
    action.type === PieceAction.moveDown &&
    (atBottom(state, action.board) ||
      didCollide(moveBlockDown(state), action.board));

  const newDrawer =
    action.type === PieceAction.rotate &&
    !rotationBlocked(state, action.board) &&
    getNewDrawer(state);

  const farRight =
    action.type === PieceAction.moveRight &&
    (atRight(state, action.board) ||
      didCollide(moveBlockRight(state), action.board));

  const farLeft =
    action.type === PieceAction.moveLeft &&
    (atLeft(state) || didCollide(moveBlockLeft(state), action.board));

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
    : action.type === PieceAction.moveRight && !farRight
    ? {
        ...state,
        pos: { ...state.pos, x: x + 1 },
        actions: drawBlock(x + 1, y, drawer)
      }
    : action.type === PieceAction.moveLeft && !farLeft
    ? {
        ...state,
        pos: { ...state.pos, x: x - 1 },
        actions: drawBlock(x - 1, y, drawer)
      }
    : action.type === PieceAction.moveDown
    ? {
        ...state,
        pos: { ...state.pos, y: isAtBottom ? y : y + 1 },
        actions: isAtBottom ? state.actions : drawBlock(x, y + 1, drawer)
      }
    : action.type === PieceAction.rotate && newDrawer
    ? {
        ...state,
        drawer: newDrawer,
        actions: drawBlock(x, y, newDrawer)
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
