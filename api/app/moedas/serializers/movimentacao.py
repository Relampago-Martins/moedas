import typing

from rest_framework import serializers

from moedas.models import Categoria, Despesa, Movimentacao, Receita
from moedas.models.banco import ContaBancaria
from moedas.models.movimentacao import FORMAS_PAGAMENTO
from moedas.serializers.banco import ContaBancariaSerializer
from moedas.serializers.categoria import CategoriaSerializer
from moedas.serializers.utils import MyPrimaryKeyRelatedField


class FormaPagSerializer(serializers.ChoiceField):
    """Serializer para Formas de Pagamento"""

    def to_representation(self, value):
        return {
            "sigla": value,
            "nome": dict(FORMAS_PAGAMENTO).get(value),
        }


class MovimentacaoSerializer(serializers.ModelSerializer):
    """Serializer para Movimentações"""

    class Meta:
        model = Movimentacao
        fields = "__all__"

    categoria = MyPrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        required=True,
        serializer=CategoriaSerializer,
    )
    conta_bancaria = ContaBancariaSerializer(read_only=True)
    conta_bancaria_id = serializers.PrimaryKeyRelatedField(
        source="conta_bancaria",
        queryset=ContaBancaria.objects.all(),
        write_only=True,
        required=True,
    )
    # tipo = serializers.CharField(source="get_tipo_display")


class DespesaSerializer(MovimentacaoSerializer):
    """Serializer para Despesas."""

    class Meta:
        model = Despesa
        exclude: typing.ClassVar = ["tipo"]
        read_only_fields: typing.ClassVar = ["user", "tipo", "conta_bancaria"]

    forma_pagamento = FormaPagSerializer(choices=FORMAS_PAGAMENTO)

    def validate_categoria(self, value: Categoria) -> Categoria:
        """Valida se a categoria é do tipo Despesa."""
        if value.tipo != "D":
            msg = "A categoria deve ser do tipo Despesa"
            raise serializers.ValidationError(msg)
        return value


class ReceitaSerializer(MovimentacaoSerializer):
    """Serializer para Receitas"""

    class Meta:
        model = Receita
        exclude = ["tipo"]
        read_only_fields = ["user", "tipo"]
