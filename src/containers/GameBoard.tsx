import React from "react";
import { DrawableGrid, updateBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import {
  drawIBlock,
  moveIBlock,
  rotateIBlock,
  verticalIBlock
} from "../state/IBlock";

// TODO: maintain rotation state so it draws the correct orientation
// TODO: don't draw piece until space bar is pressed
// TODO: implement edge detection for right and left movement
// TODO: detect the bottom of the board and stop movement
// TODO: impelement the current piece so that the board and the next piece is correct

const board: DrawableGrid = Array(20)
  .fill(0)
  .map(x => Array(10).fill(0));

const GameBoardContainer: React.FC = () => {
  const [state, setState] = React.useState(board);
  const [pos, setPos] = React.useState({
    prev: { x: 0, y: 0 },
    current: { x: 1, y: 0 }
  });

  const spaceBar = useKeyPress({ keyCode: KeyCode.spaceBar });
  const leftArrow = useKeyPress({ keyCode: KeyCode.leftArrow });
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });

  React.useEffect(() => {
    if (spaceBar) {
      setState(state => updateBoard(drawIBlock(1, 0), state));
      setInterval(() => {
        setPos(({ current }) => ({
          prev: current,
          current: { x: current.x, y: current.y + 1 }
        }));
      }, 500);
    }
  }, [spaceBar]);

  React.useEffect(() => {
    if (leftArrow)
      setPos(({ current }) => ({
        prev: current,
        current: { x: current.x - 1, y: current.y }
      }));
  }, [leftArrow]);

  React.useEffect(() => {
    if (rightArrow)
      setPos(({ current }) => ({
        prev: current,
        current: { x: current.x + 1, y: current.y }
      }));
  }, [rightArrow]);

  React.useEffect(() => {
    if (upArrow)
      setState(state =>
        updateBoard(rotateIBlock(pos.current.x, pos.current.y), state)
      );
  }, [upArrow, pos]);

  React.useEffect(() => {
    setState(state => {
      const { prev, current } = pos;
      return updateBoard(
        moveIBlock(prev.x, prev.y, current.x, current.y, verticalIBlock),
        state
      );
    });
  }, [pos]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
