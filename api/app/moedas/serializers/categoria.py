from rest_framework import serializers
from moedas.models import Categoria
from django.db.models import Sum


class CategoriaSerializer(serializers.ModelSerializer):
    """
    Serializer para Categorias
    """

    class Meta:
        model = Categoria
        fields = "__all__"

    total_gastos = serializers.SerializerMethodField(read_only=True)
    total_receitas = serializers.SerializerMethodField(read_only=True)

    def get_total_gastos(self, obj):
        total_gastos = None
        if self.context.get("request"):
            user = self.context["request"].user
            total_gastos = obj.movimentacao_set.filter(tipo="D", user=user).aggregate(
                total=Sum("valor")
            )["total"]

        return total_gastos or 0

    def get_total_receitas(self, obj):
        total_receitas = None
        if self.context.get("request"):
            user = self.context["request"].user
            total_receitas = obj.movimentacao_set.filter(tipo="R", user=user).aggregate(
                total=Sum("valor")
            )["total"]

        return total_receitas or 0


class CategoriaPKRelatedField(serializers.PrimaryKeyRelatedField):
    """
    This is a custom PrimaryKeyRelatedField that
    renders minimal data for the Categoria model.
    """

    def __init__(self, **kwargs):
        queryset = Categoria.objects.all()
        super().__init__(queryset=queryset, **kwargs)

    def to_representation(self, value):
        obj = self.get_queryset().get(pk=value)
        return {
            "sigla": obj.sigla,
            "nome": obj.nome,
        }
