import typing
from decimal import Decimal

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.forms import ValidationError


class Estrategia(models.Model):
    """Model para armazenar distribuição da renda de um usuário.

    Por enquanto está ingessado em 4 percentuais.

    TODO: A ideia é mudar este model para
    um modelo mais flexível, onde o usuário pode criar quantos percentuais quiser,
    quais quiser.
    """

    user = models.ForeignKey(
        "auth.User",
        on_delete=models.CASCADE,
        related_name="estrategia",
    )

    percentual_gastos = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Percentual de gastos",
    )

    percentual_investimentos = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Percentual de investimentos",
    )

    percentual_dividas = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Percentual para pagamento de dívidas",
    )

    percentual_reserva = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Percentual para reserva de emergência",
    )

    class Meta:
        """Meta class para o modelo de estratégia."""

        db_table = "estrategia"
        verbose_name = "Estratégia"
        verbose_name_plural = "Estratégias"
        ordering: typing.ClassVar = ["user"]

    def __str__(self) -> str:
        """Retorna uma representação em string do objeto."""
        return f"Estrategia de {self.user.username}"

    def clean(self) -> None:
        """Valida a soma dos percentuais."""
        super().clean()
        total = (
            self.percentual_gastos
            + self.percentual_investimentos
            + self.percentual_dividas
            + self.percentual_reserva
        )
        if total != Decimal("100.00"):
            msg = (
                f"A soma dos percentuais deve ser igual a 100%. Atualmente, a soma é {total:.2f}%."
            )
            raise ValidationError(msg)

    def get_desempenho_economia(self, economia: Decimal) -> str:
        """Avaliar se a economia está dentro do esperado.

        Retorna uma palavra que representa o desempenho da economia do usuário.
        - muito_bom
        - bom
        - regular
        - ruim

        Parameters
        ----------
        economia : float
            Percentual de economia do usuário.

        """
        coeficiente = 0.4
        meta_economia = self.percentual_reserva + self.percentual_investimentos
        if economia >= meta_economia:
            return "muito_bom"
        if economia < meta_economia and economia >= meta_economia * coeficiente:
            return "bom"
        if economia > 0 and economia < meta_economia * coeficiente:
            return "regular"
        return "ruim"
