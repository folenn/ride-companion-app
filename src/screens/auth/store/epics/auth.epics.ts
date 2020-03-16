import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { isOfType } from 'typesafe-actions';
import { REHYDRATE } from 'redux-persist';
import {
	AuthActions,
	AuthActionTypes,
	autoLogin,
	loginFailed,
	loginSuccess,
	logoutSuccess,
	registerByEmailFailed,
	registerByEmailSuccess,
	requestPasswordResetFailed,
	requestPasswordResetSuccess,
	requestPhoneVerificationFailed,
	requestPhoneVerificationSuccess,
	verifyPhoneCodeFailed,
} from '../actions';
import { API_BASE } from '../../../../constants';
import { Action } from 'redux';
import { from, of } from 'rxjs';
import { AuthenticateSuccess } from '../../models';
import { phoneCodeVerificationRoute, requestPhoneCodeRoute, socialLoginRoute } from '../../constants';
import { getAuthToken, getIsLoggedIn } from '../reducers';
import { getUserInfo } from '../../../user/store/actions';
import SplashScreen from 'react-native-splash-screen';
import NavigationService from '../../../../navigation/navigationService';

export const autoLoginEpic = (actions$: ActionsObservable<Action>, state$) => actions$.pipe(
  ofType(REHYDRATE),
  map((action: any) => action.payload),
  map(payload => {
    const loggedIn = getIsLoggedIn(state$.value);
    if (loggedIn) {
      NavigationService.navigate('LoggedInScreens');
      return getUserInfo({token: getAuthToken(state$.value)})
    } else {
      SplashScreen.hide();
      return autoLogin(loggedIn);
    }
  }),
);

export const registerByEmailEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.REGISTER_BY_EMAIL)),
  map(action => action.payload),
  switchMap(register => {
	  return from(axios.post<AxiosResponse<AuthenticateSuccess>>(`${ API_BASE }/auth/register`, register))
      .pipe(
        map((response: AxiosResponse) => registerByEmailSuccess(response.data)),
        catchError((e: AxiosError) => of(registerByEmailFailed(e && e.response && e.response.data && e.response.data.message || 'Undefined error')))
      )
  })
);

export const requestPasswordResetEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.REQUEST_PASSWORD_RESET)),
  map(action => action.payload),
  switchMap(resetRequest => {
	  return from(axios.post<AxiosResponse>(`${ API_BASE }/auth/password-reset`, resetRequest))
      .pipe(
        map((response: AxiosResponse) => requestPasswordResetSuccess()),
        catchError((e: AxiosError) => of(requestPasswordResetFailed(e && e.response && e.response.data && e.response.data.message || 'Undefined error')))
      )
  })
);

export const loginEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.LOGIN)),
  map(action => action.payload),
  switchMap(auth => {
	  return from(axios.post<AxiosResponse<AuthenticateSuccess>>(`${ API_BASE }/auth/login`, auth))
        .pipe(
          map((response: AxiosResponse) => loginSuccess(response.data)),
          catchError((e: AxiosError) => of(loginFailed(e && e.response && e.response.data && e.response.data.message || 'Undefined error')))
        );
    }
  )
);

export const requestPhoneVerificationCodeEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.REQUEST_PHONE_VERIFICATION)),
  map(action => action.payload),
  switchMap(auth => {
	  return from(axios.post<AxiosResponse<any>>(requestPhoneCodeRoute, auth))
      .pipe(
        map((response: AxiosResponse) => {
          NavigationService.navigate('PhoneCodeVerificationScreen');
          return requestPhoneVerificationSuccess();
        }),
        catchError(e => of(requestPhoneVerificationFailed(e)))
      );
  })
);

export const verifyPhoneCodeEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.VERIFY_PHONE_CODE)),
  map(action => action.payload),
  switchMap(payload => {
	  return from(axios.post<AxiosResponse<AuthenticateSuccess>>(phoneCodeVerificationRoute, payload))
      .pipe(
        map((response: AxiosResponse) => loginSuccess(response.data)),
        catchError(e => of(verifyPhoneCodeFailed(e)))
      );
  })
);

export const loginSuccessEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.LOGIN_SUCCESS)),
  map(action => action.payload),
  tap(() => NavigationService.navigate('LoggedInScreens')),
  map(auth => getUserInfo({token: auth.accessToken}))
);

export const socialLoginEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.SOCIAL_LOGIN)),
  map(action => action.payload),
  switchMap(payload => {
	  return from(axios.post<AxiosResponse<AuthenticateSuccess>>(socialLoginRoute, {accessToken: payload.accessToken}, {
      headers: {
        'Token-Source': payload.tokenSource
      }
    }))
      .pipe(
        map((response: AxiosResponse) => loginSuccess(response.data)),
        catchError((e: AxiosError) => of(loginFailed(e.message)))
      );
  })
);

export const logoutEpic = (actions$: ActionsObservable<AuthActions>) => actions$.pipe(
  filter(isOfType(AuthActionTypes.LOGOUT)),
  tap(() => NavigationService.navigate('NotLoggedInScreens')),
  map(() => logoutSuccess())
);
