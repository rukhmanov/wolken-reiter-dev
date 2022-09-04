import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth, AUTH_FEATURE_NAME } from './auth.reducer';

export const getAuthData = createFeatureSelector<Auth>(AUTH_FEATURE_NAME)
export const getAccessToken = createSelector(getAuthData, (state) => state.accessToken)

