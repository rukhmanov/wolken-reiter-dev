import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, Subject, takeUntil } from 'rxjs';
import { phoneCodes } from 'src/app/phone-codes';
import { AuthService } from 'src/app/services/auth.service';
import { FormBreakPoints, PhoneCode, SignupData } from 'src/app/shared/types/types';
import { getHandset } from 'src/app/store/root-store/store/root.selectors';
import { passwordMatchValidator } from 'src/app/validators/password-match.validator';
import { userExistsValidator } from 'src/app/validators/user-exists.validator';
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
          <mat-error *ngIf="checkoutForm.get('name')?.hasError('required') && isButtonPressed">
             Name is <strong>required</strong>
          </mat-error>
          <mat-error *ngIf="checkoutForm.get('name')?.hasError('minlength') && isButtonPressed">
             Min length is <strong>2 symbols</strong>
          </mat-error>
          <mat-error *ngIf="checkoutForm.get('name')?.hasError('maxlength') && isButtonPressed">
            Max length is <strong>25 symbols</strong>
          </mat-error>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter surname</mat-label>
            <input formControlName="surname" matInput type="text">
          </mat-form-field>
          <mat-error *ngIf="checkoutForm.get('surname')?.hasError('maxlength') && isButtonPressed">
            Max length is <strong>25 symbols</strong>
          </mat-error>
        </li>
        <li class="form__item">
          <mat-form-field color="accent" class="form__field" appearance="outline">
            <mat-label>Enter e-mail</mat-label>
            <input formControlName="email" matInput type="text">
          </mat-form-field>
          <mat-error *ngIf="checkoutForm.get('email')?.hasError('required') && isButtonPressed">
            Email is <strong>required</strong>
          </mat-error>
          <mat-error *ngIf="checkoutForm.get('email')?.hasError('emailExists')">
           The e-mail already <strong>exists</strong>
          </mat-error>
        </li>
        <li class="form__item" formGroupName="phoneGroup">
          <mat-form-field color="accent" class="country" appearance="outline">
            <mat-label>Country</mat-label>
            <mat-select formControlName="country">
              <mat-option>
                <ngx-mat-select-search [formControl]="codeSearchControl"></ngx-mat-select-search>
              </mat-option>
              <mat-option *ngFor="let code of phoneCodes" [value]="code.code">
                <span class="phone-values">{{ code.flag }}</span>
                <span class="phone-values">{{ code.name }}</span>
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field color="accent" class="code" appearance="outline">
            <mat-label>Code</mat-label>
            <input formControlName="code" [readonly]="true" matInput type="text">
          </mat-form-field>
          <mat-form-field color="accent" class="phone" appearance="outline">
            <mat-label>Enter phone</mat-label>
            <input [textMask]="{mask: mask}" formControlName="phone" matInput type="text">
          </mat-form-field>
        </li>
        <ng-container formGroupName="passwordGroup">
          <li class="form__item">
            <mat-form-field color="accent" class="form__field" appearance="outline">
              <mat-label>Enter password</mat-label>
              <input formControlName="password" matInput type="text">
            </mat-form-field>
            <mat-error  *ngIf="checkoutForm.get('passwordGroup').get('password').hasError('required') && isButtonPressed">
              Password is <strong>required</strong>
            </mat-error>
          </li>
          <li class="form__item">
            <mat-form-field color="accent" class="form__field" appearance="outline">
              <mat-label>Repeat password</mat-label>
              <input formControlName="r_password" matInput type="text">
            </mat-form-field>
          </li>
        </ng-container>
        <mat-error  *ngIf="checkoutForm.get('passwordGroup').hasError('passwordMatch') && isButtonPressed">
         The password <strong>doesn't match</strong>
        </mat-error>
      </ul>
      <div class="form__buttons">
        <a class="form__login" mat-icon-button routerLink="/login">Log in</a>
        <button color="warn" class="form__signup" type='button' mat-flat-button>Sign up</button>
        <button color="primary" class="form__submit" mat-flat-button>Submit</button>
      </div>
    </form>
  `,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  destroy$ = new Subject();
  codeSearchControl: FormControl = new FormControl();
  // codeSelectControl: FormControl = new FormControl();
  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  phoneCodes: PhoneCode[] = phoneCodes
  hostWidth: FormBreakPoints = FormBreakPoints.SMALL
  // ставим any из-за невозможности типизировать реативные формы
  // структуру формы можно посмотреть в SignupData
  checkoutForm!:  any | FormGroup | SignupData
  isButtonPressed: boolean = false;
  serverError: "signup" | null = null;

  constructor(private fb: FormBuilder, private store: Store, private auth: AuthService) {}

  ngOnInit(): void {
    this.subscribeCodeSearch()
    this.subscribeBreakPointsChange()
    this.setForm()
    this.subscribeCountryChange()
  }

  ngOnDestroy(): void {
    this.destroy$.next('unsubscribe');
    this.destroy$.complete();
  }

  subscribeCodeSearch() {
    this.codeSearchControl.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((value) => {
      this.phoneCodes = phoneCodes.filter((subj) =>
      subj.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    })
  }

  subscribeCountryChange() {
    this.checkoutForm.get("phoneGroup").get("country").valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((value: string) => {
      const codeObject: PhoneCode | undefined = this.phoneCodes.find(obj => obj.code === value)
      if(!codeObject) return
      this.checkoutForm.get("phoneGroup").get("code").setValue(codeObject.dial_code)
    })
  }

  subscribeBreakPointsChange() {
    this.store.pipe(select(getHandset))
    .pipe(takeUntil(this.destroy$))
    .subscribe((isHandset: boolean) => {
      this.hostWidth = isHandset ? FormBreakPoints.SMALL : FormBreakPoints.LARDGE
    })
  }

  setForm(): void {
    this.checkoutForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      surname: ["",  Validators.maxLength(25)],
      email: ["",
      {
        validators: Validators.required,
        asyncValidators: userExistsValidator(this.auth),
        updateOn: "blur"
      }],
      phoneGroup: this.fb.group({
        country: null,
        code: null,
        phone: null,
      }),
      passwordGroup: this.fb.group({
        password: ["", Validators.required],
        r_password: ["", Validators.required],
      }, {validators: passwordMatchValidator()})
    })
  }

  prepareForm() {
    const phone = this.checkoutForm.get("phoneGroup").get("phone")
    if(!phone.value) return
    const numbers = phone.value.match(/\d/g).join("")
    phone.setValue(numbers)
  }

  sendForm() {
    this.isButtonPressed = true
    this.serverError = null
    if(!this.checkoutForm.valid) return
    this.prepareForm()
    this.auth.createUser(this.checkoutForm.value)
    .pipe(
      catchError((err) => {
      this.serverError = err.error.type
      return new Observable()
      }
    ))
    .subscribe()
  }

  @HostBinding("style.width") get getWidth() {
    return this.hostWidth
  }
}
