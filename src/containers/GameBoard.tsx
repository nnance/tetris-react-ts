import React from "react";
import { drawBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { Store } from "../state/store";
import { useGameState } from "../state/game";

//TODO: detect when a line is completed

const updateBoard = drawBoard(20, 10);

type GameBoardProps = {
  store: Store;
};

const GameBoardContainer: React.FC<GameBoardProps> = props => {
  const [{ game, piece }, actions] = props.store;
  const { moveDown, moveLeft, moveRight, rotate, start } = React.useRef(
    actions
  ).current;

  const [state, setState] = React.useState(updateBoard([]));
  useGameState(props.store);

  const [timer, setTimer] = React.useState<NodeJS.Timeout>();

  const leftArrow = useKeyPress({ keyCode: KeyCode.leftArrow });
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });
  const downArrow = useKeyPress({ keyCode: KeyCode.downArrow });

  React.useEffect(() => {
    if (!game.paused) {
      setTimer(timer => {
        if (timer) clearInterval(timer);
        return setInterval(() => moveDown(), 500);
      });
      start();
    }
  }, [game, moveDown, start]);

  React.useEffect(() => {
    if (game.paused && timer) clearInterval(timer);
  }, [game, timer]);

  React.useEffect(() => {
    if (leftArrow) moveLeft();
  }, [leftArrow, game, moveLeft]);

  React.useEffect(() => {
    if (rightArrow) moveRight();
  }, [game, rightArrow, moveRight]);

  React.useEffect(() => {
    if (upArrow) rotate();
  }, [game, upArrow, rotate]);

  React.useEffect(() => {
    if (downArrow) moveDown();
  }, [game, downArrow, moveDown]);

  React.useEffect(() => {
    setState(
      updateBoard(game.lines.concat(piece.actions ? piece.actions : []))
    );
  }, [piece, setState, game]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
