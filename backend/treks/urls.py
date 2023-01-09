from django.urls import path

from . import views


urlpatterns = [
    path('getAllTreks/', views.get_all_treks),
    path('getAllTreks/<int:id>/', views.get_all_treks),# should add also filters
    path('addTrek/', views.add_trek),
    path('deleteTrek/', views.delete_trek),

    path('joinToTrek/<int:trek_id>/', views.join_to_trek),
    path('rejoinFromTrek/<int:trek_id>/', views.rejoin_from_trek),

    path('getComments/<int:trek_id>/', views.get_comments),
    path('addComment/<int:comment_id>/', views.add_comment),
    path('deleteComment/<int:comment_id>/', views.delete_comment),

    #You can add more urls if you need to. I added the basic ones

]
