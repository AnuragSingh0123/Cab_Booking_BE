import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import * as L from 'leaflet';
import { RideService } from '../ride-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {

  private rideService = inject(RideService);
  private http = inject(HttpClient);

  map: any;

  pickup: string = '';
  drop: string = '';

  apiKey = 'pk.2291756e6d48580b693a0848389717a5';

  ngOnInit() {
    this.rideService.ride$.subscribe((data) => {
      this.pickup = data.pickUp;
      this.drop = data.drop;

      if (this.pickup && this.drop && this.map) {
        this.getRouteFromNames();
      }
    });
  }

  ngAfterViewInit() {
    this.map = L.map('map').setView([13.0475, 77.6200], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(this.map);

    if (this.pickup && this.drop) {
      this.getRouteFromNames();
    }
  }

  //Convert place → coordinates
  getCoordinates(place: string) {
    const url = `https://us1.locationiq.com/v1/search?key=${this.apiKey}&q=${place}&format=json`;
    return this.http.get(url);
  }

  //Get route
  getRoute(start: any, end: any) {
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${start.lng},${start.lat};${end.lng},${end.lat}` +
      `?overview=full&geometries=geojson`;

    this.http.get(url).subscribe((res: any) => {
      const route = res.routes[0];

      const distanceKm = (route.distance / 1000).toFixed(2);
      const durationMin = (route.duration / 60).toFixed(0);

      this.rideService.setRideDetails(distanceKm,durationMin);

      console.log('Distance:', distanceKm, 'km');
      console.log('Time:', durationMin, 'minutes');

      const coords = route.geometry.coordinates;

      // [lng, lat] → [lat, lng]
      const latlngs = coords.map((c: any) => [c[1], c[0]]);

      this.drawRoute(latlngs, start, end);
    });
  }

  // Draw route
  drawRoute(latlngs: any, start: any, end: any) {


    L.polyline(latlngs, {
      color: 'blue',
      weight: 5
    }).addTo(this.map);

    L.marker([start.lat, start.lng])
      .addTo(this.map)
      .bindPopup('Pickup');

    L.marker([end.lat, end.lng])
      .addTo(this.map)
      .bindPopup('Drop');

    this.map.fitBounds(latlngs);

    this.rideService.setLoading(false);
  }

  //Convert names → route
  getRouteFromNames() {

    this.rideService.setLoading(true);

    this.getCoordinates(this.pickup).subscribe((startRes: any) => {

      const start = {
        lat: parseFloat(startRes[0].lat),
        lng: parseFloat(startRes[0].lon)
      };

      this.getCoordinates(this.drop).subscribe((endRes: any) => {

        const end = {
          lat: parseFloat(endRes[0].lat),
          lng: parseFloat(endRes[0].lon)
        };

        this.getRoute(start, end);
      });
    });
  }
}