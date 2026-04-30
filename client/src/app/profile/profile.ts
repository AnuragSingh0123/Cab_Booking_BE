import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
    user:any;
  
    router = inject(Router);
  ngOnInit() {
  const userData = localStorage.getItem("user");

  if (userData) {
    this.user = JSON.parse(userData);
  }
}


//navigation from dropdown menus
  go_to_ride(){
    this.router.navigate(['']);
  }
  mytrip(){
    this.router.navigate(['my-trips'])
  }
}
