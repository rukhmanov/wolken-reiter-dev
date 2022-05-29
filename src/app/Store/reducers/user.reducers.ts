import { createReducer, on } from '@ngrx/store';
import { signInSuccess } from '../actions/user.action';

export interface User {
  name: string | null;
  lastName: string | null;
  email: string | null;
}

export const initialUser: User = {
  name: null,
  lastName: null,
  email: null,
}

export const reducer = createReducer(
  initialUser,
  on(signInSuccess, (state, { user }) => ({
    ...state,
    ...user
  }))
)
