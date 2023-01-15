from .models import Trek, Category,  Comment
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'name']


class TrekSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, required=False)
    users =  serializers.PrimaryKeyRelatedField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Trek
        fields = ['pk', 'name', 'description', 'category', 'location', 'length', 'image', 'created', 'updated', 'users']




class CommentSerializer(serializers.ModelSerializer):
    trek = TrekSerializer(many=True, required=True)
    user = TrekSerializer(many=True, required=True)
    class Meta:
        model = Comment
        fields = ['pk', 'title', 'content', 'trek', 'user', 'created']

