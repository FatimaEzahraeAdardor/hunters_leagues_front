import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {authGuard} from "./core/guards/auth.guard";
import {NavBarComponent} from "./layout/nav-bar.component";
import {adminGuard} from "./core/guards/admin.guard";
import {UserComponent} from "./pages/user/user.component";
import {CompetitionComponent} from "./pages/competition/competition.component";
import {SpeciesComponent} from "./pages/admin/species/species.component";
import {CompetitionAdminComponent} from "./pages/admin/competition-admin/competition-admin.component";
import {noAuthGuardGuard} from "./core/guards/no-auth-guard.guard";

export const routes: Routes = [
  { path: '', component: NavBarComponent,
    children:[
      { path: '', component: HomeComponent },
      { path: 'competitions', component: CompetitionComponent },
      { path: 'participate/:id', component: CompetitionComponent },
    ]
  },
    { path: 'login', component: LoginComponent , canActivate:[noAuthGuardGuard] },
    { path: 'register', component: RegisterComponent, canActivate:[noAuthGuardGuard]},
    { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard,adminGuard],children:[
      { path: 'users', component: UserComponent },
      { path: 'species' , component: SpeciesComponent },
      { path: 'competitions', component: CompetitionAdminComponent },
    ]},





];
