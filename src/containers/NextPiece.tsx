import React from "react";
import NextPiece from "../components/NextPiece";
import { GamePiece, rotateRight, AllBlocks } from "../state/GamePiece";
import useKeyPress from "../hooks/useKeyPress";

type NextPieceProps = {
  piece: GamePiece;
};

const NextPieceContainer: React.FC<NextPieceProps> = props => {
  const [state, setState] = React.useState(props.piece);
  const [blockIdx, setBlockIdx] = React.useState(0);

  const upArrow = useKeyPress({ keyCode: 38 });
  React.useEffect(() => {
    if (upArrow) setState(state => rotateRight(state));
  }, [upArrow]);

  const rightArrow = useKeyPress({ keyCode: 39 });
  React.useEffect(() => {
    if (rightArrow) {
      setBlockIdx(blockIdx =>
        blockIdx < AllBlocks.length - 1 ? blockIdx + 1 : 0
      );
    }
  }, [rightArrow]);

  React.useEffect(() => setState(AllBlocks[blockIdx]), [blockIdx]);

  return <NextPiece piece={state} />;
};

export default NextPieceContainer;
