import React, { Dispatch } from "react";
import { drawBlock, BlockDrawer, Piece, DrawableAction } from "./BlockDrawer";
import {
  BoardPiece,
  DrawableGrid,
  drawBoard,
  BlockState
} from "./DrawableGrid";
import { GameState } from "./game";
import { BoardPieceAction, PieceActionType, SetPieceAction } from "./actions";

// TODO: implement look ahead piece

const updateBoard = drawBoard(20, 10);
const board = updateBoard([]);

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

const didCollide = (actions: DrawableAction[], game: GameState): boolean => {
  const newBoard = updateBoard(game.lines);
  const collisions = actions.find(
    action => newBoard[action.y][action.x] === BlockState.on
  );
  return collisions !== undefined;
};

const moveBlockDown = ({ pos, drawer }: BoardPiece): DrawableAction[] =>
  drawBlock(pos.x, pos.y + 1, drawer);

const moveBlockLeft = ({ pos, drawer }: BoardPiece): DrawableAction[] =>
  drawBlock(pos.x - 1, pos.y, drawer);

const moveBlockRight = ({ pos, drawer }: BoardPiece): DrawableAction[] =>
  drawBlock(pos.x + 1, pos.y, drawer);

export const pieceReducer = (
  state: BoardPiece,
  action: BoardPieceAction
): BoardPiece => {
  const isAtBottom =
    action.type === PieceActionType.moveDown &&
    (atBottom(state, board) || didCollide(moveBlockDown(state), action.game));

  const newDrawer =
    action.type === PieceActionType.rotate &&
    !rotationBlocked(state, board) &&
    getNewDrawer(state);

  const farRight =
    action.type === PieceActionType.moveRight &&
    (atRight(state, board) || didCollide(moveBlockRight(state), action.game));

  const farLeft =
    action.type === PieceActionType.moveLeft &&
    (atLeft(state) || didCollide(moveBlockLeft(state), action.game));

  const {
    pos: { x, y },
    drawer
  } = state;

  return isAtBottom
    ? { ...state, isAtBottom: true }
    : action.type === PieceActionType.setPiece
    ? {
        pos: { x: 1, y: 0 },
        piece: (action as SetPieceAction).piece,
        isAtBottom: false,
        drawer: (action as SetPieceAction).piece[0]
      }
    : action.type === PieceActionType.start
    ? {
        ...state,
        actions: drawBlock(state.pos.x, state.pos.y, state.drawer)
      }
    : action.type === PieceActionType.moveRight && !farRight
    ? {
        ...state,
        pos: { ...state.pos, x: x + 1 },
        actions: drawBlock(x + 1, y, drawer)
      }
    : action.type === PieceActionType.moveLeft && !farLeft
    ? {
        ...state,
        pos: { ...state.pos, x: x - 1 },
        actions: drawBlock(x - 1, y, drawer)
      }
    : action.type === PieceActionType.moveDown
    ? {
        ...state,
        pos: { ...state.pos, y: isAtBottom ? y : y + 1 },
        actions: isAtBottom ? state.actions : drawBlock(x, y + 1, drawer)
      }
    : action.type === PieceActionType.rotate && newDrawer
    ? {
        ...state,
        drawer: newDrawer,
        actions: drawBlock(x, y, newDrawer)
      }
    : { ...state };
};

export const pieceToBoardPiece = (piece: Piece): BoardPiece => ({
  pos: { x: 1, y: 0 },
  piece,
  isAtBottom: false,
  drawer: piece[0]
});

export const useGamePieceState = (
  gameState: GameState
): [BoardPiece, Dispatch<BoardPieceAction>] => {
  const boardPiece = pieceToBoardPiece(gameState.current);
  const [piece, dispatch] = React.useReducer(pieceReducer, boardPiece);

  React.useEffect(() => {
    if (piece.isAtBottom) {
      dispatch({ type: PieceActionType.setPiece, piece: gameState.next });
    }
  }, [gameState, piece]);
  return [piece, dispatch];
};
