import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {


  formBuilder=inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  authService=inject(AuthService);
  role!:string|null;

  signUpForm=this.formBuilder.group({
    name: ["",[]],
    email: ["",[]],
    password: ["",[]],
    licenseNumber: ["",[]],
    vehicleType: ["",[]],
    vehicleNumber: ["",[]] 
  })

  ngOnInit(){
    // if we use subscribe, event fires if queryParms changes even after component is already rendered
    // which doesnt work with queryParamsMap
    this.activatedRoute.queryParamMap.subscribe(params => {
    this.role = params.get('role');
    console.log(this.role);
    });
  }

  signup(){
    if(this.role === "driver") {
      let {name, email, password, licenseNumber, vehicleNumber, vehicleType} = this.signUpForm.value;
      let formData = {
        name,
        email,
        password,
        licenseNumber,
        vehicleNumber,
        vehicleType,
        role: this.role
      }
      this.authService.signUp(formData).subscribe({
        next: res=>console.log(res),
        error: err=>console.log(err)
      });
    } else {
      let {name, email, password} = this.signUpForm.value;
      let formData = {
        name,
        email,
        password,
        role: this.role
      }
      this.authService.signUp(formData).subscribe({
        next: res=>console.log(res),
        error: err=>console.log(err)
      });
    }
    // console.log(this.signUpForm.value);
  }
}
