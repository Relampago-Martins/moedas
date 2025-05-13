from django.db import models


class Estrategia(models.Model):
    """Model para armazenar distribuição da renda de um usuário."""

    user = models.ForeignKey(
        "auth.User",
        on_delete=models.CASCADE,
        related_name="estrategia",
    )

    percentual_gastos = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Percentual de gastos",
    )

    percentual_investimentos = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Percentual de investimentos",
    )

    percentual_dividas = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Percentual para pagamento de dívidas",
    )

    percentual_reserva = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name="Percentual para reserva de emergência",
    )

    def __str__(self) -> str:
        """Retorna uma representação em string do objeto."""
        return f"Estrategia de {self.user.username}"
