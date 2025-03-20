import typing

from rest_framework import serializers

from moedas.models import Categoria
from moedas.utils.colors import (
    ColorManager,
    ContrastColorStrategy,
    OpacityColorStrategy,
)


class CorSerializer(serializers.Serializer):
    """Serializer para cores."""

    principal = serializers.SerializerMethodField()
    texto = serializers.SerializerMethodField()
    fundo = serializers.SerializerMethodField()
    fundo_com_opacidade = serializers.SerializerMethodField()

    def __init__(self, *args: list, **kwargs: dict) -> None:
        """Inicializa o serializer."""
        super().__init__(*args, **kwargs)

    def get_principal(self, cor: str) -> str:
        """Retorna a cor principal."""
        return cor

    def get_texto(self, cor: str) -> str:
        """Retorna a cor do texto com base na cor de fundo."""
        color_manager = ColorManager(
            ContrastColorStrategy(),
        )
        return color_manager.get_text_color(cor)

    def get_fundo(self, cor: str) -> str:
        """Retorna a cor de fundo com base na cor."""
        color_manager = ColorManager(
            ContrastColorStrategy(),
        )
        return color_manager.get_background_color(cor)

    def get_fundo_com_opacidade(self, cor: str) -> str:
        """Retorna a cor com opacidade.

        Front usa essa versão para o dark mode.
        """
        color_manager = ColorManager(
            OpacityColorStrategy(),
        )
        return color_manager.get_background_color(cor)


class CategoriaSerializer(serializers.ModelSerializer):
    """Serializer para Categorias."""

    class Meta:
        """Meta options for the serializer."""

        model = Categoria
        fields: typing.ClassVar = [
            "sigla",
            "nome",
            "cor",
            "icone",
            "is_base",
            "tipo",
            "total_movimentacoes",
        ]

    total_movimentacoes: float = serializers.SerializerMethodField()
    cor = CorSerializer()

    def __init__(self, *args: list, **kwargs: dict) -> None:
        """Inicializa o serializer."""
        with_total = kwargs.pop("with_total", False)
        super().__init__(*args, **kwargs)
        if not with_total:
            self.fields.pop("total_movimentacoes")

    def get_total_movimentacoes(self, obj: Categoria) -> float:
        """Retorna o total de movimentações da categoria."""
        return obj.total if hasattr(obj, "total") else 0
