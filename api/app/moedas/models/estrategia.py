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

    def get_desempenho_orcamento(self, percentual_gastos: Decimal) -> str:
        """Avaliar se os gastos do usuário estão dentro do esperado.

        Retorna uma palavra que representa o desempenho do usuário em seu orçamento:
        - "economico" se os gastos estão abaixo do esperado,
        - "limite" se os gastos estão exatamente no limite,
        - "passou_do_limite" se os gastos estão acima do limite, mas ainda dentro de uma folga,
        - "gastou_muito" se os gastos estão muito acima do limite,
        - "gastou_tudo" se os gastos estão acima de 100%.


        Parameters
        ----------
        percentual_gastos : float
            Percentual de gastos do usuário.

        """
        gastos = round(
            percentual_gastos,
            2,
        )
        coeficiente = Decimal("1.40")
        limite_gastos = self.percentual_dividas + self.percentual_gastos
        limite_com_folga = limite_gastos * coeficiente

        if gastos < limite_gastos:
            return "economico"
        if gastos == limite_gastos:
            return "limite"
        if gastos >= limite_gastos and gastos < limite_com_folga:
            return "passou_do_limite"
        if gastos >= limite_com_folga and gastos < 1:
            return "gastou_muito"

        return "gastou_tudo"
