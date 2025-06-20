import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  signup(data: {
    name: string;
    email: string;
    password: string;
    co_number: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, {
      withCredentials: true,
    });
  }

  resetPassword(data: {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }

  updateUser(data: { name: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/featch`, { withCredentials: true });
  }

  deleteUser(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove`, {
      withCredentials: true,
    });
  }
}
