export interface Authenticate {
    email?: string;
    password?: string;
    phone?: string;
}

export interface PasswordReset {
  email: string;
}

export interface AuthenticateSocial {
  accessToken: string;
  tokenSource: 'google' | 'facebook';
}

export interface AuthenticateSuccess {
    accessToken: string | null;
    refreshToken: string | null;
    idToken?: string | null;
}
