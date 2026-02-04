// Haversine formula to calculate distance between two coordinates
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export const calculateDistanceFromObjects = (
  loc1: { latitude: number; longitude: number },
  loc2: { latitude: number; longitude: number }
): number => {
  return calculateDistance(loc1.latitude, loc1.longitude, loc2.latitude, loc2.longitude);
};

export const formatDistance = (distanceInKm: number): string => {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }
  return `${distanceInKm.toFixed(2)} km`;
};

export const estimateTravelTime = (distanceInKm: number, averageSpeedKmh: number = 30): string => {
  const timeInMinutes = Math.round((distanceInKm / averageSpeedKmh) * 60);
  if (timeInMinutes < 60) {
    return `${timeInMinutes} min`;
  }
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours}h ${minutes}m`;
};
