import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode}from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'https://localhost:7066/api/Authentication';
  private apiUrl = 'https://localhost:7066/api/UserManagement';
  private userId: string | null = null;  // Class property to store userId
  private userRole: string | null = null; // Class property to store userRole

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    this.userId = null;  // Clear stored userId on logout
    this.userRole = null; // Clear stored userRole on logout
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  forgotPassword(email: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, email);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }

  getUserId(): string | null {
    if (!this.userId) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
      }
    }

    console.log('Retrieved UserID:', this.userId); // Console log to verify userId
    return this.userId;
  }

  isAuthenticated(): boolean {
    return !!this.getUserId();
  }

  getUserRole(): string | null {
    if (!this.userRole) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      }
    }
    console.log('Retrieved UserRole:', this.userRole);
    return this.userRole;
  }

  // uploadProfileImage(fileData: FormData): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/update-profile-image`, fileData);
  // }

  uploadProfileImage(profileImageDto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profile-image`, profileImageDto, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  // Get All Users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}




