# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js v14+ installed
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Step 1: Install Dependencies
```bash
cd "mtc connect app"
npm install
```

### Step 2: Start the App
```bash
npm start
```

### Step 3: Run on Your Device
- **Android**: Press `a` in terminal (requires Android emulator or USB device)
- **iOS**: Press `i` in terminal (requires macOS and iOS simulator)
- **Web**: Press `w` in terminal

## 📱 Testing the App

### Login
```
Email: user@example.com
Password: password123
```

### Home Screen Features
- Search buses with pickup/drop locations
- View recent routes
- Quick action shortcuts

### Real-Time Tracking
- Select a bus from results
- View live location on map
- See next stop and ETA

### Digital Tickets
- Browse upcoming tickets
- View QR codes
- Check booking history

### First/Last Mile
- Find nearby autorickshaws
- Get fare estimates
- Book rides

### Settings
- Change language (English/Hindi)
- Adjust preferences
- Manage saved places

## 🗂️ Project Structure Quick Reference

```
src/
├── App.tsx                 # Main app component
├── screens/                # 7 main screens
├── components/             # 5 reusable UI components
├── services/               # 6 business logic services
├── store/                  # Redux state management
├── navigation/             # App navigation setup
├── constants/              # Theme and constants
├── utils/                  # Helper functions
└── locales/                # i18n translations
```

## 🔌 API Integration

### Mock Data vs Real API
Currently using mock data for demo. To integrate real API:

1. Update `API_BASE_URL` in `.env`
2. Replace mock data in services with actual API calls
3. Implement proper error handling

### Example: Search Buses
```typescript
// Mock (Current)
const buses = [{ id: '1', busNumber: 'MTC-401', ... }];

// Real API (To implement)
const response = await apiService.searchBuses(from, to, date);
const buses = response.data.buses;
```

## 🎨 Customization

### Change Colors
Edit `src/constants/theme.ts`:
```typescript
export const Colors = {
  primary: '#YOUR_COLOR',  // Change main color
  secondary: '#YOUR_COLOR',
  // ...
};
```

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Add Language
1. Create `src/locales/[lang].ts`
2. Export translations object
3. Register in `src/services/localizationService.ts`

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 19000
lsof -ti:19000 | xargs kill -9
npm start
```

### Dependencies Not Installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Expo Not Found
```bash
npm install -g expo-cli
expo start
```

### Maps Not Showing
- Ensure location permissions are granted
- Check API key configuration in app.json
- Verify MapView component is rendered

## 📚 File Guide

### Key Files to Modify

| File | Purpose |
|------|---------|
| `src/App.tsx` | Entry point |
| `src/constants/theme.ts` | App styling |
| `src/locales/en.ts` | English text |
| `src/locales/hi.ts` | Hindi text |
| `src/services/apiService.ts` | API calls |
| `app.json` | App configuration |
| `package.json` | Dependencies |

### Service Files

| Service | Purpose |
|---------|---------|
| `apiService.ts` | REST API communication |
| `realtimeTrackingService.ts` | WebSocket tracking |
| `notificationService.ts` | Push notifications |
| `qrCodeService.ts` | QR code generation |
| `autorickshawService.ts` | Autorickshaw logic |
| `localizationService.ts` | i18n management |

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login/Signup works
- [ ] Bus search returns results
- [ ] Seat selection displays correctly
- [ ] QR codes generate
- [ ] Language switching works
- [ ] Maps display bus location
- [ ] Autorickshaw booking flow works

### Run Linter
```bash
npm run lint
```

### Run Tests
```bash
npm run test
```

## 📤 Deployment

### Build Android APK
```bash
eas build --platform android
```

### Build iOS IPA
```bash
eas build --platform ios
```

### Deploy to Web
```bash
expo export:web
# Upload 'dist' folder to hosting
```

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

See `CONTRIBUTING.md` for detailed guidelines.

## 📖 Documentation

- **README.md** - Project overview
- **ARCHITECTURE.md** - System design
- **API_DOCUMENTATION.md** - API reference
- **CONTRIBUTING.md** - Development guide
- **PROJECT_SUMMARY.md** - What's included

## 🆘 Getting Help

1. Check documentation files
2. Review comments in code
3. Check GitHub issues
4. Contact development team

## 📋 Development Workflow

### Adding a New Feature

1. Create Redux slice (if needed)
2. Create service file
3. Create/update component
4. Add translations
5. Update navigation (if new screen)
6. Test thoroughly
7. Update documentation

### Making API Calls

```typescript
// In a screen or component
import apiService from '@services/apiService';

try {
  const response = await apiService.searchBuses(from, to, date);
  // Handle response
} catch (error) {
  // Handle error
  console.error('Error:', error);
}
```

### Using Redux

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { selectBus } from '@store/slices/busTrackingSlice';

// In component
const dispatch = useDispatch();
const selectedBus = useSelector((state: RootState) => state.busTracking.selectedBusId);

// Update state
dispatch(selectBus('bus_001'));
```

## 🚦 Performance Tips

1. Use React.memo for expensive components
2. Optimize selectors in Redux
3. Lazy load screens
4. Virtualize long lists
5. Debounce API calls

## 🔒 Security Tips

1. Never commit .env files
2. Store tokens securely
3. Validate user input
4. Use HTTPS for API calls
5. Sanitize WebSocket data

## 📞 Support

- Documentation: See README.md
- Issues: GitHub Issues
- Email: support@mtcconnect.com

---

**Happy coding! 🎉**

For detailed information, see the complete documentation files.
