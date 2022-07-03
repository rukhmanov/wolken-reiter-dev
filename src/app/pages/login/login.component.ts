import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormBreakPoints, LoginData } from 'src/app/shared/types/types';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="checkoutForm" class="form" (ngSubmit)="sendForm()">
      <a class="form__close" mat-icon-button routerLink="/">
        <mat-icon class="form__close-icon">close</mat-icon>
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
          <mat-error *ngIf="(serverError === 'login') && isButtonPressed">
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
          <mat-error *ngIf="(serverError === 'password') && isButtonPressed">
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
  serverError: "login" | "password" | null = null;
  // ставим any из-за невозможности типизировать реактивные формы
  // структуру формы можно посмотреть в LoginData
  checkoutForm!:  any | FormGroup | LoginData
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL

  constructor(private fb: FormBuilder, private store: Store, private auth: AuthService) {}

  ngOnInit(): void {
    this.store.pipe(select(getHandset)).subscribe((isHandset: boolean) => {
      this.hostWidth = isHandset ? FormBreakPoints.SMALL : FormBreakPoints.LARDGE
    })
    this.setForm()
  }

  setForm(): void {
    this.checkoutForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  sendForm(): void {
    this.isButtonPressed = true
    this.serverError = null
    if(!this.checkoutForm.valid) return
    this.auth.login(this.checkoutForm.value)
    .pipe(
      catchError((err) => {
      this.serverError = err.error.type
      return new Observable()
      }
    ))
    .subscribe(resp => {
    })
  }

  @HostBinding("style.width") get getWidth() {
    return this.hostWidth
  }
}
