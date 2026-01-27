from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.db.models import Count, Q
from django.contrib import messages
from .models import Profile, Post, Comment, Follow
from .forms import RegisterForm, PostForm, ProfileForm
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


def register(request):
    """User registration view"""
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, 'Account created successfully! Please log in.')
            return redirect('login')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
    else:
        form = RegisterForm()
    
    return render(request, 'register.html', {'form': form})


def home(request):
    """Enhanced dashboard with analytics and trending content"""
    
    # Get all posts ordered by recent
    posts = Post.objects.all().order_by('-created_at')
    
    # Get trending posts (by likes and comments)
    trending_posts = Post.objects.annotate(
        total_engagement=Count('likes') + Count('comments')
    ).order_by('-total_engagement')[:5]
    
    # Get top users by followers
    top_users = User.objects.annotate(
        followers_count=Count('followers')
    ).order_by('-followers_count')[:6]
    
    # Get recent activity
    recent_comments = Comment.objects.select_related('post', 'author').order_by('-created_at')[:5]
    
    # Calculate stats
    total_posts = Post.objects.count()
    total_users = User.objects.count()
    total_comments = Comment.objects.count()
    
    # Get user stats if authenticated
    user_stats = None
    if request.user.is_authenticated:
        user_posts = request.user.posts.count()
        user_followers = request.user.followers.count()
        user_following = request.user.following.count()
        user_stats = {
            'posts': user_posts,
            'followers': user_followers,
            'following': user_following
        }
    
    context = {
        'posts': posts,
        'trending_posts': trending_posts,
        'top_users': top_users,
        'recent_comments': recent_comments,
        'total_posts': total_posts,
        'total_users': total_users,
        'total_comments': total_comments,
        'user_stats': user_stats,
    }
    
    return render(request, 'home.html', context)


@login_required(login_url='login')
def create_post(request):
    """Create a new post with optional image"""
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            messages.success(request, 'Post created successfully!')
            return redirect('home')
    else:
        form = PostForm()
    
    return render(request, 'create_post.html', {'form': form})


def profile(request, user_id):
    """Enhanced user profile with statistics and actions"""
    user = get_object_or_404(User, id=user_id)
    posts = Post.objects.filter(author=user).order_by('-created_at')
    
    # Get profile stats
    followers_count = user.followers.count()
    following_count = user.following.count()
    posts_count = posts.count()
    
    # Check if current user follows this user
    is_following = False
    if request.user.is_authenticated:
        is_following = Follow.objects.filter(
            follower=request.user,
            following=user
        ).exists()
    
    # Get user's most liked post
    most_liked_post = posts.annotate(
        likes_count=Count('likes')
    ).order_by('-likes_count').first()
    
    context = {
        'user_profile': user,
        'posts': posts,
        'followers_count': followers_count,
        'following_count': following_count,
        'posts_count': posts_count,
        'is_following': is_following,
        'most_liked_post': most_liked_post,
    }
    
    return render(request, 'profile.html', context)


@login_required(login_url='login')
def edit_profile(request):
    """Edit user profile"""
    profile = request.user.profile
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile', user_id=request.user.id)
    else:
        form = ProfileForm(instance=profile)
    
    return render(request, 'edit_profile.html', {'form': form})


def post_detail(request, post_id):
    """Enhanced post detail view with comments and interactions"""
    post = get_object_or_404(Post, id=post_id)
    
    if request.method == 'POST' and request.user.is_authenticated:
        content = request.POST.get('comment')
        if content:
            Comment.objects.create(
                post=post,
                author=request.user,
                content=content
            )
            return redirect('post_detail', post_id=post.id)
    
    # Get comments with author info
    comments = post.comments.select_related('author').order_by('-created_at')
    
    # Check if current user liked this post
    user_liked = False
    if request.user.is_authenticated:
        user_liked = post.likes.filter(id=request.user.id).exists()
    
    context = {
        'post': post,
        'comments': comments,
        'user_liked': user_liked,
    }
    
    return render(request, 'post_detail.html', context)
