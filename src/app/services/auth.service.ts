import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { AccessTokenData, Email, EmailExistsResponse, EmailNotExistsResponse, jwtData, LoginData, SignupData, Token, UserCreatedResponse, UserData } from '../shared/types/types';
import { logout, saveToken } from '../store/auth-store/auth.actions';
import { getAccessToken } from '../store/auth-store/auth.selectors';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { getVisitorId } from '../store/root-store/store/root.selectors';
import { saveVisitorId } from '../store/root-store/store/root.actions';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;
  private accessTokenLifetime: Date | null = null;
  public baseUrl = environment.baseUrl;
  public serverError: "login" | "password" | "signup" | null = null;
  protected refresh = new Subject();
  constructor(private http: HttpClient, private store: Store, private dialog: MatDialog, private router: Router) {}

  createUser = (user: SignupData): Observable<UserCreatedResponse> => {
    const url = this.baseUrl +  "/signup"
    return this.http.post<UserCreatedResponse>(url, user)
  }

  login = (data: LoginData): Observable<jwtData> => {
    let headers = new HttpHeaders()
    const url = this.baseUrl +  "/login"
    return this.store.pipe(
      select(getVisitorId),
      mergeMap((id) => {
        if(!id) return of()
        headers = headers.set("visitor-id", id)
        return this.http.post<jwtData>(url, data, {
          headers
        })
      })
    )
  }

  getUserData = (): Observable<UserData> => {
    const url = this.baseUrl +  "/user"
    return this.http.get<UserData>(url)
  }

  logout = (): void => {
    localStorage.removeItem("__refreshToken")
    this.store.dispatch(logout())
  }

  getToken(): string | null {
    return this.accessToken
  }

  getTokenLifetime(): Date | null {
    return this.accessTokenLifetime
  }

  saveTokens(resp: jwtData | undefined): void {
    if(resp) {
      const token = resp.accessTokenData.accessToken
      if(!token) return
      this.accessToken = resp.accessTokenData.accessToken
      this.accessTokenLifetime = resp.accessTokenData.expiresAt
      localStorage.setItem("__refreshToken", JSON.stringify(resp.refreshToken))
      this.store.dispatch(saveToken({ accessToken: resp.accessTokenData }))
    }
  }

  sendLoginForm(form: LoginData): void {
    this.login(form)
    .pipe(
      map((resp: jwtData | undefined) => {
        this.saveTokens(resp)
      }),
      catchError((err) => {
      this.serverError = err.error.type
      return new Observable()
      }
    ))
    .subscribe()
  }

  sendSignupForm(form: SignupData): void {
    this.createUser(form)
    .pipe(
      mergeMap((resp: UserCreatedResponse | undefined) => {
        if(resp?.userCreated) {
          const data = {
            email: form.email,
            password: form.passwordGroup.password,
          }
          this.sendLoginForm(data)
        }
        return new Observable()
      }),
      catchError((err) => {
      this.openDialog("An error occurred during registration.")
      this.serverError = err.error.type
      return new Observable()
      }
    ))
    .subscribe()
  }

  openDialog(text: string): void {
    let config = this.getdialogConfig(text)
    this.dialog.open(DialogComponent, config)
  }

  checkEmail = (email: string): Observable<EmailExistsResponse | EmailNotExistsResponse> => {
    const url = this.baseUrl +  "/check"
    const data: Email = { email }
    return this.http.post<EmailExistsResponse | EmailNotExistsResponse>(url, data)
  }

  getdialogConfig(text: string): any {
    return {
       height: "25%",
       width: "30%",
       data: {
         text
       }
     }
   }

  verifyEmail(token: string): Observable<UserData> {
    const url = this.baseUrl +  "/verify"
    const data: Token = { token }
    return this.http.post<UserData>(url, data)
  }

  saveVisitorId(id: string): void {
    this.store.dispatch(saveVisitorId({ id }))
  }

  refreshTokens(): Observable<any> {
     return this.refreshLogin().pipe(
      map((resp) => {
        this.saveTokens(resp)
      })
    )
  }

  refreshLogin = (): Observable<jwtData> => {
    const url = this.baseUrl +  "/refresh"
    let headers = new HttpHeaders()
    const refreshToken = localStorage.getItem("__refreshToken")
    if(!refreshToken) {
      // this.router.navigate([this.baseUrl, "login"])
      return of()
    }
    headers = headers.set("refresh-token", refreshToken)
    return this.store.pipe(
      select(getVisitorId),
      mergeMap((id) => {
        if(!id) return of()
        headers = headers.set("visitor-id", id)
        return this.http.get<jwtData>(url, { headers })
      })
    )
  }

  isTokenExpired(): Observable<boolean> {
    return this.store.pipe(
      select(getAccessToken),
      map((resp: null | AccessTokenData) => {
        if(!resp) return true
        return new Date() > new Date(resp.expiresAt)
      })
    )
  }
}
