# Mini Social API Documentation

This document outlines the structure for future API development.

## 📋 Current Endpoints (HTML-based)

### Public Endpoints
- `GET /` - Dashboard with trending posts and statistics
- `GET /profile/<user_id>/` - User profile page
- `GET /post/<post_id>/` - Post detail page with comments

### Admin Endpoints
- `GET /admin/` - Django admin panel
- `GET /admin/auth/user/` - User management
- `POST /admin/logout/` - Logout

---

## 🔮 Planned REST API Endpoints

### Authentication
```
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/logout/
GET /api/auth/user/ - Get current user
```

### Users
```
GET /api/users/ - List all users
GET /api/users/<id>/ - Get user detail
PUT /api/users/<id>/ - Update user
DELETE /api/users/<id>/ - Delete user
GET /api/users/<id>/posts/ - Get user's posts
GET /api/users/<id>/followers/ - Get user's followers
GET /api/users/<id>/following/ - Get user's following
```

### Profiles
```
GET /api/profiles/ - List profiles
GET /api/profiles/<user_id>/ - Get profile
PUT /api/profiles/<user_id>/ - Update profile
```

### Posts
```
GET /api/posts/ - List posts (paginated, filtered, sorted)
POST /api/posts/ - Create post
GET /api/posts/<id>/ - Get post detail
PUT /api/posts/<id>/ - Update post
DELETE /api/posts/<id>/ - Delete post
POST /api/posts/<id>/like/ - Like post
POST /api/posts/<id>/unlike/ - Unlike post
```

### Comments
```
GET /api/posts/<post_id>/comments/ - List comments on post
POST /api/posts/<post_id>/comments/ - Create comment
GET /api/comments/<id>/ - Get comment detail
PUT /api/comments/<id>/ - Update comment
DELETE /api/comments/<id>/ - Delete comment
```

### Follow
```
GET /api/users/<id>/followers/ - Get followers
GET /api/users/<id>/following/ - Get following
POST /api/users/<id>/follow/ - Follow user
POST /api/users/<id>/unfollow/ - Unfollow user
```

### Search & Discovery
```
GET /api/search/ - Search posts, users, comments
GET /api/trending/ - Get trending posts
GET /api/feed/ - Get personalized feed
```

---

## 📊 Response Format

### Success Response
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "username": "john_dev",
        "email": "john@example.com"
    }
}
```

### Error Response
```json
{
    "status": "error",
    "message": "User not found",
    "code": 404
}
```

### Paginated Response
```json
{
    "status": "success",
    "data": [...],
    "pagination": {
        "page": 1,
        "per_page": 20,
        "total": 100,
        "pages": 5
    }
}
```

---

## 🔐 Authentication

### Token-Based (JWT)
```
Authorization: Bearer <token>
```

### Session-Based
```
Cookie: sessionid=<session_id>
```

---

## 📝 Model Serializers (for DRF)

### PostSerializer
```python
{
    "id": 1,
    "author": {
        "id": 1,
        "username": "john_dev",
        "avatar": "url"
    },
    "content": "Post content",
    "created_at": "2024-01-24T10:30:00Z",
    "likes": {
        "count": 5,
        "liked_by_me": true
    },
    "comments": {
        "count": 3,
        "recent": [...]
    }
}
```

### CommentSerializer
```python
{
    "id": 1,
    "post_id": 1,
    "author": {
        "id": 1,
        "username": "john_dev"
    },
    "content": "Great post!",
    "created_at": "2024-01-24T10:35:00Z"
}
```

---

## 🚀 Implementation Priority

### Phase 1 (MVP)
- [ ] Authentication API
- [ ] User endpoints
- [ ] Post CRUD
- [ ] Comments CRUD
- [ ] Likes system

### Phase 2 (Enhancement)
- [ ] Follow system
- [ ] Search functionality
- [ ] Trending algorithm
- [ ] Feed algorithm
- [ ] Rate limiting

### Phase 3 (Advanced)
- [ ] Notifications
- [ ] Direct messaging
- [ ] File uploads
- [ ] Real-time updates (WebSockets)
- [ ] Analytics

---

## 📦 Required Libraries for REST API

```bash
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install django-filter
```

---

## 🔗 CORS Configuration

```python
# In settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://yourdomain.com",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}
```

---

## 📋 Rate Limiting

```python
from rest_framework.throttling import UserRateThrottle

class PostCreationThrottle(UserRateThrottle):
    scope = 'posts'
    rate = '5/hour'

class CommentThrottle(UserRateThrottle):
    scope = 'comments'
    rate = '20/hour'
```

---

## 🧪 Example API Usage

### Create a Post
```bash
curl -X POST http://localhost:8000/api/posts/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content": "My new post!"}'
```

### Like a Post
```bash
curl -X POST http://localhost:8000/api/posts/1/like/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Trending Posts
```bash
curl http://localhost:8000/api/trending/
```

---

## 📊 Database Query Optimization

```python
# Optimized query for posts with all related data
posts = Post.objects.select_related(
    'author',
    'author__profile'
).prefetch_related(
    'likes',
    'comments',
    'comments__author'
).annotate(
    like_count=Count('likes'),
    comment_count=Count('comments')
).order_by('-created_at')
```

---

## 🔔 Notification System (Future)

```python
# Notification types
class NotificationType:
    POST_LIKED = 'post_liked'
    COMMENT_ADDED = 'comment_added'
    USER_FOLLOWED = 'user_followed'
    COMMENT_REPLIED = 'comment_replied'

# Trigger notification
def notify_user(user, notification_type, data):
    Notification.objects.create(
        recipient=user,
        type=notification_type,
        data=data,
        is_read=False
    )
```

---

## 📱 Mobile App Integration

### Required Headers
```
X-App-Version: 1.0.0
X-Device-ID: unique-device-id
X-Platform: ios | android
```

### Push Notification Payload
```json
{
    "title": "New Like",
    "body": "john_dev liked your post",
    "data": {
        "type": "post_liked",
        "post_id": 1,
        "user_id": 2
    }
}
```

---

## 🔐 Security Considerations

1. **Rate Limiting**: Prevent abuse with throttling
2. **CORS**: Configure allowed origins
3. **CSRF**: Use tokens for state-changing operations
4. **Validation**: Validate all input data
5. **Permissions**: Check user permissions on actions
6. **Sanitization**: Sanitize user-generated content
7. **Logging**: Log sensitive operations
8. **Encryption**: Use HTTPS in production

---

## 📈 Performance Metrics

Track these metrics:
- Response time (target: < 200ms)
- Queries per request (target: < 5)
- Cache hit rate (target: > 80%)
- Error rate (target: < 0.5%)
- Uptime (target: > 99.9%)

---

## 🧩 Webhook Support (Future)

```python
# Webhook events
WEBHOOK_EVENTS = [
    'post.created',
    'post.deleted',
    'comment.added',
    'user.followed',
]

# Register webhook
def register_webhook(url, events):
    Webhook.objects.create(
        url=url,
        events=events
    )
```

---

## 📖 API Versioning

```
/api/v1/posts/
/api/v2/posts/  (future)
```

---

**API Development Guide Complete!** 

For implementation, install DRF and refer to the [Django REST Framework documentation](https://www.django-rest-framework.org/).
