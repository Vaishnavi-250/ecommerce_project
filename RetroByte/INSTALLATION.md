# ✅ Installation & Setup Checklist

## Pre-Installation Requirements

### ✓ System Check
- [ ] Operating System: Windows/Mac/Linux
- [ ] Node.js 14+: `node --version`
- [ ] npm 6+: `npm --version`
- [ ] Git: `git --version`
- [ ] Internet connection for package downloads

### ✓ Database Setup
- [ ] MongoDB installed locally, OR
- [ ] MongoDB Atlas account created
- [ ] Test connection to MongoDB

### ✓ Tools (Recommended)
- [ ] VSCode or preferred code editor
- [ ] Git configured with GitHub account
- [ ] Postman (for API testing)
- [ ] MongoDB Compass (database UI)

---

## Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```
- [ ] Confirmed in backend directory

### Step 2: Copy Environment File
```bash
cp .env.example .env
```
- [ ] .env file created

### Step 3: Configure Environment
Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/retrobyte
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```
- [ ] MONGODB_URI configured
- [ ] JWT_SECRET set to a secure value
- [ ] CORS_ORIGIN set to http://localhost:3000

### Step 4: Install Dependencies
```bash
npm install
```
- [ ] All dependencies installed
- [ ] No error messages
- [ ] node_modules folder created

### Step 5: Verify Installation
```bash
npm start
```
- [ ] Server starts successfully
- [ ] Message: "🌍 RetroByte server running on port 5000"
- [ ] No error messages
- [ ] Can visit http://localhost:5000/api/health

### Step 6: Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```
- [ ] Response: `{"status":"Server is running",...}`

---

## Frontend Setup

### Step 1: Open New Terminal
- [ ] New terminal window opened
- [ ] Original backend still running

### Step 2: Navigate to Frontend
```bash
cd frontend
```
- [ ] Confirmed in frontend directory

### Step 3: Install Dependencies
```bash
npm install
```
- [ ] All dependencies installed
- [ ] No error messages
- [ ] node_modules folder created

### Step 4: Start Development Server
```bash
npm start
```
- [ ] React app starts
- [ ] Browser opens automatically to http://localhost:3000
- [ ] No error messages

### Step 5: Verify Frontend Load
- [ ] Login page displays
- [ ] Can navigate to register
- [ ] Responsive design works on browser resize

---

## Mobile Setup (Optional)

### Step 1: Open New Terminal
- [ ] New terminal window opened

### Step 2: Install Expo CLI (if not installed)
```bash
npm install -g expo-cli
```
- [ ] Expo CLI installed globally
- [ ] Verified: `expo --version`

### Step 3: Navigate to Mobile
```bash
cd mobile
```
- [ ] Confirmed in mobile directory

### Step 4: Install Dependencies
```bash
npm install
```
- [ ] All dependencies installed
- [ ] No error messages

### Step 5: Start Expo
```bash
npm start
```
- [ ] Expo DevTools server starts
- [ ] QR code displayed in terminal
- [ ] Metro bundler running

### Step 6: Test on Device/Emulator
**Option A: Physical Device**
- [ ] Expo Go app installed
- [ ] QR code scanned with Expo Go
- [ ] App loads on phone

**Option B: iOS Simulator**
```bash
Press 'i' in terminal
```
- [ ] iOS simulator opens
- [ ] App loads in simulator

**Option C: Android Emulator**
```bash
Press 'a' in terminal
```
- [ ] Android emulator opens
- [ ] App loads in emulator

---

## MongoDB Setup

### Option 1: Local MongoDB

**Windows:**
- [ ] MongoDB Community Edition installed
- [ ] MongoDB service running: `mongod`
- [ ] Verify connection: `mongo`

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```
- [ ] MongoDB installed via Homebrew
- [ ] Service running

**Linux:**
```bash
sudo apt-get install mongodb
sudo service mongodb start
```
- [ ] MongoDB installed via package manager
- [ ] Service running

**Verify:**
```bash
mongosh
> show dbs
> exit
```
- [ ] Connected successfully to MongoDB

### Option 2: MongoDB Atlas (Cloud)

- [ ] Account created at https://www.mongodb.com/cloud/atlas
- [ ] Cluster created
- [ ] Connection string copied
- [ ] Connection string set in backend/.env as MONGODB_URI
- [ ] IP whitelist configured (or 0.0.0.0 for development)

---

## Initial Testing

### Create Test Account

**Via Web (Easiest):**
1. [ ] Open http://localhost:3000
2. [ ] Click "Register"
3. [ ] Fill in form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test123!`
4. [ ] Click Register
5. [ ] Redirected to Dashboard
- [ ] Account created successfully

**Via API (cURL):**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!"
  }'
```
- [ ] Response contains token and user data

### Test Core Flows

**Dashboard:**
- [ ] [ ] Can view user stats
- [ ] [ ] Level and experience display
- [ ] [ ] Coins and badges show
- [ ] [ ] Achievements visible

**Quizzes:**
- [ ] [ ] Can view quiz list
- [ ] [ ] Can filter by category
- [ ] [ ] Can start a quiz
- [ ] [ ] Can submit answers
- [ ] [ ] Can see score and feedback

**Missions:**
- [ ] [ ] Can view mission list
- [ ] [ ] Can read mission details
- [ ] [ ] Can accept mission
- [ ] [ ] Can see rewards

**Eco-Actions:**
- [ ] [ ] Can log action with form
- [ ] [ ] Can select action type
- [ ] [ ] Can get location (web only)
- [ ] [ ] Success message appears
- [ ] [ ] Coins awarded

**Leaderboard:**
- [ ] [ ] Can view global rankings
- [ ] [ ] Can filter by category
- [ ] [ ] Can see user rank
- [ ] [ ] Rankings update correctly

---

## Environment Verification

### Backend Verification
```bash
# In backend directory
npm start
```
- [ ] Server running on port 5000
- [ ] MongoDB connected: "📦 MongoDB connected"
- [ ] CORS enabled for localhost:3000
- [ ] All routes registered

### Frontend Verification
```bash
# In frontend directory
npm start
```
- [ ] React app compiled successfully
- [ ] No compilation errors
- [ ] Browser opened automatically
- [ ] HMR (Hot Module Replacement) working

### Mobile Verification
```bash
# In mobile directory
npm start
```
- [ ] Expo bundler running
- [ ] QR code generated
- [ ] No bundler errors
- [ ] Ready for Expo Go connection

---

## Configuration Verification

### Backend .env
- [ ] PORT=5000
- [ ] MONGODB_URI set correctly
- [ ] JWT_SECRET is secure (not default)
- [ ] NODE_ENV=development
- [ ] CORS_ORIGIN=http://localhost:3000

### API Connectivity
```bash
# From frontend terminal
curl http://localhost:5000/api/health
```
- [ ] Response received successfully
- [ ] Status shows "Server is running"

---

## Database Verification

### MongoDB Check
```bash
mongosh
> use retrobyte
> show collections
> db.users.findOne()
```
- [ ] Connected to retrobyte database
- [ ] Collections visible (after first signup)
- [ ] User documents exist

---

## Troubleshooting Checklist

If something doesn't work:

### Backend Issues
- [ ] Check if port 5000 is available: `lsof -i :5000`
- [ ] Verify MongoDB is running: `mongosh`
- [ ] Check .env file exists and is readable
- [ ] Review error messages in terminal
- [ ] Restart backend: `npm start`

### Frontend Issues
- [ ] Check if port 3000 is available: `lsof -i :3000`
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete node_modules: `rm -rf node_modules`
- [ ] Reinstall: `npm install`
- [ ] Restart: `npm start`

### Mobile Issues
- [ ] Check Expo CLI version: `expo --version`
- [ ] Update Expo: `npm install -g expo-cli@latest`
- [ ] Clear cache: `npm cache clean --force`
- [ ] Restart bundler: `npm start`

### API Connection Issues
- [ ] Verify backend running: http://localhost:5000/api/health
- [ ] Check CORS_ORIGIN in backend .env
- [ ] Check API_URL in frontend .env
- [ ] Check firewall/antivirus settings

### Database Issues
- [ ] Verify MongoDB running
- [ ] Check connection string in .env
- [ ] Verify database credentials (if using Atlas)
- [ ] Check IP whitelist (if using Atlas)

---

## Final Verification Checklist

- [ ] All three services running (Backend, Frontend, Mobile optional)
- [ ] Can register new account
- [ ] Can login with created account
- [ ] Can view dashboard
- [ ] Can take a quiz
- [ ] Can accept a mission
- [ ] Can log eco-action
- [ ] Can view leaderboard
- [ ] No console errors in any terminal
- [ ] No browser console errors
- [ ] Responsive design works on mobile view

---

## Ready to Start Development!

Once all items are checked:

1. [ ] **Explore the codebase**
   - Read through backend/src files
   - Understand API structure
   - Review component hierarchy

2. [ ] **Try modifying something**
   - Change dashboard layout
   - Add a new quiz category
   - Modify styling

3. [ ] **Add sample data**
   - Create quizzes in database
   - Add missions
   - Add test badges

4. [ ] **Deploy or continue development**
   - Follow DEVELOPMENT.md for patterns
   - Add new features
   - Deploy to production

---

## Quick Commands Reference

### Backend
```bash
cd backend
npm install          # First time setup
npm start           # Start server
npm run dev         # Start with nodemon
npm test            # Run tests
```

### Frontend
```bash
cd frontend
npm install         # First time setup
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
```

### Mobile
```bash
cd mobile
npm install        # First time setup
npm start          # Start Expo
npm run ios        # Run on iOS
npm run android    # Run on Android
```

---

**Congratulations! Your RetroByte environment is ready! 🚀**

Next: Start building amazing environmental gamification features!
