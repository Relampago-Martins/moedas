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

    def filter_pesquisa(self, queryset, name, value):
        return queryset.filter(descricao__icontains=value)
