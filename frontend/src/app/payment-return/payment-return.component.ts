import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-payment-return',
  template: `
    <div *ngIf="paymentStatus === 'success'">
      <h2>Payment Successful</h2>
      <p>Your booking has been confirmed. Booking ID: {{bookingId}}</p>
    </div>
    <div *ngIf="paymentStatus === 'cancelled'">
      <h2>Payment Cancelled</h2>
      <p>Your booking was not completed. Please try again.</p>
    </div>
    <div *ngIf="paymentStatus === 'error'">
      <h2>Payment Error</h2>
      <p>There was an error processing your payment. Please contact support.</p>
    </div>
  `
})
export class PaymentReturnComponent implements OnInit {
  paymentStatus: string = 'error'; // Initialize with a default value
  bookingId: number = 0; // Initialize with an empty string

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['booking_id'] || ''; // Provide a fallback value
      // Check the booking status
      this.bookingService.getBookingById(this.bookingId).subscribe(
        booking => {
          if (booking.status === 'Paid') {
            this.paymentStatus = 'success';
          } else if (booking.status === 'Cancelled') {
            this.paymentStatus = 'cancelled';
          } else {
            this.paymentStatus = 'error';
          }
        },
        error => {
          console.error('Error fetching booking', error);
          this.paymentStatus = 'error';
        }
      );
    });
  }
}