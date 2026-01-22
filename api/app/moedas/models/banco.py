from decimal import Decimal

from django.db import models

BANCOS_CHOICES = [
    ("001", "Banco do Brasil"),
    ("033", "Santander"),
    ("104", "Caixa Econômica Federal"),
    ("237", "Bradesco"),
    ("341", "Itaú Unibanco"),
    ("399", "HSBC"),
    ("745", "Citibank"),
    ("756", "Bancoob"),
    ("104", "Caixa Econômica Federal"),
    ("070", "Banco Inter"),
]


class Banco(models.Model):
    """Modelo para representar um banco."""

    ispb = models.CharField(
        max_length=8,
        unique=True,
        help_text="Identificador do Sistema de Pagamentos Brasileiro",
    )
    nome = models.CharField(max_length=200)
    abreviacao = models.CharField(max_length=100)
    foto = models.ImageField(
        upload_to="bancos/",
        null=True,
        blank=True,
        help_text="Foto do banco, opcional.",
    )

    def __str__(self) -> str:
        """Retorna o nome do banco."""
        return self.nome


class ContaBancaria(models.Model):
    """É uma representação simbólica de uma conta bancária do usuário.

    Serve para imitar uma conta bancária real, onde o usuário pode
    registrar transações financeiras, como depósitos e saques.
    """

    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    apelido = models.CharField(max_length=50)
    nome = models.CharField(
        max_length=100,
        choices=BANCOS_CHOICES,
        default="001",
        blank=True,
    )
    banco = models.ForeignKey(
        "Banco",
        on_delete=models.CASCADE,
        related_name="contas_bancarias",
        null=True,
        blank=False,
    )
    saldo = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))

    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        """Retorna uma representação legível da conta bancária."""
        return f"{self.apelido} - {self.nome}"
