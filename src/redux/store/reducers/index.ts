import { combineReducers, Reducer } from 'redux';

import authReducer, { AuthState } from '../../../screens/auth/store/reducers';
import userReducer from '../../../screens/user/store/reducers/user.reducer';
import ridesReducer from '../../../screens/rides/store/reducers/rides.reducer';
import sharedReducer, { SharedState } from '../reducers/shared.reducer';
import { UserState } from '../../../screens/user/store/reducers';
import { RidesState } from '../../../screens/rides/store/reducers';

export interface RootState {
	auth: AuthState;
	user: UserState;
	rides: RidesState;
	shared: SharedState;
}

const rootReducer: Reducer<RootState> = combineReducers({
	auth: authReducer,
	user: userReducer,
	rides: ridesReducer,
	shared: sharedReducer
});

export default rootReducer;
export * from './shared.reducer';
