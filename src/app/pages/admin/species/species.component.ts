import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf,CommonModule} from "@angular/common";

import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpeciesService} from "../../../core/services/species.service";
import {UUID} from "node:crypto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-species',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        CommonModule,
    ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit {
  speciesTypes: string[] = ['SEA', 'BIG_GAME', 'BIRD'];
  difficulties: string[] = ['COMMON', 'RARE', 'EPIC','LEGENDARY'];
  isModalOpen= false;
  isEditModalOpen = false;
  species:any[]=[];
  currentPage = 0;
  pageSize = 3;
  totalItems = 0;
  form: FormGroup;
  formEdit: FormGroup;
  selectedSpecie: any = null;


  constructor(private specieService: SpeciesService ,private fb: FormBuilder ) {
  this.form = this.fb.group({
    name: new FormControl('', [Validators.required]),
    category:new FormControl('', Validators.required),
    minimumWeight: [0, [Validators.required, Validators.min(0)]],
    difficulty: new FormControl('', Validators.required),
    points: [0, [Validators.required, Validators.min(0)]],

  })
    this.formEdit = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      minimumWeight: [0, [Validators.required, Validators.min(0)]],
      difficulty: ['', Validators.required],
      points: [0, [Validators.required, Validators.min(0)]],
    });
}
  onSubmit() {
    if (this.form.valid) {
      this.specieService.addSpecie(this.form.value).subscribe({
        next: (response: any) => {
          console.log("add specie done succefully");
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You added  the specie successfully!',
          });
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
  openEditModal(specie: any): void {
    this.selectedSpecie = specie;
    console.log('Selected specie:', this.selectedSpecie);
    this.formEdit.patchValue(specie);
    console.log('Edit form values:', this.formEdit.value);
    this.isEditModalOpen = true;
  }
 closeEditModal(): void {
   this.selectedSpecie = null;
   this.isEditModalOpen = false;
 }
  deleteSpecies(id: UUID): void {
    console.log('Deleting specie with ID:', id);
    this.specieService.deleteSpecie(id).subscribe({
      next: (response: any) => {
        console.log('Delete specie successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You deleted the specie successfully!',
        });
        this.fetchSpecies();
      },
    });
  }
  onUpdate(): void {
    if (this.formEdit.valid && this.selectedSpecie) {
      console.log('Update specie with ID:', this.formEdit.value);
      const updatedSpecie = { ...this.selectedSpecie, ...this.formEdit.value };
      this.specieService.updateSpecie(this.selectedSpecie.id, updatedSpecie).subscribe({
        next: (response: any) => {
          console.log('Update specie successful:', response);
          this.closeEditModal();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You updated the specie successfully!',
          });
          this.fetchSpecies();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error updating specie:', error);
        },
      });
    }
  }}
