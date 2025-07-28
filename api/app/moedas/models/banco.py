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


class ContaBancaria(models.Model):
    """É uma representação simbólica de uma conta bancária do usuário.

    Serve para imitar uma conta bancária real, onde o usuário pode
    registrar transações financeiras, como depósitos e saques.
    """

    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    apelido = models.CharField(max_length=50)
    nome = models.CharField(max_length=100, choices=BANCOS_CHOICES)
    saldo = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self) -> str:
        """Retorna uma representação legível da conta bancária."""
        return f"{self.apelido} - {self.nome}"
