import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { Map } from './map/map';
import { RideRequest } from './ride-request/ride-request';
import { SearchRide } from './search-ride/search-ride';
import { RideSuccess } from './ride-success/ride-success';

export const routes: Routes = [
  { path: "", component: Home },
  { path: "login", component: Login },
  { path: "sign-up", component: SignUp },
  { path: "map", component: Map },
  { path: "ride-booked", component:RideSuccess }
];
