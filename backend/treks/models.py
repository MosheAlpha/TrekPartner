from django.db import models
from django.contrib.auth.models import User

# ****Here we should add all models that we need****
# ********   



# Here the examples from my previous code. Use it for our project!   
class Company(models.Model):
    name = models.CharField(max_length=255)
    url = models.TextField()

    def __str__(self):
        return self.name


class Dosage(models.Model):
    dose = models.CharField(max_length=255)

    def __str__(self):
        return self.dose


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name



class Medicine(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ManyToManyField(Category, related_name='medicines')
    company = models.ManyToManyField(
        Company,  related_name='medicines', related_query_name='medicine')
    dosage = models.ManyToManyField(
        Dosage,  related_name='medicines', related_query_name='medicine')
    price = models.DecimalField(max_digits=9, decimal_places=2)
    url = models.TextField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.name


class Comment(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE,
                                 related_name='comments', related_query_name='comment')
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='comments', related_query_name='comment')
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.title


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    products = models.ManyToManyField(Medicine, related_name='cart', blank=True)

    def __str__(self):
        return self.user.first_name
