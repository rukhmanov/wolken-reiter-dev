import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email, EmailExistsResponse, LoginData, SignupData, Token } from '../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  log(v: any): void {
    console.log(v)
  }

  createUser = (user: SignupData): Observable<SignupData> => {
    const url = this.baseUrl +  "/signup"
    return this.http.post<SignupData>(url, user)
  }

  login = (data: LoginData): Observable<Token> => {
    const url = this.baseUrl +  "/login"
    return this.http.post<Token>(url, data)
  }

  checkEmail = (email: string): Observable<EmailExistsResponse> => {
    const url = this.baseUrl +  "/check"
    const data: Email = { email }
    return this.http.post<EmailExistsResponse>(url, data)
  }
}
