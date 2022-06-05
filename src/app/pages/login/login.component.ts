import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { animations } from 'src/app/animations/animations';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="checkoutForm" class="form" (ngSubmit)="sendForm()">
      <a class="form__close" mat-icon-button routerLink="/">
        <mat-icon class="form__close-icon">close</mat-icon>
      </a>
      <ul class="form__list">
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter e-mail</mat-label>
            <input formControlName="email" matInput type="text">
          </mat-form-field>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter password</mat-label>
            <input formControlName="password" matInput type="text">
          </mat-form-field>
        </li>
      </ul>
      <div class="form__buttons">
        <button type="button" color="warn" class="form__login" mat-flat-button>Log in</button>
        <a class="form__signup" mat-icon-button routerLink="/signup">Sign up</a>
        <button color="primary" class="form__submit" mat-flat-button>Submit</button>
      </div>
    </form>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  checkoutForm!: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setForm()
  }

  setForm(): void {
    this.checkoutForm = this.fb.group({
      email: '',
      password: '',
    })
  }

  sendForm() {
    console.log(this.checkoutForm.value)
  }
}
