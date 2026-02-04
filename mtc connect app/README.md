# MTC Connect - Comprehensive Bus Tracking & Ticketing Mobile App

A full-featured mobile application for real-time bus tracking, digital ticketing with QR codes, multi-language support, and first/last-mile connectivity with autorickshaw integration.

## 🚀 Features

### 1. **Real-Time Bus Tracking**
- Live bus location tracking on interactive maps
- Real-time route visualization with polylines
- Next stop information and estimated arrival times
- WebSocket integration for continuous position updates
- Distance and duration calculations

### 2. **Digital Ticketing System**
- Search and book buses with available seat selection
- QR code generation for digital tickets
- Digital pass support (Monthly, 7-day passes)
- Ticket management (view, cancel, history)
- Electronic confirmation and notifications
- Seat selection interface with visual feedback

### 3. **Multi-Language Support**
- English and Hindi language support
- Easy language switching in settings
- RTL support ready for future expansion
- Localized date and number formats

### 4. **First & Last Mile Connectivity**
- Autorickshaw booking for pickup/dropoff
- Real-time autorickshaw location tracking
- Fare estimation based on distance and time
- Driver rating and review system
- Peak hour surge pricing
- Loyalty point discounts

### 5. **Additional Features**
- User authentication (Login/Sign Up)
- Profile management and saved places
- Push notifications for arrivals and bookings
- Payment integration ready (Stripe, Razorpay)
- Booking history and favorites
- Settings and preferences

## 📁 Project Structure

```
src/
├── screens/              # Main application screens
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── TrackingScreen.tsx
│   ├── TicketsScreen.tsx
│   ├── ConnectivityScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/           # Navigation configuration
│   └── RootNavigator.tsx
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── TextInput.tsx
│   ├── BusCard.tsx
│   ├── SeatSelection.tsx
│   └── QRCodeDisplay.tsx
├── services/             # Business logic and API calls
│   ├── apiService.ts
│   ├── realtimeTrackingService.ts
│   ├── notificationService.ts
│   ├── qrCodeService.ts
│   ├── autorickshawService.ts
│   └── localizationService.ts
├── store/                # Redux state management
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── busTrackingSlice.ts
│       ├── ticketingSlice.ts
│       ├── autorickshawSlice.ts
│       └── localizationSlice.ts
├── constants/            # App constants and theme
│   └── theme.ts
├── utils/                # Utility functions
│   └── locationUtils.ts
├── locales/              # Translation files
│   ├── en.ts
│   └── hi.ts
└── types/                # TypeScript type definitions

```

## 🛠️ Technology Stack

### Frontend Framework
- **React Native** with Expo for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for app navigation
- **Redux Toolkit** for state management

### Maps & Location
- **React Native Maps** for map visualization
- **Expo Location** for GPS tracking
- **Haversine formula** for distance calculations

### Real-Time Communication
- **WebSocket** for live bus position updates
- **Expo Notifications** for push notifications

### Authentication & Data
- **AsyncStorage** for local data persistence
- **Secure Storage** for sensitive data
- **Axios** for API communication

### QR Codes & Barcodes
- **React QR Code** for QR code generation
- **Expo Barcode Scanner** for scanning

### Payment Integration Ready
- Stripe SDK support
- Razorpay integration
- Multiple payment methods (UPI, Cards, Wallet)

## 📱 Screens Overview

### 1. Login/Sign Up Screen
- Email and password authentication
- Social login options (Google, Apple, Facebook)
- Form validation
- Remember me functionality

### 2. Home Screen
- Search buses by location
- Recent routes quick access
- Quick action shortcuts
- Featured and nearby buses
- User greeting and profile quick access

### 3. Tracking Screen
- Interactive map with real-time bus position
- Next stop and ETA display
- Current coordinates
- Route visualization
- Center on bus and stop tracking options

### 4. Tickets Screen
- Upcoming tickets tab
- Booking history tab
- Ticket details with expandable cards
- QR code display
- Cancellation option
- Status indicators (Confirmed, Used, Expired)

### 5. Connectivity Screen
- First Mile tab (home to bus station)
- Last Mile tab (bus station to destination)
- Nearby autorickshaw listings
- Driver ratings and vehicle details
- Fare estimation
- Booking confirmation

### 6. Profile Screen
- User information display and editing
- Saved places management
- Preference settings
- Support and about links
- Logout option

### 7. Settings Screen
- Language selection
- Notification preferences
- Location sharing toggle
- Payment methods
- Privacy and security settings
- App version and about information

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Android/iOS development environment (optional for local testing)

### Installation Steps

1. **Clone the repository**
```bash
cd "mtc connect app"
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
API_BASE_URL=https://api.mtcconnect.com/v1
WS_URL=wss://ws.mtcconnect.com/tracking
```

4. **Start the development server**
```bash
npm start
# or
yarn start
```

5. **Run on your device**
- Android: Press 'a' in the terminal
- iOS: Press 'i' in the terminal
- Web: Press 'w' in the terminal

## 📡 API Integration

### Required Backend Endpoints

#### Authentication
```
POST   /auth/login
POST   /auth/signup
POST   /auth/logout
```

#### Bus Operations
```
GET    /buses/search?pickupLocation=...&dropLocation=...&date=...
GET    /buses/{busId}
GET    /buses/{busId}/route
GET    /buses/{busId}/location
GET    /buses/{busId}/seats?date=...
GET    /buses/nearby?latitude=...&longitude=...&radius=5
```

#### Ticketing
```
POST   /tickets/book
GET    /tickets/my-tickets
GET    /tickets/{ticketId}
POST   /tickets/{ticketId}/cancel
```

#### Autorickshaw
```
GET    /autorickshaw/nearby?latitude=...&longitude=...
POST   /autorickshaw/book
GET    /autorickshaw/{autoId}
POST   /autorickshaw/{rideId}/location
POST   /autorickshaw/{rideId}/end
```

#### User Profile
```
GET    /users/profile
PUT    /users/profile
GET    /users/saved-places
POST   /users/saved-places
```

## 🔐 Security Features

1. **Authentication**
   - Secure token-based authentication
   - Token stored in secure storage
   - Automatic token refresh

2. **Data Protection**
   - End-to-end encryption for sensitive data
   - HTTPS/WSS for all communications
   - Secure storage for credentials

3. **Location Privacy**
   - User consent for location access
   - Precise location only when needed
   - Background location tracking disabled by default

## 📊 State Management (Redux)

### Slices

#### Auth Slice
```typescript
{
  userId: string | null
  token: string | null
  userEmail: string | null
  isAuthenticated: boolean
  loading: boolean
}
```

#### Bus Tracking Slice
```typescript
{
  selectedBusId: string | null
  currentLocation: { latitude, longitude } | null
  nextStop: string | null
  estimatedArrival: number | null
  busDetails: any | null
  routeCoordinates: Array
  allStops: Array
  realtimeUpdates: boolean
}
```

#### Ticketing Slice
```typescript
{
  tickets: Ticket[]
  selectedTicket: Ticket | null
  bookingHistory: Ticket[]
}
```

#### Autorickshaw Slice
```typescript
{
  nearbyAutorickshaws: AutoDriver[]
  selectedAutorickshaw: any | null
  activeRide: any | null
  rideHistory: any[]
}
```

#### Localization Slice
```typescript
{
  currentLanguage: 'en' | 'hi'
  supportedLanguages: Array
}
```

## 🎨 Theme & Styling

### Color Palette
```typescript
primary: '#FF6B35'      // Orange
secondary: '#004E89'    // Blue
success: '#2ECC71'      // Green
warning: '#F39C12'      // Yellow
danger: '#E74C3C'       // Red
```

### Spacing System
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px

### Typography
- Small: 12px
- Medium: 14px
- Large: 18px
- Extra Large: 24px

## 🌍 Multi-Language Support

### Supported Languages
1. **English** - Default
2. **Hindi** - Regional support

### Adding New Languages
1. Create translation file in `src/locales/[lang].ts`
2. Export translations object
3. Register in `src/services/localizationService.ts`

## 🧪 Testing

### Unit Testing
```bash
npm run test
```

### Linting
```bash
npm run lint
```

## 🚀 Deployment

### Android APK Build
```bash
eas build --platform android
```

### iOS Build
```bash
eas build --platform ios
```

### Web Deployment
```bash
expo export:web
# Deploy the 'dist' folder to your hosting service
```

## 📝 Environment Configuration

### Development
```env
API_BASE_URL=http://localhost:3000/api
WS_URL=ws://localhost:3000/ws
DEBUG=true
```

### Production
```env
API_BASE_URL=https://api.mtcconnect.com/v1
WS_URL=wss://api.mtcconnect.com/ws
DEBUG=false
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@mtcconnect.com
- Documentation: [docs.mtcconnect.com](https://docs.mtcconnect.com)
- GitHub Issues: Report bugs and feature requests

## 🔮 Future Enhancements

- [ ] Offline mode support
- [ ] Voice commands
- [ ] AR navigation
- [ ] Loyalty program integration
- [ ] Corporate account management
- [ ] Analytics dashboard for operators
- [ ] AI-based recommendations
- [ ] Integration with other transport modes
- [ ] Real-time traffic updates
- [ ] Advanced booking options

## 🎓 Learning Resources

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [React Navigation Documentation](https://reactnavigation.org)

---

**MTC Connect** - Making urban mobility seamless and accessible! 🚌
