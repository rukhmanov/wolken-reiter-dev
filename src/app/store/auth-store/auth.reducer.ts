import { createReducer, on } from '@ngrx/store';
import { removeUserData, saveUserData } from './auth.actions';

export const AUTH_FEATURE_NAME = "auth"

export interface Auth {
  name: string,
  surname: string,
  email: string,
  token: string
}
const userData: Auth = JSON.parse(<string>localStorage.getItem("auth"));

const initialAuthState = {
  name: "",
  surname: "",
  email: "",
  token: "",
}

export const authReducer = createReducer(initialAuthState,
  on(saveUserData, (state, { data }) => ({
    ...state,
    ...data
  })),
  on(removeUserData, () => ({
    ...initialAuthState,
  }))
)
