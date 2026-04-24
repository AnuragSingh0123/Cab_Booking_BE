import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email:string='';
  password:string='';

  route=inject(Router);

  login(){
    let loginData = {
      name:"Anurag",
      email: this.email,
      password: this.password,
      isLoggedIn: true
    }
    
    localStorage.setItem("login",JSON.stringify(loginData));
    this.route.navigate([""]);
  }
}
