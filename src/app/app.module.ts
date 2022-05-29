import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import * as fromUserReducers  from './Store/reducers/user.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
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
    MaterialModule,
    StoreModule.forRoot({user: fromUserReducers.reducer}),
    StoreDevtoolsModule.instrument({name: 'my NgRx'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
