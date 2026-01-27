# Generated migration for Post image field

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_app', '0003_profile_joined_date_profile_is_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='posts/'),
        ),
    ]
