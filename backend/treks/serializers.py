from .models import Trek, Category,  Comment
from rest_framework import serializers

# ****Here we should add all serializers that we need****



# Here the examples from my previous code. Use it for our project! 
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'name']



# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'


# class DosageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Dosage
#         fields = '__all__'


# class CompanySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Company
#         fields = '__all__'


# class TrekSerializer(serializers.ModelSerializer):
#     category = CategorySerializer(many=True, required=False)
#     dosage = DosageSerializer(many=True, required=False)
#     comments = CommentSerializer(many=True, required=False)
#     company = CompanySerializer(many=True, required=False)

#     class Meta:
#         model = Trek
#         fields = ['pk', 'name', 'category', 'description',
#                   'dosage', 'comments', 'image', 'company', 'price', 'url', 'created', 'updated']

#     def create(self, validated_data):
#         return Trek.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         instance.email = validated_data.get('email', instance.email)
#         instance.title = validated_data.get('description', instance.title)
#         instance.save()
#         return instance

# class CartSerializer(serializers.ModelSerializer):
#     products = TrekSerializer(many=True, required=False)
    
#     class Meta:
#         model = Cart
#         fields = '__all__'

#     def create(self, validated_data):
#         return Cart.objects.create(**validated_data)

