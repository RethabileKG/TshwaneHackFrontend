import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../Account/authentication.service';
import { BookingService } from '../services/booking.service';
import { FacilityService } from '../services/facility.service';
import { BookingRequestDto, BookingResponseDto, AttendeeDto } from '../booking.types';
import { Facility } from '../modals/Facility';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
    Math = Math;
    currentDate: Date = new Date(); 
    bookingForm!: FormGroup;
    facilities: Facility[] = [];
    selectedFacility: Facility | null = null;
    totalCost: number = 0;
    errorMessage: string = '';
    successMessage: string = '';
    paymentUrl: string | null = null;
    private userId: string | null = null;
    private userEmail: string | null = null;
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private bookingService: BookingService,
        private authService: AuthenticationService,
        private facilityService: FacilityService
    ) {
        this.initializeForm();
    }

    private initializeForm() {
        this.bookingForm = this.fb.group({
            facilityId: ['', Validators.required],
            bookingDate: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            attendees: this.fb.array([])
        });

        // Subscribe to facility changes
        this.bookingForm.get('facilityId')?.valueChanges.subscribe(facilityId => {
            if (facilityId) {
                this.loadFacilityDetails(facilityId);
            } else {
                this.selectedFacility = null;
            }
        });

        // Subscribe to time changes
        this.bookingForm.get('startTime')?.valueChanges.subscribe(() => this.calculateTotalCost());
        this.bookingForm.get('endTime')?.valueChanges.subscribe(() => this.calculateTotalCost());
    }

    get attendees() {
        return this.bookingForm.get('attendees') as FormArray;
    }

    createAttendeeFormGroup(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
        });
    }

    addAttendee() {
        this.attendees.push(this.createAttendeeFormGroup());
    }

    removeAttendee(index: number) {
        this.attendees.removeAt(index);
    }

    ngOnInit() {
        this.loadFacilities();
        this.userId = this.authService.getUserId();
        
        if (!this.userId) {
            this.errorMessage = 'Please log in to make a booking';
        }
    }

    loadFacilities() {
        this.isLoading = true;
        this.facilityService.getFacilities().subscribe({
            next: (facilities: Facility[]) => {
                this.facilities = facilities;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading facilities:', error);
                this.errorMessage = 'Failed to load facilities. Please try again.';
                this.isLoading = false;
            }
        });
    }

    loadFacilityDetails(facilityId: number) {
        this.isLoading = true;
        this.facilityService.getFacilityById(facilityId).subscribe({
            next: (facility: Facility) => {
                this.selectedFacility = facility;
                this.calculateTotalCost();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading facility details:', error);
                this.errorMessage = 'Failed to load facility details. Please try again.';
                this.isLoading = false;
            }
        });
    }

    calculateTotalCost() {
        if (!this.selectedFacility) return;

        const startTime = this.bookingForm.get('startTime')?.value;
        const endTime = this.bookingForm.get('endTime')?.value;

        if (startTime && endTime) {
            const start = new Date(`1970-01-01T${startTime}`);
            const end = new Date(`1970-01-01T${endTime}`);
            const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
            
            if (hours > 0) {
                this.totalCost = hours * this.selectedFacility.pricePerHour;
            } else {
                this.totalCost = 0;
                this.errorMessage = 'End time must be after start time';
            }
        }
    }

    private getClientType(attendee: any): string {
        const age = attendee.age;
        if (age <= 12) return 'Child';
        if (age <= 19) return 'Teenager';
        if (age >= 65) return 'Senior';
        return 'Adult';
    }

    onSubmit() {
      this.errorMessage = '';
      this.successMessage = '';
  
      if (this.bookingForm.valid && this.userId) {
        this.isLoading = true;
        const formValue = this.bookingForm.value;
        
        const bookingRequest: BookingRequestDto = {
          UserId: this.userId,
          FacilityId: parseInt(formValue.facilityId),
          BookingDate: new Date(formValue.bookingDate).toISOString(),
          StartTime: this.formatTime(formValue.startTime),
          EndTime: this.formatTime(formValue.endTime),
          Attendees: formValue.attendees.map((attendee: any) => ({
            Name: attendee.name,
            ClientType: this.getClientType(attendee),
            Email: attendee.email,
            PhoneNumber: attendee.phoneNumber
          }))
        };
  
        this.bookingService.createBooking(bookingRequest).subscribe({
          next: (response: BookingResponseDto) => {
            this.isLoading = false;
            if (response.PaymentUrl) {
              this.paymentUrl = response.PaymentUrl;
              this.successMessage = 'Booking created successfully! Redirecting to payment...';
              setTimeout(() => {
                window.location.href = response.PaymentUrl!;
              }, 2000);
            } else {
              this.successMessage = 'Booking created successfully!';
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error creating booking:', error);
            this.errorMessage = error.error?.message || 'Error creating booking. Please try again later.';
          }
        });
      } else {
        this.markFormGroupTouched(this.bookingForm);
        this.errorMessage = 'Please fill in all required fields correctly.';
      }
    }
  
    private formatTime(time: string): string {
      return `${time}:00`; // Append seconds to make it "HH:mm:ss" format
    }

    private markFormGroupTouched(formGroup: FormGroup | FormArray) {
        Object.values(formGroup.controls).forEach(control => {
            if (control instanceof FormControl) {
                control.markAsTouched();
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                this.markFormGroupTouched(control);
            }
        });
    }

    // Helper method for template
    formatPrice(price: number): string {
        return price.toFixed(2);
    }
}