from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api.views import create_admin_emergency # Import the view you just made

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create-admin-fix-99/', create_admin_emergency),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
