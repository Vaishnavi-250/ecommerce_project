from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    bio = models.TextField(blank=True)
    avatar = models.ImageField(
        upload_to='avatars/',
        blank=True,
        null=True
    )
    joined_date = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    def followers_count(self):
        return self.user.followers.count()

    def following_count(self):
        return self.user.following.count()

    def posts_count(self):
        return self.user.posts.count()


class Post(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    content = models.TextField()
    image = models.ImageField(
        upload_to='posts/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        User,
        related_name='liked_posts',
        blank=True
    )

    def __str__(self):
        return f"{self.author.username}'s post"

    def total_likes(self):
        return self.likes.count()


class Comment(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username}"


class Follow(models.Model):
    follower = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='following'
    )
    following = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='followers'
    )

    class Meta:
        unique_together = ('follower', 'following')

    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"
