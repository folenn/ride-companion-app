import { combineReducers, Reducer } from 'redux';

import status, { StatusState } from './status.reducer';

export interface AuthState {
  status: StatusState
}

const authReducer: Reducer<AuthState> = combineReducers({
	status
});

export default authReducer;
export * from './status.reducer';
