from .models import Trek, Category,  Comment
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'name']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CurrentUserDefault()

    class Meta:
        model = Comment
        fields = ['pk', 'title', 'content', 'user', 'created']


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'email', 'first_name', 'last_name']



class TrekSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, required=False)
    participants =  serializers.CurrentUserDefault()
    comments = CommentSerializer(many=True, required=False)

    class Meta:
        model = Trek
        fields = ['pk', 'name', 'description', 'category', 'location', 'length', 'image', 'created', 'updated', 'participants', 'comments']




