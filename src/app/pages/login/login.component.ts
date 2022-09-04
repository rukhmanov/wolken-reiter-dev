import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { FormBreakPoints, LoginData } from 'src/app/shared/types/types';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';
import { userNotExistsValidator } from 'src/app/validators/user-not-exists.validator';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="checkoutForm" [ngStyle]="{width: hostWidth}" class="form" (ngSubmit)="sendForm()">
      <a [ngClass]="{'small-display__close': !isHandset}" class="form__close" mat-icon-button routerLink="/">
        <mat-icon [ngClass]="{'small-display__close-icon': !isHandset}" class="form__close-icon">close</mat-icon>
      </a>
      <ul class="form__list">
        <li class="form__item">
          <mat-form-field  #email color="accent" class="form__field" appearance="outline">
            <mat-label>Enter e-mail</mat-label>
            <input formControlName="email" matInput type="text">
          </mat-form-field>
          <mat-error *ngIf="checkoutForm.get('email')?.hasError('required') && isButtonPressed">
           Email is <strong>required</strong>
          </mat-error>
          <mat-error *ngIf="checkoutForm.get('email')?.hasError('emailNotExists')">
            The e-mail does <strong>not exist</strong>
          </mat-error>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter password</mat-label>
            <input formControlName="password" matInput type="text">
          </mat-form-field>
          <mat-error *ngIf="checkoutForm.get('password')?.hasError('required') && isButtonPressed">
           Password is <strong>required</strong>
          </mat-error>
          <mat-error *ngIf="(auth.serverError === 'password') && isButtonPressed">
            Invalid <strong>password</strong>
          </mat-error>
        </li>
      </ul>
      <div class="form__buttons">
        <button type="button" color="warn" type="button" class="form__login" mat-flat-button>Log in</button>
        <a class="form__signup" mat-icon-button routerLink="/signup">Sign up</a>
        <button color="primary" class="form__submit" mat-flat-button>Submit</button>
      </div>
    </form>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isButtonPressed: boolean = false;
  isHandset: boolean = false;
  // ставим any из-за невозможности типизировать реактивные формы
  // структуру формы можно посмотреть в LoginData
  checkoutForm!:  any | FormGroup | LoginData
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL

  constructor(private fb: FormBuilder, private store: Store, public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.store.pipe(select(getHandset)).subscribe((isHandset: boolean) => {
      this.isHandset = isHandset
      this.hostWidth = isHandset ? FormBreakPoints.SMALL : FormBreakPoints.LARDGE
    })
    this.setForm()
  }

  setForm(): void {
    this.checkoutForm = this.fb.group({
      email: ["", {
        validators: [Validators.required],
        asyncValidators: userNotExistsValidator(this.auth),
        updateOn: "blur"
      }],
      password: ["", Validators.required],
    })
  }

  sendForm(): void {
    this.isButtonPressed = true
    this.auth.serverError = null
    if(!this.checkoutForm.valid) return
    this.auth.sendLoginForm(this.checkoutForm.value as LoginData)
    this.setForm()
    this.router.navigate(['/'])
  }
}
