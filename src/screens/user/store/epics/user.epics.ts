import { ActionsObservable } from 'redux-observable';
import {
  getUserFailed,
  getUserInfoSuccess,
  updateUserDataFailed,
  updateUserDataSuccess,
  uploadUserAvatarFailed,
  uploadUserAvatarSuccess,
  UserActions,
  UserActionsTypes,
} from '../actions';
import { catchError, filter, ignoreElements, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { from, of } from 'rxjs';
import { API_BASE } from '../../../../constants';
import { isOfType } from 'typesafe-actions';
import { getIsFirstLogin } from '../reducers';
import SplashScreen from 'react-native-splash-screen';
import NavigationService from '../../../../navigation/navigationService';

export const getUserInfoEpic = (action$: ActionsObservable<any>) => action$.pipe(
  filter(isOfType(UserActionsTypes.GET_USER)),
  mergeMap(action =>
    from(axios.get(`${ API_BASE }/users/me`))
      .pipe(
        tap(() => SplashScreen.hide()),
        map((response: AxiosResponse) => getUserInfoSuccess(response.data)),
        catchError(e => {
          if ((e && e.status) === 401) {
          }
          return of(getUserFailed(e));
        }),
      ),
  ),
);

export const getUserInfoSuccessEpic = (action$: ActionsObservable<any>, state$: any) => action$.pipe(
  filter(isOfType(UserActionsTypes.GET_USER_SUCCESS)),
  tap(() => {
    const isFirstLogin = getIsFirstLogin(state$.value);
    if (isFirstLogin) {
      NavigationService.navigate('InitialSetupScreen');
    } else {
      NavigationService.navigate('LoggedInScreens');
    }
  }),
  ignoreElements(),
);

export const uploadUserAvatarEpic = (actions$: ActionsObservable<UserActions>) => actions$.pipe(
  filter(isOfType(UserActionsTypes.UPLOAD_AVATAR)),
  map(action => action.payload.data),
  switchMap(data =>
    from(axios({
      method: 'POST',
      url: `${ API_BASE }/users/upload-avatar`,
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
    }))
      .pipe(
        map((response: AxiosResponse) => uploadUserAvatarSuccess(response.data.imageUrl)),
        catchError((error: AxiosError) => of(uploadUserAvatarFailed(error.response.data.message))),
      ),
  ),
);

export const updateUserDataEpic = (actions$: ActionsObservable<UserActions>) => actions$.pipe(
  filter(isOfType(UserActionsTypes.UPDATE_USER_DATA)),
  map(action => action.payload.data),
  switchMap(data =>
    from(axios.post(`${ API_BASE }/users/me`, data))
      .pipe(
        map(() => {
          NavigationService.navigate('LoggedInScreens');
          return updateUserDataSuccess();
        }),
        catchError((error: AxiosError) => of(updateUserDataFailed(error.response.data.message))),
      ),
  ),
);

export const updateUserDataSuccessEpic = (actions$: ActionsObservable<UserActions>) => actions$.pipe(
  filter(isOfType(UserActionsTypes.UPDATE_USER_DATA_SUCCESS)),
  // tap(() => pushDashboardScreen()),
  ignoreElements(),
);
