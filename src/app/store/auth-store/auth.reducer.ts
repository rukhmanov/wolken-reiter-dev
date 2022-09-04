import { createReducer, on } from '@ngrx/store';
import { AccessTokenData } from 'src/app/shared/types/types';
import { logout, removeToken, removeUserData, saveToken, saveUserData, verifyEmail } from './auth.actions';

export const AUTH_FEATURE_NAME = "auth"

export interface UserData {
  name: string,
  surname: string,
  email: string,
}

export interface Auth {
  userData: null | UserData,
  accessToken: null | AccessTokenData,
  verified: boolean,
}

const initialAuthState: Auth = {
  userData: null,
  accessToken: null,
  verified: false,
}

export const authReducer = createReducer(initialAuthState,
  on(saveToken, (state, { accessToken }) => ({
    ...state,
    accessToken
  })),
  on(removeToken, (state) => ({
    ...state,
    refreshToken: null
  })),
  on(saveUserData, (state, { userData }) => ({
    ...state,
    userData
  })),
  on(removeUserData, (state) => ({
    ...state,
    userData: null
  })),
  on(verifyEmail, (state, { verified }) => ({
    ...state,
    verified: verified
  })),
  on(logout, () => ({
    ...initialAuthState,
  }))
)
