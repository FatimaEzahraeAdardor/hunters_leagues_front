import { Component, OnInit } from '@angular/core';
import { NgForOf, CommonModule } from "@angular/common";
import { CompetitionService } from "../../core/services/competition.service";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit {
  competitions: any[] = [];
  currentPage = 0;
  pageSize = 9;
  totalItems = 0;

  constructor(private competitionService: CompetitionService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    this.competitionService.getCompetition(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.competitions = response.content;
        this.totalItems = response.totalElements;
      },
      (error) => {
        console.error('Error fetching competitions:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchCompetitions();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  onParticipate(competitionId: string): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    const userEmail = this.auth.getUserEmail();
    if (!userEmail) {
      console.error('User email is null or undefined.');
      return;
    }

    this.competitionService.saveParticipation(userEmail, competitionId).subscribe(
      (response) => {
        console.log('Participation successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You have successfully participated in the competition!',
        });
      },
      (error) => {
        console.error(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'An error occurred while participating. Please try again.',
        });
      }
    );
  }
}
