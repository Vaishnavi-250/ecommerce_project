"""
Demo Data Script for Mini Social Platform
Run with: python manage.py shell < populate_demo_data.py
"""

from django.contrib.auth.models import User
from social_app.models import Profile, Post, Comment, Follow
from django.utils import timezone
from datetime import timedelta

# Create demo users
print("Creating demo users...")

users_data = [
    {'username': 'john_dev', 'email': 'john@example.com', 'first_name': 'John', 'last_name': 'Developer'},
    {'username': 'jane_designer', 'email': 'jane@example.com', 'first_name': 'Jane', 'last_name': 'Designer'},
    {'username': 'alex_tech', 'email': 'alex@example.com', 'first_name': 'Alex', 'last_name': 'Tech'},
    {'username': 'maria_creative', 'email': 'maria@example.com', 'first_name': 'Maria', 'last_name': 'Creative'},
    {'username': 'david_innovator', 'email': 'david@example.com', 'first_name': 'David', 'last_name': 'Innovator'},
]

users = []
for user_data in users_data:
    user, created = User.objects.get_or_create(
        username=user_data['username'],
        defaults={
            'email': user_data['email'],
            'first_name': user_data['first_name'],
            'last_name': user_data['last_name'],
        }
    )
    users.append(user)
    if created:
        print(f"  ✓ Created user: {user.username}")
    else:
        print(f"  ℹ User already exists: {user.username}")

# Create profiles
print("\nCreating user profiles...")

bios = [
    "Full-stack developer passionate about Python and Django",
    "UI/UX Designer creating beautiful digital experiences",
    "Tech enthusiast and startup founder",
    "Creative artist and visual storyteller",
    "Innovation leader in digital transformation",
]

for user, bio in zip(users, bios):
    profile, created = Profile.objects.get_or_create(
        user=user,
        defaults={
            'bio': bio,
            'is_verified': user == users[0],  # Verify first user
        }
    )
    if created:
        print(f"  ✓ Created profile for: {user.username}")

# Create follow relationships
print("\nCreating follow relationships...")

follow_pairs = [
    (users[0], users[1]),
    (users[0], users[2]),
    (users[1], users[0]),
    (users[1], users[3]),
    (users[2], users[0]),
    (users[2], users[1]),
    (users[3], users[2]),
    (users[4], users[0]),
]

for follower, following in follow_pairs:
    follow, created = Follow.objects.get_or_create(
        follower=follower,
        following=following,
    )
    if created:
        print(f"  ✓ {follower.username} now follows {following.username}")

# Create posts
print("\nCreating demo posts...")

posts_data = [
    {
        'author_idx': 0,
        'content': 'Just launched my new Django REST API project! 🚀 It includes authentication, permissions, and comprehensive API documentation. Open source and ready for contributions!',
        'days_ago': 2,
    },
    {
        'author_idx': 1,
        'content': 'Excited to share my latest UI design system! 🎨 Built with modern principles and fully responsive. Check out the design tokens and component library.',
        'days_ago': 1,
    },
    {
        'author_idx': 2,
        'content': 'Just published an article on "10 Tips for Better Code Architecture" on Dev.to. Link in bio! 📝',
        'days_ago': 3,
    },
    {
        'author_idx': 3,
        'content': 'Working on an amazing digital art project combining AI and human creativity. This is the future of design! ✨',
        'days_ago': 1,
    },
    {
        'author_idx': 4,
        'content': 'Our company just crossed 1M users! 🎉 Thank you to our amazing team and community. We\'re just getting started!',
        'days_ago': 0,
    },
    {
        'author_idx': 0,
        'content': 'Tips for optimizing Django QuerySets: Use select_related() for foreign keys and prefetch_related() for reverse relations. This can improve performance by 10x!',
        'days_ago': 4,
    },
    {
        'author_idx': 1,
        'content': 'Design thinking workshop today! Learning how to solve complex problems through user-centered design. Mind blown! 🤯',
        'days_ago': 2,
    },
    {
        'author_idx': 2,
        'content': 'Python 3.11 is out! Some exciting new features for pattern matching and performance improvements. Definitely worth checking out.',
        'days_ago': 5,
    },
]

posts = []
for post_data in posts_data:
    author = users[post_data['author_idx']]
    created_at = timezone.now() - timedelta(days=post_data['days_ago'])
    
    post, created = Post.objects.get_or_create(
        author=author,
        content=post_data['content'],
        defaults={
            'created_at': created_at,
        }
    )
    posts.append(post)
    if created:
        print(f"  ✓ Created post by {author.username}")

# Add likes to posts
print("\nAdding likes to posts...")

like_data = [
    (0, [1, 2, 3, 4]),  # Post 0 liked by users 1,2,3,4
    (1, [0, 2, 4]),      # Post 1 liked by users 0,2,4
    (2, [0, 1, 3]),      # Post 2 liked by users 0,1,3
    (3, [0, 1, 2, 4]),   # Post 3 liked by users 0,1,2,4
    (4, [0, 1, 2, 3]),   # Post 4 liked by all
    (5, [1, 2, 3]),      # Post 5 liked by users 1,2,3
    (6, [0, 2, 3, 4]),   # Post 6 liked by users 0,2,3,4
    (7, [0, 1, 4]),      # Post 7 liked by users 0,1,4
]

for post_idx, liker_indices in like_data:
    post = posts[post_idx]
    for user_idx in liker_indices:
        post.likes.add(users[user_idx])
    print(f"  ✓ Added {len(liker_indices)} likes to post {post_idx + 1}")

# Create comments
print("\nCreating demo comments...")

comments_data = [
    {
        'post_idx': 0,
        'author_idx': 1,
        'content': 'This looks amazing! I\'d love to contribute to this project.',
    },
    {
        'post_idx': 0,
        'author_idx': 2,
        'content': 'Great work! The documentation is excellent.',
    },
    {
        'post_idx': 0,
        'author_idx': 3,
        'content': 'Would love to see more examples in the repository.',
    },
    {
        'post_idx': 1,
        'author_idx': 0,
        'content': 'The design system looks professional! Love the attention to detail.',
    },
    {
        'post_idx': 1,
        'author_idx': 4,
        'content': 'This is exactly what our team needed!',
    },
    {
        'post_idx': 2,
        'author_idx': 0,
        'content': 'Great article! Will definitely share with my team.',
    },
    {
        'post_idx': 3,
        'author_idx': 0,
        'content': 'This is incredible! The AI integration is impressive.',
    },
    {
        'post_idx': 3,
        'author_idx': 1,
        'content': 'Can\'t wait to see more of this project!',
    },
    {
        'post_idx': 4,
        'author_idx': 0,
        'content': 'Congratulations on the milestone! Here\'s to the next million! 🎉',
    },
    {
        'post_idx': 4,
        'author_idx': 1,
        'content': 'What an achievement! Proud to be part of this journey.',
    },
    {
        'post_idx': 5,
        'author_idx': 1,
        'content': 'These tips are game-changing. Thanks for sharing!',
    },
    {
        'post_idx': 6,
        'author_idx': 2,
        'content': 'Design thinking is such a powerful methodology!',
    },
    {
        'post_idx': 7,
        'author_idx': 1,
        'content': 'Python 3.11 is a huge upgrade. The performance improvements are real.',
    },
]

for comment_data in comments_data:
    post = posts[comment_data['post_idx']]
    author = users[comment_data['author_idx']]
    
    comment, created = Comment.objects.get_or_create(
        post=post,
        author=author,
        content=comment_data['content'],
    )
    if created:
        print(f"  ✓ Added comment by {author.username} on post by {post.author.username}")

print("\n" + "="*50)
print("✓ Demo data successfully created!")
print("="*50)
print("\nDemo Accounts Created:")
for user in users:
    print(f"  • Username: {user.username}")

print("\nYou can now:")
print("  1. Go to http://localhost:8000/ to view the dashboard")
print("  2. Use /admin/ to manage content")
print("  3. Click on users to view their profiles")
print("  4. Like and comment on posts")
