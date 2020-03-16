import {API_BASE} from '../../../constants';

export const requestPhoneCodeRoute = `${API_BASE}/auth/login-by-phone`;
export const phoneCodeVerificationRoute = `${API_BASE}/auth/verify-phone-code`;
export const socialLoginRoute = `${API_BASE}/auth/social-login`;
