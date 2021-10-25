// @flow
import { combineReducers } from 'redux';
import type { ActionType } from './types';
import session, { actionTypes as sessionActions } from './modules/session';
import type { SessionStateType } from './modules/session';

export type StateType = {
  session: SessionStateType,
};

const appReducer = combineReducers({
  session,
});

export default function rootReducer(
  state: StateType,
  action: ActionType,
): StateType {
  if (action.type === sessionActions.SIGN_OUT) {
    state = {};
  }

  return appReducer(state, action);
}
