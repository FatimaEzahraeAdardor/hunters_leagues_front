import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page, User} from "../model/common.model";
import {Competition} from "../model/competition";
import {API_ENDPOINT} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }
    getCompetition(page: number, size: number): Observable<Page<Competition>> {
      return this.http.get<Page<Competition>>(`${API_ENDPOINT.competitions}?page=${page}&size=${size}`);
  }
  }
