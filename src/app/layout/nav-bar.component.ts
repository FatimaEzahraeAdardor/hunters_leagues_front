import { Component } from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgClass, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  menuOpen = false;
constructor(private authService: AuthService) {
}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  getToken(){
  return this.authService.getToken();
  }
  OnLougout(){
  this.authService.logout();
  }

}
