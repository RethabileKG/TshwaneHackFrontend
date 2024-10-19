import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facility } from '../modals/Facility';


@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private apiUrl = 'https://localhost:7049/api/Facility';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all facilities
  getFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.apiUrl);
  }

  // Get specific facility by ID
  getFacilityById(id: number): Observable<Facility> {
    return this.http.get<Facility>(`${this.apiUrl}/${id}`);
  }
}
