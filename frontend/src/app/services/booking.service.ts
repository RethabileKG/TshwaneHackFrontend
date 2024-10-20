import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../Account/authentication.service';
import { BookingRequestDto, BookingResponseDto } from '../booking.types';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7066/api/';; // Adjust this to match your API endpoint

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  createBooking(bookingRequest: BookingRequestDto): Observable<BookingResponseDto> {
    return this.http.post<BookingResponseDto>(`${this.apiUrl}/booking/book`, bookingRequest);
}

  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/booking/all`).pipe(
      catchError(this.handleError)
    );
  }

  getBookingById(bookingId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/booking/${bookingId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateBooking(bookingId: number, bookingRequest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/booking/${bookingId}`, bookingRequest).pipe(
      catchError(this.handleError)
    );
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/booking/${bookingId}`).pipe(
      catchError(this.handleError)
    );
  }

  getFacilities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/facility/all`).pipe(
      catchError(this.handleError)
    );
  }

  getFacilityById(facilityId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/facility/${facilityId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}