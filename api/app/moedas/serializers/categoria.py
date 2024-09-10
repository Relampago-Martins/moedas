from rest_framework import serializers
from moedas.models import Categoria


class CategoriaSerializer(serializers.ModelSerializer):
    """
    Serializer para Categorias
    """

    class Meta:
        model = Categoria
        fields = "__all__"
