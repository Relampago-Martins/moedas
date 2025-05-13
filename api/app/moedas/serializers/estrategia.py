import typing

from rest_framework import serializers

from moedas.models.estrategia import Estrategia


class EstrategiaSerializer(serializers.ModelSerializer):
    """Serializer para a estratégia de economia."""

    class Meta:
        """Meta class para o serializer de estratégia."""

        model = Estrategia
        exclude: typing.ClassVar = ["user"]

    percentual_gastos = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        coerce_to_string=False,
    )

    percentual_reserva = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        coerce_to_string=False,
    )
    percentual_investimentos = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        coerce_to_string=False,
    )
    percentual_dividas = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        coerce_to_string=False,
    )
