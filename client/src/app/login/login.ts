import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  route=inject(Router);

  authService=inject(AuthService);

  login(loginForm: NgForm){

    let {email, password} = loginForm.control.value;
    console.log(email);
    console.log(password);

    let userData = {
      name:"Rahol",
      email,
      password,
      isLoggedIn: true
    }
    
    this.authService.login(userData);
    this.route.navigate([""]);
  }
}
