export interface Facility {
  facilityId: number;
  name: string;
  description: string;
  type: string;
  pricePerHour: number;
  isNoCostFacility: boolean;  // Add this property
  capacity: number;
  isAvailable: boolean;  // Add this property
  address: string;
  imageURL: string;  // Image as base64 string
  rating: number;
  ratings: Rating[];  // User ratings and comments
}

  
  export interface Rating {
    userId: string;
    stars: number;
    comments: string;
    date: string;
  }
  