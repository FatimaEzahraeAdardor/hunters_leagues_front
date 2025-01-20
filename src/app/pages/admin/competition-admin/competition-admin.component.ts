import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CompetitionService} from "../../../core/services/competition.service";
import {response} from "express";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-competition-admin',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './competition-admin.component.html',
  styleUrl: './competition-admin.component.css'
})
export class CompetitionAdminComponent implements OnInit {
  isModalOpen = false;
  competitions: any[]=[];
  currentPage=0
  pageSize= 3
  totalItems=0
  form: FormGroup;
  speciesTypes: string[] = ['SEA', 'BIG_GAME', 'BIRD'];
  constructor(private competitionService: CompetitionService ,private fb: FormBuilder) {
    this.form = this.fb.group({
      code: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      speciesType: new FormControl('', Validators.required),
      minParticipants: new FormControl('', Validators.required),
      maxParticipants: new FormControl('', Validators.required),
    })
  }
  ngOnInit(): void {
    this.fetchCompetitions();
  }
  onSubmit(): void {
    if (this.form.invalid) {
      this.competitionService.saveCompetition(this.form.value).subscribe({
        next: (response: any) => {
          console.log("ad competition done succefully");
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You added  the competition successfully!',
          });
        },
        error: error => {
          console.log(error);
        }
      })
    }
  }
  fetchCompetitions(): void {
    this.competitionService.getCompetition(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.competitions = response.content;
        this.totalItems = response.totalElements;
      },
      (error) => {
        console.log(error);
      }
    )

  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchCompetitions();
  }
  getPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i);
  }
  openModal(){
    this.isModalOpen = true;
  }
  closeModal(){
    this.isModalOpen = false;
    this.fetchCompetitions();
  }



}
