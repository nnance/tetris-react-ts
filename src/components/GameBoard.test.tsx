import React from "react";
import { render } from "@testing-library/react";
import GameBoard from "./GameBoard";
import { drawBlock } from "../state/BlockDrawer";
import { drawers as iBlockDrawers } from "../state/IBlock";
import { drawers as tBlockDrawers } from "../state/TBlock";
import { DrawableGrid, drawBoard } from "../state/DrawableGrid";
import { highlightLines } from "../state/game";

const actions = drawBlock(0, 18, tBlockDrawers[1]).concat(
  drawBlock(3, 18, tBlockDrawers[1]),
  drawBlock(6, 18, tBlockDrawers[1]),
  drawBlock(9, 16, iBlockDrawers[0])
);

const updateBoard = drawBoard(20, 10);

const board: DrawableGrid = updateBoard(actions);

test("should render a board with blocks on", () => {
  const { getAllByTestId } = render(<GameBoard board={board} />);
  const highlightedCells = getAllByTestId("on");
  expect(highlightedCells).toHaveLength(actions.length);
});

test("should render a board with one highlighted line", () => {
  const board = updateBoard(highlightLines(actions));
  const { getAllByTestId } = render(<GameBoard board={board} />);
  const highlightedCells = getAllByTestId("highlight");
  expect(highlightedCells).toHaveLength(10);
});
