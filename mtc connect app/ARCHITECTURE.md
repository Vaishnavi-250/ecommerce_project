# MTC Connect - Architecture & Design Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile Application                       │
│  (React Native with Expo - iOS, Android, Web)              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐ │
│  │   Navigation     │  │    Screens       │  │ Components │ │
│  │   (React Navg.)  │  │   (7 Screens)    │  │ (Reusable) │ │
│  └──────────────────┘  └──────────────────┘  └────────────┘ │
│         │                      │                     │         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │           Redux Store (State Management)                 │ │
│  │  ┌────────────┬────────────┬────────────┬────────────┐  │ │
│  │  │   Auth     │   Tracking │  Ticketing │ Autoricksh │  │ │
│  │  │   Slice    │   Slice    │   Slice    │aw Slice    │  │ │
│  │  └────────────┴────────────┴────────────┴────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
│         │                                                       │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              Services Layer                              │ │
│  │  ┌──────────┬──────────┬───────────┬──────────────────┐ │ │
│  │  │   API    │ Realtime │   QR Code │  Autorickshaw    │ │ │
│  │  │ Service  │ Tracking │  Service  │  Service         │ │ │
│  │  ├──────────┼──────────┼───────────┼──────────────────┤ │ │
│  │  │ Local.   │Notif.    │ Location  │ Payment Service  │ │ │
│  │  │ Storage  │Service   │ Utils     │ (Stripe/Razorpay)│ │ │
│  │  └──────────┴──────────┴───────────┴──────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
│         │                                                       │
└─────────────────────────────────────────────────────────────┘
         │
         ├──────────────────────┬────────────────┬───────────────┐
         │                      │                │               │
    ┌────▼────┐         ┌──────▼───┐     ┌─────▼─────┐   ┌────▼────┐
    │   REST  │         │ WebSocket │     │  Location │   │ Notify  │
    │   API   │         │  (Real-   │     │    APIs   │   │ Service │
    │         │         │   time)   │     │           │   │ (Push)  │
    └─────────┘         └───────────┘     └───────────┘   └─────────┘
         │                    │                   │              │
    ┌────▼──────────────────────▼───────────────▼──────────────▼────┐
    │              Backend Server (Node.js/Express)                  │
    │                                                                │
    │  ┌──────────────┬─────────────┬──────────────┬──────────────┐ │
    │  │ Auth Service │ Bus Service │ Ticket Srvce │ Auto Service │ │
    │  └──────────────┴─────────────┴──────────────┴──────────────┘ │
    │                                                                │
    │  ┌──────────────────────────────────────────────────────────┐ │
    │  │             Database (PostgreSQL/MongoDB)               │ │
    │  │  ┌────────┬────────┬────────┬────────┬─────────────┐   │ │
    │  │  │ Users  │ Buses  │Tickets │Drivers│Transactions │   │ │
    │  │  └────────┴────────┴────────┴────────┴─────────────┘   │ │
    │  └──────────────────────────────────────────────────────────┘ │
    └─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Redux Provider
│   └── Navigation
│       ├── AuthNavigator (unauthenticated)
│       │   └── LoginScreen
│       └── AppNavigator (authenticated)
│           ├── HomeTab
│           │   └── HomeScreen
│           │       ├── SearchCard
│           │       │   ├── TextInput
│           │       │   ├── TextInput
│           │       │   └── Button
│           │       ├── RecentRoutes
│           │       │   └── FlatList[RouteCard]
│           │       ├── BusList
│           │       │   └── FlatList[BusCard]
│           │       └── ActionGrid
│           │           └── 4 ActionCards
│           ├── Tracking
│           │   └── TrackingScreen
│           │       ├── MapView
│           │       │   ├── Marker (Bus)
│           │       │   ├── Marker (Stops)
│           │       │   └── Polyline (Route)
│           │       └── InfoCard
│           ├── Tickets
│           │   └── TicketsScreen
│           │       ├── TabView
│           │       │   ├── UpcomingTab
│           │       │   │   └── FlatList[TicketCard]
│           │       │   │       ├── ExpandableContent
│           │       │   │       │   ├── QRCodeButton
│           │       │   │       │   └── CancelButton
│           │       │   │       └── TicketDetails
│           │       │   └── HistoryTab
│           ├── Connectivity
│           │   └── ConnectivityScreen
│           │       ├── TabView
│           │       │   ├── FirstMileTab
│           │       │   │   ├── LocationInputs
│           │       │   │   └── AutoCard[]
│           │       │   └── LastMileTab
│           │       │       ├── LocationInputs
│           │       │       └── AutoCard[]
│           │       └── ActiveRideBanner
│           ├── Profile
│           │   └── ProfileScreen
│           │       ├── ProfileHeader
│           │       ├── PersonalInfo
│           │       │   ├── EditableFields
│           │       │   └── SaveButton
│           │       ├── SavedPlaces
│           │       │   └── PlaceCard[]
│           │       └── Preferences
│           └── Settings
│               └── SettingsScreen
│                   ├── LanguageSelector
│                   ├── NotificationToggle
│                   ├── LocationToggle
│                   └── AccountSettings
```

## Data Flow

### 1. Bus Search Flow
```
User Input
    ↓
[HomeScreen] pickupLocation, dropLocation
    ↓
[Button.onPress] handleSearchBuses()
    ↓
[apiService.searchBuses()] API Call
    ↓
[Redux] dispatch(updateBuses)
    ↓
[BusCard] Re-render with new bus list
```

### 2. Real-Time Tracking Flow
```
[TrackingScreen mounted]
    ↓
[realtimeTrackingService.connect()] WebSocket connection
    ↓
[realtimeTrackingService.subscribe(busId)] Listen to updates
    ↓
[WebSocket onmessage] Receive location update
    ↓
[Redux] dispatch(updateBusLocation)
    ↓
[MapView] Re-render with new position
    ↓
[Polyline] Update route visualization
```

### 3. Ticket Booking Flow
```
[BusCard.onPress]
    ↓
Navigate to BusDetailsScreen
    ↓
[User selects seats]
    ↓
[SeatSelection.onSeatsSelect] Update selected seats
    ↓
[User confirms booking]
    ↓
[apiService.bookTicket()]
    ↓
[Redux] dispatch(addTicket)
    ↓
[QRCodeService.generateTicketQRCode()]
    ↓
Navigate to ConfirmationScreen
    ↓
Show QR Code & Ticket Details
```

### 4. Autorickshaw Booking Flow
```
[ConnectivityScreen]
    ↓
[User enters locations]
    ↓
[handleFindAutorickshaws()]
    ↓
[apiService.getNearbyAutorickshaws()]
    ↓
[autorickshawService.calculateFare()]
    ↓
[Redux] dispatch(setNearbyAutorickshaws)
    ↓
[Render AutoCard list]
    ↓
[User selects auto]
    ↓
[apiService.bookAutorickshaw()]
    ↓
[Redux] dispatch(setActiveRide)
    ↓
Show active ride banner & tracking
```

## Service Layer Details

### API Service
```typescript
class APIService {
  - Authentication endpoints
    - login()
    - signup()
    - logout()
  
  - Bus endpoints
    - searchBuses()
    - getBusDetails()
    - getBusRoute()
    - getBusRealTimeLocation()
    - getNearbyBuses()
  
  - Ticketing endpoints
    - bookTicket()
    - getTickets()
    - getTicketDetails()
    - cancelTicket()
    - getAvailableSeats()
  
  - Payment endpoints
    - initiatePayment()
    - verifyPayment()
  
  - Autorickshaw endpoints
    - getNearbyAutorickshaws()
    - bookAutorickshaw()
    - getAutorickshawDetails()
    - updateAutorickshawLocation()
    - endAutorickshawRide()
  
  - User profile
    - getUserProfile()
    - updateUserProfile()
    - getSavedPlaces()
    - addSavedPlace()
}
```

### Realtime Tracking Service
```typescript
class RealtimeTrackingService {
  - WebSocket management
    - connect()
    - disconnect()
    - isConnected()
  
  - Event subscription
    - subscribe(busId, callback)
    - unsubscribe(busId)
    - subscribeToAll(callback)
  
  - Features
    - Auto-reconnect on disconnect
    - Message parsing and validation
    - Multi-listener support
}
```

### QR Code Service
```typescript
class QRCodeGenerator {
  - Ticket QR generation
    - generateTicketQRCode()
    - encodeTicketForQR()
    - decodeTicketFromQR()
  
  - Pass generation
    - generateMonthlyPassQRCode()
    - generate7DayPassQRCode()
    - generateDigitalPassQRCode()
  
  - Data structure
    - Type identification
    - Version control
    - Timestamp
}
```

### Autorickshaw Service
```typescript
class AutorickshawService {
  - Fare calculation
    - calculateFare()
    - applyPeakHourSurcharge()
    - applyLoyaltyDiscount()
  
  - Driver sorting
    - sortByDistance()
    - sortByRating()
  
  - Constants
    - baseFare: 10 INR
    - perKmRate: 8 INR/km
    - perMinuteRate: 0.5 INR/min
}
```

## Redux State Shape

```typescript
{
  auth: {
    userId: string | null,
    token: string | null,
    userEmail: string | null,
    isAuthenticated: boolean,
    loading: boolean
  },
  busTracking: {
    selectedBusId: string | null,
    currentLocation: {
      latitude: number,
      longitude: number
    } | null,
    nextStop: string | null,
    estimatedArrival: number | null,
    busDetails: {
      busNumber: string,
      operatorName: string,
      capacity: number,
      rating: number
    } | null,
    routeCoordinates: Array<{
      latitude: number,
      longitude: number
    }>,
    allStops: Array<{
      id: string,
      name: string,
      latitude: number,
      longitude: number
    }>,
    realtimeUpdates: boolean
  },
  ticketing: {
    tickets: Array<{
      id: string,
      busNumber: string,
      pickupPoint: string,
      dropPoint: string,
      date: string,
      time: string,
      fare: number,
      seatNumber: string,
      qrCode: string,
      status: 'confirmed' | 'expired' | 'used'
    }>,
    selectedTicket: Ticket | null,
    bookingHistory: Ticket[]
  },
  autorickshaw: {
    nearbyAutorickshaws: Array<{
      id: string,
      driverName: string,
      rating: number,
      vehicleNumber: string,
      currentLocation: { latitude, longitude },
      estimatedFare: number,
      distance: number
    }>,
    selectedAutorickshaw: Auto | null,
    activeRide: Ride | null,
    rideHistory: Ride[]
  },
  localization: {
    currentLanguage: 'en' | 'hi',
    supportedLanguages: Array<{
      code: string,
      name: string
    }>
  }
}
```

## UI/UX Design Principles

### Color System
- **Primary**: Orange (#FF6B35) - CTAs, highlights
- **Secondary**: Blue (#004E89) - Secondary actions
- **Success**: Green (#2ECC71) - Confirmations
- **Warning**: Yellow (#F39C12) - Alerts
- **Danger**: Red (#E74C3C) - Errors

### Spacing System
Follows 4px base unit:
- xs: 4px - Minimal spacing
- sm: 8px - Compact spacing
- md: 12px - Standard spacing
- lg: 16px - Section spacing
- xl: 24px - Major sections
- xxl: 32px - Page spacing

### Typography
- Small (12px): Labels, captions, metadata
- Medium (14px): Body text, regular content
- Large (18px): Section headers
- Extra Large (24px): Page titles

### Components Pattern
- Consistent padding (lg: 16px)
- Rounded corners (border-radius: 8-12px)
- Shadows for depth (elevation: 3)
- Light gray dividers (#ECF0F1)

## Performance Optimization

1. **Component Optimization**
   - Memoization of expensive components
   - Lazy loading of screens
   - Virtualized lists for large datasets

2. **Network Optimization**
   - Request debouncing
   - Response caching
   - Batch API calls
   - Compression support

3. **State Management**
   - Normalized state shape
   - Selector memoization
   - Avoid deeply nested updates

4. **Memory Management**
   - Cleanup WebSocket listeners
   - Remove event listeners on unmount
   - Pagination for lists

## Security Considerations

1. **Authentication**
   - JWT token-based authentication
   - Refresh token rotation
   - Secure token storage

2. **Data Protection**
   - HTTPS/TLS encryption
   - Sensitive data in secure storage
   - No sensitive data in logs

3. **API Security**
   - API key validation
   - CORS configuration
   - Rate limiting

4. **User Privacy**
   - Location tracking consent
   - Data retention policies
   - Privacy controls

---

**Last Updated**: 2024
