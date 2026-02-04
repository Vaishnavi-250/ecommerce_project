# 🚀 Quick Start Guide

## Prerequisites
- **Node.js** 14.0+
- **MongoDB** (local or cloud)
- **npm** or **yarn**
- **Expo CLI** (for mobile): `npm install -g expo-cli`

---

## 1️⃣ Backend Setup (5 minutes)

```bash
cd backend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Start MongoDB (in another terminal)
# For local MongoDB:
mongod

# Start the API server
npm start
```

✅ Server ready at: `http://localhost:5000`

**Test it:**
```bash
curl http://localhost:5000/api/health
```

---

## 2️⃣ Frontend Setup (5 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

✅ Web app ready at: `http://localhost:3000`

---

## 3️⃣ Mobile Setup (5 minutes)

```bash
cd mobile

# Install dependencies
npm install

# Start Expo server
npm start

# Scan QR code with Expo Go app (iOS/Android)
# Or press 'i' for iOS simulator, 'a' for Android emulator
```

---

## 📚 First Steps in the App

### Register & Login
1. Click "Register" on the login screen
2. Create an account with username, email, password
3. Explore the dashboard

### Complete a Quiz
1. Navigate to **Quizzes**
2. Select a category and difficulty
3. Answer the questions and get instant feedback
4. Earn coins & XP on passing score

### Accept a Mission
1. Go to **Missions**
2. Read the mission details
3. Click "Accept Mission" to start the challenge
4. Log your eco-actions when completed

### Log Eco-Actions
1. Navigate to **Log Action**
2. Select action type (trees planted, waste segregated, etc.)
3. Enter quantity and optional description
4. Click "Get Current Location" to add GPS data
5. Submit and earn coins

### Check Leaderboard
1. View **Leaderboard** (web only currently)
2. Filter by category (Global, Quiz Masters, Mission Heroes, Eco Warriors)
3. See your rank and compare with others

---

## 🛠️ Common Issues & Solutions

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### Port Already in Use
```bash
# Backend port 5000
lsof -i :5000
kill -9 <PID>

# Frontend port 3000
lsof -i :3000
kill -9 <PID>
```

### CORS Errors
- Check `CORS_ORIGIN` in backend `.env`
- Should match your frontend URL (http://localhost:3000)

### Expo App Won't Connect
- Ensure both backend and frontend are running
- Check `API_BASE_URL` in mobile/src/api.js
- Use your local IP address instead of localhost if needed

---

## 📡 API Testing

### Using Postman or cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "player1",
    "email": "player1@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "player1@example.com",
    "password": "password123"
  }'
```

**Get Quizzes:**
```bash
curl http://localhost:5000/api/quizzes
```

**Get Leaderboard:**
```bash
curl http://localhost:5000/api/leaderboard
```

---

## 🎮 Demo Data Setup

### Sample Quiz Data
```javascript
db.quizzes.insertOne({
  title: "Climate Change Basics",
  category: "climate",
  difficulty: "beginner",
  questions: [
    {
      question: "What is the main cause of climate change?",
      options: [
        "Solar flares",
        "Greenhouse gas emissions",
        "Volcanic eruptions",
        "Earth's rotation"
      ],
      correctAnswer: 1,
      explanation: "Greenhouse gas emissions from human activities are the primary cause.",
      points: 10
    }
  ],
  passingScore: 70
})
```

### Sample Mission Data
```javascript
db.missions.insertOne({
  title: "Plant 10 Trees",
  type: "planting",
  difficulty: "medium",
  rewardCoins: 100,
  rewardExperience: 200,
  instructions: [
    "Find a suitable location",
    "Plant 10 saplings",
    "Water them regularly",
    "Take a photo as proof"
  ],
  verificationMethod: "photo"
})
```

---

## 📊 Features at a Glance

| Feature | Backend | Web | Mobile |
|---------|---------|-----|--------|
| Authentication | ✅ | ✅ | ✅ |
| Quizzes | ✅ | ✅ | ✅ |
| Missions | ✅ | ✅ | ✅ |
| Eco-Actions | ✅ | ✅ | ✅ |
| Leaderboard | ✅ | ✅ | 🔜 |
| GPS Tracking | ✅ | ✅ | ✅ |
| Camera Support | ✅ | ❌ | ✅ |
| Offline Mode | ❌ | ❌ | 🔜 |

---

## 📱 Environment Files

### backend/.env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/retrobyte
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### frontend/.env (optional)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔗 Useful Links

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **React Native Docs**: https://reactnative.dev/
- **Expo Docs**: https://docs.expo.dev/

---

## 💡 Next Features to Add

1. **Multiplayer Challenges** - Real-time competitions
2. **Social Features** - Chat, groups, friend system
3. **Video Tutorials** - Environmental education videos
4. **AR Verification** - Augmented reality for eco-actions
5. **Offline Mode** - Work without internet connection
6. **Push Notifications** - Real-time alerts and reminders
7. **Admin Dashboard** - Manage quizzes, missions, users
8. **Analytics** - Track environmental impact metrics

---

**Ready to change the world? Start playing! 🌍**
