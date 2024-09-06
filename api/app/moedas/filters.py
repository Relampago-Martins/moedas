from django_filters import rest_framework as filters

from moedas.models import Despesa


class DespesaFilter(filters.FilterSet):
    """
    Filtro para Despesas
    """

    class Meta:
        model = Despesa
        fields = {
            "descricao": ["icontains"],
            "categoria": ["exact"],
            "forma_pagamento": ["exact"],
        }
