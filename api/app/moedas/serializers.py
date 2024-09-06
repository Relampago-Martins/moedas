from rest_framework import serializers
from moedas.models import Despesa


class DespesaSerializer(serializers.ModelSerializer):
    """
    Serializer para Despesas
    """

    class Meta:
        model = Despesa
        fields = "__all__"
        read_only_fields = ["user"]
