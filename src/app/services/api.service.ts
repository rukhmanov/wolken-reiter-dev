import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData, Token, User } from '../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  log(v: any): void {
    console.log(v)
  }
}
