from django.conf import settings
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_framework import viewsets
from moedas.models import Despesa, Categoria, Receita, Movimentacao
from moedas import serializers as moedas_serializers
from moedas.filters import (
    DespesaFilter,
    CategoriaFilter,
    ReceitaFilter,
    MovimentacaoFilter,
)


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
    serializer_class = moedas_serializers.DespesaSerializer
    filterset_class = DespesaFilter
    # pagination_class = StandardResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class CategotiaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Categorias
    """

    queryset = Categoria.objects.all()
    serializer_class = moedas_serializers.CategoriaSerializer
    filterset_class = CategoriaFilter
    # pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        """
        Lista as categorias base do sistema +
        as categorias criadas pelo usuário logado
        """
        return self.queryset.filter(is_base=True)


class ReceitaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Receitas
    """

    queryset = Receita.objects.all()
    serializer_class = moedas_serializers.ReceitaSerializer
    filterset_class = ReceitaFilter
    # pagination_class = StandardResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class MovimentacaoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para Movimentações
    """

    queryset = Movimentacao.objects.all()
    serializer_class = moedas_serializers.MovimentacaoSerializer
    filterset_class = MovimentacaoFilter
    # pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
