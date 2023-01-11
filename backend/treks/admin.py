from django.contrib import admin
from .models import Trek, Category, Comment


admin.site.register(Category)
admin.site.register(Trek)
admin.site.register(Comment)

admin.site.site_header = "Trek Partner Admin-board"