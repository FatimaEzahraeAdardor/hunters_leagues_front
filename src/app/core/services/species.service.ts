import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Species} from "../model/species";
import {Page, User} from "../model/common.model";
import * as http from "node:http";
import {API_ENDPOINT} from "../constants/constants";
import {UUID} from "node:crypto";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) {
  }
  getSpecies(page: number, size: number): Observable<Page<Species>> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Page<Species>>(`${API_ENDPOINT.species}?page=${page}&size=${size}`, {headers});
  }
  getSpeciesTypes(): Observable<String[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<String[]>(`${API_ENDPOINT.allspecies}`, {headers});
  }
  addSpecie(species: Species): Observable<Species> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Species>(`${API_ENDPOINT.addSpecies}`,species,{ headers } )
  }
  deleteSpecie(id: UUID): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${API_ENDPOINT.deleteSpecies}/${id}`, {headers, responseType: 'text'});

  }
  updateSpecie(id: UUID, specie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${API_ENDPOINT.updateSpecies}/${id}`, specie, { headers });
  }

}
