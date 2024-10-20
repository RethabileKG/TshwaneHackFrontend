export interface BookingRequestDto {
    UserId: string;  // Changed from userId to UserId
    FacilityId: number;  // Changed from facilityId to FacilityId
    BookingDate: string;  // Changed from bookingDate to BookingDate
    StartTime: string;  // Changed from startTime to StartTime
    EndTime: string;  // Changed from endTime to EndTime
    Attendees: AttendeeDto[];  // Changed from attendees to Attendees
  }
  
  export interface AttendeeDto {
    Name: string;  // Changed from name to Name
    ClientType: string;  // Changed from clientType to ClientType
    Email: string;  // Changed from email to Email
    PhoneNumber: string;  // Changed from phoneNumber to PhoneNumber
  }
  
  export interface BookingResponseDto {
    BookingId: number;
    Status: string;
    TotalCost: number;
    DiscountApplied: number;
    FinalPrice: number;
    PaymentUrl?: string;
  }