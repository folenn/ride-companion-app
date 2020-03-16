import { combineEpics } from 'redux-observable';
import {
  autoLoginEpic,
  loginEpic,
  loginSuccessEpic,
  logoutEpic,
  registerByEmailEpic,
  requestPasswordResetEpic,
  requestPhoneVerificationCodeEpic,
  socialLoginEpic,
  verifyPhoneCodeEpic,
} from '../../../screens/auth/store';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  getUserInfoEpic,
  getUserInfoSuccessEpic,
  updateUserDataEpic,
  updateUserDataSuccessEpic,
  uploadUserAvatarEpic,
} from '../../../screens/user/store/epics';
import {createRideEpic, findRideEpic, loadAddressSuggestionsEpic} from '../../../screens/rides/store/epics';

export const rootEpic$ = new BehaviorSubject(
	combineEpics(
		autoLoginEpic,
		loginEpic,
		requestPhoneVerificationCodeEpic,
		requestPasswordResetEpic,
		socialLoginEpic,
		loginSuccessEpic,
		logoutEpic,
		registerByEmailEpic,
		getUserInfoEpic,
		getUserInfoSuccessEpic,
		verifyPhoneCodeEpic,
		uploadUserAvatarEpic,
		updateUserDataEpic,
		updateUserDataSuccessEpic,
		createRideEpic,
		loadAddressSuggestionsEpic,
		findRideEpic
	)
);
export const rootEpic = (action$, state$) => rootEpic$.pipe(
	mergeMap(epic => epic(action$, state$, {}))
);
