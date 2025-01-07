import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiResponse, LoginPayload, RegisterPayload, User } from "../model/common.model";
import { API_ENDPOINT, LocalStorage } from "../constants/constants";
import { map, Observable, tap } from "rxjs";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  register(payload: RegisterPayload): Observable<any> {
    return this._http.post<ApiResponse<User>>(`${API_ENDPOINT.Auth.Register}`, payload);
  }

  login(payload: LoginPayload): Observable<any> {
    return this._http.post<ApiResponse<User>>(`${API_ENDPOINT.Auth.Login}`, payload)
      .pipe(
        tap({
          next: (response: any) => {
            localStorage.setItem("token", response.token);
          }
        })
      );
  }

  getUserRole(): string | null {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.authorities) {
        const role = decodedToken.authorities.find((auth: { authority: string }) => auth.authority.startsWith('ROLE_'));
        return role?.authority;
      }
    }
    return null;
  }

  getUserEmail(): string | null {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.sub) {
        return decodedToken.sub;
      }
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
