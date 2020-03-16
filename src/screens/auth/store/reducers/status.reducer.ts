import { AuthActions, AuthActionTypes } from '../actions'
import { RootState } from '../../../../redux/store/reducers'

export interface StatusState {
	loggedIn: boolean;
	loggingIn: boolean;
	token: string | null;
	refreshToken: string | null;
	tokenSource: string | null;
	error: string | null;
}

const initialState: StatusState = {
	loggedIn: false,
	loggingIn: false,
	token: null,
	refreshToken: null,
	tokenSource: null,
	error: null
}

export default function (state = initialState, action: AuthActions) {
	switch (action.type) {
		case AuthActionTypes.REQUEST_PASSWORD_RESET_SUCCESS:
			return {
				...state,
				error: null
			}
		case AuthActionTypes.REQUEST_PASSWORD_RESET_FAILED:
			return {
				...state,
				error: action.payload.error
			}
		case AuthActionTypes.REGISTER_BY_EMAIL:
			return {
				...state,
				error: null,
				loggingIn: true
			};
		case AuthActionTypes.REGISTER_BY_EMAIL_SUCCESS:
			return {
				...state,
				loggingIn: false,
				loggedIn: true,
				error: null,
				token: action.payload.accessToken,
				refreshToken: action.payload.refreshToken
			}
		case AuthActionTypes.REGISTER_BY_EMAIL_FAILED:
			return {
				...state,
				loggingIn: false,
				error: action.payload.error
			}
		case AuthActionTypes.LOGIN:
			return {
				...state,
				error: null,
				loggingIn: true
			}
		case AuthActionTypes.SOCIAL_LOGIN:
			return {
				...state,
				error: null,
				loggingIn: true
			}
		case AuthActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				loggingIn: false,
				loggedIn: true,
				error: null,
				token: action.payload.accessToken,
				refreshToken: action.payload.refreshToken
			}

		case AuthActionTypes.LOGIN_FAILED:
			return {
				...state,
				error: action.payload.error
			}

		case AuthActionTypes.REFRESH_TOKEN_SUCCESS:
			return {
				...state,
				token: action.payload.accessToken,
				refreshToken: action.payload.refreshToken
			}

		case AuthActionTypes.REFRESH_TOKEN_FAILED:
			return {
				...state,
				error: action.payload.error
			}

		case AuthActionTypes.LOGOUT: {
			return {
				...state,
				loggedIn: false,
				loggingIn: false,
				token: null,
				error: null,
				refreshToken: null,
				tokenSource: null
			}
		}
		default:
			return state
	}
}

export function getAuthStatusState(state: RootState) {
	return state.auth.status
}
export function getIsLoggedIn(state: RootState) {
	return state.auth.status.loggedIn;
}
export function getAuthToken(state: RootState): string {
	return state.auth.status.token;
}
