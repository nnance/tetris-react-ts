import { renderHook, act } from "@testing-library/react-hooks";
// import useGameState from "./game";
import { drawers as iBlockDrawers } from "./blocks/IBlock";
import { drawers as tBlockDrawers } from "./blocks/TBlock";
import { drawBlock } from "./BlockDrawer";
import { BlockState, drawBoard } from "./DrawableGrid";
import { GameActionType } from "./actions";

const actions = drawBlock(0, 18, tBlockDrawers[1]).concat(
  drawBlock(3, 18, tBlockDrawers[1]),
  drawBlock(6, 18, tBlockDrawers[1]),
  drawBlock(9, 16, iBlockDrawers[0])
);

// TODO: fix use game state

// describe("should pause game", () => {
//   const { result } = renderHook(() => useGameState());
//   const [, dispatch] = result.current;
//   const current = [...result.current[0].current];

//   act(() => {
//     dispatch({ type: GameActionType.pause });
//   });

//   test("should pause state", () => {
//     expect(result.current[0].paused).toBeTruthy();
//   });
//   test("should not change current piece", () => {
//     expect(result.current[0].current).toStrictEqual(current);
//   });
// });

// test("should pick a piece", () => {
//   const { result } = renderHook(() => useGameState());
//   const [, dispatch] = result.current;
//   const current = [...result.current[0].current];

//   act(() => {
//     dispatch({ type: GameActionType.nextPiece });
//   });

//   expect(result.current[0].current).not.toStrictEqual(current);
// });

// test("should find a full line", () => {
//   const { result } = renderHook(() => useGameState());
//   const [, dispatch] = result.current;

//   act(() => {
//     dispatch({ type: GameActionType.checkScore, actions: actions });
//   });
//   expect(
//     result.current[0].lines.reduce(
//       (prev, cur) => (cur.state === BlockState.highlight ? prev + 1 : prev),
//       0
//     )
//   ).toEqual(10);
// });

test("should create a board with blocks on", () => {
  const board = drawBoard(20, 10)(actions);

  expect(board.flat().filter(state => state === BlockState.on)).toHaveLength(
    actions.length
  );
});
