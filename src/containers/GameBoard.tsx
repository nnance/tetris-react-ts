import React, { Dispatch } from "react";
import { DrawableGrid, updateBoard, BoardPiece } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { PieceAction, BoardPieceAction } from "../state/reducers";
import { GameState } from "../state/game";

// TODO: fix layout to remove horizontal scroll
// TODO: impelement the current piece so that the board and the next piece is correct

const board: DrawableGrid = Array(20)
  .fill(0)
  .map(() => Array(10).fill(0));

type GameBoardProps = {
  game: GameState;
  block: BoardPiece;
  dispatch: Dispatch<BoardPieceAction>;
};

const GameBoardContainer: React.FC<GameBoardProps> = ({
  game,
  block,
  dispatch
}) => {
  const [state, setState] = React.useState(board);
  const boardRef = React.useRef(state);
  const [timer, setTimer] = React.useState();

  const leftArrow = useKeyPress({ keyCode: KeyCode.leftArrow });
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });

  React.useEffect(() => {
    if (!game.paused) {
      setTimer(
        setInterval(() => {
          dispatch({ type: PieceAction.moveDown, board: boardRef.current });
        }, 500)
      );
      dispatch({ type: PieceAction.start, board: boardRef.current });
    }
  }, [game, dispatch]);

  React.useEffect(() => {
    if (game.paused && timer) {
      clearInterval(timer);
    }
  }, [game, timer]);

  React.useEffect(() => {
    if (leftArrow && !game.paused)
      dispatch({ type: PieceAction.moveLeft, board: boardRef.current });
  }, [game, leftArrow, dispatch]);

  React.useEffect(() => {
    if (rightArrow && !game.paused)
      dispatch({ type: PieceAction.moveRight, board: boardRef.current });
  }, [game, rightArrow, dispatch]);

  React.useEffect(() => {
    if (upArrow && !game.paused)
      dispatch({ type: PieceAction.rotate, board: boardRef.current });
  }, [game, upArrow, dispatch]);

  React.useEffect(() => {
    setState(state => {
      return updateBoard(block.actions ? block.actions : [], state);
    });
  }, [block]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
