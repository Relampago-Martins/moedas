from django.db import models
from datetime import date

CATEGORIAS_DESPESA = (
    ("A", "Alimentação"),
    ("E", "Educação"),
    ("ELET", "Eletrônicos"),
    ("L", "Lazer"),
    ("M", "Moradia"),
    ("S", "Saúde"),
    ("T", "Transporte"),
    ("O", "Outros"),
    ("V", "Vestuário"),
    ("SERV", "Serviços"),
)

CATEGORIAS_RECEITA = (
    ("S", "Salário"),
    ("O", "Outros"),
)

TIPO_MOVIMENTACAO = [
    ("D", "Despesa"),
    ("R", "Receita"),
]

FORMAS_PAGAMENTO = [
    ("din", "Dinheiro"),
    ("deb", "Cartão de Débito"),
    ("cre", "Cartão de Crédito"),
    ("pix", "Pix"),
    ("out", "Outros"),
]


class Movimentacao(models.Model):
    """
    Classe base para movimentações financeiras de um usuário
    """

    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, null=True)
    descricao = models.CharField(max_length=250)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField(
        default=date.today, help_text="Data da movimentação", null=True
    )

    def __str__(self):
        return self.nome


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
    categoria = models.CharField(max_length=4, choices=CATEGORIAS_DESPESA)
    forma_pagamento = models.CharField(max_length=4, choices=FORMAS_PAGAMENTO)

    def __str__(self):
        return self.nome

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
    categoria = models.CharField(max_length=1, choices=CATEGORIAS_RECEITA)

    def save(self, *args, **kwargs):
        self.tipo = "R"  # Define o tipo como Receita
        super().save(*args, **kwargs)
