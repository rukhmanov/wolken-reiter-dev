import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  log(v: any): void {
    console.log(v)
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
}
