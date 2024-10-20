// booking.types.ts
export interface AttendeeDto {
    name: string;
    clientType: string;
    email: string;
    phoneNumber: string;
}

export interface BookingRequestDto {
    userId: string;
    userEmail?: string; //
    facilityId: number;
    eventId?: number;
    bookingDate: Date;
    startTime: string;
    endTime: string;
    attendees: AttendeeDto[];
}

export interface BookingResponseDto {
    bookingId: number;
    status: string;
    totalCost: number;
    discountApplied: number;
    finalPrice: number;
    paymentUrl?: string;
}