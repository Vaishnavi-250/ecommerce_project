# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/mtc-connect-app.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start development: `npm start`

## Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow Airbnb ESLint config
- Use Prettier for code formatting
- Use kebab-case for file names
- Use PascalCase for component names

### Naming Conventions
```typescript
// Components - PascalCase
export const BusCard = () => {}

// Utilities - camelCase
export const calculateDistance = () => {}

// Constants - UPPER_SNAKE_CASE
export const API_BASE_URL = 'https://...'

// Redux actions - camelCase
export const loginSuccess = () => {}

// Redux selectors - camelCase
export const selectAuthUser = (state) => {}
```

### Component Structure
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

// Type definitions
interface ComponentProps {
  title: string;
  onPress: () => void;
}

// Component
const MyComponent: React.FC<ComponentProps> = ({ title, onPress }) => {
  const [state, setState] = useState('');

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// Styles at bottom
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default MyComponent;
```

### Redux Slice Pattern
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
  data: string[];
  loading: boolean;
}

const initialState: MyState = {
  data: [],
  loading: false,
};

const mySlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<string[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setData, setLoading } = mySlice.actions;
export default mySlice.reducer;
```

## Commit Messages

Follow conventional commits:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change without feature/fix
- `perf`: Code change that improves performance
- `test`: Adding or updating tests
- `chore`: Changes to build process or dependencies

### Examples
```
feat(tracking): add real-time bus location updates
fix(ticketing): correct QR code generation for passes
docs(readme): update installation instructions
refactor(navigation): reorganize screen structure
```

## Pull Request Process

1. Update README.md with any new features
2. Update ARCHITECTURE.md if structure changes
3. Ensure tests pass: `npm run test`
4. Ensure linting passes: `npm run lint`
5. Create descriptive PR title and description
6. Request review from maintainers
7. Address review comments
8. Squash commits if necessary

## Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('should call onPress when clicked', () => {
    const mockOnPress = jest.fn();
    render(<Button title="Click Me" onPress={mockOnPress} />);
    
    fireEvent.press(screen.getByText('Click Me'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should be disabled when loading', () => {
    render(<Button title="Loading" loading onPress={() => {}} />);
    expect(screen.getByDisabled(true)).toBeTruthy();
  });
});
```

## Linting & Formatting

### Run Linter
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint -- --fix
```

### Format Code
```bash
npx prettier --write .
```

## Adding New Features

### Step 1: Create the Redux Slice
```typescript
// src/store/slices/myFeatureSlice.ts
```

### Step 2: Create Services
```typescript
// src/services/myFeatureService.ts
```

### Step 3: Create Components
```typescript
// src/components/MyFeature.tsx
```

### Step 4: Create Screens (if needed)
```typescript
// src/screens/MyFeatureScreen.tsx
```

### Step 5: Add Translations
```typescript
// src/locales/en.ts
// src/locales/hi.ts
```

### Step 6: Update Navigation
```typescript
// src/navigation/RootNavigator.tsx
```

### Step 7: Write Tests
```typescript
// __tests__/MyFeature.test.ts
```

## Performance Tips

1. **Memoize Components**
```typescript
export default React.memo(MyComponent);
```

2. **Optimize Selectors**
```typescript
const selectUser = (state) => state.auth.user;
const selectUserId = useSelector(selectUser)?.id;
```

3. **Use Lazy Loading**
```typescript
const screen = lazy(() => import('./screens/HeavyScreen'));
```

4. **Optimize Lists**
```typescript
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
/>
```

## Debugging

### Chrome DevTools
```bash
npm start
# Press 'd' in terminal
```

### React DevTools
```bash
# Install React DevTools extension
# and run the app in development mode
```

### Redux DevTools
```bash
# Install Redux DevTools extension
# Monitor actions and state changes
```

## Common Issues

### Issue: Module not found
**Solution**: Check file paths and imports. Ensure TypeScript paths are correct.

### Issue: State not updating
**Solution**: Check Redux DevTools. Ensure you're dispatching correct actions.

### Issue: Slow performance
**Solution**: Use React DevTools Profiler. Check for unnecessary re-renders.

## Resources

- [React Native Docs](https://reactnative.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Expo Documentation](https://docs.expo.dev)

## Questions?

- Create an issue on GitHub
- Check existing issues for solutions
- Contact maintainers

---

Thank you for contributing! 🎉
