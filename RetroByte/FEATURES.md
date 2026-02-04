# 🎯 RetroByte Feature Overview

## Platform Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      RETROBYTE ECOSYSTEM                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│   WEB FRONTEND   │        │   MOBILE APP     │        │   ADMIN PANEL    │
│   (React)        │        │ (React Native)   │        │  (Future)        │
│                  │        │                  │        │                  │
│ • Dashboard      │        │ • Dashboard      │        │ • Content Mgmt   │
│ • Quizzes        │        │ • Quizzes        │        │ • User Mgmt      │
│ • Missions       │        │ • Missions       │        │ • Analytics      │
│ • Eco-Actions    │        │ • Eco-Actions    │        │ • Leaderboards   │
│ • Leaderboard    │        │ • Camera/GPS     │        │                  │
│ • Profile        │        │ • Notifications  │        │                  │
└────────┬─────────┘        └────────┬─────────┘        └────────┬─────────┘
         │                           │                           │
         └───────────────┬───────────┴───────────────┬───────────┘
                         │                           │
                    ┌────▼───────────────────────────▼────┐
                    │     BACKEND API (Express)           │
                    │    (Port 5000 - localhost)          │
                    │                                     │
                    │  • Authentication                  │
                    │  • Quiz Management                 │
                    │  • Mission Management              │
                    │  • Eco-Action Logging              │
                    │  • Leaderboard Generation          │
                    │  • Reward Distribution             │
                    │  • User Profile Management         │
                    └────┬───────────────────────────┬────┘
                         │                           │
                    ┌────▼─────────┐           ┌────▼──────────┐
                    │   MONGODB    │           │  REDIS (OPT)  │
                    │  - Users     │           │  - Cache      │
                    │  - Quizzes   │           │  - Sessions   │
                    │  - Missions  │           │  - Leaderboard│
                    │  - Eco-Actions│          │                │
                    │  - Badges    │           │                │
                    └──────────────┘           └────────────────┘
```

---

## User Journey Flow

### 1. Onboarding
```
START
  ↓
[Register/Login]
  ↓
[Dashboard]
  ↓
[Choose Activity]
```

### 2. Quiz Path
```
[Quizzes Page]
  ↓
[Filter by Category/Difficulty]
  ↓
[Select Quiz]
  ↓
[Answer Questions]
  ↓
[View Results] → Gain XP & Coins
  ↓
[Back to Dashboard]
```

### 3. Mission Path
```
[Missions Page]
  ↓
[Browse Missions]
  ↓
[Accept Mission]
  ↓
[Log Eco-Actions]
  ↓
[View Impact]
  ↓
[Complete Mission] → Gain Rewards
```

### 4. Competition Path
```
[Leaderboard]
  ↓
[View Rankings]
  ↓
[Filter Categories]
  ↓
[Track Your Rank]
  ↓
[Motivate to Earn More]
```

---

## Feature Matrix

### 📚 Educational Features

| Feature | Category | Difficulty | Count | Rewards |
|---------|----------|-----------|-------|---------|
| Climate Quizzes | Climate | 3 levels | 20+ | 10-50 coins |
| Waste Management | Waste | 3 levels | 20+ | 10-50 coins |
| Energy Saving | Energy | 3 levels | 20+ | 10-50 coins |
| Water Conservation | Water | 3 levels | 20+ | 10-50 coins |
| Biodiversity | Biodiversity | 3 levels | 20+ | 10-50 coins |
| Pollution | Pollution | 3 levels | 20+ | 10-50 coins |

### 🎯 Mission Types

| Type | Description | Reward Coins | XP | Verification |
|------|-------------|-------------|-----|------|
| 🌳 Tree Planting | Plant trees | 100 | 200 | Photo |
| ♻️ Waste Segregation | Sort waste | 75 | 150 | Photo |
| ⚡ Energy Saving | Save energy | 60 | 120 | Manual |
| 💧 Water Conservation | Save water | 60 | 120 | Manual |
| 🌍 Pollution Reduction | Reduce emissions | 50 | 100 | GPS |

### 🏆 Reward System

| Reward Type | How to Earn | Value |
|-------------|-----------|-------|
| Coins | Quizzes, Missions, Eco-Actions | In-game currency |
| Experience | All activities | Level progression |
| Badges | Achievements | Collectibles |
| Levels | Every 1000 XP | Status/Rank |

### 👥 Leaderboard Types

| Leaderboard | Criteria | Update Frequency |
|-------------|----------|------------------|
| Global | Total Experience | Real-time |
| Quiz Masters | Quizzes Completed | Daily |
| Mission Heroes | Missions Completed | Daily |
| Eco Warriors | Eco-Actions Logged | Daily |

---

## Data Models & Relationships

### User Model
```
User
├── Authentication
│   ├── Username (unique)
│   ├── Email (unique)
│   └── Password (hashed)
├── Profile
│   ├── Avatar
│   ├── Bio
│   └── Preferences
├── Progression
│   ├── Level
│   ├── Experience
│   └── Coins
├── Collections
│   ├── Badges []
│   ├── Completed Quizzes []
│   ├── Completed Missions []
│   └── Eco-Actions []
└── Achievements
    ├── Quizzes Completed
    ├── Missions Completed
    ├── Eco-Actions Logged
    ├── Highest Quiz Score
    └── Environmental Impact
```

### Quiz Model
```
Quiz
├── Metadata
│   ├── Title
│   ├── Description
│   ├── Category
│   └── Difficulty
├── Content
│   ├── Questions []
│   │   ├── Question Text
│   │   ├── Options []
│   │   ├── Correct Answer
│   │   ├── Explanation
│   │   └── Points
│   ├── Time Limit
│   └── Passing Score
└── Analytics
    ├── Completion Count
    └── Average Score
```

### Mission Model
```
Mission
├── Details
│   ├── Title
│   ├── Description
│   ├── Type
│   ├── Difficulty
│   └── Instructions []
├── Rewards
│   ├── Coins
│   └── Experience
├── Verification
│   ├── Method
│   ├── GPS Required
│   └── Photo Required
└── Impact
    ├── Description
    ├── Metric
    └── Value
```

### EcoAction Model
```
EcoAction
├── User Reference
├── Action Details
│   ├── Type
│   ├── Quantity
│   ├── Unit
│   └── Description
├── Location
│   ├── Latitude
│   ├── Longitude
│   └── Address
├── Verification
│   ├── Status
│   ├── Image URL
│   └── Verified By
├── Rewards
│   ├── Coins Granted
│   └── Impact Score
└── Timestamps
```

---

## API Endpoint Summary

### Authentication (2 endpoints)
```
POST   /api/auth/register
POST   /api/auth/login
```

### Users (3 endpoints)
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/stats
```

### Quizzes (3 endpoints)
```
GET    /api/quizzes
GET    /api/quizzes/:id
POST   /api/quizzes/:id/submit
```

### Missions (4 endpoints)
```
GET    /api/missions
GET    /api/missions/:id
POST   /api/missions/:id/accept
POST   /api/missions/:id/complete
```

### Eco-Actions (3 endpoints)
```
POST   /api/eco-actions
GET    /api/eco-actions/user/:userId
PATCH  /api/eco-actions/:id/verify
```

### Leaderboard (3 endpoints)
```
GET    /api/leaderboard
GET    /api/leaderboard/category/:category
GET    /api/leaderboard/user/:userId
```

### Rewards (4 endpoints)
```
GET    /api/rewards
GET    /api/rewards/badges/available
POST   /api/rewards/badges/award
POST   /api/rewards/redeem
```

---

## Component Hierarchy (Frontend)

```
App
├── Auth Routes
│   ├── Login
│   └── Register
├── Main Navigation (Navbar)
└── Main Content
    ├── Dashboard
    │   ├── Profile Header
    │   ├── Stats Grid
    │   └── Achievements
    ├── QuizList
    │   ├── Filters
    │   └── Quiz Cards
    ├── MissionList
    │   ├── Mission Cards
    │   └── Accept Button
    ├── LogEcoAction
    │   ├── Form
    │   └── Location Picker
    └── Leaderboard
        ├── Category Tabs
        └── Ranking Table
```

---

## Screen Hierarchy (Mobile)

```
App Navigation
├── Auth Stack
│   ├── LoginScreen
│   └── RegisterScreen
└── App Stack (Tabs)
    ├── Home Tab
    │   └── HomeScreen
    │       ├── Profile Header
    │       ├── Stats Cards
    │       └── Quick Actions
    ├── Quizzes Tab
    │   └── QuizScreen
    │       ├── Category Filter
    │       └── Quiz List
    ├── Missions Tab
    │   └── MissionsScreen
    │       └── Mission Cards
    └── Log Action Tab
        └── LogActionScreen
            ├── Action Type Selection
            ├── Quantity Input
            ├── Location Picker
            └── Submit Button
```

---

## Gamification Mechanics Flowchart

```
USER ACTIVITY
    ↓
┌───────────────────────┐
│ Complete Quiz/Mission │
│ or Log Eco-Action     │
└───────────┬───────────┘
            ↓
        ┌───────────┐
        │ Gain XP   │
        └─────┬─────┘
              ↓
        ┌─────────────────┐
        │ Check Milestones│
        └─────┬───────────┘
              ↓
        ╔═════════════════╗
    ┌───║ XP ≥ 1000 XP?  ║───┐
    │   ╚═════════════════╝   │
   YES                        NO
    │                         │
    ▼                         │
 LEVEL UP ◄───────────────────┘
    │
    ▼
┌────────────────┐
│ Grant Coins    │
└────┬───────────┘
     ▼
┌────────────────────┐
│ Check Badges       │
│ Achievement Unlock?│
└────┬───────────────┘
     │
    YES
     │
     ▼
  BADGE UNLOCK
     │
     ▼
┌──────────────┐
│ LEADERBOARD  │
│ UPDATED      │
└──────────────┘
```

---

## Database Relationship Diagram

```
┌─────────────┐
│    User     │
│             │
│ id (pk)     │◄──┐
│ username    │   │
│ email       │   │
│ level       │   │
│ experience  │   │
│ coins       │   │
└──────┬──────┘   │
       │          │
       │ 1:N      │
       │          │
       ▼          │
┌─────────────────────────────┐
│  CompletedQuizzes           │
│  (join table)               │
│                             │
│ userId (fk) ───────────────┘
│ quizId (fk) ──────────┐
│ score                 │
│ completedAt           │
└─────────────────────┬──────┐
                      │      │
                      │ N:1  │
                      ▼      │
              ┌──────────────┐
              │    Quiz      │
              │              │
              │ id (pk)      │
              │ title        │
              │ category     │
              │ difficulty   │
              │ questions[]  │
              └──────────────┘

Similar relationships for:
- User 1:N Missions
- User 1:N EcoActions
- User N:N Badges
```

---

## Feature Timeline

### Phase 1 (Current - MVP)
✅ User authentication
✅ Quiz system
✅ Mission system
✅ Eco-action logging
✅ Leaderboards
✅ Reward system
✅ Web + Mobile frontend

### Phase 2 (Planned)
🔜 Real-time leaderboards
🔜 Social features (chat, groups)
🔜 Push notifications
🔜 Video content
🔜 AR verification
🔜 Offline mode

### Phase 3 (Future)
🔮 Blockchain integration
🔮 Cryptocurrency rewards
🔮 Corporate challenges
🔮 NGO partnerships
🔮 Government APIs
🔮 Carbon marketplace

---

## Deployment Architecture

```
DEVELOPMENT
├── Local Backend (5000)
├── Local Frontend (3000)
├── Local MongoDB
└── Local Mobile (Expo)

PRODUCTION
├── Backend (Heroku/Railway)
│   └── MongoDB Atlas
├── Frontend (Vercel/Netlify)
├── Mobile (TestFlight/Google Play)
└── Admin Panel (Dashboard)
```

---

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| API Response Time | < 200ms | ✅ |
| Page Load Time | < 3s | ✅ |
| Mobile App Size | < 100MB | ✅ |
| Concurrent Users | 1000+ | ✅ |
| Database Queries | < 100ms | ✅ |
| Uptime | 99.9% | ✅ |

---

## Security Features

✅ Password hashing with bcryptjs
✅ JWT authentication tokens
✅ CORS protection
✅ Input validation
✅ SQL injection prevention (MongoDB)
✅ XSS protection
✅ Environment variable management
✅ Secure headers

---

**RetroByte: Making Environmental Education Engaging! 🌍**
