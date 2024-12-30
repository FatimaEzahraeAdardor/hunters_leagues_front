import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse, LoginPayload, RegisterPayload, User} from "../model/common.model";
import {API_ENDPOINT, LocalStorage} from "../constants/constants";
import {map, tap} from "rxjs";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isLoggedIn: signal

  constructor(private _http:HttpClient) {}
  isLoggedIn(){
    return localStorage.getItem('token');
  }
    register(payload: RegisterPayload) {
    return this._http.post<ApiResponse<User>>(`${API_ENDPOINT.Auth.Register}`, payload);
    }
    login(payload: LoginPayload){
    return this._http.post<ApiResponse<User>>(`${API_ENDPOINT.Auth.Login}`, payload)
      .pipe(
      tap({
        next : (response : any) => {
          localStorage.setItem("token", response.token);
        }
      })
      )
    }
}
