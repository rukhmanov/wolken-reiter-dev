import { createReducer } from '@ngrx/store';

export const ADMIN_AUTH_FEATURE_NAME = 'adminAuth'

export interface AuthData {
  accessToken: string;
}

export interface AdminAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData;
}

const initialState: AdminAuthState = {
  loading: false,
  loaded: false,
  serverError: ""
}

export const adminAuthReducer = createReducer(initialState)
