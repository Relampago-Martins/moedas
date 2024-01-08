from django.urls import include, path
from rest_framework import routers
router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('dj-rest-auth/', include('dj_rest_auth.urls'), name='dj-rest-auth'),
]
