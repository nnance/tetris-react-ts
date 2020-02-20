import { GameState } from "./game";
import { DrawableAction, Piece } from "./BlockDrawer";
import { AppState } from "./app";

export enum PieceActionType {
  start = 100,
  moveRight,
  moveLeft,
  moveDown,
  setPiece,
  rotate
}

export type SetPieceAction = { type: PieceActionType.setPiece; piece: Piece };

export type BoardPieceAction =
  | { type: PieceActionType.start }
  | SetPieceAction
  | { type: PieceActionType; game: GameState };

export enum GameActionType {
  new = 200,
  start,
  pause,
  resume,
  nextPiece,
  checkScore,
  end
}

export type CheckScoreAction = {
  type: GameActionType.checkScore;
  actions: DrawableAction[];
};

export type GameAction = { type: GameActionType } | CheckScoreAction;

export const gameActions = (
  state: AppState,
  dispatch: React.Dispatch<GameAction | BoardPieceAction>
) => ({
  startGame: () => {
    dispatch({ type: PieceActionType.setPiece, piece: state.game.current });
    dispatch({ type: GameActionType.start });
  }
});

export function isBoardPieceAction(
  action: BoardPieceAction | GameAction
): action is BoardPieceAction {
  return (action as BoardPieceAction).type in PieceActionType;
}

export function isGameAction(
  action: BoardPieceAction | GameAction
): action is GameAction {
  return (action as GameAction).type in GameActionType;
}
