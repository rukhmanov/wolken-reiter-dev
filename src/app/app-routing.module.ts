import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AnimationRoutingNames } from './animations/animations';
import { MainDeactivateGuard } from './guards/main-deactivate.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyComponent } from './pages/verify/verify.component';

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    data: { animation: AnimationRoutingNames.MAIN_PAGE }
  },
  {
    path: "login",
    canDeactivate: [MainDeactivateGuard],
    component: LoginComponent,
    data: { animation: AnimationRoutingNames.LOGIN }
  },
  {
    path: "signup",
    canDeactivate: [MainDeactivateGuard],
    component: SignupComponent,
    data: { animation: AnimationRoutingNames.SIGNUP }
  },
  {
    path: "verify/:token",
    component: VerifyComponent,
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
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
