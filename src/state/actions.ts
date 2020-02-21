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
  moveRight: () => void;
  moveLeft: () => void;
  moveDown: () => void;
  rotate: () => void;
  setPiece: (piece: Piece) => void;
};

const pieceActions = ([state, dispatch]: AppContext): PieceActions => ({
  start: () => dispatch({ type: PieceActionType.start }),
  moveRight: () => dispatch({ type: PieceActionType.moveRight, game: state.game }),
  moveLeft: () => dispatch({ type: PieceActionType.moveLeft, game: state.game }),
  moveDown: () => dispatch({ type: PieceActionType.moveDown, game: state.game }),
  rotate: () => dispatch({ type: PieceActionType.rotate, game: state.game }),
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
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  nextPiece: () => void;
  checkScore: () => void;
  end: () => void;
};

const gameActions = ([state, dispatch]: AppContext): GameActions => ({
  startGame: () => {
    dispatch({ type: PieceActionType.setPiece, piece: state.game.current });
    dispatch({ type: GameActionType.start });
  },
  pauseGame: () => dispatch({ type: GameActionType.pause }),
  resumeGame: () => dispatch({ type: GameActionType.resume }),
  nextPiece: () => dispatch({ type: GameActionType.nextPiece }),
  checkScore: () =>
    dispatch({
      type: GameActionType.checkScore,
      actions: drawBlock(
        state.piece.pos.x,
        state.piece.pos.y,
        state.piece.drawer
      )
    }),
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

export type Actions = PieceActions & GameActions

export const actions = (store: AppContext): Actions => ({
  ...pieceActions(store),
  ...gameActions(store)
});
