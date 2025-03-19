import typing

from rest_framework import serializers

from moedas.models import Categoria


class CategoriaSerializer(serializers.ModelSerializer):
    """Serializer para Categorias."""

    class Meta:
        """Meta options for the serializer."""

        model = Categoria
        fields: typing.ClassVar = [
            "sigla",
            "nome",
            "cor",
            "cor_texto",
            "cor_fundo",
            "icone",
            "is_base",
            "tipo",
            "total_movimentacoes",
        ]

    total_movimentacoes: float = serializers.SerializerMethodField()

    def __init__(self, *args: list, **kwargs: dict) -> None:
        """Inicializa o serializer."""
        with_total = kwargs.pop("with_total", False)
        super().__init__(*args, **kwargs)
        if not with_total:
            self.fields.pop("total_movimentacoes")

    def get_total_movimentacoes(self, obj: Categoria) -> float:
        """Retorna o total de movimentações da categoria."""
        return obj.total if hasattr(obj, "total") else 0
