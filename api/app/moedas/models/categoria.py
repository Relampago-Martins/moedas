from colorfield.fields import ColorField
from django.db import models
from moedas.models.utils import TIPO


class Categoria(models.Model):
    """
    Classe para Categorias
    """

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        unique_together = [["sigla", "tipo"]]

    sigla = models.CharField(max_length=10, unique=True, primary_key=True)
    nome = models.CharField(max_length=50)
    cor = ColorField(default="#FFFFFF")
    icone = models.CharField(max_length=50, blank=True, null=True)
    is_base = models.BooleanField(default=False)
    tipo = models.CharField(max_length=1, choices=TIPO, default="D")

    def __str__(self):
        return self.nome
