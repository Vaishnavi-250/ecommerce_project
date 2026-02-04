# Environment Setup Guide

## System Requirements

### Minimum
- **OS**: Windows 10, macOS 10.15+, or Linux
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (or yarn v1.22.0+)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space

### Recommended
- **Node.js**: v16 LTS or higher
- **npm**: v8 or higher
- **RAM**: 8GB or more
- **Storage**: 5GB SSD for development

## Installation Steps

### 1. Install Node.js & npm

#### Windows
- Download from https://nodejs.org/
- Choose LTS version
- Run installer and follow setup wizard
- Verify installation:
```bash
node --version
npm --version
```

#### macOS
```bash
# Using Homebrew
brew install node@16
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

### 2. Install Expo CLI

```bash
npm install -g expo-cli
expo --version
```

### 3. Install Android Studio (Optional - for Android development)

1. Download from https://developer.android.com/studio
2. Follow installation wizard
3. Install Android SDK
4. Set ANDROID_HOME environment variable

### 4. Install Xcode (macOS only - for iOS development)

```bash
xcode-select --install
# or download from App Store
```

## Project Setup

### 1. Clone/Download Project
```bash
cd c:\Users\DELL\Desktop\
# Project folder already exists as "mtc connect app"
cd "mtc connect app"
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Create .env File
```bash
# In project root directory
cat > .env << EOF
API_BASE_URL=https://api.mtcconnect.com/v1
WS_URL=wss://ws.mtcconnect.com/tracking
DEBUG=true
EOF
```

### 4. Verify Installation
```bash
npm list react-native
npm list expo
npm list redux
```

## Development Setup

### IDE Setup (VS Code Recommended)

#### Extensions to Install
1. ES7+ React/Redux/React-Native snippets
2. Prettier - Code formatter
3. ESLint
4. Thunder Client (API testing)
5. React Native Tools
6. TypeScript Vue Plugin
7. Error Lens

#### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Git Configuration
```bash
# Initialize git (if not already)
git init

# Configure user
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Create .gitignore
cat > .gitignore << EOF
node_modules/
.expo/
dist/
.env
.env.local
*.log
.DS_Store
EOF
```

## Running the Application

### Option 1: Development Server
```bash
npm start
```

### Option 2: Specific Platform

#### Android
```bash
npm run android
# Requires Android emulator or USB device
```

#### iOS
```bash
npm run ios
# macOS only, requires iOS simulator
```

#### Web
```bash
npm run web
# Opens http://localhost:19006
```

### Option 3: Using Expo Go App
1. Install Expo Go from App Store
2. Run `npm start`
3. Scan QR code with Expo Go app

## Database Setup (For Backend Development)

### PostgreSQL
```bash
# macOS
brew install postgresql
brew services start postgresql

# Windows - Download from postgresql.org

# Create development database
createdb mtc_connect_dev
```

### MongoDB (Alternative)
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or download from mongodb.com
```

## API Backend Setup (Optional)

### Node.js Express Backend
```bash
# Create backend directory
mkdir mtc-connect-backend
cd mtc-connect-backend

# Initialize project
npm init -y

# Install dependencies
npm install express cors dotenv axios socket.io

# Create server structure
mkdir src routes controllers models middleware
```

## Environment Variables

### Development (.env)
```env
# API Configuration
API_BASE_URL=http://localhost:3000/api
WS_URL=ws://localhost:3000/ws

# Debugging
DEBUG=true
LOG_LEVEL=debug

# Feature Flags
FEATURE_DARK_MODE=false
FEATURE_OFFLINE_MODE=false
FEATURE_ANALYTICS=false

# Maps
GOOGLE_MAPS_API_KEY=your_key_here

# Payment (Sandbox)
STRIPE_PUBLISHABLE_KEY=pk_test_...
RAZORPAY_KEY_ID=rzp_test_...
```

### Production (.env.production)
```env
# API Configuration
API_BASE_URL=https://api.mtcconnect.com/v1
WS_URL=wss://api.mtcconnect.com/ws

# Debugging
DEBUG=false
LOG_LEVEL=error

# Feature Flags
FEATURE_DARK_MODE=true
FEATURE_OFFLINE_MODE=true
FEATURE_ANALYTICS=true

# Maps
GOOGLE_MAPS_API_KEY=your_key_here

# Payment (Live)
STRIPE_PUBLISHABLE_KEY=pk_live_...
RAZORPAY_KEY_ID=rzp_live_...
```

## Code Quality Tools

### Setup ESLint
```bash
npm install --save-dev eslint eslint-config-airbnb
npx eslint --init
```

### Setup Prettier
```bash
npm install --save-dev prettier
echo '{"semi": true, "singleQuote": true}' > .prettierrc
```

### Setup Pre-commit Hooks
```bash
npm install --save-dev husky lint-staged
npx husky install
```

## Testing Setup

### Unit Testing
```bash
npm install --save-dev @testing-library/react-native jest
```

### E2E Testing
```bash
npm install --save-dev detox detox-cli
```

## Debugging

### Chrome DevTools
```bash
npm start
# Press 'd' in terminal
```

### React DevTools
- Install browser extension
- Works with Web and React Native

### Redux DevTools
- Install Redux DevTools extension
- Works with Redux Toolkit automatically

### React Native Debugger
```bash
# Download from https://github.com/jhen0409/react-native-debugger
# Or install with Homebrew
brew install react-native-debugger
```

## Performance Monitoring

### Install React DevTools Profiler
```bash
npm install --save-dev react-devtools
```

### Network Monitoring
- Use React Native Debugger
- Chrome DevTools Network tab
- Proxyman (macOS) or Charles (all platforms)

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 19000
lsof -i :19000
# Kill process
kill -9 <PID>
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Expo Issues
```bash
# Clear Expo cache
npm start -- -c

# Or use Expo CLI directly
expo start --clear
```

### TypeScript Issues
```bash
# Verify TypeScript installation
npx tsc --version

# Rebuild if needed
npm run build
```

## Verification Checklist

- [ ] Node.js installed and working
- [ ] npm/yarn installed and working
- [ ] Expo CLI installed globally
- [ ] Project dependencies installed
- [ ] .env file created
- [ ] Can run `npm start` successfully
- [ ] Can see QR code in terminal
- [ ] Expo Go app works (optional)
- [ ] IDE is configured with extensions
- [ ] Git is initialized and configured

## Next Steps

1. Read QUICK_START.md for basic usage
2. Review README.md for project overview
3. Check CONTRIBUTING.md for development guidelines
4. Start with HomeScreen implementation
5. Connect to backend API when ready

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/get-started/create-a-new-app/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/usage/usage-guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Support

For setup issues:
1. Check the troubleshooting section
2. Review official documentation
3. Check GitHub issues
4. Contact development team

---

**Setup Complete! You're ready to develop. 🚀**
