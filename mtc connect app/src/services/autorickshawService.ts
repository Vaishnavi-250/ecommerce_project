import { calculateDistance } from '@utils/locationUtils';

export interface AutorickshawDriver {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  vehicleNumber: string;
  vehicleType: string;
  currentLocation: { latitude: number; longitude: number };
  isAvailable: boolean;
}

export interface FareEstimate {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  totalFare: number;
  estimatedDuration: number; // in minutes
}

class AutorickshawService {
  private baseFare = 10; // Starting fare
  private perKmRate = 8; // Per km rate
  private perMinuteRate = 0.5; // Per minute rate

  calculateFare(
    pickupLocation: { latitude: number; longitude: number },
    dropLocation: { latitude: number; longitude: number },
    estimatedDurationMinutes: number = 15
  ): FareEstimate {
    const distance = calculateDistance(pickupLocation, dropLocation); // in km

    const distanceFare = distance * this.perKmRate;
    const timeFare = estimatedDurationMinutes * this.perMinuteRate;
    const totalFare = this.baseFare + distanceFare + timeFare;

    return {
      baseFare: this.baseFare,
      distanceFare: Math.round(distanceFare * 100) / 100,
      timeFare: Math.round(timeFare * 100) / 100,
      totalFare: Math.round(totalFare * 100) / 100,
      estimatedDuration: estimatedDurationMinutes,
    };
  }

  sortByDistance(
    drivers: AutorickshawDriver[],
    userLocation: { latitude: number; longitude: number }
  ): AutorickshawDriver[] {
    return drivers.sort((a, b) => {
      const distanceA = calculateDistance(userLocation, a.currentLocation);
      const distanceB = calculateDistance(userLocation, b.currentLocation);
      return distanceA - distanceB;
    });
  }

  sortByRating(drivers: AutorickshawDriver[]): AutorickshawDriver[] {
    return drivers.sort((a, b) => b.rating - a.rating);
  }

  applyPeakHourSurcharge(fare: FareEstimate, isPeakHour: boolean): FareEstimate {
    if (isPeakHour) {
      const surcharge = fare.totalFare * 0.25; // 25% surcharge
      return {
        ...fare,
        totalFare: Math.round((fare.totalFare + surcharge) * 100) / 100,
      };
    }
    return fare;
  }

  applyLoyaltyDiscount(fare: FareEstimate, loyaltyPoints: number): FareEstimate {
    const discountAmount = Math.min(loyaltyPoints / 100, fare.totalFare * 0.2); // Max 20% discount
    return {
      ...fare,
      totalFare: Math.round((fare.totalFare - discountAmount) * 100) / 100,
    };
  }
}

export default new AutorickshawService();
