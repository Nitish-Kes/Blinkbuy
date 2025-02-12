export type LoginPayload = {
    email: string,
    password: string
}

export type LoginResponse = {
    email: string,
    token: string | null,
    provider: LOGIN_TYPES
}

export type GoogleLoginResponse = {
    firstName: string | null,
    lastName: string | null,
    email: string,
    provider: LOGIN_TYPES,
    idToken: string | null
  };

export enum LOGIN_TYPES {
    EMAIL,
    GOOGLE,
    MICROSOFT,
    FACEBOOK
}