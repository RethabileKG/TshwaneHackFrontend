import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  calculateDiscount(clientTypes: string[], totalCost: number): number {
    const familyDiscount = totalCost * 0.20; // 20% discount for family
    let individualDiscount = 0;

    clientTypes.forEach(type => {
      switch (type) {
        case 'Pensioner':
          individualDiscount += totalCost * 0.25; // 25% for pensioners
          break;
        case 'Student':
          individualDiscount += totalCost * 0.15; // 15% for students
          break;
        case 'Teenager':
          individualDiscount += totalCost * 0.10; // 10% for teenagers (13-19 years)
          break;
        case 'Child':
          individualDiscount += totalCost * 0.25; // 25% for children (0-12 years old)
          break;
        default:
          break;
      }
    });

    // Apply family discount only if it's better than individual discounts
    return totalCost - Math.max(familyDiscount, individualDiscount);
  }
}