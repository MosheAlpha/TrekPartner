from .serializers import MedicineSerializer, CartSerializer
from .models import Medicine, Image, Cart
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


# ****Here we should add all functions that we need****
@api_view([""])
@permission_classes((IsAuthenticated,))
def get_all_treks(request, id=None):
    if id == None:
        data = Treks.objects.all()
        deserialized_data = TreksSerializer(data, many=True)
    else:
        data = get_object_or_404(Treks, pk=id)
        deserialized_data = TreksSerializer(data)
    return Response(deserialized_data.data, status=HTTP_200_OK)


@api_view([""])
@permission_classes((IsAuthenticated,))
def add_trek(request):
    pass


@api_view([""])
@permission_classes((IsAuthenticated,))
def delete_trek(request):
    pass


@api_view([""])
@permission_classes((IsAuthenticated,))
def join_to_trek(request):
    pass


@api_view([""])
@permission_classes((IsAuthenticated,))
def rejoin_from_trek(request):
    pass


@api_view([""])
@permission_classes((IsAuthenticated,))
def get_comments(request):
    pass


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
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_all_medicines(request, id=None):
    if id == None:
        data = Medicine.objects.all()
        deserialized_data = MedicineSerializer(data, many=True)
    else:
        data = get_object_or_404(Medicine, pk=id)
        deserialized_data = MedicineSerializer(data)
    return Response(deserialized_data.data, status=HTTP_200_OK)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_all_images(request):
    data = Image.objects.all()
    deserialized_data = ImageSerializer(data, many=True)
    return Response(deserialized_data.data, status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def add_to_cart(request, product_id):
    our_user = get_object_or_404(User, pk=request.user.id)
    medicine = get_object_or_404(Medicine, pk=product_id)

    if our_user.cart:
        our_user.cart.products.add(medicine)
    else:
        Cart.objects.create(our_user, medicine)

    user_cart = our_user.cart
    user_cart.save()

    return Response(status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def remove_from_cart(request, product_id):
    our_user = get_object_or_404(User, pk=request.user.id)
    medicine = get_object_or_404(Medicine, pk=product_id)

    if our_user.cart:
        our_user.cart.products.remove(medicine)

    user_cart = our_user.cart
    user_cart.save()
    return Response(status=HTTP_200_OK)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_user_cart(request):
    data = get_object_or_404(Cart, user=request.user.id)
    deserialized_data = CartSerializer(data)
    return Response(deserialized_data.data, status=HTTP_200_OK)
