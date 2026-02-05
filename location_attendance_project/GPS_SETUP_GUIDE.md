# GPS Location Tracking - Setup Guide

## Overview

This attendance system includes comprehensive GPS location tracking functionality. This guide covers setup, configuration, and usage of the GPS features.

## Features Enabled

✅ **Real-time GPS Location Capture** - Captures precise GPS coordinates during check-in/check-out
✅ **Geofencing** - Validates employee location is within 500m of office
✅ **Distance Calculation** - Calculates distance from office using Haversine formula
✅ **Location Maps** - Interactive maps using Leaflet.js to visualize locations
✅ **Location History** - Records GPS coordinates for each check-in/check-out
✅ **Accuracy Metrics** - Displays GPS accuracy in meters
✅ **Browser Compatibility** - Works on modern browsers with geolocation support

## Setup Steps

### 1. Configure Office Location

Each employee must set their office location coordinates:

1. Go to **Dashboard** → **Profile Settings**
2. Enter **Office Latitude** (e.g., 40.7128 for New York)
3. Enter **Office Longitude** (e.g., -74.0060 for New York)
4. Click **Save**

> **How to find coordinates:** Use Google Maps → Right-click location → Select coordinates

### 2. Enable Location Permission in Browser

#### Chrome/Edge/Brave:
1. Visit the attendance system site
2. Click the **Location icon** in address bar
3. Select **Allow** for location access
4. Refresh the page

#### Firefox:
1. Visit the attendance system site
2. Allow location access when prompted
3. Accept and refresh

#### Safari (iOS):
1. Settings → Privacy → Location Services
2. Enable location access for your browser
3. Open the attendance system

### 3. Ensure Device GPS is Enabled

- **Desktop/Laptop**: Most modern systems allow browser-based location access
- **Mobile**: Enable Location Services in device settings
- **WiFi-based**: Location may be less accurate without GPS, use on mobile device for best results

## How GPS Works During Check-In/Check-Out

### Check-In Process

1. Navigate to **Check In** page
2. System automatically requests GPS location
3. "Getting location..." appears while acquiring coordinates
4. Once acquired, you'll see:
   - **Your Location**: Latitude and Longitude
   - **Accuracy**: GPS accuracy in meters (lower is better)
   - **Distance from Office**: Calculated distance
   - **Geofence Status**: Shows if you're within 500m of office
   - **Map**: Interactive map showing your location (pink) and office (red)

5. Click **Submit Check In**
6. System validates location and saves the record

### Check-Out Process

Same as check-in, but captures evening location data.

## Geofencing Rules

### Allowed Distance
- **Within 500m**: ✅ Green badge - "Within 500m"
- **Outside 500m**: ⚠️ Orange badge - "Outside 500m range"

### Important Notes
- You can still check in/out if outside geofence (with warning)
- Distance is recorded for compliance review
- Manager can see all location data in attendance records

## Understanding GPS Data

### Location Information Displayed

```
Your Location: 40.712776, -74.005974
Accuracy: 15m
Distance from Office: 450m
Geofence Status: ✓ Within 500m
```

**Latitude/Longitude**: Your precise GPS coordinates
**Accuracy**: How accurate the GPS reading is (15m means ±15 meters)
**Distance**: How far you are from the configured office location
**Geofence**: Whether you're within the 500m radius

### Viewing GPS Data in Records

1. Go to **Attendance Records**
2. Find the record you want to view
3. Click **View** button
4. You'll see:
   - Check-in time & distance
   - Check-out time & distance
   - GPS coordinates for both
   - Interactive map

## Troubleshooting

### "Geolocation is not supported by your browser"

**Solution**: Use a modern browser
- ✅ Chrome 5+
- ✅ Firefox 3.5+
- ✅ Safari 5+
- ✅ Edge 12+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### "Location permission denied"

**Solution**: 
1. Check browser location permissions
2. Clear browser cookies and site data
3. Check system location privacy settings
4. Try incognito/private mode

### "Error: Position unavailable"

**Solution**:
- Ensure GPS is enabled on device
- Try moving to location with better signal
- Check if browser has location permission
- Ensure internet connection is active

### "Getting location..." takes too long

**Solution**:
- Check GPS signal (try outdoors)
- Ensure WiFi or mobile data is enabled
- Disable and re-enable location services
- Refresh the page and try again

### GPS coordinates seem inaccurate

**Solution**:
- GPS accuracy varies (especially indoors)
- Allow 30-60 seconds for GPS to lock
- Mobile devices have better GPS accuracy
- WiFi-based location is less accurate

## Security & Privacy

### Your Data
- GPS coordinates are stored securely in the database
- Only accessible to you and authorized managers
- Data is encrypted in transit (HTTPS)
- Follows data protection regulations

### Best Practices
- Don't share your office location publicly
- Be aware GPS location is recorded
- Use VPN if concerned about location privacy
- Review your records periodically

## API Endpoints (For Developers)

### Get Location Data
```
POST /attendance/get-location/
Content-Type: application/json

{
    "latitude": 40.712776,
    "longitude": -74.005974,
    "accuracy": 15
}

Response:
{
    "status": "success",
    "latitude": 40.712776,
    "longitude": -74.005974,
    "accuracy": 15,
    "distance": 450,
    "office_location": {
        "latitude": 40.7200,
        "longitude": -74.0050
    }
}
```

## Configuration Options

### Geofence Distance
Current: **500 meters**

To change:
1. Edit `main.js` line: `maxAllowedDistance: 500`
2. Update views.py validation: `is_within_distance(distance, 500)`
3. Restart application

### High Accuracy GPS
Currently enabled by default:
```javascript
const options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
};
```

## Frequently Asked Questions

**Q: Can I check in from home?**
A: Yes, you can check in from anywhere. If outside 500m, you'll see a warning.

**Q: Is my location tracked continuously?**
A: No, location is only captured at check-in and check-out.

**Q: Can I spoof my GPS location?**
A: Technically possible, but creates audit trail for managers.

**Q: What if GPS fails during check-in?**
A: Check-in continues without GPS data (if location fails).

**Q: How accurate is the distance calculation?**
A: Within ±5-15m under normal conditions. Accuracy shown in interface.

**Q: Can I edit my GPS coordinates?**
A: No, coordinates are locked after submission for audit purposes.

## Support

For GPS-related issues:
1. Check this guide's troubleshooting section
2. Verify office location is set correctly
3. Test GPS on the setup_profile page
4. Contact your IT administrator

## Related Documentation

- [Main README](README.md)
- [Quickstart Guide](QUICKSTART.md)
- [Project Summary](PROJECT_SUMMARY.md)

---

**Last Updated**: February 5, 2026
**GPS Module Version**: 2.0
**Geofence Radius**: 500 meters
