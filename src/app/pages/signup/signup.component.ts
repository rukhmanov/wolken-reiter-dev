import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { animations } from 'src/app/animations/animations';

@Component({
  selector: 'app-signup',
  template: `
    <form [formGroup]="checkoutForm" class="form" (ngSubmit)="sendForm()">
      <a class="form__close" mat-icon-button routerLink="/">
        <mat-icon class="form__close-icon">close</mat-icon>
      </a>
      <ul class="form__list">
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter name</mat-label>
            <input formControlName="name" matInput type="text">
          </mat-form-field>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter surname</mat-label>
            <input formControlName="surname" matInput type="text">
          </mat-form-field>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter e-mail</mat-label>
            <input formControlName="email" matInput type="text">
          </mat-form-field>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter phone</mat-label>
            <input formControlName="phone" matInput type="text">
          </mat-form-field>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter password</mat-label>
            <input formControlName="password" matInput type="text">
          </mat-form-field>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Repeat password</mat-label>
            <input formControlName="r_password" matInput type="text">
          </mat-form-field>
        </li>
      </ul>
      <div class="form__buttons">
        <a class="form__login" mat-icon-button routerLink="/login">Log in</a>
        <button color="warn" class="form__signup" mat-flat-button>Sign up</button>
        <button color="primary" class="form__submit" mat-flat-button>Submit</button>
      </div>
    </form>
  `,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  checkoutForm!: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setForm()
  }

  setForm(): void {
    this.checkoutForm = this.fb.group({
      name: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      r_password: '',
    })
  }

  sendForm() {
    console.log(this.checkoutForm.value)
  }
}
