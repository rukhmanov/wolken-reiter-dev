import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPanelComponent } from './nav-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NavPanelComponent
  ],
  exports: [
    NavPanelComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class NavPanelModule { }
