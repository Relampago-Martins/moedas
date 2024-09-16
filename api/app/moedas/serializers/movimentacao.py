from rest_framework import serializers
from moedas.serializers.utils import MyPrimaryKeyRelatedField
from moedas.serializers.categoria import CategoriaSerializer
from moedas.models import Despesa, Categoria, Receita, Movimentacao
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


class MovimentacaoSerializer(serializers.ModelSerializer):
    """
    Serializer para Movimentações
    """

    class Meta:
        model = Movimentacao
        fields = "__all__"

    categoria = MyPrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), required=True, serializer=CategoriaSerializer
    )
    # tipo = serializers.CharField(source="get_tipo_display")


class DespesaSerializer(serializers.ModelSerializer):
    """
    Serializer para Despesas
    """

    class Meta:
        model = Despesa
        exclude = ["tipo"]
        read_only_fields = ["user", "tipo"]

    categoria = MyPrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), required=True, serializer=CategoriaSerializer
    )
    forma_pagamento = FormaPagSerializer(choices=FORMAS_PAGAMENTO)


class ReceitaSerializer(serializers.ModelSerializer):
    """
    Serializer para Receitas
    """

    class Meta:
        model = Receita
        exclude = ["tipo"]
        read_only_fields = ["user", "tipo"]

    categoria = MyPrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), required=True, serializer=CategoriaSerializer
    )
