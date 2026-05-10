import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RideService } from '../ride-service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
    user: any;

  rideDetails = signal({
    totalRides: 0,
    distanceTravelled: 0,
    totalSpent: 0
  });

  rideService = inject(RideService);
  router = inject(Router);

  ngOnInit() {
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);

      this.rideService.getProfile().subscribe((res: any) => {
        console.log(res);
        this.rideDetails.set(res);
      });
    }
  }


}
