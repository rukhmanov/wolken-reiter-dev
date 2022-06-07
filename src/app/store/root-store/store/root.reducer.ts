import { createReducer, on } from '@ngrx/store'
import { changeHandset } from './root.actions'

export const ROOT_FEATURE_NAME = 'root'


export interface Appstate {
  isHandset: boolean
}

export const initialState: Appstate = {
  isHandset: false
}

export const appStateReducer = createReducer(
  initialState,
  on(changeHandset, (state, { isHandset }) => ({
    ...state,
    isHandset
  }))
  )
