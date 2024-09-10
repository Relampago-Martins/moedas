from django.urls import include, path
from django.utils.translation import gettext as _
from rest_framework import routers
from moedas.views import GoogleLogin, DespesaViewSet, CategotiaViewSet

router = routers.DefaultRouter()
router.register(r"despesas", DespesaViewSet, basename="despesas")
router.register(r"categorias", CategotiaViewSet, basename="categorias")

urlpatterns = [
    path("", include(router.urls)),
    path("dj-rest-auth/", include("dj_rest_auth.urls"), name="dj-rest-auth"),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("dj-rest-auth/social/google/", GoogleLogin.as_view(), name="google_login"),
]

print(_("Welcome to my site."))
