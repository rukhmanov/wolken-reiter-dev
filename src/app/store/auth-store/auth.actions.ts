import { createAction, props } from '@ngrx/store';
import { Auth } from './auth.reducer';

export const saveUserData = createAction("[auth] save user data", props<{ data: Auth}>())
export const removeUserData = createAction("[auth] remove user data")
