import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormBreakPoints } from 'src/app/shared/types/types';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';

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
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL
  checkoutForm!: FormGroup

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getHandset)).subscribe((isHandset: boolean) => {
      this.hostWidth = isHandset ? FormBreakPoints.SMALL : FormBreakPoints.LARDGE
    })
    this.setForm()
  }

  setForm(): void {
    this.checkoutForm = this.fb.group({
      name: ["", Validators.required],
      surname: "",
      email: ["", Validators.required],
      phone: "",
      password: ["", Validators.required],
      r_password: ["", Validators.required],
    })
  }

  sendForm() {
    console.log(this.checkoutForm.value)
  }

  @HostBinding("style.width") get getWidth() {
    return this.hostWidth
  }
}
