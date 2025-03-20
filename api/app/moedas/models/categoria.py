import typing

from colorfield.fields import ColorField
from django.db import models

from moedas.models.utils import TIPO
from moedas.utils.colors import (
    ColorConverter,
    ColorManager,
    ContrastColorStrategy,
    OpacityColorStrategy,
)


class Categoria(models.Model):
    """Classe para Categorias.

    Classifica as movimentações financeiras do usuário.
    """

    sigla = models.CharField(
        max_length=10,
        unique=True,
        primary_key=True,
    )
    nome = models.CharField(max_length=50)
    cor = ColorField(default="#FFFFFF")
    icone = models.CharField(
        max_length=50,
        blank=True,
        null=False,
        default="ph ph-package",
    )
    is_base = models.BooleanField(default=False)
    tipo = models.CharField(max_length=1, choices=TIPO, default="D")

    class Meta:
        """Meta options."""

        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        unique_together: typing.ClassVar = [["sigla", "tipo"]]

    def __str__(self) -> str:
        """Retorna o nome verboso."""
        return self.nome
