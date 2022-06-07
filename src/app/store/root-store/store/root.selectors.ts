import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Appstate, ROOT_FEATURE_NAME } from './root.reducer';

const getRoot = createFeatureSelector<Appstate>(ROOT_FEATURE_NAME)

export const getHandset: MemoizedSelector<{}, boolean> = createSelector(
  getRoot,
  (state) => state.isHandset
)
