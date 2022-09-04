import { createAction, props } from '@ngrx/store';
import { AccessTokenData } from 'src/app/shared/types/types';
import { UserData } from './auth.reducer';

export enum AuthActions {
  saveToken = "[auth] save tokens",
  removeToken = "[auth] remove tokens",
  saveUserData = "[auth] save user data",
  removeUserData = "[auth] remove user data",
  verifyEmail = "[auth] verify email",
  logout = "[auth] logout",
}

export const saveToken = createAction( AuthActions.saveToken, props<{ accessToken: AccessTokenData }>() )
export const removeToken = createAction( AuthActions.removeToken )
export const saveUserData = createAction( AuthActions.saveUserData, props<{ userData: UserData }>() )
export const removeUserData= createAction( AuthActions.removeUserData )
export const verifyEmail = createAction( AuthActions.verifyEmail, props<{ verified: boolean  }>() )
export const logout= createAction( AuthActions.logout )

