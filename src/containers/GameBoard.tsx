import React from "react";
import { DrawableGrid, updateBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { drawIBlock, moveIBlock, rotateIBlock, drawers } from "../state/IBlock";
import { BlockDrawer } from "../state/BlockDrawer";

// TODO: don't draw piece until space bar is pressed
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
  prev: Pos;
  current: Pos;
  drawer: BlockDrawer;
  eraser?: BlockDrawer;
};

enum PieceAction {
  moveRight,
  moveLeft,
  moveDown,
  rotate
}

const pieceReducer = (
  state: GamePiece,
  action: { type: PieceAction }
): GamePiece => {
  const idx = drawers.findIndex(drawer => drawer === state.drawer);

  return action.type === PieceAction.moveRight
    ? {
        ...state,
        current: { ...state.current, x: state.current.x + 1 },
        prev: state.current
      }
    : action.type === PieceAction.moveLeft
    ? {
        ...state,
        current: { ...state.current, x: state.current.x - 1 },
        prev: state.current
      }
    : action.type === PieceAction.moveDown
    ? {
        ...state,
        current: { ...state.current, y: state.current.y + 1 },
        prev: state.current
      }
    : action.type === PieceAction.rotate
    ? {
        ...state,
        drawer: drawers[idx === drawers.length - 1 ? 0 : idx + 1],
        eraser: state.drawer
      }
    : { ...state };
};

const GameBoardContainer: React.FC = () => {
  const [state, setState] = React.useState(board);
  const [pos, dispatch] = React.useReducer(pieceReducer, {
    prev: { x: 0, y: 0 },
    current: { x: 1, y: 0 },
    drawer: drawers[0]
  });

  const spaceBar = useKeyPress({ keyCode: KeyCode.spaceBar });
  const leftArrow = useKeyPress({ keyCode: KeyCode.leftArrow });
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });

  React.useEffect(() => {
    if (spaceBar) {
      setState(state => updateBoard(drawIBlock(1, 0), state));
      setInterval(() => {
        dispatch({ type: PieceAction.moveDown });
      }, 500);
    }
  }, [spaceBar]);

  React.useEffect(() => {
    if (leftArrow) dispatch({ type: PieceAction.moveLeft });
  }, [leftArrow]);

  React.useEffect(() => {
    if (rightArrow) dispatch({ type: PieceAction.moveRight });
  }, [rightArrow]);

  React.useEffect(() => {
    if (upArrow) {
      //   setState(state =>
      //     updateBoard(
      //       rotateIBlock(pos.current.x, pos.current.y, pos.drawer, newDrawer),
      //       state
      //     )
      //   );
      dispatch({ type: PieceAction.rotate });
    }
  }, [upArrow]);

  React.useEffect(() => {
    setState(state => {
      const { prev, current, drawer } = pos;
      return updateBoard(
        moveIBlock(prev.x, prev.y, current.x, current.y, drawer),
        state
      );
    });
  }, [pos]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
