from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Trek(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ManyToManyField(Category, related_name='treks')
    location = models.TextField()
    letgth = models.TextField()
    image_url = models.TextField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

class Comment(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    trek = models.ForeignKey(Trek, on_delete=models.CASCADE,related_name='comments', related_query_name='comment')
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='comments', related_query_name='comment')
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.title


