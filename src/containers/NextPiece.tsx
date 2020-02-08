import React from "react";
import NextPiece from "../components/NextPiece";
import { Piece } from "../state/BlockDrawer";
import { DrawableGrid, updateBoard, BlockState } from "../state/DrawableGrid";

const emptyGrid: DrawableGrid = Array(5)
  .fill(0)
  .map(() => Array(5).fill(0));

const NextPieceContainer: React.FC<{ piece: Piece }> = ({ piece }) => {
  const drawer = piece[0];
  const state = updateBoard(drawer(1, 0, BlockState.on), emptyGrid);
  return <NextPiece grid={state} />;
};

export default NextPieceContainer;
