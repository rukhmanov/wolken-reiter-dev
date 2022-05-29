import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot({})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
