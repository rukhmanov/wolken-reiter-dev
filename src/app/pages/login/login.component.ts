import { Component, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormBreakPoints } from 'src/app/shared/types/types';
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
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL

  constructor(private fb: FormBuilder, private store: Store) {}

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

  sendForm() {
    console.log(this.checkoutForm.value)
  }

  @HostBinding("style.width") get getWidth() {
    return this.hostWidth
  }
}
