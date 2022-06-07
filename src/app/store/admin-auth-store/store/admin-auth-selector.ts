import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AdminAuthState, ADMIN_AUTH_FEATURE_NAME, AuthData } from './admin-aurh-reducer';

const getFeature = createFeatureSelector<AdminAuthState>(ADMIN_AUTH_FEATURE_NAME)

export const getLoading: MemoizedSelector<AdminAuthState, boolean> = createSelector(
  getFeature,
  (state: AdminAuthState) => state.loading
)

export const getLoaded: MemoizedSelector<AdminAuthState, boolean> = createSelector(
  getFeature,
  (state: AdminAuthState) => state.loaded
)

const getAuthData: MemoizedSelector<AdminAuthState, AuthData | undefined> = createSelector(
  getFeature,
  (state: AdminAuthState) => state.authData
)

export const getServerError: MemoizedSelector<AdminAuthState, string> = createSelector(
  getFeature,
  (state: AdminAuthState) => state.serverError
)

export const getAccessToken: MemoizedSelector<AdminAuthState, string | undefined> = createSelector(
  getAuthData,
  (authData: AuthData | undefined) => authData && authData.accessToken
)


export const isAdminAuth: MemoizedSelector<AdminAuthState, boolean> = createSelector(
  getAccessToken,
  (accessToken: string | undefined) => !!accessToken
)
