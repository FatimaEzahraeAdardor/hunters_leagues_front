import { Component } from '@angular/core';
import {NavBarComponent} from "../../layout/nav-bar.component";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule , NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
