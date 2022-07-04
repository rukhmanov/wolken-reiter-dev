import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authReducer, AUTH_FEATURE_NAME } from './auth.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer)
  ]
})
export class AuthStoreModule { }
