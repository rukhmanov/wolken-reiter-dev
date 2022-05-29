import { createFeatureSelector } from '@ngrx/store';
import { User } from '../reducers/user.reducers';

export const selectUserState = createFeatureSelector<User>('user')
