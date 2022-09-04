import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as authActions from './auth.actions';
import { UserData } from './auth.reducer';

@Injectable()
export class AuthEffect {
  saveUserDataEffect$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.saveToken),
    switchMap((_) => {
        return this.auth.getUserData().pipe(
          map((userData: UserData) => authActions.saveUserData({ userData })),
        )
    }),
  ))
  constructor(private actions$: Actions, private auth: AuthService) {}
}
