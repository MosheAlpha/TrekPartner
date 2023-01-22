from django.http import HttpResponse, QueryDict
from .serializers import TrekSerializer, CommentSerializer, MyUserSerializer
from .models import Trek, Comment
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


# done
@api_view(["GET"])
# @permission_classes((IsAuthenticated,))
def get_all_treks(request, trek_id=None):
    if trek_id == None:
        data = Trek.objects.all()
        deserialized_data = TrekSerializer(data, many=True)
    else:
        data = get_object_or_404(Trek, pk=trek_id)
        deserialized_data = TrekSerializer(data)
    return Response(deserialized_data.data, status=HTTP_200_OK)

# done
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


# done
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def delete_trek(request, trek_id):
    trek_to_remove = get_object_or_404(Trek, pk=trek_id)
    trek_to_remove.delete()
    return Response(status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def join_to_trek(request, trek_id):
    cur_user = request.user
    if cur_user.is_authenticated:
        cur_trek = get_object_or_404(Trek, pk=trek_id)
        cur_trek.participants.add(cur_user)
        cur_trek.save()
        return Response(status=HTTP_200_OK)
    else:
        return Response.status_code(500)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def rejoin_from_trek(request, trek_id):
    cur_user = request.user
    if cur_user.is_authenticated:
        cur_trek = get_object_or_404(Trek, pk=trek_id)
        cur_trek.participants.remove(cur_user)
        cur_trek.save()
        return Response(status=HTTP_200_OK)
    else:
        return Response.status_code(500)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_comments(request, trek_id):
    specific_trek = Trek.objects.get(id=trek_id)
    comments = specific_trek.comments.all()
    # data = Comment.objects.filter(id=trek_id)
    deserialized_data = CommentSerializer(comments, many=True)
    return Response(deserialized_data.data, status=HTTP_200_OK)

@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_user_from_id(request, user_id):
    specific_user = User.objects.filter(id=user_id).first()
    deserialized_data = MyUserSerializer(specific_user)
    return Response(deserialized_data.data, status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def add_comment(request, trek_id):
    if request.user.is_authenticated:
        data_deserialized = CommentSerializer(data=request.data)
        if data_deserialized.is_valid():
            new_item = data_deserialized.create(data_deserialized.data)
            new_item.user.add(request.user)
            new_item.save()
            cur_trek = get_object_or_404(Trek, pk=trek_id)
            cur_trek.comments.add(new_item)
            cur_trek.save()
            return Response(status=HTTP_200_OK)
        else:
            return Response.status_code(500)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def delete_comment(request, comment_id):
    comment_to_remove = get_object_or_404(Comment, pk=comment_id)
    comment_to_remove.delete()
    return Response(status=HTTP_200_OK)

