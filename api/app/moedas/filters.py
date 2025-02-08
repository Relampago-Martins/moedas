from django.utils.timezone import now
from django_filters import rest_framework as filters

from moedas import models as moedas_models
from moedas.models.utils import TIPO


class DespesaFilter(filters.FilterSet):
    """
    Filtro para Despesas
    """

    class Meta:
        model = moedas_models.Despesa
        fields = {
            "forma_pagamento": ["exact"],
        }

    pesquisa = filters.CharFilter(method="filter_pesquisa", label="Pesquisa")
    categoria = filters.ModelChoiceFilter(
        field_name="categoria",
        queryset=moedas_models.Categoria.objects.filter(tipo="D"),
    )

    def filter_pesquisa(self, queryset, name, value):
        return queryset.filter(descricao__icontains=value)


class CategoriaFilter(filters.FilterSet):
    """
    Filtro para Categorias
    """

    class Meta:
        model = moedas_models.Categoria
        fields = {"tipo": ["exact"]}


class ReceitaFilter(filters.FilterSet):
    """
    Filtro para Receitas
    """

    class Meta:
        model = moedas_models.Receita
        fields = {}

    pesquisa = filters.CharFilter(method="filter_pesquisa", label="Pesquisa")
    categoria = filters.ModelChoiceFilter(
        field_name="categoria",
        queryset=moedas_models.Categoria.objects.filter(tipo="R"),
    )

    def filter_pesquisa(self, queryset, name, value):
        return queryset.filter(descricao__icontains=value)


class MovimentacaoFilter(filters.FilterSet):
    """
    Filtro para Movimentações
    """

    class Meta:
        model = moedas_models.Movimentacao
        fields = {}

    tipo = filters.ChoiceFilter(
        field_name="tipo",
        choices=TIPO,
    )
    categoria = filters.ModelChoiceFilter(
        field_name="categoria",
        queryset=moedas_models.Categoria.objects.all(),
    )

    ordem = filters.OrderingFilter(
        fields=(
            ("data", "data"),
            ("valor", "valor"),
        )
    )

    periodo = filters.DateFromToRangeFilter(
        method="filter_periodo", label="Período", field_name="data"
    )

    def filter_pesquisa(self, queryset, name, value):
        return queryset.filter(descricao__icontains=value)

    def filter_periodo(self, queryset, name, value):
        return queryset.filter(data__range=(value.start, value.stop))

    def __init__(self, *args, **kwargs):
        """
        Filtra as movimentações para o mês corrente caso não seja passado um período.
        """
        super().__init__(*args, **kwargs)
        request_params = kwargs.get("data", {})
        periodo_after = request_params.get("periodo_after")
        periodo_before = request_params.get("periodo_before")

        if not periodo_after and not periodo_before:
            hoje = now().date()
            self.queryset = self.queryset.filter(
                data__year=hoje.year, data__month=hoje.month
            )
