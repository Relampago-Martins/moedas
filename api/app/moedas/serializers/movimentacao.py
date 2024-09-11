from rest_framework import serializers
from moedas.serializers.utils import MyPrimaryKeyRelatedField
from moedas.serializers.categoria import CategoriaSerializer
from moedas.models import Despesa, Categoria
from moedas.models.movimentacao import FORMAS_PAGAMENTO


class FormaPagSerializer(serializers.ChoiceField):
    """
    Serializer para Formas de Pagamento
    """

    def to_representation(self, value):
        return {
            "sigla": value,
            "nome": dict(FORMAS_PAGAMENTO).get(value),
        }


class DespesaSerializer(serializers.ModelSerializer):
    """
    Serializer para Despesas
    """

    class Meta:
        model = Despesa
        fields = "__all__"
        read_only_fields = ["user"]

    categoria = MyPrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), required=True, serializer=CategoriaSerializer
    )
    forma_pagamento = FormaPagSerializer(choices=FORMAS_PAGAMENTO)
