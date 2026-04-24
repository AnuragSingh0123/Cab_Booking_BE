import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http=inject(HttpClient);

  signUp(data:any){
    console.log(data);
    return this.http.post("http://localhost:3000/auth/sign-up",data);
  }
}
