import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Page } from '../model/common.model';
import { API_ENDPOINT } from '../constants/constants';
import {UUID} from "node:crypto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number): Observable<Page<User>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Page<User>>(`${API_ENDPOINT.users}?page=${page}&size=${size}`, { headers });
  }


  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${API_ENDPOINT.deleteUser}/${id}`, { headers });


  }
  updateUser(id: UUID, user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${API_ENDPOINT.updateUser}/${id}`, user, { headers });
  }
}

