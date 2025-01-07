import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
  speciesTypes: string[] = ['SEA', 'BIG_GAME', 'BIRD'];
  difficulties: string[] = ['COMMON', 'RARE', 'EPIC','LEGENDARY'];
  isModalOpen= false;
  species:any[]=[];
  currentPage = 0;
  pageSize = 3;
  totalItems = 0;
  form: FormGroup;

constructor(private specieService: SpeciesService ,private fb: FormBuilder ) {
  this.form = this.fb.group({
    name: new FormControl('', [Validators.required]),
    category:new FormControl('', Validators.required),
    minimumWeight: [0, [Validators.required, Validators.min(0)]],
    difficulty: new FormControl('', Validators.required),
    points: [0, [Validators.required, Validators.min(0)]],

  })
}
  onSubmit() {
    if (this.form.valid) {
      this.specieService.addSpecie(this.form.value).subscribe({
        next: (response: any) => {
          console.log("add specie done succefully");
          this.closeModal();
        }
      })
    }
  }

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
  openModal(): void {
  this.isModalOpen = true;
  }
  closeModal(): void {
  this.isModalOpen = false;
  }




}
