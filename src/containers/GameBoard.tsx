import React, { Dispatch } from "react";
import { DrawableGrid, BoardPiece, drawBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { PieceAction, BoardPieceAction } from "../state/reducers";
import { GameState } from "../state/game";

//TODO: detect when a line is completed

type GameBoardProps = {
  boardState: [
    DrawableGrid,
    React.Dispatch<React.SetStateAction<DrawableGrid>>
  ];
  game: GameState;
  blockState: [BoardPiece, Dispatch<BoardPieceAction>];
};

const updateBoard = drawBoard(20, 10);

const GameBoardContainer: React.FC<GameBoardProps> = ({
  game,
  blockState
}) => {
  const [state, setState] = React.useState(updateBoard([]));
  const [block, dispatch] = blockState;

  const boardRef = React.useRef(state);
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
          dispatch({ type: PieceAction.moveDown, board: boardRef.current });
        }, 100);
      });
      dispatch({ type: PieceAction.start, board: boardRef.current });
    }
  }, [game, dispatch]);

  React.useEffect(() => {
    boardRef.current = state;
  }, [state]);

  React.useEffect(() => {
    if (game.paused && timer) clearInterval(timer);
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
    if (downArrow && !game.paused)
      dispatch({ type: PieceAction.moveDown, board: boardRef.current });
  }, [game, downArrow, dispatch]);

  React.useEffect(() => {
    setState(state => {
      return updateBoard(block.actions ? block.actions : []);
    });
  }, [block, setState]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
