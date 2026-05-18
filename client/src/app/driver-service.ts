import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  http = inject(HttpClient);

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getDriverDashboard() {
    return this.http.get(
      'http://localhost:7000/api/driver/dashboard'
    );
  }

  toggleDriverStatus() {
    return this.http.patch(
      'http://localhost:7000/api/driver/status',
      {}
    );
  }

  acceptRide(bookingId: string) {
    return this.http.patch(
      `http://localhost:7000/api/rides/${bookingId}`,
      { status: 'accepted' }
    );
  }

  startRide(bookingId: string) {
    return this.http.patch(
      `http://localhost:7000/api/rides/${bookingId}`,
      { status: 'started' }
    );
  }

  completeRide(bookingId: string) {
    return this.http.patch(
      `http://localhost:7000/api/rides/${bookingId}`,
      {
        status: 'completed',
        completedAt: Date.now(),
      }
    );
  }

  addDirverLocation(place: string,driverCoordinates:Number[] ) {
    let data={
      place: place,
      driverCoordinates: driverCoordinates
    }
    return this.http.patch(
      `http://localhost:7000/api/driver/location`,
      {
        data
      }
    );
  }
}