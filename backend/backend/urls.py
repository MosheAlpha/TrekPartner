from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', lambda request: redirect('admin/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/', include('treks.urls')),
    path('auth/', include('auth.urls'))
    # path('', include(('sampleapp.urls'), namespace='sampleapp'))

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
