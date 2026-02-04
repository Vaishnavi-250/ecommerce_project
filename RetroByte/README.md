# 🌍 RetroByte - Gamified Environmental Learning Platform

A comprehensive mobile + web platform that makes learning about environmental concepts engaging and rewarding through gamification, real-world eco-actions, and community challenges.

## ✨ Features

### 📚 **Quizzes & Puzzles**
- Interactive environmental knowledge quizzes across 6+ categories
- Climate, waste management, energy, water conservation, biodiversity, pollution
- Difficulty levels: Beginner, Intermediate, Advanced
- Instant feedback with explanations
- Track progress and scores

### 🎯 **Missions & Challenges**
- Real-world eco-actions: Planting trees, waste segregation, energy saving, water conservation
- Photo-based verification for eco-actions
- GPS location tracking for actions
- Difficulty tiers: Easy, Medium, Hard
- Time-limited and ongoing challenges

### 🏆 **Rewards & Leaderboards**
- Earn coins (💰) and experience points (⭐)
- Level progression system
- Collectible badges and achievements
- Global leaderboards with category filters
- Personal ranking and progress tracking
- Coin redemption for rewards

### 🌱 **Real-World Eco-Actions**
- Log environmental contributions with photo evidence
- Track environmental impact metrics
- Location-based verification
- Action history and statistics
- Community contribution tracking

### 👥 **Community & Social**
- Compete on global and category-specific leaderboards
- View friend rankings and achievements
- Share accomplishments
- Cooperative missions

## 🏗️ Project Structure

```
RetroByte/
├── backend/              # Node.js/Express API server
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Authentication, validation
│   │   └── server.js    # Main server file
│   └── package.json
│
├── frontend/            # React web application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── styles/      # CSS modules
│   │   ├── api.js       # API client
│   │   └── App.js       # Main app component
│   ├── public/
│   └── package.json
│
├── mobile/              # React Native mobile app
│   ├── src/
│   │   ├── screens/     # Screen components
│   │   ├── api.js       # Mobile API client
│   │   └── App.js       # Main app component
│   ├── app.json         # Expo configuration
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14.0
- npm or yarn
- MongoDB instance
- Expo CLI (for mobile development)

### 1. Backend Setup

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Start MongoDB (make sure it's running)

# Start server
npm start
# Server runs on http://localhost:5000
```

### 2. Frontend Setup (Web)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# Web app runs on http://localhost:3000
```

### 3. Mobile Setup (React Native)

```bash
cd mobile

# Install dependencies
npm install

# For iOS
npm run ios

# For Android
npm run android
```

## 📱 Features by Platform

### Web (React)
- ✅ Full dashboard with stats
- ✅ Quiz interface with timed questions
- ✅ Mission browser and acceptance
- ✅ Eco-action logging
- ✅ Global leaderboards
- ✅ User profile and achievements
- ✅ Responsive design

### Mobile (React Native)
- ✅ Native app experience
- ✅ Offline support ready
- ✅ Camera integration for eco-action photos
- ✅ GPS location tracking
- ✅ Push notifications
- ✅ Bottom tab navigation
- ✅ All core features

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/stats` - Get user statistics

### Quizzes
- `GET /api/quizzes` - List all quizzes
- `GET /api/quizzes/:id` - Get specific quiz
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Missions
- `GET /api/missions` - List all missions
- `GET /api/missions/:id` - Get specific mission
- `POST /api/missions/:id/accept` - Accept mission
- `POST /api/missions/:id/complete` - Complete mission

### Eco Actions
- `POST /api/eco-actions` - Log new eco-action
- `GET /api/eco-actions/user/:userId` - Get user actions
- `PATCH /api/eco-actions/:id/verify` - Verify action

### Leaderboards
- `GET /api/leaderboard` - Global leaderboard
- `GET /api/leaderboard/category/:category` - Category leaderboard
- `GET /api/leaderboard/user/:userId` - User rank

### Rewards
- `GET /api/rewards` - Get user rewards
- `GET /api/rewards/badges/available` - List badges
- `POST /api/rewards/badges/award` - Award badge
- `POST /api/rewards/redeem` - Redeem coins

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  level: Number,
  experience: Number,
  coins: Number,
  badges: [ObjectId],
  completedQuizzes: Array,
  completedMissions: [ObjectId],
  ecoActions: [ObjectId],
  achievements: {
    totalQuizzesCompleted: Number,
    totalMissionsCompleted: Number,
    totalEcoActionsLogged: Number,
    highestQuizScore: Number,
    environmentalImpact: Number
  }
}
```

### Quiz Model
```javascript
{
  title: String,
  category: String,
  difficulty: String,
  questions: Array,
  timeLimit: Number,
  passingScore: Number,
  completionCount: Number,
  averageScore: Number
}
```

### Mission Model
```javascript
{
  title: String,
  type: String,
  difficulty: String,
  rewardCoins: Number,
  rewardExperience: Number,
  instructions: Array,
  verificationMethod: String,
  environmentalImpact: Object
}
```

## 🎮 Gamification Mechanics

### Experience & Leveling
- Quiz completion: 50 XP (if passed)
- Mission completion: 100 XP
- Eco-action logging: 10 XP
- Level up every 1000 XP

### Coins (Currency)
- Quiz passing: 10 coins
- Mission completion: Variable (50-200)
- Eco-action logging: 5 coins
- Redeemable for rewards

### Badges
- Quiz achievements (10, 50, 100 quizzes)
- Mission milestones
- Eco-action thresholds
- Streak bonuses
- Rarity: Common, Uncommon, Rare, Epic, Legendary

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcryptjs
- Token expiration: 7 days
- Refresh token support (optional)

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/retrobyte
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📊 Technology Stack

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend (Web)
- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

### Mobile
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - App navigation
- **Expo Camera** - Camera access
- **Expo Location** - GPS tracking

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongo_uri

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy to Vercel
vercel deploy --prod
```

### Mobile (EAS Build)
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 📈 Future Enhancements

- [ ] Multiplayer challenges
- [ ] Social features (chat, groups)
- [ ] Video tutorials
- [ ] AR features for eco-actions
- [ ] Integration with environmental APIs
- [ ] Offline quiz mode
- [ ] Blockchain-based badges
- [ ] Corporate challenges
- [ ] Integration with environmental organizations
- [ ] Carbon offset marketplace

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- **Project Lead**: Environmental Gamification Initiative
- **Developers**: Full-stack development team
- **Designers**: UI/UX specialists

## 📞 Support

For support, please open an issue or contact the team at support@retrobyte.com

---

**Made with 🌱 for a sustainable future**
