import { createAction, props } from '@ngrx/store';


export const changeHandset = createAction("[root layout] change handeset mode", props<{isHandset: boolean}>());
