from django.db import models
from django.contrib.auth.models import User


#סוג מסלול
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


#הודעות של כל מסלול ספציפי
class Comment(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    user = models.ManyToManyField(User, related_name='comments', blank=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


#פרטי המסלול
class Trek(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ManyToManyField(Category, related_name='treks')
    location = models.TextField()
    length = models.TextField()
    image = models.TextField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    participants = models.ManyToManyField(User, related_name='treks')
    comments = models.ManyToManyField(Comment, related_name='treks')




