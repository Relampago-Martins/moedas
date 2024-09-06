from django.conf import settings
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_framework import viewsets
from rest_framework import permissions
from moedas.models import Despesa
from moedas.serializers import DespesaSerializer
from moedas.filters import DespesaFilter


# Create your views here.
class GoogleLogin(SocialLoginView):
    """
    Google Login View (login social)
    """

    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = settings.GOOGLE_CALLBACK_URL


class DespesaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Despesas
    """

    queryset = Despesa.objects.all()
    serializer_class = DespesaSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ["descricao", "categoria", "forma_pagamento"]
    ordering_fields = ["valor", "data"]
    ordering = ["-data"]
    filter_class = DespesaFilter
    # pagination_class = StandardResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
