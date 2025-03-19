from __future__ import annotations

from datetime import date
from urllib.request import Request

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from django.db.models import Q, Sum
from rest_framework import views, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from moedas import serializers as moedas_serializers
from moedas.filters import (
    CategoriaFilter,
    DespesaFilter,
    MovimentacaoFilter,
    ReceitaFilter,
)
from moedas.models import Categoria, Despesa, Movimentacao, Receita


# Create your views here.
class GoogleLogin(SocialLoginView):
    """Google Login View (login social)."""

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


class CategoriaViewSet(viewsets.ModelViewSet):
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

    @action(detail=False, methods=["get"], url_path="total-movimentacoes")
    def total_movimentacoes(self, request: Request) -> Response:
        """View que retorna o total de movimentações por categoria.

        @filtros:
        - periodo_after: data de início do filtro (yyyy-mm-dd)
        - periodo_before: data de fim do filtro (yyyy-mm-dd)
        - tipo: tipo de movimentação (R ou D)
        """
        periodo_after = request.query_params.get("periodo_after")
        periodo_before = request.query_params.get("periodo_before")
        tipo = request.query_params.get("tipo")

        categorias = (
            Categoria.objects.annotate(
                total=Sum(
                    "movimentacao__valor",
                    filter=Q(
                        movimentacao__user=request.user,
                    )
                    & self._get_filtros_total_movs(
                        periodo_after,
                        periodo_before,
                        tipo=tipo,
                    ),
                ),
            )
            .filter(total__gt=0)
            .order_by(
                "-total",
            )
        )
        resumo_categorias = moedas_serializers.CategoriaSerializer(
            categorias,
            with_total=True,
            many=True,
        )

        return Response(
            resumo_categorias.data,
            status=200,
        )

    def _get_filtros_total_movs(
        self,
        periodo_after: str | None,
        periodo_before: str | None,
        tipo: str | None,
    ) -> Q:
        qs = Q()
        if periodo_after:
            qs &= Q(movimentacao__data__gte=periodo_after)
        if periodo_before:
            qs &= Q(movimentacao__data__lte=periodo_before)
        if tipo:
            qs &= Q(movimentacao__tipo=tipo)
        if not periodo_after and not periodo_before:
            hoje = date.today()
            qs &= Q(
                movimentacao__data__month=hoje.month,
                movimentacao__data__year=hoje.year,
            )
        return qs


class ReceitaViewSet(viewsets.ModelViewSet):
    """ViewSet para Receitas."""

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
        return self.queryset.filter(user=self.request.user).order_by("-data")


class CarteiraView(views.APIView):
    """View para retornar o saldo da carteira."""

    def get(self, request: Request) -> Response:
        """Agregar em um local as informações financeiras de um usuário.

        - Saldo em conta
        - Diferença percentual do saldo em conta em relação ao mês anterior
        - Total de despesas
        - Total de receitas
        """
        periodo_after = request.query_params.get("periodo_after")
        periodo_before = request.query_params.get("periodo_before")

        carteira_serializer = moedas_serializers.CarteiraSerializer(
            user=request.user,
            periodo_after=periodo_after,
            periodo_before=periodo_before,
        )

        return Response(
            carteira_serializer.data,
            status=200,
        )
