import { GameState } from "./game";
import { DrawableAction, Piece, drawBlock } from "./BlockDrawer";
import { AppContext } from "./store";

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

const pieceActions = ([, dispatch]: AppContext): PieceActions => ({
  start: (): void => dispatch({ type: PieceActionType.start }),
  moveRight: (game): void =>
    dispatch({ type: PieceActionType.moveRight, game }),
  moveLeft: (game): void => dispatch({ type: PieceActionType.moveLeft, game }),
  moveDown: (game): void => dispatch({ type: PieceActionType.moveDown, game }),
  rotate: (game): void => dispatch({ type: PieceActionType.rotate, game }),
  setPiece: (piece): void => dispatch({ type: PieceActionType.setPiece, piece })
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

export type GameActions = {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  nextPiece: () => void;
  checkScore: () => void;
  end: () => void;
};

const gameActions = ([state, dispatch]: AppContext): GameActions => ({
  startGame: (): void => {
    dispatch({ type: PieceActionType.setPiece, piece: state.game.current });
    dispatch({ type: GameActionType.start });
  },
  pauseGame: (): void => dispatch({ type: GameActionType.pause }),
  resumeGame: (): void => dispatch({ type: GameActionType.resume }),
  nextPiece: (): void => dispatch({ type: GameActionType.nextPiece }),
  checkScore: (): void =>
    dispatch({
      type: GameActionType.checkScore,
      actions: drawBlock(
        state.piece.pos.x,
        state.piece.pos.y,
        state.piece.drawer
      )
    }),
  end: (): void => dispatch({ type: GameActionType.end })
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

export type Actions = PieceActions & GameActions;

export const actions = (store: AppContext): Actions => ({
  ...pieceActions(store),
  ...gameActions(store)
});
