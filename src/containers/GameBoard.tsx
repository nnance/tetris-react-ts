import React, { Dispatch } from "react";
import { BoardPiece, drawBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { PieceActionType, BoardPieceAction } from "../state/actions";
import { GameState } from "../state/game";

//TODO: detect when a line is completed

type GameBoardProps = {
  game: GameState;
  blockState: [BoardPiece, Dispatch<BoardPieceAction>];
};

const updateBoard = drawBoard(20, 10);

const GameBoardContainer: React.FC<GameBoardProps> = ({ game, blockState }) => {
  const [state, setState] = React.useState(updateBoard([]));
  const [block, dispatch] = blockState;

  const [timer, setTimer] = React.useState<NodeJS.Timeout>();

  const leftArrow = useKeyPress({ keyCode: KeyCode.leftArrow });
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });
  const downArrow = useKeyPress({ keyCode: KeyCode.downArrow });

  React.useEffect(() => {
    if (!game.paused) {
      setTimer(timer => {
        if (timer) clearInterval(timer);
        return setInterval(() => {
          dispatch({ type: PieceActionType.moveDown, game });
        }, 500);
      });
      dispatch({ type: PieceActionType.start, game });
    }
  }, [game, dispatch]);

  React.useEffect(() => {
    if (game.paused && timer) clearInterval(timer);
  }, [game, timer]);

  React.useEffect(() => {
    if (leftArrow && !game.paused)
      dispatch({ type: PieceActionType.moveLeft, game });
  }, [game, leftArrow, dispatch]);

  React.useEffect(() => {
    if (rightArrow && !game.paused)
      dispatch({ type: PieceActionType.moveRight, game });
  }, [game, rightArrow, dispatch]);

  React.useEffect(() => {
    if (upArrow && !game.paused) dispatch({ type: PieceActionType.rotate, game });
  }, [game, upArrow, dispatch]);

  React.useEffect(() => {
    if (downArrow && !game.paused)
      dispatch({ type: PieceActionType.moveDown, game });
  }, [game, downArrow, dispatch]);

  React.useEffect(() => {
    setState(
      updateBoard(game.lines.concat(block.actions ? block.actions : []))
    );
  }, [block, setState, game]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
