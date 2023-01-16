from .models import Trek, Category,  Comment
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'name']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CurrentUserDefault()

    class Meta:
        model = Comment
        fields = ['pk', 'title', 'content', 'user', 'created']


class TrekSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, required=False)
    participants =  serializers.CurrentUserDefault()
    comments = CommentSerializer(many=True, required=False)

    class Meta:
        model = Trek
        fields = ['pk', 'name', 'description', 'category', 'location', 'length', 'image', 'created', 'updated', 'participants', 'comments']




