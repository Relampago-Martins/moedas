from django.urls import include, path
from django.utils.translation import gettext as _
from rest_framework import routers
from moedas import views

router = routers.DefaultRouter()
router.register(r"despesas", views.DespesaViewSet, basename="despesas")
router.register(r"receitas", views.ReceitaViewSet, basename="receitas")
router.register(r"categorias", views.CategotiaViewSet, basename="categorias")

urlpatterns = [
    path("", include(router.urls)),
    path("dj-rest-auth/", include("dj_rest_auth.urls"), name="dj-rest-auth"),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "dj-rest-auth/social/google/", views.GoogleLogin.as_view(), name="google_login"
    ),
]

print(_("Welcome to my site."))
