import { Component, OnInit } from '@angular/core';
import { Facility } from '../modals/Facility';
import { FacilityService } from '../services/facility.service';


@Component({
  selector: 'app-facility-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  facilities: Facility[] = [];
  selectedFacility: Facility | null = null;
  modalOpen = false;

  constructor(private facilityService: FacilityService) {}

  ngOnInit() {
    this.loadFacilities();
  }

  // Load all facilities
  loadFacilities() {
    this.facilityService.getFacilities().subscribe((data: Facility[]) => {
      this.facilities = data;
    });
  }

  // Open modal for the selected facility
  openModal(facility: Facility) {
    this.selectedFacility = facility;
    this.modalOpen = true;
  }

  // Close modal
  closeModal() {
    this.selectedFacility = null;
    this.modalOpen = false;
  }

  // Get stars for rating
  getRatingStars(rating: number): Array<number> {
    return Array(rating).fill(0);  // Create an array with the length of the rating number
  }

  // View all comments
  viewAllComments() {
    alert('Implement logic to show all comments here.');
  }
}
