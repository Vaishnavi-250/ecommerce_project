# 🛠️ Development Guide

## Project Architecture

```
RetroByte (Monorepo)
├── backend/          (Node.js/Express API)
├── frontend/         (React Web)
├── mobile/           (React Native)
└── docs/             (Documentation)
```

---

## Backend Development

### Adding a New API Endpoint

**1. Create a Model** (if needed)
```javascript
// src/models/NewModel.js
const mongoose = require('mongoose');

const newModelSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewModel', newModelSchema);
```

**2. Create a Route**
```javascript
// src/routes/newRoute.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const NewModel = require('../models/NewModel');

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  try {
    const items = await NewModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await NewModel.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create
router.post('/', authMiddleware, async (req, res) => {
  try {
    const item = new NewModel(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
```

**3. Register the Route** in `server.js`
```javascript
const newRoutes = require('./routes/newRoute');
app.use('/api/new', newRoutes);
```

### Authentication Pattern
```javascript
// Protected route example
router.get('/profile', authMiddleware, async (req, res) => {
  const userId = req.userId; // From JWT token
  // ... rest of handler
});
```

### Error Handling
```javascript
try {
  // Operation
} catch (error) {
  console.error(error);
  res.status(500).json({ message: error.message });
}
```

### Environment Variables
Add to `.env`:
```env
NEW_FEATURE_ENABLED=true
API_KEY=your_key_here
```

Access in code:
```javascript
const isEnabled = process.env.NEW_FEATURE_ENABLED === 'true';
```

---

## Frontend Development

### Adding a New Component

**1. Create Component File**
```javascript
// src/components/NewComponent.js
import React, { useState, useEffect } from 'react';
import '../styles/NewComponent.css';

const NewComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Fetch data or init
  }, []);

  return (
    <div className="new-component">
      <h1>{prop1}</h1>
      {/* Component JSX */}
    </div>
  );
};

export default NewComponent;
```

**2. Create Stylesheet**
```css
/* src/styles/NewComponent.css */
.new-component {
  padding: 20px;
  background: white;
  border-radius: 10px;
}

.new-component h1 {
  color: #333;
  margin: 0;
}
```

**3. Add Route** in `App.js`
```javascript
import NewComponent from './components/NewComponent';

// In Routes:
<Route path="/new" element={<NewComponent />} />
```

### API Integration
```javascript
import { apiCall } from '../api';

const loadData = async () => {
  try {
    const response = await apiCall('/endpoint', { method: 'GET' });
    setData(response);
  } catch (error) {
    console.error('Failed to load data', error);
  }
};
```

### State Management Pattern
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  setLoading(true);
  try {
    const result = await apiCall('/endpoint');
    setData(result);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Mobile Development

### Adding a New Screen

**1. Create Screen Component**
```javascript
// src/screens/NewScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { apiCall } from '../api';

const NewScreen = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await apiCall('/endpoint');
      setData(result);
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Screen</Text>
      {/* Screen content */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
});

export default NewScreen;
```

**2. Add to Navigation** in `App.js`
```javascript
<Stack.Screen
  name="NewScreen"
  component={NewScreen}
  options={{ headerTitle: 'New Screen' }}
/>
```

### Common Patterns

**Button with Navigation:**
```javascript
<TouchableOpacity onPress={() => navigation.navigate('TargetScreen')}>
  <Text>Go to Screen</Text>
</TouchableOpacity>
```

**Form Handling:**
```javascript
const [form, setForm] = useState({ field1: '', field2: '' });

const handleChange = (field, value) => {
  setForm(prev => ({ ...prev, [field]: value }));
};

<TextInput
  value={form.field1}
  onChangeText={(text) => handleChange('field1', text)}
/>
```

**Alert:**
```javascript
import { Alert } from 'react-native';

Alert.alert('Title', 'Message', [
  { text: 'Cancel', onPress: () => {} },
  { text: 'OK', onPress: () => {} }
]);
```

---

## Database Schema Updates

### Adding a New Field to User

**1. Update Model**
```javascript
// src/models/User.js
userSchema.add({
  newField: {
    type: String,
    default: 'default_value'
  }
});
```

**2. Create Migration** (if needed)
```javascript
// Optional: Run in MongoDB console
db.users.updateMany({}, { $set: { newField: 'default_value' } });
```

### Relationships Between Collections

**One-to-Many:**
```javascript
// User has many Posts
userSchema.add({
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

// Populate in query
const user = await User.findById(userId).populate('posts');
```

**One-to-One:**
```javascript
// User has one Profile
userSchema.add({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});
```

---

## Testing

### Backend Unit Tests
```javascript
// __tests__/routes.test.js
const request = require('supertest');
const app = require('../src/server');

describe('GET /api/quizzes', () => {
  it('should return all quizzes', async () => {
    const response = await request(app).get('/api/quizzes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

Run tests:
```bash
npm test
```

---

## Performance Optimization

### Frontend
- Use `React.memo()` for expensive components
- Implement lazy loading with `React.lazy()`
- Use `useCallback()` for callback functions
- Optimize images

### Backend
- Add database indexes for frequently queried fields
- Implement caching (Redis)
- Use pagination for large datasets
- Compress responses

### Mobile
- Minimize bundle size
- Lazy load screens
- Optimize images for mobile

---

## Deployment Preparation

### Backend Checklist
- [ ] Set production environment variables
- [ ] Enable database backups
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Enable HTTPS
- [ ] Set up error tracking (Sentry)

### Frontend Checklist
- [ ] Build optimization
- [ ] Set production API URL
- [ ] Enable analytics
- [ ] Add service worker for PWA
- [ ] Test on multiple browsers

### Mobile Checklist
- [ ] Generate signing certificates
- [ ] Test on real devices
- [ ] Configure push notifications
- [ ] Set up deep linking

---

## Code Style Guidelines

### JavaScript
```javascript
// Use const/let, not var
const variable = 'value';
let changeable = 0;

// Use arrow functions
const myFunc = () => {};

// Use template literals
const str = `Hello ${name}`;

// Use async/await
const result = await apiCall('/endpoint');
```

### Naming Conventions
- Components: `PascalCase`
- Functions/Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Classes: `PascalCase`

### Comments
```javascript
// Single-line comments for brief explanations

/**
 * Multi-line comments for functions
 * @param {string} param - Parameter description
 * @returns {Object} Return description
 */
```

---

## Common Commands

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon
npm test           # Run tests
```

### Frontend
```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
```

### Mobile
```bash
npm start          # Start Expo
npm run ios        # Run on iOS
npm run android    # Run on Android
```

---

## Debugging

### Backend
```javascript
// Add console logs
console.log('Debug:', variable);

// Use debugger
debugger;
// Then run: node --inspect src/server.js
```

### Frontend
```javascript
// React DevTools browser extension
// Redux DevTools for state management
console.log('Debug:', state);
```

### Mobile
```javascript
// Expo DevTools (Shake device or press Ctrl+D)
console.log('Debug:', state);
```

---

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
- [Expo Documentation](https://docs.expo.dev/)

---

## Getting Help

1. Check the documentation
2. Search existing issues
3. Create a new issue with:
   - Description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs

---

**Happy Coding! 🚀**
