import { Routes } from '@angular/router';
import {LoginComponent} from "./component/auth/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {RegisterComponent} from "./component/auth/register/register.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'login',
    component: LoginComponent
  }


];
