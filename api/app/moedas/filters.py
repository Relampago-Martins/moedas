from django_filters import rest_framework as filters

from moedas.models import Despesa, Categoria


class DespesaFilter(filters.FilterSet):
    """
    Filtro para Despesas
    """

    class Meta:
        model = Despesa
        fields = {
            "forma_pagamento": ["exact"],
        }

    pesquisa = filters.CharFilter(method="filter_pesquisa", label="Pesquisa")
    categoria = filters.ModelChoiceFilter(
        field_name="categoria", queryset=Categoria.objects.all()
    )

    def filter_pesquisa(self, queryset, name, value):
        return queryset.filter(descricao__icontains=value)


class CategoriaFilter(filters.FilterSet):
    """
    Filtro para Categorias
    """

    class Meta:
        model = Categoria
        fields = {"tipo": ["exact"]}
