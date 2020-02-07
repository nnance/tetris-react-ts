import React from "react";
import { DrawableGrid, updateBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { drawers as iBlockDrawers } from "../state/IBlock";
import { drawers as jBlockDrawers } from "../state/JBlock";
import {
  drawBlock,
  moveBlock,
  rotateBlock,
  BlockDrawer,
  DrawableAction,
  Piece
} from "../state/BlockDrawer";

// TODO: implement edge detection for right and left movement
// TODO: fix layout to remove horizontal scroll
// TODO: detect the bottom of the board and stop movement
// TODO: impelement the current piece so that the board and the next piece is correct

const board: DrawableGrid = Array(20)
  .fill(0)
  .map(x => Array(10).fill(0));

type Pos = {
  x: number;
  y: number;
};

type GamePiece = {
  pos: Pos;
  piece: Piece;
  drawer: BlockDrawer;
  actions?: DrawableAction[];
};

enum PieceAction {
  moveRight,
  moveLeft,
  moveDown,
  rotate
}

const pieces: Piece[] = [ jBlockDrawers, iBlockDrawers ];

const pieceReducer = (
  state: GamePiece,
  action: { type: PieceAction }
): GamePiece => {
  const idx = state.piece.findIndex(drawer => drawer === state.drawer);
  const newDrawer = state.piece[idx === state.piece.length - 1 ? 0 : idx + 1];
  const {
    pos: { x, y },
    drawer
  } = state;

  return action.type === PieceAction.moveRight
    ? {
        ...state,
        pos: { ...state.pos, x: x + 1 },
        actions: moveBlock(x, y, x + 1, y, drawer)
      }
    : action.type === PieceAction.moveLeft
    ? {
        ...state,
        pos: { ...state.pos, x: x - 1 },
        actions: moveBlock(x, y, x - 1, y, drawer)
      }
    : action.type === PieceAction.moveDown
    ? {
        ...state,
        pos: { ...state.pos, y: y + 1 },
        actions: moveBlock(x, y, x, y + 1, drawer)
      }
    : action.type === PieceAction.rotate
    ? {
        ...state,
        drawer: newDrawer,
        actions: rotateBlock(x, y, drawer, newDrawer)
      }
    : { ...state };
};

const GameBoardContainer: React.FC = () => {
  const [state, setState] = React.useState(board);
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  const [block, dispatch] = React.useReducer(pieceReducer, {
    pos: { x: 1, y: 0 },
    piece: pieces[pieceIndex],
    drawer: pieces[pieceIndex][0]
  });

  const spaceBar = useKeyPress({ keyCode: KeyCode.spaceBar });
  const leftArrow = useKeyPress({ keyCode: KeyCode.leftArrow });
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });

  React.useEffect(() => {
    if (spaceBar) {
      setState(state => updateBoard(drawBlock(1, 0, block.drawer), state));
      setInterval(() => {
        dispatch({ type: PieceAction.moveDown });
      }, 500);
    }
  }, [spaceBar, block]);

  React.useEffect(() => {
    if (leftArrow) dispatch({ type: PieceAction.moveLeft });
  }, [leftArrow]);

  React.useEffect(() => {
    if (rightArrow) dispatch({ type: PieceAction.moveRight });
  }, [rightArrow]);

  React.useEffect(() => {
    if (upArrow) {
      dispatch({ type: PieceAction.rotate });
    }
  }, [upArrow]);

  React.useEffect(() => {
    setState(state => {
      return updateBoard(block.actions ? block.actions : [], state);
    });
  }, [block]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
