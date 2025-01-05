import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService:AuthService, private router: Router) {}
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
