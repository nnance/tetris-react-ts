import React from "react";
import NextPiece from "../components/NextPiece";
import useKeyPress, { KeyCode } from "../hooks/useKeyPress";
import { drawIBlock, rotateIBlock } from "../state/IBlock";
import { DrawableGrid, updateBoard } from "../state/DrawableGrid";
import { drawJBlock, rotateJBlock } from "../state/JBlock";

const emptyGrid: DrawableGrid = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

const AllBlocks: ((state: DrawableGrid) => DrawableGrid)[] = [
  (state): DrawableGrid => updateBoard(drawIBlock(1, 0), state),
  (state): DrawableGrid => updateBoard(drawJBlock(1, 0), state)
];

const RotateBlocks: ((state: DrawableGrid) => DrawableGrid)[] = [
  (state): DrawableGrid => updateBoard(rotateIBlock(1, 0), state),
  (state): DrawableGrid => updateBoard(rotateJBlock(1, 0), state)
];

const NextPieceContainer: React.FC<{}> = () => {
  const [state, setState] = React.useState(emptyGrid);
  const [blockIdx, setBlockIdx] = React.useState(0);

  const upArrow = useKeyPress({ keyCode: KeyCode.upArrow });
  React.useEffect(() => {
    if (upArrow) setState(state => RotateBlocks[blockIdx](state));
  }, [upArrow, blockIdx]);

  const rightArrow = useKeyPress({ keyCode: KeyCode.rightArrow });
  React.useEffect(() => {
    if (rightArrow) {
      setBlockIdx(blockIdx =>
        blockIdx < AllBlocks.length - 1 ? blockIdx + 1 : 0
      );
    }
  }, [rightArrow]);

  React.useEffect(() => setState(AllBlocks[blockIdx](emptyGrid)), [blockIdx]);

  return <NextPiece grid={state} />;
};

export default NextPieceContainer;
