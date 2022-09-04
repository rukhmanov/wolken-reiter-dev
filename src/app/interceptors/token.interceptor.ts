import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { concatMap, Observable, of, take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getAccessToken } from '../store/auth-store/auth.selectors';
import { AccessTokenData, jwtData } from '../shared/types/types';
import { AuthService } from '../services/auth.service';
import { getVisitorId } from '../store/root-store/store/root.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  ignorList = [
    "refresh",
    "check",
    "login"
  ]

  constructor(private store: Store, private auth: AuthService, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const endPoint = request.url.replace(this.auth.baseUrl + "/", "")
    if(this.ignorList.includes(endPoint)) {
      return next.handle(request)
    } else {
      return this.auth.isTokenExpired()
      .pipe(
        concatMap((isTokenExpired: boolean) => {
          const token = this.auth.getToken()
          if(isTokenExpired || !token) {
            const url = this.auth.baseUrl +  "/refresh"
            let headers = new HttpHeaders()
            const refreshToken = localStorage.getItem("__refreshToken")
            if(!refreshToken) {
              return of()
            }
            headers = headers.set("refresh-token", refreshToken)
            return this.store.pipe(
              select(getVisitorId),
              concatMap((id) => {
                if(!id) return of()
                headers = headers.set("visitor-id", id)
                return this.http.get<jwtData>(url, { headers })
                .pipe(concatMap(() => {
                  return next.handle(request)})
                )
              })
            )
          }

          return this.store.pipe(
            select(getAccessToken),
            take(1),
            concatMap((resp: null | AccessTokenData) => {
              if(!resp?.accessToken) next.handle(request)
              const token = resp?.accessToken
              const req = request.clone({
                setHeaders: {
                  Authorization: `Basic ${token}`
                }
              })
              return next.handle(req)
            }
            )
          )
        }),
      )
    }
  }
}
