import { Component } from '@angular/core';
import { FacilityService } from '../services/facility.service';
import { Facility } from '../modals/Facility';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.scss'
})
export class FacilityComponent {
  facilities: Facility[] = [];
  selectedFacilityIndex = 0;  // Index for the currently highlighted facility

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

  // Change the highlighted facility by adjusting the index
  changeSelectedFacility(index: number) {
    this.selectedFacilityIndex = index;
  }

  // Next facility (for scrolling behavior)
  nextFacility() {
    if (this.selectedFacilityIndex < this.facilities.length - 1) {
      this.selectedFacilityIndex++;
    }
  }

  // Previous facility (for scrolling behavior)
  prevFacility() {
    if (this.selectedFacilityIndex > 0) {
      this.selectedFacilityIndex--;
    }
  }
}
