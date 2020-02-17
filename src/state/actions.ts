import { GameState } from "./game";
import { DrawableAction, Piece } from "./BlockDrawer";

export enum PieceActionType {
  start,
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
  new,
  start,
  pause,
  nextPiece,
  checkScore,
  end
}

export type CheckScoreAction = {
  type: GameActionType.checkScore;
  actions: DrawableAction[];
};

export type GameAction = { type: GameActionType } | CheckScoreAction;

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
