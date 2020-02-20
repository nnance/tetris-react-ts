import { GameState } from "./game";
import { DrawableAction, Piece } from "./BlockDrawer";

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

type PieceActions = {
  start: () => void;
  moveRight: (game: GameState) => void;
  moveLeft: (game: GameState) => void;
  moveDown: (game: GameState) => void;
  rotate: (game: GameState) => void;
  setPiece: (piece: Piece) => void;
};

const pieceActions = (
  dispatch: React.Dispatch<GameAction | BoardPieceAction>
): PieceActions => ({
  start: () => dispatch({ type: PieceActionType.start }),
  moveRight: game => dispatch({ type: PieceActionType.moveRight, game }),
  moveLeft: game => dispatch({ type: PieceActionType.moveLeft, game }),
  moveDown: game => dispatch({ type: PieceActionType.moveDown, game }),
  rotate: game => dispatch({ type: PieceActionType.rotate, game }),
  setPiece: piece => dispatch({ type: PieceActionType.setPiece, piece })
});

export enum GameActionType {
  start = 200,
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

type GameActions = {
  startGame: (game: GameState) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  nextPiece: () => void;
  checkScore: (actions: DrawableAction[]) => void;
  end: () => void;
};

const gameActions = (
  dispatch: React.Dispatch<GameAction | BoardPieceAction>
): GameActions => ({
  startGame: game => {
    dispatch({ type: PieceActionType.setPiece, piece: game.current });
    dispatch({ type: GameActionType.start });
  },
  pauseGame: () => dispatch({ type: GameActionType.pause }),
  resumeGame: () => dispatch({ type: GameActionType.resume }),
  nextPiece: () => dispatch({ type: GameActionType.nextPiece }),
  checkScore: actions => dispatch({ type: GameActionType.checkScore, actions }),
  end: () => dispatch({ type: GameActionType.end })
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

export const actions = (
  dispatch: React.Dispatch<GameAction | BoardPieceAction>
): PieceActions & GameActions => ({ ...pieceActions(dispatch), ...gameActions(dispatch) });
