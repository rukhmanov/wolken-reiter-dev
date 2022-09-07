import { Component, OnInit } from '@angular/core';
import { animations } from 'src/app/animations/animations';

@Component({
  selector: 'app-main-page',
  template: `
  <app-product-card></app-product-card>
  `,
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
