import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AnimationRoutingNames } from './animations/animations';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    data: { animation: AnimationRoutingNames.MAIN_PAGE }
  },
  {
    path: "login",
    component: LoginComponent,
    data: { animation: AnimationRoutingNames.LOGIN }
  },
  {
    path: "signup",
    component: SignupComponent,
    data: { animation: AnimationRoutingNames.SIGNUP }
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot({})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
