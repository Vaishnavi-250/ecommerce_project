# 🎬 Getting Started - Visual Guide

## Welcome to RetroByte! 👋

Your complete gamified environmental learning platform is ready. Let's get it running in 3 easy steps!

---

## 📋 Before You Begin

### Checklist
- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed and ready
- [ ] Terminal open
- [ ] 15 minutes of time

---

## 🎯 The 3-Step Quick Start

### Step 1️⃣ Backend Setup (5 minutes)

```bash
# Open Terminal 1
cd backend

# Install packages
npm install

# Start the server
npm start

# Expected output:
# 🌍 RetroByte server running on port 5000
# 📦 MongoDB connected
```

✅ Backend ready at `http://localhost:5000`

---

### Step 2️⃣ Frontend Setup (5 minutes)

```bash
# Open Terminal 2
cd frontend

# Install packages
npm install

# Start the app
npm start

# Your browser will open automatically
# You'll see the login page
```

✅ Web app ready at `http://localhost:3000`

---

### Step 3️⃣ Mobile Setup (Optional, 5 minutes)

```bash
# Open Terminal 3
cd mobile

# Install packages
npm install

# Start Expo
npm start

# Scan QR code with Expo Go app on your phone
# Or press 'i' for iOS simulator, 'a' for Android
```

✅ Mobile app ready via Expo Go

---

## 🎮 First Steps in the App

### 1. Create Your Account

```
Login Page
    ↓
Click "Register"
    ↓
Fill in form:
  • Username: eco_warrior
  • Email: you@example.com
  • Password: YourPassword123!
    ↓
Click "Register"
    ↓
✅ Welcome to Dashboard!
```

---

### 2. Explore the Dashboard

You'll see:
- 👤 Your profile picture
- 📊 Stats (Level, Experience, Coins)
- 🏆 Your achievements
- 🎯 Quick action buttons

---

### 3. Take Your First Quiz

```
📚 Quizzes
    ↓
Select a category (Climate, Energy, Water, etc.)
    ↓
Click "Start Quiz"
    ↓
Answer 5-10 questions
    ↓
View your score
    ↓
💰 Earn coins if you pass!
```

---

### 4. Accept a Mission

```
🎯 Missions
    ↓
Browse available missions
    ↓
Read mission details
    ↓
Click "Accept Mission"
    ↓
Go do the eco-action!
    ↓
Log it in "Log Action"
```

---

### 5. Log Your First Eco-Action

```
🌱 Log Action
    ↓
Select action type:
  • 🌳 Trees Planted
  • ♻️ Waste Segregated
  • ⚡ Energy Saved
  • 💧 Water Saved
  • 🌍 Pollution Reduced
    ↓
Enter quantity
    ↓
(Optional) Get location
    ↓
Click "Log Action"
    ↓
💰 +5 coins earned!
```

---

### 6. Check the Leaderboard

```
🏆 Leaderboard
    ↓
View global rankings
    ↓
Filter by category:
  • Quiz Masters
  • Mission Heroes
  • Eco Warriors
    ↓
See your rank!
```

---

## 📚 Documentation Map

```
Start Here
    ↓
├─ Quick Setup? → QUICKSTART.md (15 min)
│
├─ Detailed Setup? → INSTALLATION.md (30 min)
│
├─ Understand Features? → FEATURES.md (10 min)
│
├─ Full Docs? → README.md (20 min)
│
├─ API Details? → API_DOCS.md (25 min)
│
└─ Development? → DEVELOPMENT.md (30 min)
```

---

## 🎨 Customization Ideas

### Easy Customization (No Code)
- Change quiz questions and answers
- Add new missions
- Modify reward amounts
- Update badge descriptions

### Code Customization
- Change colors and styling
- Add new features
- Modify gamification mechanics
- Integrate with external APIs

---

## 🔍 Verify Everything Works

### Backend Test
```bash
curl http://localhost:5000/api/health
```
Should return:
```json
{"status": "Server is running", ...}
```

### Database Test
```bash
# From backend terminal, MongoDB should show:
# 📦 MongoDB connected: localhost
```

### Frontend Test
- Open http://localhost:3000
- Should see login page
- Should be responsive

---

## 🆘 Troubleshooting Quick Fix

### Issue: "Port 5000 already in use"
```bash
# Find and kill the process
lsof -i :5000
kill -9 <PID>
```

### Issue: "MongoDB connection failed"
```bash
# Make sure MongoDB is running
mongod
```

### Issue: "npm install fails"
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules
npm install
```

### Issue: "Port 3000 already in use"
```bash
# Kill process
lsof -i :3000
kill -9 <PID>
```

---

## ✅ Success Checklist

After setup, verify:

- [ ] Backend running at http://localhost:5000
- [ ] Frontend running at http://localhost:3000
- [ ] Can see login page
- [ ] Can register new account
- [ ] Can login
- [ ] Can view dashboard
- [ ] Can see quizzes
- [ ] Can see missions
- [ ] Can access leaderboard

---

## 📊 Environment Overview

```
Your Computer:
├── Terminal 1: Backend (port 5000)
├── Terminal 2: Frontend (port 3000)
├── Terminal 3: Mobile (Expo)
└── Local MongoDB (port 27017)

Browser: http://localhost:3000
API: http://localhost:5000/api
```

---

## 🚀 Next Steps

### Immediately
1. Follow the 3-step quick start above
2. Create a test account
3. Explore all features

### Today
1. Read FEATURES.md to understand architecture
2. Try modifying a quiz or mission
3. Test the API with curl

### This Week
1. Read DEVELOPMENT.md
2. Make your first customization
3. Plan your deployment

### This Month
1. Add admin features
2. Deploy to production
3. Launch to users

---

## 💾 Save These Links

### Quick Reference
- Setup: **QUICKSTART.md**
- API: **API_DOCS.md**
- Dev: **DEVELOPMENT.md**
- Docs: **INDEX.md** (navigation)

### Key Ports
- Backend: **http://localhost:5000**
- Frontend: **http://localhost:3000**
- MongoDB: **localhost:27017**

### Commands
```bash
Backend:  cd backend && npm start
Frontend: cd frontend && npm start
Mobile:   cd mobile && npm start
```

---

## 🎉 You're Ready!

Everything is set up and ready to go. Now:

1. Open your terminal
2. Follow the 3 steps above
3. Start exploring RetroByte!

---

## 📞 Need Help?

### Read These Files
- **QUICKSTART.md** - Fast setup guide
- **INSTALLATION.md** - Detailed setup
- **FEATURES.md** - How it works
- **API_DOCS.md** - API reference
- **DEVELOPMENT.md** - Code patterns

### Common Issues
See **INSTALLATION.md** troubleshooting section

### Questions?
- Check the documentation files first
- Read code comments
- Test with curl/Postman

---

## 🌍 Welcome to RetroByte!

Making environmental learning engaging, one quiz at a time.

**Let's make a difference! 🌱**

---

## Quick Command Reference

```bash
# Backend
cd backend && npm install && npm start

# Frontend (new terminal)
cd frontend && npm install && npm start

# Mobile (new terminal)
cd mobile && npm install && npm start

# Test API
curl http://localhost:5000/api/health
```

---

**Ready? Go to Step 1️⃣ above and let's begin!**
