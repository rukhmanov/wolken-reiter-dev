import { createFeatureSelector } from '@ngrx/store';
import { Auth, AUTH_FEATURE_NAME } from './auth.reducer';

export const getAuthData = createFeatureSelector<Auth>(AUTH_FEATURE_NAME)
