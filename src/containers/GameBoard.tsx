import React from "react";
import { DrawableGrid, updateBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import {
  drawIBlock,
  moveIBlock,
  rotateIBlock,
  drawers
} from "../state/IBlock";
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
};

const GameBoardContainer: React.FC = () => {
  const [state, setState] = React.useState(board);
  const [pos, setPos] = React.useState<GamePiece>({
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
        setPos(({ current, drawer }) => ({
          prev: current,
          current: { x: current.x, y: current.y + 1 },
          drawer
        }));
      }, 500);
    }
  }, [spaceBar]);

  React.useEffect(() => {
    if (leftArrow)
      setPos(({ current, drawer }) => ({
        prev: current,
        current: { x: current.x - 1, y: current.y },
        drawer
      }));
  }, [leftArrow]);

  React.useEffect(() => {
    if (rightArrow)
      setPos(({ current, drawer }) => ({
        prev: current,
        current: { x: current.x + 1, y: current.y },
        drawer
      }));
  }, [rightArrow]);

  React.useEffect(() => {
    if (upArrow) {
      const idx = drawers.findIndex(drawer => drawer === pos.drawer);
      const newDrawer = drawers[idx === drawers.length - 1 ? 0 : idx + 1];

      setState(state =>
        updateBoard(
          rotateIBlock(pos.current.x, pos.current.y, pos.drawer, newDrawer),
          state
        )
      );
      setPos(pos => ({
        ...pos,
        drawer: newDrawer
      }));
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
