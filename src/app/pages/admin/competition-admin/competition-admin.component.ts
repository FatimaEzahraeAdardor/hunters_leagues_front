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
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+_\d{4}-\d{2}-\d{2}$/)]],
      location: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required], // Add time control
      speciesType: ['', Validators.required],
      minParticipants: [1, [Validators.required, Validators.min(1)]],
      maxParticipants: [50, [Validators.required, Validators.min(1)]],
      openRegistration: [true]
    });
  }
  ngOnInit(): void {
    this.fetchCompetitions();
  }
  onSubmit(): void {
    if (this.form.valid) {
      const date = this.form.get('date')?.value; // Get date value
      const time = this.form.get('time')?.value; // Get time value

      // Combine date and time into a LocalDateTime string
      const dateTime = `${date}T${time}:00`;

      // Create the payload
      const payload = {
        ...this.form.value,
        date: dateTime // Replace date with the combined dateTime
      };

      // Send the payload to the backend
      this.competitionService.saveCompetition(payload).subscribe({
        next: (response: any) => {
          console.log('Competition created successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You added the competition successfully!',
          });
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating competition', error);
        }
      });
    }
  }  fetchCompetitions(): void {
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
