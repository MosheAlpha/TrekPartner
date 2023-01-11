from django.contrib import admin
from .models import Medicine, Category, Company, Comment, Dosage, Cart


admin.site.register(Company)
admin.site.register(Dosage)
admin.site.register(Category)
admin.site.register(Medicine)
admin.site.register(Comment)
admin.site.register(Cart)

admin.site.site_header = "Trek Partner Admin-board"