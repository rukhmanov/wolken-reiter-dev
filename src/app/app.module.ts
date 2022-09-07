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
import { appStateReducer, ROOT_FEATURE_NAME } from './store/root-store/store/root.reducer';
import { BreakpointWidthDirective } from './shared/directives/breakpoint-width.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthStoreModule } from './store/auth-store/auth-store.module';
import { VerifyModule } from './pages/verify/verify.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { ProductCardModule } from './shared/components/product-card/product-card/product-card.module';
import { MainPageModule } from './pages/main-page/main-page.module';
import { NavPanelModule } from './shared/components/nav-panel/nav-panel.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BreakpointWidthDirective,
    DialogComponent,
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
    LoginModule,
    MainPageModule,
    SignupModule,
    NotFoundModule,
    StoreModule.forRoot({[ROOT_FEATURE_NAME]: appStateReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreDevtoolsModule.instrument({name: 'my NgRx'}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    AuthStoreModule,
    VerifyModule,
    MatDialogModule,
    ProductCardModule,
    NavPanelModule
  ],
  entryComponents: [DialogComponent],
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
