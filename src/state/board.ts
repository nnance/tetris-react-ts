import React from "react";
import { drawers as iBlockDrawers } from "../state/IBlock";
import { drawers as jBlockDrawers } from "../state/JBlock";
import { Piece } from "./BlockDrawer";

const pieces: Piece[] = [jBlockDrawers, iBlockDrawers];

type BoardState = {
  current: Piece;
  next: Piece;
};

const pickNewPiece = (): Piece => {
  const pieceIndex = Math.floor(Math.random() * pieces.length);
  const pos = { x: 1, y: 0 };
  return pieces[pieceIndex];
};

const useBoardState = () => {
  const [state, setState] = React.useReducer(reducer, { current: Piece });
};

export default useBoardState;
