# 📚 RetroByte API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request:
```json
{
  "username": "eco_warrior",
  "email": "user@example.com",
  "password": "securepass123"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "eco_warrior",
    "email": "user@example.com"
  }
}
```

### Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "eco_warrior",
    "email": "user@example.com"
  }
}
```

---

## User Endpoints

### Get User Profile
**GET** `/users/profile` *(Protected)*

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "eco_warrior",
  "email": "user@example.com",
  "level": 5,
  "experience": 2500,
  "coins": 350,
  "avatar": "https://via.placeholder.com/150",
  "bio": "Passionate about environmental conservation",
  "achievements": {
    "totalQuizzesCompleted": 12,
    "totalMissionsCompleted": 3,
    "totalEcoActionsLogged": 25,
    "highestQuizScore": 95,
    "environmentalImpact": 150
  }
}
```

### Update User Profile
**PUT** `/users/profile` *(Protected)*

Request:
```json
{
  "bio": "Environmental enthusiast",
  "avatar": "https://example.com/avatar.jpg",
  "preferences": {
    "notifications": true,
    "language": "en",
    "theme": "dark"
  }
}
```

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "eco_warrior",
  "bio": "Environmental enthusiast",
  "updatedAt": "2024-01-28T10:30:00Z"
}
```

### Get User Stats
**GET** `/users/stats` *(Protected)*

Response:
```json
{
  "level": 5,
  "experience": 2500,
  "coins": 350,
  "badges": 8,
  "achievements": {
    "totalQuizzesCompleted": 12,
    "totalMissionsCompleted": 3,
    "totalEcoActionsLogged": 25,
    "highestQuizScore": 95,
    "environmentalImpact": 150
  }
}
```

---

## Quiz Endpoints

### Get All Quizzes
**GET** `/quizzes`

Query Parameters:
- `category` (optional): climate, waste, energy, water, biodiversity, pollution
- `difficulty` (optional): beginner, intermediate, advanced

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Climate Change Basics",
    "description": "Learn about climate change",
    "category": "climate",
    "difficulty": "beginner",
    "questions": [
      {
        "question": "What causes global warming?",
        "options": ["...", "...", "...", "..."],
        "correctAnswer": 1,
        "explanation": "Explanation text",
        "points": 10
      }
    ],
    "timeLimit": 300,
    "passingScore": 70,
    "completionCount": 1250,
    "averageScore": 82.5
  }
]
```

### Get Specific Quiz
**GET** `/quizzes/:id`

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Climate Change Basics",
  "questions": [...]
}
```

### Submit Quiz
**POST** `/quizzes/:id/submit` *(Protected)*

Request:
```json
{
  "answers": [1, 2, 0, 3, 1]
}
```

Response:
```json
{
  "score": 85.5,
  "passed": true,
  "feedback": [
    {
      "questionIndex": 0,
      "isCorrect": true,
      "explanation": "..."
    }
  ],
  "experienceGained": 50,
  "coinsGained": 10
}
```

---

## Mission Endpoints

### Get All Missions
**GET** `/missions`

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Plant 10 Trees",
    "description": "Plant 10 saplings in your community",
    "type": "planting",
    "difficulty": "medium",
    "rewardCoins": 100,
    "rewardExperience": 200,
    "instructions": [
      "Find a suitable location",
      "Plant 10 saplings",
      "Water them regularly",
      "Take a photo as proof"
    ],
    "verificationMethod": "photo",
    "environmentalImpact": {
      "description": "Carbon offset",
      "metric": "kg CO2",
      "value": 100
    },
    "completionCount": 523
  }
]
```

### Get Specific Mission
**GET** `/missions/:id`

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Plant 10 Trees",
  "...": "..."
}
```

### Accept Mission
**POST** `/missions/:id/accept` *(Protected)*

Response:
```json
{
  "message": "Mission accepted",
  "mission": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Plant 10 Trees"
  }
}
```

### Complete Mission
**POST** `/missions/:id/complete` *(Protected)*

Response:
```json
{
  "message": "Mission completed",
  "coinsGained": 100,
  "experienceGained": 200
}
```

---

## Eco-Action Endpoints

### Log Eco-Action
**POST** `/eco-actions` *(Protected)*

Request:
```json
{
  "actionType": "tree-planted",
  "quantity": 5,
  "unit": "trees",
  "description": "Planted trees in local park",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "New York, NY"
  }
}
```

Response:
```json
{
  "message": "Eco action logged successfully",
  "action": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "actionType": "tree-planted",
    "quantity": 5,
    "verified": false,
    "coinsRewarded": 5,
    "createdAt": "2024-01-28T10:30:00Z"
  },
  "coinsGained": 5
}
```

### Get User's Eco-Actions
**GET** `/eco-actions/user/:userId`

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "actionType": "tree-planted",
    "quantity": 5,
    "verified": true,
    "createdAt": "2024-01-28T10:30:00Z"
  }
]
```

### Verify Eco-Action
**PATCH** `/eco-actions/:id/verify` *(Protected - Admin)*

Response:
```json
{
  "message": "Action verified",
  "action": {
    "_id": "507f1f77bcf86cd799439011",
    "verified": true,
    "verifiedBy": "507f1f77bcf86cd799439012"
  }
}
```

---

## Leaderboard Endpoints

### Get Global Leaderboard
**GET** `/leaderboard`

Query Parameters:
- `limit` (optional, default: 10): Number of entries
- `offset` (optional, default: 0): Pagination offset

Response:
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "_id": "507f1f77bcf86cd799439011",
      "username": "eco_warrior",
      "avatar": "https://...",
      "level": 15,
      "experience": 12500,
      "coins": 2000
    }
  ],
  "total": 5432,
  "limit": 10,
  "offset": 0
}
```

### Get Category Leaderboard
**GET** `/leaderboard/category/:category`

Categories:
- `quizzes` - By total quizzes completed
- `missions` - By total missions completed
- `eco-actions` - By total eco-actions logged

Response:
```json
[
  {
    "rank": 1,
    "username": "eco_warrior",
    "achievements": {
      "totalQuizzesCompleted": 150
    }
  }
]
```

### Get User Rank
**GET** `/leaderboard/user/:userId`

Response:
```json
{
  "user": {
    "username": "eco_warrior",
    "experience": 2500,
    "coins": 350,
    "level": 5
  },
  "rank": 42
}
```

---

## Rewards Endpoints

### Get User Rewards
**GET** `/rewards` *(Protected)*

Response:
```json
{
  "coins": 350,
  "experience": 2500,
  "level": 5,
  "badges": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Quiz Master",
      "description": "Complete 50 quizzes",
      "rarity": "rare"
    }
  ]
}
```

### Get Available Badges
**GET** `/rewards/badges/available`

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Quiz Master",
    "description": "Complete 50 quizzes",
    "icon": "🎓",
    "criterion": {
      "type": "quizzes-completed",
      "value": 50
    },
    "rarity": "rare"
  }
]
```

### Award Badge
**POST** `/rewards/badges/award` *(Protected)*

Request:
```json
{
  "badgeId": "507f1f77bcf86cd799439011"
}
```

Response:
```json
{
  "message": "Badge awarded",
  "user": {
    "username": "eco_warrior",
    "badges": [...]
  }
}
```

### Redeem Coins
**POST** `/rewards/redeem` *(Protected)*

Request:
```json
{
  "rewardType": "discount-coupon",
  "amount": 100
}
```

Response:
```json
{
  "message": "Reward redeemed successfully",
  "rewardType": "discount-coupon",
  "amountRedeemed": 100,
  "remainingCoins": 250
}
```

---

## Health Check

### API Health
**GET** `/health`

Response:
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-28T10:30:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "message": "Quiz not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal Server Error",
  "error": {}
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Auth required |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Rate Limiting
Currently unlimited. Future versions will implement:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination
For list endpoints:
```
?limit=10&offset=0
```

---

## Version
Current API Version: **v1.0.0**

---

**Last Updated**: January 28, 2024
