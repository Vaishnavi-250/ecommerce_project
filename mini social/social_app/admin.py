from django.contrib import admin
from .models import Profile, Post, Comment, Follow


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'followers_count', 'following_count', 'posts_count', 'is_verified')
    search_fields = ('user__username', 'user__email')
    list_filter = ('is_verified', 'joined_date')
    readonly_fields = ('joined_date',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'content_preview', 'total_likes', 'comment_count', 'created_at')
    search_fields = ('author__username', 'content')
    list_filter = ('created_at', 'author')
    readonly_fields = ('created_at',)
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'
    
    def comment_count(self, obj):
        return obj.comments.count()
    comment_count.short_description = 'Comments'


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'content_preview', 'created_at')
    search_fields = ('author__username', 'post__content', 'content')
    list_filter = ('created_at', 'author')
    readonly_fields = ('created_at',)
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('follower', 'following', 'created_at')
    search_fields = ('follower__username', 'following__username')
    list_filter = ('follower', 'following')
    
    def created_at(self, obj):
        return obj.pk
    created_at.short_description = 'Followed'
