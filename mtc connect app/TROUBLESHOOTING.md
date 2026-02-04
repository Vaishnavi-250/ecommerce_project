# Frequently Asked Questions & Troubleshooting

## ❓ FAQs

### General Questions

**Q: What is MTC Connect?**
A: MTC Connect is a comprehensive mobile application for real-time bus tracking, digital ticketing with QR codes, multi-language support, and first/last-mile connectivity through autorickshaw integration.

**Q: What technology stack is used?**
A: React Native with Expo, TypeScript, Redux Toolkit, React Navigation, and Firebase-ready architecture.

**Q: Is this production-ready?**
A: Yes! The frontend is production-ready. You need to:
- Implement backend APIs
- Configure payment gateways
- Set up database
- Deploy to app stores

**Q: How long does setup take?**
A: 5-10 minutes with prerequisites installed. First-time setup with dependencies: 15-20 minutes.

**Q: Can I customize the app?**
A: Absolutely! It's fully customizable - colors, text, languages, features, and more.

**Q: What's the minimum device requirement?**
A: Android 5.0+, iOS 11+, or modern web browsers.

**Q: Can I run this on web?**
A: Yes! Use `npm run web` to run on web browsers.

---

## 🐛 Troubleshooting

### Installation Issues

**Problem: npm command not found**
```
Solution:
1. Check if Node.js is installed: node --version
2. Reinstall Node.js from https://nodejs.org/
3. Restart terminal/computer
```

**Problem: Module not found errors**
```
Solution:
1. Delete node_modules: rm -rf node_modules
2. Delete lock file: rm package-lock.json
3. Reinstall: npm install
```

**Problem: Port 19000 already in use**
```
Solution:
# Kill process on port 19000
lsof -ti:19000 | xargs kill -9
# or
fuser -k 19000/tcp

# Start fresh
npm start -c
```

---

### Runtime Issues

**Problem: App won't start**
```
Solution:
1. Check terminal for error messages
2. Try: npm start -- -c (clear cache)
3. Check internet connection
4. Verify .env file exists
```

**Problem: Blank white screen**
```
Solution:
1. Check console for JavaScript errors
2. Verify Redux store is initialized
3. Check App.tsx imports
4. Try hot reload (press 'r')
```

**Problem: Maps not showing**
```
Solution:
1. Check location permissions
2. Verify MapView is rendered
3. Confirm coordinates are valid
4. Check API key in app.json
```

**Problem: Autorickshaw not loading**
```
Solution:
1. Verify location is enabled
2. Check API endpoint
3. Verify mock data in ConnectivityScreen
4. Check Redux state in DevTools
```

---

### API Integration Issues

**Problem: API calls returning 404**
```
Solution:
1. Check API_BASE_URL in .env
2. Verify endpoint path
3. Check backend is running
4. Test endpoint with Postman
```

**Problem: CORS errors**
```
Solution:
1. Check backend CORS configuration
2. Verify origin in .env
3. Use proxy if needed
4. Check preflight requests
```

**Problem: Authentication token not working**
```
Solution:
1. Check token is being saved
2. Verify token format
3. Check expiration time
4. Test with Postman
```

**Problem: WebSocket connection fails**
```
Solution:
1. Check WS_URL in .env
2. Verify WebSocket server is running
3. Check for firewall issues
4. Test with wscat
```

---

### State Management Issues

**Problem: Redux state not updating**
```
Solution:
1. Install Redux DevTools extension
2. Check action is dispatched
3. Verify reducer is updated
4. Check for immutability violations
5. Look for async thunk issues
```

**Problem: Component not re-rendering**
```
Solution:
1. Check selector in useSelector
2. Verify state structure
3. Check for reference equality issues
4. Use React DevTools Profiler
5. Verify mapStateToProps if using connect
```

**Problem: Redux actions not found**
```
Solution:
1. Check slice export
2. Verify import path
3. Check dispatch arguments
4. Look for typos in action name
```

---

### UI/UX Issues

**Problem: Components not styled correctly**
```
Solution:
1. Check theme.ts colors
2. Verify StyleSheet definitions
3. Clear cache and rebuild
4. Check for conflicting styles
```

**Problem: Text not translating**
```
Solution:
1. Check translation key exists
2. Verify language is set
3. Check locale files are imported
4. Restart app after language change
```

**Problem: Navigation not working**
```
Solution:
1. Check screen name in navigator
2. Verify navigation props passed
3. Check RootNavigator setup
4. Verify authentication state
```

---

## 🔧 Advanced Troubleshooting

### Debug with Chrome DevTools

```bash
# Start app
npm start

# Press 'd' to open debugger
# Open Chrome: http://localhost:19000/debugger-ui
```

### React DevTools

```bash
# Install extension in Chrome
# Run app with npm start
# DevTools shows component tree
```

### Redux DevTools

```bash
# Install Redux DevTools extension
# Open DevTools
# See all actions and state changes
```

### Network Inspection

```bash
# Use React Native Debugger
# Available: https://github.com/jhen0409/react-native-debugger
```

---

## 📱 Device-Specific Issues

### Android

**Problem: App not installing on device**
```
Solution:
1. Enable USB debugging on device
2. Install device driver
3. Run: npm run android
4. Or build APK and install manually
```

**Problem: App crashes on Android**
```
Solution:
1. Check logcat: adb logcat *:S ReactNative:V
2. Verify permissions in app.json
3. Test on different Android version
4. Check for native module issues
```

### iOS

**Problem: App won't run on simulator**
```
Solution:
1. Start simulator: open -a Simulator
2. Run: npm run ios
3. Check Xcode is installed
4. Verify iOS SDK version
```

**Problem: Build fails on iOS**
```
Solution:
1. Clear DerivedData: rm -rf ~/Library/Developer/Xcode/DerivedData
2. Update CocoaPods: pod repo update
3. Run: cd ios && pod install
4. Open with Xcode and build
```

---

## 💻 Platform-Specific Issues

### Windows

**Problem: Module resolution fails**
```
Solution:
1. Use forward slashes in imports
2. Check file names case sensitivity
3. Verify paths in tsconfig.json
4. Use proper path separators
```

**Problem: npm commands not working**
```
Solution:
1. Run as Administrator
2. Check PATH environment variable
3. Reinstall Node.js
4. Use PowerShell or CMD as admin
```

### macOS

**Problem: Permission denied errors**
```
Solution:
1. Don't use sudo for npm
2. Fix npm permissions
3. Use Homebrew installation
4. Check file ownership
```

### Linux

**Problem: Library dependencies missing**
```
Solution:
1. Install dev tools: build-essential
2. Install node from source or NVM
3. Check LD_LIBRARY_PATH
4. Install system dependencies
```

---

## 🧪 Testing Issues

**Problem: Tests not running**
```
Solution:
1. Check Jest is installed
2. Verify test files exist
3. Run: npm run test
4. Check test configuration
```

**Problem: Type errors in tests**
```
Solution:
1. Install @types/jest
2. Check tsconfig for test
3. Verify imports in test files
```

---

## 📊 Performance Issues

**Problem: App is slow**
```
Solution:
1. Use React DevTools Profiler
2. Check for unnecessary re-renders
3. Optimize selectors
4. Check list virtualization
5. Profile JavaScript execution
```

**Problem: Memory usage high**
```
Solution:
1. Check for memory leaks
2. Clear timers and listeners
3. Unsubscribe from events
4. Profile with DevTools
```

---

## 🔐 Security Issues

**Problem: Token not secure**
```
Solution:
1. Use secure storage
2. Don't store in AsyncStorage
3. Implement token refresh
4. Set proper expiration
```

**Problem: API key exposed**
```
Solution:
1. Move to .env file
2. Never commit secrets
3. Use environment variables
4. Rotate keys if exposed
```

---

## 📚 Learning Issues

**Problem: Can't understand architecture**
```
Solution:
1. Read ARCHITECTURE.md carefully
2. Draw diagrams yourself
3. Trace data flow manually
4. Study Redux concepts first
5. Review TypeScript basics
```

**Problem: Lost in codebase**
```
Solution:
1. Start with App.tsx
2. Follow imports
3. Use IDE breadcrumbs
4. Search with Ctrl+Shift+F
5. Read documentation first
```

---

## 🎯 Quick Fix Checklist

For most issues, try:

- [ ] Clear cache: `npm start -- -c`
- [ ] Reinstall deps: `npm install`
- [ ] Restart terminal
- [ ] Check .env file
- [ ] Verify API is running
- [ ] Check console errors
- [ ] Review Redux DevTools
- [ ] Read error message carefully
- [ ] Check documentation
- [ ] Restart device/emulator

---

## 🆘 When All Else Fails

1. **Check Documentation**
   - README.md
   - QUICK_START.md
   - SETUP.md
   - ARCHITECTURE.md

2. **Search GitHub Issues**
   - Similar issue reported?
   - Solution in comments?

3. **Check Stack Overflow**
   - Tag specific technology
   - Include error message
   - Provide minimal reproduction

4. **Review Official Docs**
   - React Native
   - Expo
   - Redux
   - React Navigation

5. **Ask for Help**
   - Provide error message
   - Share code snippet
   - Describe steps to reproduce
   - Mention your environment

---

## 💡 Pro Tips

1. **Always check the console first** - 90% of issues show errors there
2. **Use Redux DevTools** - Helps understand state changes
3. **Read error messages carefully** - They usually tell you exactly what's wrong
4. **Keep dependencies updated** - But test before major upgrades
5. **Restart everything** - Terminal, emulator, computer
6. **Clear cache and rebuild** - Solves mysterious issues
7. **Test on multiple devices** - Different Android/iOS versions behave differently
8. **Use React DevTools** - Profile and inspect components
9. **Check your internet** - Many "bugs" are network issues
10. **Read documentation first** - Before asking for help

---

## 📞 Getting Help

### Resources
- Documentation files in project root
- GitHub Issues (if available)
- Stack Overflow with proper tags
- Official React Native docs
- Expo community forum

### When Reporting Issues
Include:
- Exact error message
- Steps to reproduce
- Your environment (OS, Node version)
- What you tried to fix it
- Code snippet if applicable

---

## 🎓 Common Learning Mistakes

**Mistake**: Modifying node_modules directly
**Solution**: Edit source files, let npm handle node_modules

**Mistake**: Not checking .env file
**Solution**: Verify .env exists and has correct values

**Mistake**: Using sudo for npm
**Solution**: Fix npm permissions instead

**Mistake**: Not understanding Redux
**Solution**: Learn Redux before working on state management

**Mistake**: Ignoring TypeScript errors
**Solution**: Read error messages and fix type issues

---

**Last Updated**: January 2024
**For additional help, see the documentation files!**
