import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent,
  children:[
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [authGuard]},
  ]},
  { path: 'dashboard', component: DashboardComponent },





];
