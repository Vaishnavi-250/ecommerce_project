# Quick Start Guide - Testing New Features

## 🎯 Testing Checklist

### 1. Registration Feature ✓
```
1. Open http://127.0.0.1:8000/
2. Click "Register" button
3. Fill in:
   - Username: testuser123
   - Email: test@example.com
   - Password: TestPassword123
   - Confirm Password: TestPassword123
4. Click "Create Account"
5. Should redirect to login page with success message
6. Login with your new credentials
```

### 2. Login/Logout Feature ✓
```
1. Click "Login" on homepage
2. Enter username: testuser123
3. Enter password: TestPassword123
4. Click "Sign In"
5. Should redirect to home dashboard
6. Click "Logout" in navbar
7. Should return to unauthenticated home page
```

### 3. Create Post with Text ✓
```
1. After logging in, click "Create Post"
2. Enter text: "This is my first post! 🎉"
3. Click "Post"
4. Should redirect to home
5. Your post appears at top of feed
```

### 4. Create Post with Image ✓
```
1. Click "Create Post"
2. Enter text: "Check out my sunset photo!"
3. Click "Add Image" and select an image file
4. See image preview below the form
5. Click "Post"
6. Image now visible in:
   - Home feed
   - Trending section
   - Post detail page
```

### 5. Edit Profile ✓
```
1. Click your profile link or username
2. Click "Edit Profile" button
3. Update bio: "I love sharing content!"
4. Click file picker for avatar
5. Select an image for your profile picture
6. See preview of new avatar
7. Click "Save Changes"
8. Verify changes appear on profile page
```

### 6. Navigation Updates ✓
```
Without Login:
- Homepage shows "Register" and "Login" buttons
- Cannot access create post or edit profile

With Login:
- Homepage shows "Create Post", "My Profile", "Logout"
- Can create posts
- Can edit profile
- All internal links work correctly
```

### 7. Image Display ✓
```
1. Create a post with image
2. Check it appears on:
   - Home dashboard
   - Trending section (if popular)
   - Your profile page
   - Post detail page
3. Images are properly sized and responsive
```

## 🔍 Verification Steps

### Database
```bash
# Check migrations applied
python manage.py showmigrations social_app

# Should show:
# [X] 0001_initial
# [X] 0002_alter_post_author...
# [X] 0003_profile_joined_date...
# [X] 0004_post_image
```

### File Structure
```bash
# Media folder should exist with:
# media/
# ├── posts/        (for post images)
# └── avatars/      (for profile pictures)
```

### Templates
```
✓ register.html     - Registration form
✓ login.html        - Login form
✓ create_post.html  - Post creation with image
✓ edit_profile.html - Profile editor
✓ home.html         - Updated with image display
✓ profile.html      - Updated with edit link
✓ post_detail.html  - Updated with image display
```

### Views
```python
✓ register()        - Handle registration
✓ create_post()     - Handle post with image
✓ edit_profile()    - Handle profile editing
✓ home()            - Display posts with images
✓ profile()         - Show profile with edit link
✓ post_detail()     - Display post with image
```

## 🧪 Test Scenarios

### Scenario 1: New User Flow
```
1. Click Register
2. Create new account
3. Login with credentials
4. See empty dashboard
5. Create first post with image
6. Post appears in feed
7. Edit profile with avatar
8. Avatar visible on profile
```

### Scenario 2: Multiple Users
```
1. Register User A: alice@example.com
2. Create post with image
3. Register User B: bob@example.com
4. Create post with image
5. Both users see each other's posts
6. Can comment on each other's posts
7. Can like each other's posts
```

### Scenario 3: Image Upload
```
1. Create post without image - works ✓
2. Create post with image - works ✓
3. Different file types: JPG, PNG, GIF, WebP
4. Large image - should handle gracefully
5. Verify images display correctly
```

### Scenario 4: Profile Customization
```
1. Register new user
2. Profile has default settings
3. Edit bio with custom text
4. Upload profile avatar
5. Changes persist after logout/login
6. Other users see updated profile
```

## 📊 Expected Results

### After Registration
- New user record created
- New profile auto-created
- Can login with credentials
- Email stored in database

### After Creating Post with Image
- Post appears in feed
- Image accessible at `/media/posts/<filename>`
- Post shows in user's profile
- Can view full post with image

### After Editing Profile
- Bio updated
- Avatar changed
- Changes visible immediately
- Persistent across sessions

## 🚀 Performance Checks

### Load Times
- Homepage loads under 2 seconds
- Post creation under 1 second
- Image upload under 3 seconds
- Profile edit under 1 second

### Image Handling
- Images display without distortion
- Responsive on all screen sizes
- Mobile devices handle correctly
- Large files managed properly

## ✅ Final Verification

Run this to verify everything:
```bash
# 1. Check server status
python manage.py check

# 2. Run migrations
python manage.py migrate

# 3. Test import
python manage.py shell
>>> from social_app.models import Post, Profile
>>> from social_app.forms import RegisterForm, PostForm, ProfileForm
>>> print("All imports successful!")

# 4. Create test data
>>> from django.contrib.auth.models import User
>>> user = User.objects.create_user(
...     username='test',
...     email='test@test.com',
...     password='testpass123'
... )
>>> print(f"User created: {user.username}")
>>> print(f"Profile created: {user.profile}")
```

## 📋 Checklist Complete ✓

- [ ] Server running on localhost:8000
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can create posts with text
- [ ] Can upload images with posts
- [ ] Can edit profile and avatar
- [ ] Navigation shows correct buttons
- [ ] Images display on home/profile/post pages
- [ ] All links functional
- [ ] Responsive design works
- [ ] Database migrations applied

---

**Once all checks pass, your app is ready to use!** 🎉
