import { Component } from '@angular/core';
import {RouterLink, RouterModule} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
