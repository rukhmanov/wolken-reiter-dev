import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { adminAuthReducer } from './store/admin-aurh-reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('adminAuth', adminAuthReducer)
  ]
})
export class AdminAuthStoreModule { }
