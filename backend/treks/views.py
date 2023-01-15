from django.http import HttpResponse
from .serializers import TrekSerializer, CommentSerializer
from .models import Trek, Comment
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_all_treks(request, trek_id=None):
    if trek_id == None:
        data = Trek.objects.all()
        deserialized_data = TrekSerializer(data, many=True)
    else:
        data = get_object_or_404(Trek, pk=trek_id)
        deserialized_data = TrekSerializer(data)
    return Response(deserialized_data.data, status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def add_trek(request):
    data_deserialized = TrekSerializer(data=request.data)
    if data_deserialized.is_valid():
        new_item = data_deserialized.create(data_deserialized.data)
        new_item.save()
        return Response(data_deserialized.data, status=200)
    else:
        return Response.status_code(500)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def delete_trek(request, trek_id):
    trek_to_remove = get_object_or_404(Trek, pk=trek_id)
    trek_to_remove.delete()
    return Response(status=HTTP_200_OK)
    


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def join_to_trek(request, trek_id):
    if request.user.is_authenticated:
        cur_user = request.user
        cur_trek = get_object_or_404(Trek, pk=trek_id)
        cur_trek
        return Response(status=HTTP_200_OK)
    else:
        return Response.status_code(500)


@api_view([""])
@permission_classes((IsAuthenticated,))
def rejoin_from_trek(request):
    pass


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_comments(request, trek_id):
    data = Comment.objects.filter(trek__id=trek_id)
    deserialized_data = CommentSerializer(data, many=True)
    return Response(deserialized_data.data, status=HTTP_200_OK)


@api_view([""])
@permission_classes((IsAuthenticated,))
def add_comment(request):
    pass


@api_view([""])
@permission_classes((IsAuthenticated,))
def delete_comment(request):
    pass

# till here


# Here the examples from my previous code. Use it for our project!
# @api_view(["GET"])
# @permission_classes((IsAuthenticated,))
# def get_all_Treks(request, id=None):
#     if id == None:
#         data = Trek.objects.all()
#         deserialized_data = TrekSerializer(data, many=True)
#     else:
#         data = get_object_or_404(Trek, pk=id)
#         deserialized_data = TrekSerializer(data)
#     return Response(deserialized_data.data, status=HTTP_200_OK)


# @api_view(["GET"])
# @permission_classes((IsAuthenticated,))
# def get_all_images(request):
#     data = Image.objects.all()
#     deserialized_data = ImageSerializer(data, many=True)
#     return Response(deserialized_data.data, status=HTTP_200_OK)


# @api_view(["POST"])
# @permission_classes((IsAuthenticated,))
# def add_to_cart(request, product_id):
#     our_user = get_object_or_404(User, pk=request.user.id)
#     Trek = get_object_or_404(Trek, pk=product_id)

#     if our_user.cart:
#         our_user.cart.products.add(Trek)
#     else:
#         Cart.objects.create(our_user, Trek)

#     user_cart = our_user.cart
#     user_cart.save()

#     return Response(status=HTTP_200_OK)


# @api_view(["POST"])
# @permission_classes((IsAuthenticated,))
# def remove_from_cart(request, product_id):
#     our_user = get_object_or_404(User, pk=request.user.id)
#     Trek = get_object_or_404(Trek, pk=product_id)

#     if our_user.cart:
#         our_user.cart.products.remove(Trek)

#     user_cart = our_user.cart
#     user_cart.save()
#     return Response(status=HTTP_200_OK)


# @api_view(["GET"])
# @permission_classes((IsAuthenticated,))
# def get_user_cart(request):
#     data = get_object_or_404(Cart, user=request.user.id)
#     deserialized_data = CartSerializer(data)
#     return Response(deserialized_data.data, status=HTTP_200_OK)
