import typing

from rest_framework import serializers

from moedas.models.estrategia import OrcamentoMensal


class OrcamentoSerializer(serializers.ModelSerializer):
    """Serializer para o orçamento."""

    class Meta:
        """Meta class para o serializer."""

        model = OrcamentoMensal
        exclude: typing.ClassVar = ["user"]

    limite_gastos = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        coerce_to_string=False,
    )

    salario = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        coerce_to_string=False,
    )
