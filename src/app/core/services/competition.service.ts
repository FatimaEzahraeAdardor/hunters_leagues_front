import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page, User} from "../model/common.model";
import {Competition} from "../model/competition";
import {API_ENDPOINT} from "../constants/constants";
import {Participation} from "../model/participation";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) {
  }

  getCompetition(page: number, size: number): Observable<Page<Competition>> {
    return this.http.get<Page<Competition>>(`${API_ENDPOINT.competitions}?page=${page}&size=${size}`);
  }

  saveParticipation(userEmail: string | null, competitionId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${API_ENDPOINT.participate}`;
    const body = {userEmail, competitionId};
    return this.http.post(url, body, {headers, responseType: 'text'});
  }
}
