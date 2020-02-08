import React from "react";
import { DrawableGrid, updateBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { pieceReducer, pickNewPiece, PieceAction } from "../state/reducers";
import { drawers as iBlockDrawers } from "../state/IBlock";
import { drawers as jBlockDrawers } from "../state/JBlock";
import { Piece } from "../state/BlockDrawer";

// TODO: fix layout to remove horizontal scroll
// TODO: impelement the current piece so that the board and the next piece is correct

const board: DrawableGrid = Array(20)
.fill(0)
.map(() => Array(10).fill(0));

const pieces: Piece[] = [jBlockDrawers, iBlockDrawers];

const GameBoardContainer: React.FC = () => {
  const [state, setState] = React.useState(board);
  const boardRef = React.useRef(state);
  const [block, dispatch] = React.useReducer(pieceReducer(pieces), pickNewPiece(pieces));
  const [, setTimer] = React.useState();

  const spaceBar = useKeyPress({ keyCode: KeyCode.spaceBar });
  const leftArrow = useKeyPress({ keyCode: KeyCode.leftArrow });
  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });

  React.useEffect(() => {
    if (spaceBar) {
      setTimer(
        setInterval(() => {
          dispatch({ type: PieceAction.moveDown, board: boardRef.current });
        }, 500)
      );
      dispatch({ type: PieceAction.start, board: boardRef.current });
    }
  }, [spaceBar]);

  React.useEffect(() => {
    if (leftArrow) dispatch({ type: PieceAction.moveLeft, board: boardRef.current });
  }, [leftArrow]);

  React.useEffect(() => {
    if (rightArrow) dispatch({ type: PieceAction.moveRight, board: boardRef.current });
  }, [rightArrow]);

  React.useEffect(() => {
    if (upArrow) dispatch({ type: PieceAction.rotate, board: boardRef.current });
  }, [upArrow]);

  React.useEffect(() => {
    setState(state => {
      return updateBoard(block.actions ? block.actions : [], state);
    });
  }, [block]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
