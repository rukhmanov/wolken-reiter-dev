import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="checkoutForm" class="form" (ngSubmit)="sendForm()">
      <button class="form__close" mat-icon-button routerLink="/">
        <mat-icon class="form__close-icon">close</mat-icon>
      </button>
      <mat-form-field color="accent" class="form__field" appearance="outline">
        <mat-label>Enter login</mat-label>
        <input formControlName="login" matInput type="text">
      </mat-form-field>
      <mat-form-field color="accent" class="form__field" appearance="outline">
        <mat-label>Enter password</mat-label>
        <input formControlName="login" matInput type="text">
      </mat-form-field>
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
      login: '',
      password: '',
    })
  }

  sendForm() {
    console.log(this.checkoutForm.value)
  }
}
