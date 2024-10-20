//Facility.ts

export interface Facility {
    facilityId: number;
    name: string;
    description: string;
    type: string;
    pricePerHour: number;
    capacity: number;
    address: string;
    imageURL: string;
    rating: number;
    ratings: Rating[];  // User ratings and comments
  }
  
  export interface Rating {
    userId: string;
    stars: number;
    comments: string;
    date: string;
  }
  