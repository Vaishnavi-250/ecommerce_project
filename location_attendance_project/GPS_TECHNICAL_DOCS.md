# GPS Technical Documentation

## Architecture Overview

The GPS module is implemented using a combination of frontend and backend technologies:

### Frontend (JavaScript)
- **LocationTracker Object**: Main JS class handling GPS operations
- **Leaflet.js**: Interactive map visualization
- **HTML5 Geolocation API**: Browser native GPS access

### Backend (Python/Django)
- **Models**: GPS fields in Attendance model
- **Views**: Check-in/check-out with GPS validation
- **Utils**: Distance calculation and geofencing logic

## Core Components

### 1. LocationTracker (main.js)

Main JavaScript object managing all GPS operations.

#### Properties
```javascript
LocationTracker = {
    latitude: null,           // Current latitude
    longitude: null,          // Current longitude
    accuracy: null,           // GPS accuracy in meters
    map: null,               // Leaflet map instance
    userMarker: null,        // User location marker
    officeMarker: null,      // Office location marker
    maxAllowedDistance: 500  // Geofence radius in meters
}
```

#### Key Methods

**`getCurrentLocation()`**
- Returns: Promise<{latitude, longitude, accuracy}>
- Requests GPS location from browser
- Includes enhanced error handling for different error scenarios
- Timeout: 15 seconds

**`calculateDistance(lat1, lon1, lat2, lon2)`**
- Returns: integer (distance in meters)
- Uses Haversine formula for accuracy
- Works on Earth's radius of 6,371 km

**`isWithinGeofence(lat1, lon1, lat2, lon2, maxDistance)`**
- Returns: boolean
- Validates if distance <= maxDistance
- Default maxDistance: 500m

**`getGeofenceStatus(lat1, lon1, lat2, lon2, maxDistance)`**
- Returns: Object with detailed status
- Includes percentage of max distance used
- Useful for UI visualization

**`initMap(containerId, latitude, longitude, officeLatitude, officeLongitude)`**
- Initializes Leaflet map
- Adds user marker (pink circle)
- Adds office marker (red pin)
- Sets initial view

### 2. Attendance Model (models.py)

GPS fields added to track location data:

```python
class Attendance(models.Model):
    # Check-in location
    check_in_latitude = models.FloatField(null=True, blank=True)
    check_in_longitude = models.FloatField(null=True, blank=True)
    check_in_distance = models.FloatField(null=True, blank=True)
    
    # Check-out location
    check_out_latitude = models.FloatField(null=True, blank=True)
    check_out_longitude = models.FloatField(null=True, blank=True)
    check_out_distance = models.FloatField(null=True, blank=True)
```

### 3. Employee Model (models.py)

Office location configuration:

```python
class Employee(models.Model):
    office_latitude = models.FloatField(
        validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)]
    )
    office_longitude = models.FloatField(
        validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)]
    )
```

### 4. Utility Functions (utils.py)

#### `calculate_distance(lat1, lon1, lat2, lon2)`
Haversine formula implementation:
```python
def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate great circle distance between two points"""
    # Returns distance in meters
    # Uses Earth radius = 6,371,000 meters
```

#### `is_within_distance(distance_meters, allowed_distance_meters=500)`
Geofence validation:
```python
def is_within_distance(distance_meters, allowed_distance_meters=500):
    """Check if distance is within allowed geofence"""
    return distance_meters <= allowed_distance_meters
```

#### `get_geofence_status(lat1, lon1, lat2, lon2, max_distance=500)`
Detailed geofence information:
```python
Returns {
    'status': 'within' or 'outside',
    'distance': float,
    'within_geofence': boolean,
    'max_distance': int,
    'percentage': int  # of max distance
}
```

## Data Flow

### Check-In Flow
```
1. User navigates to check-in page
   ↓
2. Frontend calls LocationTracker.getCurrentLocation()
   ↓
3. Browser requests GPS permission (if first time)
   ↓
4. GPS coordinates obtained (latitude, longitude, accuracy)
   ↓
5. Frontend displays location on map
   ↓
6. Frontend calculates distance using Haversine formula
   ↓
7. Frontend checks if within geofence (500m)
   ↓
8. User submits form with GPS coordinates in hidden fields
   ↓
9. Backend receives check-in form with GPS data
   ↓
10. Backend calculates distance using utils.calculate_distance()
   ↓
11. Backend checks geofence using is_within_distance()
   ↓
12. Backend displays warning if outside geofence
   ↓
13. Attendance record saved with GPS data
```

## Database Schema

### Attendance Table GPS Fields

```sql
check_in_latitude     FLOAT      -- User's latitude at check-in
check_in_longitude    FLOAT      -- User's longitude at check-in
check_in_distance     FLOAT      -- Distance from office at check-in (meters)
check_out_latitude    FLOAT      -- User's latitude at check-out
check_out_longitude   FLOAT      -- User's longitude at check-out
check_out_distance    FLOAT      -- Distance from office at check-out (meters)
```

### Employee Table GPS Fields

```sql
office_latitude       FLOAT      -- Office location latitude
office_longitude      FLOAT      -- Office location longitude
```

## Browser Geolocation API

### Supported Browsers
- Chrome 5.0+
- Firefox 3.5+
- Safari 5.0+
- IE 9.0+
- Edge 12.0+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Implementation Details

```javascript
navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback,
    options
);

options = {
    enableHighAccuracy: true,  // Use GPS, not just WiFi
    timeout: 15000,           // Wait max 15 seconds
    maximumAge: 0            // Don't use cached location
}
```

### Error Codes
- `PERMISSION_DENIED` (1): User denied location access
- `POSITION_UNAVAILABLE` (2): Location data unavailable
- `TIMEOUT` (3): Request timed out
- `UNKNOWN_ERROR` (0): Unknown error

## Distance Calculation Algorithm

### Haversine Formula

Used to calculate great-circle distance between two points on Earth.

```
a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)
c = 2 × atan2(√a, √(1−a))
d = R × c

Where:
φ is latitude, λ is longitude, R is earth's radius (6,371 km)
Δφ is difference in latitude, Δλ is difference in longitude
```

**Accuracy**: ±0.5% on Earth surface
**Returns**: Distance in meters

## Customization Guide

### Change Geofence Distance

**Frontend (main.js)**:
```javascript
LocationTracker.maxAllowedDistance = 1000;  // 1km instead of 500m
```

**Backend (views.py)**:
```python
if not is_within_distance(distance, 1000):  # Change 500 to 1000
    messages.warning(...)
```

### Add Accuracy Threshold

```javascript
if (location.accuracy > 50) {  // Add check for accuracy
    showAlert('GPS accuracy is low (±' + location.accuracy + 'm)');
}
```

### Add Continuous Location Tracking

```javascript
// Watch location instead of get single position
navigator.geolocation.watchPosition(
    (position) => {
        // Update location continuously
    },
    null,
    options
);
```

### Store Location History

Add model:
```python
class LocationHistory(models.Model):
    employee = ForeignKey(Employee)
    latitude = FloatField()
    longitude = FloatField()
    timestamp = DateTimeField(auto_now_add=True)
    accuracy = FloatField()
```

## Performance Considerations

### Frontend
- GPS requests are async (doesn't block UI)
- Map initialization is lazy (only when map container exists)
- Location refresh every 10 seconds (can be adjusted)

### Backend
- Distance calculation is O(1) complexity
- No database queries during distance calculation
- Geofence validation is done in memory

### Optimization Tips
1. Increase timeout if GPS takes long
2. Enable high accuracy only when needed
3. Cache office location coordinates
4. Use IndexDB for location history (frontend)

## Testing

### Test Locations

Use these coordinates for testing:

```
New York: 40.7128, -74.0060
San Francisco: 37.7749, -122.4194
London: 51.5074, -0.1278
```

### Mock GPS Data

For development without GPS:
```javascript
LocationTracker.latitude = 40.7128;
LocationTracker.longitude = -74.0060;
LocationTracker.accuracy = 10;
```

### Distance Testing

```python
from utils import calculate_distance, is_within_distance

# Test calculation
distance = calculate_distance(40.7128, -74.0060, 40.7150, -74.0070)
print(distance)  # Should be ~324 meters

# Test geofence
within = is_within_distance(324, 500)
print(within)  # Should be True
```

## Security Considerations

### Data Protection
- GPS coordinates are PII (Personally Identifiable Information)
- Should be encrypted at rest
- Transmitted over HTTPS only

### Access Control
- Only authenticated users can see their GPS data
- Managers can see employee location data
- Admin logs all access to location data

### Best Practices
1. Use HTTPS in production
2. Encrypt sensitive fields in database
3. Log all location data access
4. Implement proper authentication
5. Set appropriate database permissions

## Troubleshooting for Developers

### GPS Not Activating

Check console for errors:
```javascript
LocationTracker.getCurrentLocation()
    .catch(error => console.error('GPS Error:', error));
```

### Distance Calculation Issues

Verify coordinates:
```javascript
console.log('Office:', officeLatitude, officeLongitude);
console.log('User:', latitude, longitude);
```

### Map Not Displaying

Check if Leaflet library is loaded:
```javascript
console.log(typeof L);  // Should be 'object'
```

### Database Constraints

Validate before saving:
```python
if not (-90 <= latitude <= 90):
    raise ValidationError('Invalid latitude')
if not (-180 <= longitude <= 180):
    raise ValidationError('Invalid longitude')
```

## Future Enhancements

1. **Real-time Location Tracking**: Watch location continuously
2. **Geofence Alerts**: Notify when leaving/entering geofence
3. **Route History**: Visualize employee movement patterns
4. **Offline Support**: Cache location, sync when online
5. **Mobile App Integration**: Native GPS access
6. **Heatmaps**: Visualize common work locations
7. **Location Analytics**: Analyze location patterns over time

## References

- [HTML5 Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)
- [Leaflet.js Documentation](https://leafletjs.com/)
- [OpenStreetMap Tiles](https://tile.openstreetmap.org/)

---

**Last Updated**: February 5, 2026
**Document Version**: 1.0
**Compatibility**: Django 4.2+, Python 3.8+
