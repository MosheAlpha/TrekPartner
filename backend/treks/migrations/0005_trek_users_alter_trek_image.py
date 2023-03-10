# Generated by Django 4.1.3 on 2023-01-16 09:06

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('treks', '0004_alter_trek_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='trek',
            name='users',
            field=models.ManyToManyField(related_name='treks', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='trek',
            name='image',
            field=models.ImageField(default='1.jpg', upload_to=''),
        ),
    ]
