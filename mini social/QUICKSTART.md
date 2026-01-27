# Mini Social - Quick Start Guide

## 🚀 Getting Started (5 minutes)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Apply Database Migrations
```bash
python manage.py migrate
```

### Step 3: Create Admin Account
```bash
python manage.py createsuperuser
```

### Step 4: Load Demo Data
```bash
python manage.py shell < populate_demo_data.py
```

### Step 5: Run Server
```bash
python manage.py runserver
```

Visit: `http://localhost:8000/`

---

## 📊 Dashboard Overview

### What You'll See:

1. **Navigation Bar** - Quick links to Dashboard, Profile, and Logout
2. **Left Sidebar** - Your statistics and platform stats
3. **Main Content Area**:
   - Welcome message
   - Trending posts section (top 5 by engagement)
   - Latest posts feed
   - Recent activity feed
4. **Right Sidebar** - Quick statistics

### Key Features:

- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Dark theme with vibrant accents
- ⚡ **Real-time Stats** - Animated counter updates
- 🔥 **Trending Algorithm** - Posts ranked by likes + comments
- 👥 **User Following** - Follow system with follower counts
- 💬 **Comments** - Full comment threads on posts
- ❤️ **Likes** - Like/unlike posts with counts

---

## 👤 User Profile Features

### View Profile:
- Click on any username or user card in the feed
- See user's bio and statistics
- View all their posts
- See their most liked post
- Follow/Unfollow button (if not your profile)

### Profile Statistics:
- Total posts count
- Total followers
- Total following
- Join date

---

## 📝 Creating and Managing Posts

### Via Admin Panel:
1. Go to `http://localhost:8000/admin/`
2. Login with your superuser credentials
3. Click "Posts" in the left menu
4. Click "Add Post"
5. Select author
6. Write your content
7. Click "Save"

### Via Shell:
```bash
python manage.py shell
```

```python
from django.contrib.auth.models import User
from social_app.models import Post

user = User.objects.get(username='john_dev')
Post.objects.create(author=user, content="Your post content here!")
```

---

## 💬 Comments System

### Adding Comments:
1. Open any post detail page (click "View Comments")
2. Scroll to comment section
3. Type your comment in the textarea
4. Click "Post Comment"
5. Your comment appears immediately

### Viewing Comments:
- All comments visible on post detail page
- Ordered from newest to oldest
- Shows author name and comment time
- Click author to visit their profile

---

## ❤️ Likes System

### Liking Posts:
1. On the feed or post detail page
2. Click the "Like" button
3. Button changes to show "❤️ Liked"
4. Like count updates automatically

### Viewing Likes:
- Like count shown on each post
- Also appears in post statistics

---

## 👥 Following System

### Follow Users:
1. Visit a user's profile
2. Click the "+ Follow" button
3. Button changes to "✓ Following"
4. User appears in your following list

### View Followers:
- Follower count shown on profile
- Top followers visible on dashboard
- Click to visit their profiles

---

## 🔍 Searching & Filtering

### In Admin Panel:
- **Posts**: Search by author username or content
- **Users**: Search by username or email
- **Comments**: Search by author or content
- **Profiles**: Filter by verified status

### Tips:
- Use exact usernames for precise results
- Partial matches work with keywords
- Use filters for quick categorization

---

## 📊 Admin Panel Guide

### Dashboard Views:

#### Posts
- List all posts with previews
- View author, likes, and comment count
- Filter by date or author
- Click to edit or delete

#### Users (via Django Auth)
- Manage user accounts
- Create new users
- Update user info
- View permissions

#### Comments
- Browse all comments
- See which post they belong to
- Filter by author or date
- Delete spam comments

#### Profiles
- View user bios and avatars
- Check verification status
- View follower counts

#### Follow Relationships
- See all follow connections
- View follower and following lists
- Manage relationships

---

## 🎨 Customization

### Change Theme Colors:
Edit `social_app/static/styles.css` and modify:

```css
:root {
    --primary-color: #3b82f6;      /* Blue */
    --secondary-color: #10b981;    /* Green */
    --accent-color: #f59e0b;       /* Orange */
    --background: #0f172a;         /* Dark */
    --surface: #1e293b;            /* Slate */
}
```

### Add New Features:
1. Update models in `social_app/models.py`
2. Create migrations: `python manage.py makemigrations`
3. Apply migrations: `python manage.py migrate`
4. Update views in `social_app/views.py`
5. Update templates in `social_app/templates/`

---

## 🐛 Common Issues & Solutions

### Issue: "Database table does not exist"
**Solution**:
```bash
python manage.py migrate
```

### Issue: "No such table: auth_user"
**Solution**:
```bash
python manage.py migrate auth
python manage.py migrate
```

### Issue: Static files not loading
**Solution**:
```bash
python manage.py collectstatic --noinput
```

### Issue: "Port 8000 already in use"
**Solution**:
```bash
python manage.py runserver 8001
```

### Issue: "module 'social_app' has no attribute 'views'"
**Solution**: Restart the server (Ctrl+C then run again)

---

## 📈 Performance Tips

### For Better Speed:
1. Use `select_related()` for foreign keys
2. Use `prefetch_related()` for many-to-many
3. Add database indexes on frequently searched fields
4. Cache trending posts (implement Redis)
5. Use CDN for static files in production

### Implement Caching:
```python
from django.views.decorators.cache import cache_page

@cache_page(60 * 5)  # Cache for 5 minutes
def trending_posts(request):
    # Your view here
```

---

## 🔐 Security Checklist

- ✅ CSRF tokens on all forms
- ✅ User authentication required for sensitive actions
- ✅ SQL injection prevention (Django ORM)
- ✅ XSS protection
- ✅ Secure password hashing
- ✅ Admin panel access control

### Before Production:
1. Set `DEBUG = False` in settings.py
2. Change `SECRET_KEY` to a random string
3. Configure `ALLOWED_HOSTS`
4. Use environment variables for secrets
5. Enable HTTPS
6. Set up secure database
7. Configure CORS if needed

---

## 📚 File Structure Explanation

```
social_app/
├── models.py
│   └── Defines database structure (Profile, Post, Comment, Follow)
├── views.py
│   └── Contains view logic (home, profile, post_detail)
├── urls.py
│   └── URL routing configuration
├── admin.py
│   └── Admin panel customization
├── templates/
│   ├── home.html       (Dashboard with trending section)
│   ├── profile.html    (User profile with stats)
│   └── post_detail.html (Post detail with comments)
└── static/
    ├── styles.css      (Complete styling)
    └── script.js       (Interactive features)
```

---

## 🎓 Learning Resources

### Django Documentation
- [Models](https://docs.djangoproject.com/en/stable/topics/db/models/)
- [Views & URLs](https://docs.djangoproject.com/en/stable/topics/http/urls/)
- [Templates](https://docs.djangoproject.com/en/stable/topics/templates/)
- [Admin Site](https://docs.djangoproject.com/en/stable/ref/contrib/admin/)

### Frontend
- [CSS Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

---

## 📞 Support

### Getting Help:
1. Check the README.md for detailed documentation
2. Look at existing code examples
3. Check Django documentation
4. Test in Django shell
5. Use Django debug toolbar

### Debug Mode:
```python
# In Django shell
from social_app.models import Post
posts = Post.objects.all()
print(posts.query)  # See the SQL query
```

---

## 🎉 Next Steps

1. ✅ Create your account in admin
2. ✅ Add some posts
3. ✅ Create follow relationships
4. ✅ Comment on posts
5. ✅ Explore the dashboard
6. ✅ Customize colors and styles
7. ✅ Add more features (notifications, direct messaging, etc.)

---

**Happy coding! 🚀**
