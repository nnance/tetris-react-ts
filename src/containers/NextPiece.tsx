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

  const keyHandler = (ev: KeyboardEvent): void => {
    if (ev.keyCode === 38) setState(rotateRight(state));
    if (ev.keyCode === 39) {
      blockIdx < AllBlocks.length - 1
        ? setBlockIdx(blockIdx + 1)
        : setBlockIdx(0);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return (): void => {
      window.removeEventListener("keydown", keyHandler);
    };
  });

  React.useEffect(() => setState(AllBlocks[blockIdx]), [blockIdx]);

  return <NextPiece piece={state} />;
};

export default NextPieceContainer;
