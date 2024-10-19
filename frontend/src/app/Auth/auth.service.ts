import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;

  constructor(private http: HttpClient) {}

 

  getUserId(): string | null {
    const currentUserId = this.userId || localStorage.getItem('userId');
    console.log('Retrieved UserID:', currentUserId); // Console log to verify userId
    return currentUserId;
  }
}
