from django.urls import path

from . import views


urlpatterns = [
    path('getAllTreks/', views.get_all_treks),
    path('getAllTreks/<int:trek_id>/', views.get_all_treks),# should add also filters
    path('addTrek/', views.add_trek),
    path('deleteTrek/<int:trek_id>/', views.delete_trek),

    path('joinToTrek/<int:trek_id>/', views.join_to_trek),
    path('rejoinFromTrek/<int:trek_id>/', views.rejoin_from_trek),

    path('getComments/<int:trek_id>/', views.get_comments),
    path('addComment/<int:trek_id>/', views.add_comment),
    path('deleteComment/<int:trek_id>/<int:comment_id>/', views.delete_comment),


]
