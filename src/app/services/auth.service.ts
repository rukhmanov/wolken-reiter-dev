import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email, EmailExistsResponse, LoginData, SignupData, UserData } from '../shared/types/types';
import { removeUserData, saveUserData } from '../store/auth-store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected baseUrl = environment.baseUrl;
  public serverError: "login" | "password" | "signup" | null = null;
  protected refresh = new Subject();
  constructor(private http: HttpClient, private store: Store) {}

  setUserDataFromStorage() {
    const userData: UserData | undefined = JSON.parse(localStorage.getItem("auth") as string);
    if(!userData) return
    this.store.dispatch(saveUserData({ data: userData }))
  }

  createUser = (user: SignupData): Observable<UserData> => {
    const url = this.baseUrl +  "/signup"
    return this.http.post<UserData>(url, user)
  }

  login = (data: LoginData): Observable<UserData> => {
    const url = this.baseUrl +  "/login"
    return this.http.post<UserData>(url, data)
  }

  logout = (): void => {
    localStorage.removeItem("auth")
    this.store.dispatch(removeUserData())
  }

  sendForm(observ$: Observable<UserData>) {
    observ$.pipe(
      map((resp: UserData | undefined) => {
        if(resp) {
          localStorage.setItem("auth", JSON.stringify(resp))
          this.store.dispatch(saveUserData({ data: resp }))
        }
      }),
      catchError((err) => {
      this.serverError = err.error.type
      return new Observable()
      }
    ))
    .subscribe()
  }

  sendLoginForm(form: LoginData): void {
    this.sendForm(this.login(form))
  }

  sendSignupForm(form: SignupData): void {
    this.sendForm(this.createUser(form))
  }

  checkEmail = (email: string): Observable<EmailExistsResponse> => {
    const url = this.baseUrl +  "/check"
    const data: Email = { email }
    return this.http.post<EmailExistsResponse>(url, data)
  }
}
