# Generated migration for Profile model enhancements

from django.db import migrations, models
from django.utils import timezone


class Migration(migrations.Migration):

    dependencies = [
        ('social_app', '0002_alter_post_author_alter_profile_avatar_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='joined_date',
            field=models.DateTimeField(auto_now_add=True, default=timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
