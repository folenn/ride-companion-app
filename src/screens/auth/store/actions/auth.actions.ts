// import {
//   pushDashboardScreen,
//   pushLoginScreen,
//   pushPhoneVerificationCodeScreen
// } from '../../../../navigation/navigation';
import { Authenticate, AuthenticateSocial, AuthenticateSuccess, PasswordReset } from '../../models'
import { Action } from 'redux';
import { RehydrateAction } from 'redux-persist/es/types';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILED = '[Auth] Login Failed',
  SOCIAL_LOGIN = '[Auth] Social login',
  SOCIAL_LOGIN_SUCCESS = '[Auth] Social login Success',
  SOCIAL_LOGIN_FAILED = '[Auth] Social login Failed',

  REGISTER_BY_EMAIL = '[Auth] Register by Email',
  REGISTER_BY_EMAIL_SUCCESS = '[Auth] Register by Email Success',
  REGISTER_BY_EMAIL_FAILED = '[Auth] Register by Email Failed',

  REQUEST_PASSWORD_RESET = '[Auth] Request Password reset',
  REQUEST_PASSWORD_RESET_SUCCESS = '[Auth] Request Password reset Success',
  REQUEST_PASSWORD_RESET_FAILED = '[Auth] Request Password reset Failed',

  REGISTER_BY_PHONE = '[Auth] Register by Phone',
  REGISTER_BY_PHONE_SUCCESS = '[Auth] Register by Phone Success',
  REGISTER_BY_PHONE_FAILED = '[Auth] Register by Phone Failed',

  REQUEST_PHONE_VERIFICATION = '[Auth] Request phone verification',
  REQUEST_PHONE_VERIFICATION_SUCCESS = '[Auth] Request phone verification Success',
  REQUEST_PHONE_VERIFICATION_FAILED = '[Auth] Request phone verification Failed',

  VERIFY_PHONE_CODE = '[Auth] Verify phone code',
  VERIFY_PHONE_CODE_SUCCESS = '[Auth] Verify phone code Success',
  VERIFY_PHONE_CODE_FAILED = '[Auth] Verify phone code Failed',

  AUTO_LOGIN = '[Auth] Auto login',

  REFRESH_TOKEN = '[Auth] Refresh token',
  REFRESH_TOKEN_SUCCESS = '[Auth] Refresh token success',
  REFRESH_TOKEN_FAILED = '[Auth] Refresh token failed',

  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success'
}

export interface LoginAction extends Action {
  type: AuthActionTypes.LOGIN;
  payload: Authenticate;
}

export function login(payload: Authenticate): LoginAction {
  return {
    type: AuthActionTypes.LOGIN,
    payload
  };
}

export interface LoginFailedAction extends Action {
  type: AuthActionTypes.LOGIN_FAILED;
  payload: { error: string };
}

export function loginFailed(error: string): LoginFailedAction {
  // pushNotification('error', 'Error', error);
  return {
    type: AuthActionTypes.LOGIN_FAILED,
    payload: {error}
  };
}

export interface LoginSuccessAction extends Action {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: AuthenticateSuccess;
}

export function loginSuccess(payload: AuthenticateSuccess): LoginSuccessAction {
  // pushNotification('success', 'Success', `You're logged in.`);
  return {
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload
  };
}

export interface RegisterByEmailAction extends Action {
  type: AuthActionTypes.REGISTER_BY_EMAIL;
  payload: Authenticate;
}

export function registerByEmail(payload: Authenticate): RegisterByEmailAction {
  return {
    type: AuthActionTypes.REGISTER_BY_EMAIL,
    payload
  };
}

export interface RegisterByEmailSuccessAction extends Action {
  type: AuthActionTypes.REGISTER_BY_EMAIL_SUCCESS;
  payload: AuthenticateSuccess;
}

export function registerByEmailSuccess(payload: AuthenticateSuccess): RegisterByEmailSuccessAction {
  return {
    type: AuthActionTypes.REGISTER_BY_EMAIL_SUCCESS,
    payload
  };
}

export interface RegisterByEmailFailedAction extends Action {
  type: AuthActionTypes.REGISTER_BY_EMAIL_FAILED;
  payload: {error: string};
}

export function registerByEmailFailed(error: string): RegisterByEmailFailedAction {
  return {
    type: AuthActionTypes.REGISTER_BY_EMAIL_FAILED,
    payload: {error}
  };
}

export interface RequestPasswordResetAction extends Action {
  type: AuthActionTypes.REQUEST_PASSWORD_RESET;
  payload: PasswordReset;
}
export function requestPasswordReset(payload: PasswordReset): RequestPasswordResetAction {
  return {
    type: AuthActionTypes.REQUEST_PASSWORD_RESET,
    payload
  }
}
export interface RequestPasswordResetSuccessAction extends Action {
  type: AuthActionTypes.REQUEST_PASSWORD_RESET_SUCCESS;
}
export function requestPasswordResetSuccess(): RequestPasswordResetSuccessAction {
  return {
    type: AuthActionTypes.REQUEST_PASSWORD_RESET_SUCCESS,
  }
}
export interface RequestPasswordResetFailedAction extends Action {
  type: AuthActionTypes.REQUEST_PASSWORD_RESET_FAILED;
  payload: {error: string};
}
export function requestPasswordResetFailed(error: string): RequestPasswordResetFailedAction {
  return {
    type: AuthActionTypes.REQUEST_PASSWORD_RESET_FAILED,
    payload: {error}
  }
}

export interface RegisterByPhoneAction extends Action {
  type: AuthActionTypes.REGISTER_BY_PHONE;
  payload: Authenticate;
}

export function registerByPhone(payload: Authenticate): RegisterByPhoneAction {
  return {
    type: AuthActionTypes.REGISTER_BY_PHONE,
    payload
  };
}

export interface RegisterByPhoneSuccessAction extends Action {
  type: AuthActionTypes.REGISTER_BY_PHONE_SUCCESS;
  payload: AuthenticateSuccess;
}

export function registerByPhoneSuccess(payload: AuthenticateSuccess): RegisterByPhoneSuccessAction {
  return {
    type: AuthActionTypes.REGISTER_BY_PHONE_SUCCESS,
    payload
  };
}

export interface RegisterByPhoneFailedAction extends Action {
  type: AuthActionTypes.REGISTER_BY_PHONE_FAILED;
  payload: {error: string};
}

export function registerByPhoneFailed(error: string): RegisterByPhoneFailedAction {
  return {
    type: AuthActionTypes.REGISTER_BY_PHONE_FAILED,
    payload: {error}
  };
}

export interface RequestPhoneVerificationAction extends Action {
  type: AuthActionTypes.REQUEST_PHONE_VERIFICATION;
  payload: Authenticate;
}

export interface RequestPhoneVerificationSuccessAction extends Action {
  type: AuthActionTypes.REQUEST_PHONE_VERIFICATION_SUCCESS;
}

export interface RequestPhoneVerificationFailedAction extends Action {
  type: AuthActionTypes.REQUEST_PHONE_VERIFICATION_FAILED;
  payload: { error: string }
}

export function requestPhoneVerification(payload: Authenticate): RequestPhoneVerificationAction {
  return {
    type: AuthActionTypes.REQUEST_PHONE_VERIFICATION,
    payload
  };
}

export function requestPhoneVerificationSuccess(): RequestPhoneVerificationSuccessAction {
  // pushPhoneVerificationCodeScreen();
  return {
    type: AuthActionTypes.REQUEST_PHONE_VERIFICATION_SUCCESS
  };
}

export function requestPhoneVerificationFailed(error: string): RequestPhoneVerificationFailedAction {
  return {
    type: AuthActionTypes.REQUEST_PHONE_VERIFICATION_FAILED,
    payload: {error}
  };
}

export interface VerifyPhoneCodeAction extends Action {
  type: AuthActionTypes.VERIFY_PHONE_CODE;
  payload: {code: string | number};
}

export interface VerifyPhoneCodeSuccessAction extends Action {
  type: AuthActionTypes.VERIFY_PHONE_CODE_SUCCESS;
  payload: AuthenticateSuccess;
}

export function verifyPhoneCode(payload: {code: string | number}): VerifyPhoneCodeAction {
  return {
    type: AuthActionTypes.VERIFY_PHONE_CODE,
    payload: {code: +payload.code}
  }
}
export function verifyPhoneCodeSuccess(payload: AuthenticateSuccess): VerifyPhoneCodeSuccessAction {
  return {
    type: AuthActionTypes.VERIFY_PHONE_CODE_SUCCESS,
    payload
  }
}
export function verifyPhoneCodeFailed(error: string): VerifyPhoneCodeFailedAction {
  return {
    type: AuthActionTypes.VERIFY_PHONE_CODE_FAILED,
    payload: {error}
  }
}

export interface VerifyPhoneCodeFailedAction extends Action {
  type: AuthActionTypes.VERIFY_PHONE_CODE_FAILED;
  payload: { error: string }
}

export interface SocialLoginAction extends Action {
  type: AuthActionTypes.SOCIAL_LOGIN;
  payload: AuthenticateSocial;
}

export function socialLogin(payload: AuthenticateSocial): SocialLoginAction {
  return {
    type: AuthActionTypes.SOCIAL_LOGIN,
    payload
  };
}

export interface SocialLoginSuccessAction extends Action {
  type: AuthActionTypes.SOCIAL_LOGIN_SUCCESS;
  payload: AuthenticateSuccess;
}

export function socialLoginSuccess(payload: AuthenticateSuccess): SocialLoginSuccessAction {
  return {
    type: AuthActionTypes.SOCIAL_LOGIN_SUCCESS,
    payload
  };
}

export interface SocialLoginFailedAction extends Action {
  type: AuthActionTypes.SOCIAL_LOGIN_FAILED;
  payload: any;
}

export function socialLoginFailed(payload: any): SocialLoginFailedAction {
  return {
    type: AuthActionTypes.SOCIAL_LOGIN_FAILED,
    payload
  };
}

export interface AutoLoginAction extends Action {
  type: AuthActionTypes.AUTO_LOGIN;
  payload: { loggedIn: boolean };
}

export function autoLogin(loggedIn: boolean): AutoLoginAction {
  return {
    type: AuthActionTypes.AUTO_LOGIN,
    payload: {loggedIn}
  };
}

export interface RefreshTokenAction extends Action {
  type: AuthActionTypes.REFRESH_TOKEN;
  payload: any;
}

export interface RefreshTokenSuccessAction extends Action {
  type: AuthActionTypes.REFRESH_TOKEN_SUCCESS;
  payload: AuthenticateSuccess;
}

export function refreshTokenSuccess(payload: AuthenticateSuccess): RefreshTokenSuccessAction {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_SUCCESS,
    payload
  }
}

export interface RefreshTokenFailedAction extends Action {
  type: AuthActionTypes.REFRESH_TOKEN_FAILED;
  payload: {error: string};
}

export function refreshTokenFailed(error: string): RefreshTokenFailedAction {
  return {
    type: AuthActionTypes.REFRESH_TOKEN_FAILED,
    payload: {error}
  }
}

export interface LogoutAction extends Action {
  type: AuthActionTypes.LOGOUT;
}

export function logout(): LogoutAction {
  return {
    type: AuthActionTypes.LOGOUT
  };
}

export interface LogoutSuccessAction extends Action {
  type: AuthActionTypes.LOGOUT_SUCCESS;
}

export function logoutSuccess(): LogoutSuccessAction {
  // pushLoginScreen();
  return {
    type: AuthActionTypes.LOGOUT_SUCCESS
  };
}

export type AuthActions =
  LoginAction
  | LoginSuccessAction
  | RehydrateAction
  | LoginFailedAction
  | SocialLoginAction
  | SocialLoginSuccessAction
  | SocialLoginFailedAction
  | RequestPasswordResetAction
  | RequestPasswordResetSuccessAction
  | RequestPasswordResetFailedAction
  | RequestPhoneVerificationFailedAction
  | RegisterByEmailAction
  | RegisterByEmailSuccessAction
  | RegisterByEmailFailedAction
  | RegisterByPhoneAction
  | RegisterByPhoneSuccessAction
  | RegisterByPhoneFailedAction
  | LogoutAction
  | LogoutSuccessAction
  | RequestPhoneVerificationAction
  | RequestPhoneVerificationSuccessAction
  | RequestPhoneVerificationFailedAction
  | VerifyPhoneCodeAction
  | VerifyPhoneCodeSuccessAction
  | VerifyPhoneCodeFailedAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailedAction;
