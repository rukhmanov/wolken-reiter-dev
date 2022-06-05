import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  template: `
    <form [formGroup]="checkoutForm" class="form" (ngSubmit)="sendForm()">
      <a class="form__close" mat-icon-button routerLink="/">
        <mat-icon class="form__close-icon">close</mat-icon>
      </a>
      <mat-form-field color="accent" class="form__field" appearance="outline">
        <mat-label>Enter login</mat-label>
        <input formControlName="login" matInput type="text">
      </mat-form-field>
      <mat-form-field color="accent" class="form__field" appearance="outline">
        <mat-label>Enter password</mat-label>
        <input formControlName="login" matInput type="text">
      </mat-form-field>
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
      login: '',
      password: '',
    })
  }

  sendForm() {
    console.log(this.checkoutForm.value)
  }
}
