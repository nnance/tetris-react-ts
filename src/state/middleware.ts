import { Action } from "./store";

type Middleware = (
  dispatch: React.Dispatch<Action>
) => (action: Action) => void;

export const applyMiddleware: Middleware = dispatch => action => {
  dispatch(action);
};
