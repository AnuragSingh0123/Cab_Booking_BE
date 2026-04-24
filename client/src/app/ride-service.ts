import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RideService {

  rideSubject = new BehaviorSubject<any>({
    pickUp: '',
    drop: ''
  });
  ride$ = this.rideSubject;

  setRide(pickUp: string, drop: string) {
    this.rideSubject.next({ pickUp, drop });
  }

  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject;
  
  setLoading(val: boolean) {
    this.loadingSubject.next(val);
  }

  rideDetailsSubject = new BehaviorSubject<any>({
    Distance: '',
    Time: ''
  })


  rideDetails$ = this.rideDetailsSubject;

  setRideDetails(distance:string, time:string) {
    console.log("here.........")
    console.log(distance, time);
    this.rideDetailsSubject.next({distance, time});
  }


}
