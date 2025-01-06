import {Component, OnInit} from '@angular/core';
import {NgForOf, CommonModule} from "@angular/common";
import {CompetitionService} from "../../core/services/competition.service";

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    NgForOf , CommonModule
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit {
  competitions: any[]= [];
  currentPage = 0;
  pageSize = 9;
  totalItems= 0;


  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    this.competitionService.getCompetition(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.competitions = response.content;
        console.log(response.content);
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

}
