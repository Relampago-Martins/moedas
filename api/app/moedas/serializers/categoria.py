from django.contrib.auth.models import User
from django.db.models import Q, Sum
from rest_framework import serializers

from moedas.models import Categoria


class CategoriaSerializer(serializers.ModelSerializer):
    """Serializer para Categorias."""

    class Meta:
        """Meta options for the serializer."""

        model = Categoria
        fields = "__all__"


class ResumoMinhasCategorias(serializers.Serializer):
    """Serializer com métricas sobre as categorias do usuário.

    Lista de categorias de um usuário com:
    - Total de despesas
    - Total de receitas
    """

    total_despesas = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_receitas = serializers.DecimalField(max_digits=10, decimal_places=2)

    def __init__(self, user: User, *args: list, **kwargs: dict) -> None:
        """Inicializa o serializer."""
        categorias = (
            Categoria.objects.filter(user=user)
            .annotate(
                total=Sum("movimentacao__valor"),
            )
            .filter(total__gt=0)
            .order_by(
                "total",
            )
        )
        super().__init__(
            *args,
            {
                "many": True,
                "data": categorias,
                **kwargs,
            },
        )

    def get_total_despesas(self, obj: Categoria) -> float:
        """Retorna o total de despesas do usuário."""
        total_despesas = None
        if self.context.get("request"):
            user = self.context["request"].user
            total_despesas = obj.movimentacao_set.filter(tipo="D", user=user).aggregate(
                total=Sum("valor"),
            )["total"]

        return total_despesas or 0

    def get_total_receitas(self, obj: Categoria) -> float:
        """Retorna o total de receitas do usuário."""
        total_receitas = None
        if self.context.get("request"):
            user = self.context["request"].user
            total_receitas = obj.movimentacao_set.filter(tipo="R", user=user).aggregate(
                total=Sum("valor"),
            )["total"]

        return total_receitas or 0
