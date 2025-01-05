import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {authGuard} from "./core/guards/auth.guard";
import {NavBarComponent} from "./layout/nav-bar.component";
import {adminGuard} from "./core/guards/admin.guard";
import {UserComponent} from "./pages/user/user.component";

export const routes: Routes = [
  { path: '', component: NavBarComponent,
    children:[
      { path: '', component: HomeComponent },
    ]
  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard,adminGuard],children:[
    { path: 'users', component: UserComponent },
    ]},





];
