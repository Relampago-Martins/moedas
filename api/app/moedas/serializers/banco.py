import typing

from rest_framework import serializers

from moedas.models.banco import Banco, ContaBancaria


class BancoSerializer(serializers.ModelSerializer):
    """Serializador para o modelo Banco.

    Esse serializer não deve ser usado para criação ou atualização de bancos,
    apenas para leitura.
    """

    class Meta:
        """Meta informações do serializador."""

        model = Banco
        fields: typing.ClassVar = [
            "id",
            "ispb",
            "nome",
            "abreviacao",
            "foto",
        ]

    foto = serializers.ImageField(required=False, allow_null=True)


class ContaBancariaSerializer(serializers.ModelSerializer):
    """Serializador para crud de ContaBancaria de um usuário."""

    class Meta:
        model = ContaBancaria
        fields: typing.ClassVar = [
            "id",
            "apelido",
            "saldo",
            "banco",
            "banco_id",  # Usado para escrita
        ]

    banco = BancoSerializer(read_only=True)
    banco_id = serializers.PrimaryKeyRelatedField(
        source="banco",
        queryset=Banco.objects.all(),
        write_only=True,
        required=True,
    )
