import typing

from rest_framework import serializers

from moedas.models.banco import Banco, ContaBancaria


class ContaBancariaSerializer(serializers.ModelSerializer):
    """Serializador para crud de ContaBancaria de um usuário."""

    class Meta:
        model = ContaBancaria
        fields: typing.ClassVar = [
            "apelido",
            "nome",
            "saldo",
            "nome_banco",
        ]

    nome = serializers.CharField(
        max_length=100,
        source="get_nome_display",
        read_only=True,
    )
    nome_banco = serializers.CharField(
        max_length=100,
        source="nome",
        write_only=True,
    )


class BancoSerializer(serializers.ModelSerializer):
    """Serializador para o modelo Banco.

    Esse serializer não deve ser usado para criação ou atualização de bancos,
    apenas para leitura.
    """

    class Meta:
        """Meta informações do serializador."""

        model = Banco
        fields: typing.ClassVar = [
            "ispb",
            "nome",
            "abreviacao",
            "foto",
        ]

    foto = serializers.ImageField(required=False, allow_null=True)
