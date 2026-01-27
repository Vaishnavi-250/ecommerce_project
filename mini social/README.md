# Mini Social - Enhanced Social Platform 🚀

A modern, feature-rich social media platform built with Django featuring a stunning dashboard, user profiles, posts, comments, and a complete interaction system.

## 🎯 Features

### Core Features
- ✅ User Authentication & Profiles
- ✅ Create, Read, Update, Delete Posts
- ✅ Comment on Posts
- ✅ Like/Unlike Posts
- ✅ Follow/Unfollow Users
- ✅ User Profiles with Statistics
- ✅ Trending Content Section
- ✅ Activity Feed

### Dashboard Features
- 📊 Platform Statistics (Total Posts, Users, Comments)
- 🔥 Trending Posts with Engagement Metrics
- 👥 Top Users by Followers
- ⚡ Recent Activity Feed
- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 🎨 Modern Dark Theme with Gradients

### User Experience
- 🔍 Advanced Search & Filtering
- 📈 User Statistics & Insights
- ⏱️ Timestamps (e.g., "2 hours ago")
- 🔄 Real-time Activity Updates
- 🎬 Smooth Animations & Transitions
- 📱 Mobile-First Responsive Design

## 🛠️ Technology Stack

- **Backend**: Django 3.x+
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Database**: SQLite (Default)
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Icons**: Unicode Emojis

## 📋 Prerequisites

- Python 3.8+
- Django 3.2+
- pip (Python Package Manager)

## 🚀 Installation & Setup

### 1. Clone or Navigate to Project
```bash
cd "c:\Users\DELL\Desktop\mini social"
```

### 2. Create Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install django pillow
```

### 4. Apply Migrations
```bash
python manage.py migrate
```

### 5. Create Superuser (Admin Account)
```bash
python manage.py createsuperuser
```
Follow the prompts to create your admin account.

### 6. Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### 7. Run Development Server
```bash
python manage.py runserver
```

The application will be available at: `http://localhost:8000/`

## 📍 Accessing the Application

### Public Site
- **URL**: `http://localhost:8000/`
- **Home**: Dashboard with Trending Posts
- **Profile**: Click on any user to view their profile
- **Posts**: Click "View Comments" to see post details

### Admin Panel
- **URL**: `http://localhost:8000/admin/`
- **Login**: Use the superuser credentials you created
- **Features**:
  - Manage Users
  - Create/Edit/Delete Posts
  - Manage Comments
  - View User Statistics
  - Manage Follow Relationships

## 📁 Project Structure

```
mini_social/
├── db.sqlite3              # Database
├── manage.py              # Django management script
├── README.md              # This file
│
├── social_project/        # Main project settings
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
└── social_app/            # Main application
    ├── models.py          # Database models
    ├── views.py           # View functions
    ├── urls.py            # URL routing
    ├── admin.py           # Admin configuration
    ├── apps.py
    ├── tests.py
    ├── migrations/        # Database migrations
    ├── static/            # Static files
    │   ├── styles.css     # Main stylesheet
    │   └── script.js      # JavaScript functionality
    └── templates/         # HTML templates
        ├── home.html      # Dashboard
        ├── profile.html   # User profile
        └── post_detail.html # Post details
```

## 🎨 Features Overview

### Dashboard (Home Page)
- **Welcome Section**: Personalized greeting for logged-in users
- **Trending Section**: Top posts by engagement
- **Posts Feed**: All posts in chronological order
- **Activity Section**: Recent comments and interactions
- **Platform Stats**: Total posts, users, and comments
- **Top Users**: Most followed users

### User Profile
- **Profile Header**: Avatar, bio, and statistics
- **User Stats**: Posts count, followers, following
- **Actions**: Follow button, message button (if not own profile)
- **Posts Gallery**: All user's posts
- **Most Liked Post**: Highlights best performing post

### Post Detail
- **Post Content**: Full post with author info
- **Engagement Stats**: Likes and comment count
- **Action Buttons**: Like, Comment, Share
- **Comments Section**: View all comments and add new ones
- **Comments List**: Chronologically ordered comments

## 💾 Database Models

### Profile
- `user` - OneToOne with User
- `bio` - User biography
- `avatar` - Profile picture
- `joined_date` - Account creation date
- `is_verified` - Verification status

### Post
- `author` - ForeignKey to User
- `content` - Post text content
- `created_at` - Creation timestamp
- `likes` - ManyToMany with User

### Comment
- `post` - ForeignKey to Post
- `author` - ForeignKey to User
- `content` - Comment text
- `created_at` - Creation timestamp

### Follow
- `follower` - ForeignKey to User
- `following` - ForeignKey to User
- `unique_together` - Prevents duplicate follows

## 🎯 Usage Examples

### Create a New Post
1. Login to admin panel (`/admin/`)
2. Go to Posts
3. Click "Add Post"
4. Select author, write content, save

### Create Test Data
```bash
python manage.py shell
```

```python
from django.contrib.auth.models import User
from social_app.models import Post, Comment, Follow, Profile

# Create test user
user = User.objects.create_user(username='testuser', password='testpass123')

# Create profile
Profile.objects.create(user=user, bio="This is a test user")

# Create post
post = Post.objects.create(author=user, content="Hello, Mini Social!")

# Add likes
post.likes.add(user)

# Create comment
Comment.objects.create(post=post, author=user, content="Great post!")
```

## 🔐 Security Features

- CSRF Protection on all forms
- Secure password hashing
- User authentication required for comments
- Admin panel access control
- SQL Injection Prevention (Django ORM)

## 📱 Responsive Design

- **Desktop**: 3-column layout with sidebar
- **Tablet**: 2-column layout
- **Mobile**: Single column stacked layout

## 🎨 Design Highlights

### Color Scheme
- Primary: Blue (#3b82f6)
- Secondary: Green (#10b981)
- Accent: Orange (#f59e0b)
- Background: Dark Blue-Gray (#0f172a)
- Surface: Slate (#1e293b)

### Typography
- Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Smooth animations and transitions

### UI Components
- Gradient buttons with hover effects
- Animated cards with shadow effects
- Smooth scroll behavior
- Color-coded badges
- User avatars with initials

## 🚀 Deployment Tips

### For Production
1. Set `DEBUG = False` in settings.py
2. Configure allowed hosts
3. Use environment variables for secrets
4. Use a production database (PostgreSQL recommended)
5. Set up static file serving
6. Configure email backend for notifications

### Environment Variables (.env)
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgresql://user:password@localhost/dbname
```

## 📖 API Reference

### Views

#### Home View
- **URL**: `/`
- **Method**: GET
- **Context**: Posts, Trending Posts, Top Users, Statistics

#### Profile View
- **URL**: `/profile/<user_id>/`
- **Method**: GET
- **Context**: User info, Posts, Statistics

#### Post Detail View
- **URL**: `/post/<post_id>/`
- **Method**: GET, POST
- **POST**: Add new comment

## 🐛 Troubleshooting

### Issue: Static files not loading
**Solution**: Run `python manage.py collectstatic`

### Issue: Database errors
**Solution**: 
```bash
python manage.py makemigrations
python manage.py migrate
```

### Issue: Admin access denied
**Solution**: Ensure you have created a superuser:
```bash
python manage.py createsuperuser
```

### Issue: Port already in use
**Solution**: Specify a different port:
```bash
python manage.py runserver 8001
```

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django Models](https://docs.djangoproject.com/en/stable/topics/db/models/)
- [Django Admin](https://docs.djangoproject.com/en/stable/ref/contrib/admin/)
- [CSS Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as an enhanced social media platform demonstration.

---

**Enjoy using Mini Social! 🎉**

For questions or issues, refer to the troubleshooting section above or check the Django documentation.
