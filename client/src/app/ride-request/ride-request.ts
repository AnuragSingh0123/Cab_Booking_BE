import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RideService } from '../ride-service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-ride-request',
  imports: [FormsModule, CommonModule],
  templateUrl: './ride-request.html',
  styleUrl: './ride-request.css',
})
export class RideRequest {

  
  pickup:string='';
  drop:string='';

  selectedValue:string='';

  route=inject(Router);

  rideCheckoutDetails:any=null;
  // rideCheckoutDetails:any={
  //   pickup: 'Bangalore',
  //       drop: 'pune',
  //       distance: '180',
  //       vehicle: 'Bike',
  //       amount: 5000,
  //       gst: 200
  // };

  
  rideService=inject(RideService);

  // ngOnInit(){
  //   this.rideService.setRideDetails('180','80');
  // }
  
  loading$=this.rideService.loading$;

  rideDetails$=this.rideService.rideDetails$;

  rideRequest(){
   
    const loginData = localStorage.getItem("login");
  let isLoggedIn = false;

  if (loginData) {
    try {
      const parsedData = JSON.parse(loginData);
      isLoggedIn = !!parsedData.isLoggedIn;
    } catch (e) {
      console.error("Error parsing login data", e);
    }
  }

  if (!isLoggedIn) {
    this.route.navigate(["login"]);
    return;
  }

    console.log("Here");
    this.rideService.setRide(this.pickup,this.drop);
  }

  checkoutDetails(){
    this.rideService.rideDetails$.subscribe(details => {

      let fare;
      let gst;

      if(this.selectedValue==='auto') {
        fare = 20+Number(details.distance)*12;
        gst = fare*18/100;
      } else if(this.selectedValue==='bike') {
        fare = 20+Number(details.distance)*7;
        gst = fare*18/100;
      }else if(this.selectedValue==='suv'){
        fare = 20+Number(details.distance)*19;
        gst = fare*18/100;
      }
    if (details) {
      this.rideCheckoutDetails = {
        pickup: this.pickup,
        drop: this.drop,
        distance: details.distance,
        vehicle: this.selectedValue,
        fare: Number(fare?.toFixed(2)),
        gst: Number(gst?.toFixed(2))
      };
      console.log('Checkout Details:', this.rideCheckoutDetails);
    }
  });
  }

  bookRide(){
    this.route.navigate(['ride-booked']);
  }

}
