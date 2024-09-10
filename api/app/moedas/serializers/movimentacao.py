from rest_framework import serializers
from moedas.serializers.categoria import CategoriaSerializer
from moedas.models import Despesa
from moedas.models.movimentacao import FORMAS_PAGAMENTO


class FormaPagSerializer(serializers.CharField):
    """
    Serializer para Formas de Pagamento
    """

    def to_representation(self, value):
        return {
            "value": value,
            "label": dict(FORMAS_PAGAMENTO).get(value),
        }


class DespesaSerializer(serializers.ModelSerializer):
    """
    Serializer para Despesas
    """

    class Meta:
        model = Despesa
        fields = "__all__"
        read_only_fields = ["user"]

    categoria = CategoriaSerializer()
    forma_pagamento = FormaPagSerializer()
