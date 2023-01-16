# Generated by Django 4.1.3 on 2023-01-16 12:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('treks', '0007_remove_comment_trek_trek_comments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ManyToManyField(related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]
