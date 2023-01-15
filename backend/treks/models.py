from django.db import models
from django.contrib.auth.models import User


#סוג מסלול
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


#פרטי המסלול
class Trek(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ManyToManyField(Category, related_name='treks')
    location = models.TextField()
    length = models.TextField()
    image = models.ImageField(default='1.jpg')  
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    users = models.ManyToManyField(User, related_name='treks')


#הודעות של כל מסלול ספציפי
class Comment(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    trek = models.ForeignKey(Trek, on_delete=models.CASCADE,related_name='comments', related_query_name='comment')
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='comments', related_query_name='comment')
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


