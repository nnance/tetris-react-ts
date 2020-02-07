import React from "react";
import { DrawableGrid, updateBoard } from "../state/DrawableGrid";
import GameBoard from "../components/GameBoard";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { pieceReducer, pickNewPiece, PieceAction } from "../state/reducers";

// TODO: detect the bottom of the board and stop movement
// TODO: implement edge detection for right and left movement
// TODO: fix layout to remove horizontal scroll
// TODO: impelement the current piece so that the board and the next piece is correct

const board: DrawableGrid = Array(20)
  .fill(0)
  .map(() => Array(10).fill(0));

const GameBoardContainer: React.FC = () => {
  const [state, setState] = React.useState(board);
  const boardRef = React.useRef(state);
  const [block, dispatch] = React.useReducer(pieceReducer, pickNewPiece());
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
      dispatch({ type: PieceAction.start });
    }
  }, [spaceBar]);

  React.useEffect(() => {
    if (leftArrow) dispatch({ type: PieceAction.moveLeft });
  }, [leftArrow]);

  React.useEffect(() => {
    if (rightArrow) dispatch({ type: PieceAction.moveRight });
  }, [rightArrow]);

  React.useEffect(() => {
    if (upArrow) dispatch({ type: PieceAction.rotate });
  }, [upArrow]);

  React.useEffect(() => {
    setState(state => {
      return updateBoard(block.actions ? block.actions : [], state);
    });
  }, [block]);

  return <GameBoard board={state} />;
};

export default GameBoardContainer;
