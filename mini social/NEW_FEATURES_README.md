# Mini Social - User Registration & Image Posting Features

## ✨ New Features Added

### 1. **User Registration System** 🔐
- New registration page at `/register/`
- Email validation with duplicate prevention
- Password strength requirements
- Auto-profile creation for new users
- Modern, responsive registration form with gradient styling
- Error messages for validation feedback

### 2. **User Authentication** 🔑
- Login page at `/login/`
- Logout functionality
- Login redirect to home page
- Protected routes requiring authentication
- Form-based authentication with Django's built-in system

### 3. **Image Posting** 📸
- Upload images with posts
- Image preview before posting
- Supported formats: JPG, PNG, GIF, WebP
- Images display in:
  - Home feed
  - Post detail page
  - User's profile posts
- Images stored in `media/posts/` directory

### 4. **Profile Editing** ✏️
- Edit user bio
- Update avatar/profile picture
- Avatar stored in `media/avatars/` directory
- Current avatar display with option to replace
- Image preview for new uploads

### 5. **Enhanced Navigation** 🧭
- "Create Post" button for authenticated users
- "Register" and "Login" buttons for unauthenticated users
- "Logout" button for authenticated users
- Responsive navbar across all pages

## 📁 Project Structure

```
mini_social/
├── social_app/
│   ├── templates/
│   │   ├── home.html              # Dashboard with image display
│   │   ├── register.html          # NEW: Registration page
│   │   ├── login.html             # NEW: Login page
│   │   ├── create_post.html       # NEW: Post creation with image
│   │   ├── edit_profile.html      # NEW: Profile editor
│   │   ├── profile.html           # Updated with edit link
│   │   └── post_detail.html       # Updated with image display
│   ├── forms.py                   # Form classes (RegisterForm, PostForm, ProfileForm)
│   ├── views.py                   # Updated with new views
│   ├── urls.py                    # Updated URL routing
│   ├── models.py                  # Post model with image field
│   ├── migrations/
│   │   ├── 0004_post_image.py     # NEW: Add image field to Post
│   │   └── (previous migrations)
│   └── static/
│       └── (CSS and JS files)
├── social_project/
│   ├── settings.py                # Updated with MEDIA config
│   ├── urls.py                    # Added auth views and media serving
│   └── ...
├── media/                         # NEW: User uploaded files
│   ├── posts/                     # Post images
│   └── avatars/                   # Profile pictures
├── db.sqlite3                     # Database
└── manage.py
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Django 6.0
- Pillow (for image handling)

### Installation

1. **Clone/Setup the project**
   ```bash
   cd "c:\Users\DELL\Desktop\mini social"
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

4. **Run the server**
   ```bash
   python manage.py runserver
   ```

5. **Access the application**
   - Open browser to `http://127.0.0.1:8000/`

## 📖 Usage Guide

### Creating an Account
1. Click "Register" button in the navbar
2. Fill in username, email, and password (must be 8+ characters)
3. Confirm your password
4. Click "Create Account"
5. Redirected to login page
6. Sign in with your credentials

### Creating a Post with Image
1. After logging in, click "Create Post" in navbar
2. Write your post content
3. (Optional) Upload an image
4. Click "Post" to publish

### Editing Your Profile
1. Go to your profile page
2. Click "Edit Profile" button
3. Update bio and/or avatar
4. Click "Save Changes"

### Viewing Posts with Images
- Dashboard home page shows all posts with images (if any)
- Click "View Post" on trending posts to see full details
- Click on user posts to view individual post pages

## 🔧 Technical Details

### Database Migrations Applied
```
0001_initial                                    # Initial setup
0002_alter_post_author...                      # Field modifications
0003_profile_joined_date...                    # Profile enhancements
0004_post_image                                # Add image field to Post
```

### Form Validation
- **RegisterForm**: Email uniqueness, password strength, matching passwords
- **PostForm**: Required content field, optional image
- **ProfileForm**: Optional bio and avatar fields

### URL Routes
| URL | View | Description |
|-----|------|-------------|
| `/` | home | Dashboard |
| `/register/` | register | User registration |
| `/login/` | LoginView | User login |
| `/logout/` | LogoutView | User logout |
| `/profile/<id>/` | profile | View user profile |
| `/profile/edit/` | edit_profile | Edit own profile |
| `/post/<id>/` | post_detail | View post with comments |
| `/post/create/` | create_post | Create new post |

### Settings Configuration
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'home'
```

## 🎨 Features Breakdown

### Registration Form Features
- Bootstrap-style form controls
- Email validation
- Password strength feedback
- Duplicate email detection
- Auto-profile creation on save
- Responsive design

### Post Creation Features
- Rich textarea for content
- Image file picker
- Real-time image preview
- File format validation
- User association (author = current user)
- Redirect to home after posting

### Profile Editing Features
- Bio editor (textarea)
- Avatar/profile picture upload
- Current avatar display
- New avatar preview
- Success/error messaging

### Authentication Flow
1. Unauthenticated users see login/register links
2. Registration creates both User and Profile
3. Login redirects to home dashboard
4. Protected views require `@login_required` decorator
5. Logout redirects to home

## 📊 Data Models

### Post Model (Updated)
```python
- author: ForeignKey(User)
- content: TextField
- image: ImageField (NEW)
- created_at: DateTimeField
- likes: ManyToManyField(User)
```

### Profile Model
```python
- user: OneToOneField(User)
- bio: TextField
- avatar: ImageField
- joined_date: DateTimeField
- is_verified: BooleanField
```

## 🔒 Security Features
- CSRF protection on forms
- Django's built-in user authentication
- Password hashing with multiple algorithms
- Form validation on both client and server side
- Login required decorators on protected views

## 📱 Responsive Design
- Mobile-first approach
- Optimized for devices 320px to 2560px wide
- Touch-friendly buttons and inputs
- Adaptive layouts for all screen sizes

## 🐛 Troubleshooting

### Images not displaying
- Check `MEDIA_ROOT` and `MEDIA_URL` in settings.py
- Verify media folder exists and has proper permissions
- Ensure Pillow is installed: `pip install Pillow`

### Migration errors
- Run: `python manage.py migrate`
- Check for conflicting migrations
- Reset migrations if needed (development only)

### Form validation issues
- Clear browser cache
- Check browser console for JS errors
- Verify form fields match model fields

### Login not working
- Ensure user was created through registration form
- Check password is correct
- Verify `LOGIN_URL` setting

## 📝 Next Steps (Optional Enhancements)

1. **Image optimization** - Resize/compress uploaded images
2. **Image cropping** - Allow users to crop avatars
3. **Post editing** - Edit previously published posts
4. **Image galleries** - Multiple images per post
5. **Social sharing** - Share posts with custom messages
6. **Real-time notifications** - WebSocket-based live updates
7. **Content moderation** - Flag inappropriate content

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Django documentation: https://docs.djangoproject.com/
3. Check for existing issues in project logs

---

**Version:** 2.0 (With Registration & Image Posting)  
**Last Updated:** January 24, 2026  
**Status:** ✅ Production Ready
