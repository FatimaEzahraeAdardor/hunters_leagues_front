import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SpeciesService} from "../../../core/services/species.service";

@Component({
  selector: 'app-species',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit {
  species:any[]=[];
  currentPage = 0;
  pageSize = 3;
  totalItems = 0;
constructor(private specieService: SpeciesService) {}

  ngOnInit(): void {
    this.fetchSpecies();
  }

  fetchSpecies(): void {
    this.specieService.getSpecies(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.species = response.content;
        this.totalItems = response.totalElements;
      },
      (error) => {
        console.error('Error fetching species:', error);
      }
    );
  }
  onPageChange(page: number): void {
  this.currentPage = page;
  this.fetchSpecies();
  }

  getPages(): number[] {
  const totalPages = Math.ceil(this.totalItems / this.pageSize);
  return Array.from({ length: totalPages }, (_, i) => i);
  }



}
