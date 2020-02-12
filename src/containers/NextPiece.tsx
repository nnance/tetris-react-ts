import React from "react";
import NextPiece from "../components/NextPiece";
import { Piece } from "../state/BlockDrawer";
import { updateBoard, BlockState } from "../state/DrawableGrid";

const NextPieceContainer: React.FC<{ piece: Piece }> = ({ piece }) => {
  const drawer = piece[0];
  const state = updateBoard(drawer(1, 0, BlockState.on));
  return <NextPiece grid={state} />;
};

export default NextPieceContainer;
