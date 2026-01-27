from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('profile/<int:user_id>/', views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('post/<int:post_id>/', views.post_detail, name='post_detail'),
    path('post/create/', views.create_post, name='create_post'),
]
