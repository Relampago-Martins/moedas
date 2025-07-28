import typing

from rest_framework import serializers

from moedas.models.banco import ContaBancaria


class ContaBancariaSerializer(serializers.ModelSerializer):
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
