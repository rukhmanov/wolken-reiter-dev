import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card/product-card.module';



@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    ProductCardModule,
    CommonModule,
  ]
})
export class MainPageModule { }
