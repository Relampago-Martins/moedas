from django.db import models
from moedas.models.utils import FORMAS_PAGAMENTO, TIPO
from moedas.models.categoria import Categoria
from datetime import date


class Movimentacao(models.Model):
    """
    Classe base para movimentações financeiras de um usuário
    """

    user = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE, null=True, related_name="movimentacoes"
    )
    descricao = models.CharField(max_length=250)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, null=True, blank=False
    )
    data = models.DateField(
        default=date.today, help_text="Data da movimentação", null=True
    )
    tipo = models.CharField(max_length=1, choices=TIPO, default="D")

    def __str__(self):
        return self.descricao


class Despesa(Movimentacao):
    """
    Classe para despesas financeiras de um usuário
    """

    class Meta:
        verbose_name = "Despesa"
        verbose_name_plural = "Despesas"

    movimentacao_ptr = models.OneToOneField(
        Movimentacao, on_delete=models.CASCADE, parent_link=True, primary_key=True
    )
    forma_pagamento = models.CharField(max_length=4, choices=FORMAS_PAGAMENTO)
    pago = models.BooleanField(default=True)

    def __str__(self):
        return self.descricao

    def save(self, *args, **kwargs):
        self.tipo = "D"  # Define o tipo como Despesa
        super().save(*args, **kwargs)


class Receita(Movimentacao):
    """
    Classe para receitas financeiras de um usuário
    """

    class Meta:
        verbose_name = "Receita"
        verbose_name_plural = "Receitas"

    movimentacao_ptr = models.OneToOneField(
        Movimentacao, on_delete=models.CASCADE, parent_link=True, primary_key=True
    )

    def save(self, *args, **kwargs):
        self.tipo = "R"  # Define o tipo como Receita
        super().save(*args, **kwargs)
