import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginModule } from './pages/login/login.module';
import { SignupModule } from './pages/signup/signup.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { NavComponent } from './layouts/layout-first/nav.component';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AdminAuthStoreModule } from './store/admin-auth-store/admin-auth-store.module';
import { appStateReducer, ROOT_FEATURE_NAME } from './store/root-store/store/root.reducer';
import { BreakpointWidthDirective } from './shared/directives/breakpoint-width.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BreakpointWidthDirective,
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    StoreDevtoolsModule.instrument({name: 'my NgRx'}),
    LoginModule,
    SignupModule,
    NotFoundModule,
    StoreModule.forRoot({[ROOT_FEATURE_NAME]: appStateReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    AdminAuthStoreModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
