# GPS Quick Reference

## 🚀 Quick Start

### For Users

**1. Set Up Office Location** (First Time)
- Go to Dashboard → Profile
- Enter office latitude & longitude
- Click Save

**2. Enable Location Permission**
- When prompted by browser: Click "Allow"
- If already denied: Site Settings → Location → Allow

**3. Check In/Out With GPS**
- Click "Check In" button
- Wait for "Getting location..." to finish
- Review distance from office
- Click "Submit Check In"

### For Managers

**View GPS Data**
- Click Attendance Records
- Open any record
- See GPS coordinates and distance

## 📍 Key Concepts

| Term | Meaning |
|------|---------|
| **Latitude** | North/South position (-90 to +90°) |
| **Longitude** | East/West position (-180 to +180°) |
| **Geofence** | 500m radius around office |
| **Accuracy** | GPS precision (lower is better) |
| **Distance** | Km/meters from office |

## ✅ Geofence Status

```
✓ Within 500m     → Green badge - OK to check in
⚠ Outside 500m    → Orange badge - Warning (can still check in)
✗ Unable to get   → Red badge - GPS failed
```

## 🔧 Common Tasks

### Change Office Location
```
Dashboard → Profile Settings
↓
Update Latitude & Longitude
↓
Save
```

### Find Your Coordinates
```
Google Maps → Right-click location → Copy coordinates
Paste into office_latitude and office_longitude
```

### Check History
```
Attendance Records → Find date → View
↓
See GPS coordinates and distance from office
```

### Troubleshoot GPS
```
Check 1: Location permission allowed? → Site settings → Allow
Check 2: GPS enabled on device? → Settings → Location → On
Check 3: Modern browser? → Use Chrome, Firefox, Safari, Edge
Check 4: Internet connection? → WiFi or mobile data enabled
```

## 🗺️ Distance Quick Reference

| Distance | Status | Action |
|----------|--------|--------|
| 0-100m | ✓ Excellent | Check in/out |
| 100-300m | ✓ Good | Check in/out |
| 300-500m | ✓ Within range | Check in/out |
| 500m+ | ⚠ Outside | Can check in (warning) |

## 📱 On Different Devices

**Desktop/Laptop**
- Allow location in browser
- GPS via WiFi IP location
- Less accurate than mobile

**Mobile (Phone/Tablet)**
- Allow location in settings
- Uses real GPS + WiFi
- More accurate (5-15m)

**Outdoors vs Indoors**
- Outdoors: 5-15m accuracy
- Indoors: 20-50m accuracy
- Near windows: 10-30m accuracy

## 🔐 Privacy & Security

**Your Data Is:**
- Encrypted in transit (HTTPS)
- Stored securely in database
- Only accessible to you + managers
- Never shared publicly

**Best Practices:**
- Don't screenshot sensitive coordinates
- Use browser location permission wisely
- Review your records periodically

## 📞 Quick Troubleshooting

**"Geolocation not supported"**
→ Use Chrome, Firefox, Safari, or Edge

**"Permission denied"**
→ Site Settings → Location → Allow

**"Position unavailable"**
→ Enable GPS on device, move to open area

**"Taking too long"**
→ Wait 30 seconds, check signal, refresh page

**"Coordinates seem wrong"**
→ Normal: GPS ±5-15m accuracy. Wait 30s for lock.

## 🎯 Key Shortcuts

| Screen | What It Shows | What It Records |
|--------|---------------|-----------------|
| Check In | Your location, distance | GPS coordinates, distance |
| Check Out | Your location, distance | GPS coordinates, distance |
| Dashboard | Today's location data | Check in/out distance |
| Records | All historical data | All GPS coordinates |

## 🌍 Find Coordinates Online

**Method 1: Google Maps**
1. Open Google Maps
2. Find your office
3. Right-click → Copy coordinates
4. Paste in profile

**Method 2: Map Search**
1. https://map.what3words.com
2. Search location
3. Copy lat/long
4. Paste in profile

**Format**: Latitude, Longitude
**Example**: 40.7128, -74.0060 (NYC)

## 🔄 How Geofence Works

```
Office Location
     ↓
[📍 lat, lon]
     ↓
User Location
     ↓
[Your lat, lon]
     ↓
Calculate Distance
(Haversine formula)
     ↓
Distance = XXX meters
     ↓
Is Distance ≤ 500m?
     ↓
YES ✓          NO ⚠
Within         Outside
Geofence       Geofence
```

## 📊 Example Scenario

**Setup:**
- Office: 40.7128, -74.0060 (NYC)
- Max distance: 500m

**Morning Check In:**
- Your location: 40.7140, -74.0080
- Distance calculated: 280 meters
- Status: ✓ Within 500m
- Result: Check in allowed, green badge

**Outside Check In:**
- Your location: 40.7200, -73.9700
- Distance calculated: 4.2 km
- Status: ⚠ Outside 500m
- Result: Check in allowed, warning shown

## 🎓 Learn More

- **Setup Guide**: [GPS_SETUP_GUIDE.md](GPS_SETUP_GUIDE.md)
- **Technical Docs**: [GPS_TECHNICAL_DOCS.md](GPS_TECHNICAL_DOCS.md)
- **Main README**: [README.md](README.md)

---

**Last Updated**: February 5, 2026
**GPS System**: Fully Operational ✅
