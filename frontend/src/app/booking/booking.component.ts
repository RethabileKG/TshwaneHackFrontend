import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from '../Account/authentication.service';
import { BookingService } from '../services/booking.service';
import { FacilityService } from '../services/facility.service';
import { BookingRequestDto, BookingResponseDto } from '../booking.types';
import { Facility } from '../modals/Facility';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
    bookingForm: FormGroup;
    facilities: Facility[] = [];
    selectedFacility: Facility | null = null;
    totalCost: number = 0;
    errorMessage: string = '';
    paymentUrl: string | null = null;

    constructor(
        private fb: FormBuilder,
        private bookingService: BookingService,
        private authService: AuthenticationService,
        private facilityService: FacilityService
    ) {
        this.bookingForm = this.fb.group({
            facilityId: ['', Validators.required],
            bookingDate: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            attendees: this.fb.array([])
        });
    }

    ngOnInit() {
        this.loadFacilities();
    }

    loadFacilities() {
        this.facilityService.getFacilities().subscribe(
            (facilities: Facility[]) => {
                this.facilities = facilities;
            },
            error => {
                console.error('Error loading facilities:', error);
            }
        );
    }

    loadFacilityDetails(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const facilityId = selectElement.value;
      if (facilityId) {
        this.facilityService.getFacilityById(parseInt(facilityId)).subscribe(
          (facility: Facility) => {
            this.selectedFacility = facility;
            // You can update other properties or perform additional actions here
          },
          error => {
            console.error('Error loading facility details:', error);
          }
        );
      }
    }
    get attendees() {
        return this.bookingForm.get('attendees') as FormArray;
    }

    addAttendee() {
        const attendeeForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            type: ['', Validators.required],
            age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
        });
        this.attendees.push(attendeeForm);
    }

    removeAttendee(index: number) {
        this.attendees.removeAt(index);
    }

    onSubmit() {
        if (this.bookingForm.valid) {
            const userId = this.authService.getUserId();

            if (!userId) {
                this.errorMessage = 'User not authenticated';
                return;
            }

            const formValue = this.bookingForm.value;
            
            const bookingRequest: BookingRequestDto = {
                userId: userId,
                facilityId: formValue.facilityId,
                bookingDate: new Date(formValue.bookingDate),
                startTime: formValue.startTime,
                endTime: formValue.endTime,
                attendees: formValue.attendees.map((attendee: any) => ({
                    name: attendee.name,
                    clientType: this.getClientType(attendee),
                    email: attendee.email,
                    phoneNumber: attendee.phoneNumber
                }))
            };

            this.bookingService.createBooking(bookingRequest).subscribe(
                (response: BookingResponseDto) => {
                    if (response.paymentUrl) {
                        this.paymentUrl = response.paymentUrl;
                    } else {
                        console.log('Booking created successfully:', response);
                        // Handle free booking success
                    }
                },
                error => {
                    console.error('Error creating booking:', error);
                    this.errorMessage = error.message || 'Error creating booking. Please try again later.';
                }
            );
        }
    }

    private getClientType(attendee: any): string {
        const age = attendee.age;
        if (age <= 12) return 'Child';
        if (age <= 19) return 'Teenager';
        if (attendee.type === 'Student') return 'Student';
        if (age >= 65) return 'Pensioner';
        return 'Adult';
    }
}