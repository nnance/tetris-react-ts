import { GameState } from "./game";
import { BoardPiece } from "./DrawableGrid";
import { GameAction, BoardPieceAction, GameActionType, PieceActionType } from "./actions";
import { reducer as gameReducer } from "./game";
import { pieceReducer } from "./reducers";

export type AppState = {
    game: GameState,
    piece: BoardPiece
}

export const reducer = (state: AppState, action: GameAction | BoardPieceAction) => {
    return action.type in GameActionType
    ? {
        ...state,
        game: gameReducer(state.game, action as GameAction)
    }
    : action.type in PieceActionType
    ? {
        ...state,
        piece: pieceReducer(state.piece, action as BoardPieceAction)
    }
    : state
}