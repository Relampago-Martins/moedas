from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from django.contrib.auth.models import User
from django.db.models import Sum
from django.utils.timezone import now
from rest_framework import serializers


class CarteiraSerializer(serializers.Serializer):
    """Serializer com as informações financeiras mais importantes do usuário.

    - Saldo em conta
    - Total de despesas
    - Total
    """

    saldo_em_conta = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_despesas = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_receitas = serializers.DecimalField(max_digits=10, decimal_places=2)

    def __init__(
        self,
        user: User,
        periodo_after: str | None = None,
        periodo_before: str | None = None,
        *args: list,
        **kwargs: dict,
    ) -> None:
        """Inicializa o serializer."""
        super().__init__(*args, **kwargs)
        self.user = user
        self.periodo_after = periodo_after
        self.periodo_before = periodo_before
        self._data = self.get_carteira_data()

    def get_total_receitas(
        self,
        obj: User,
        periodo_after: str,
        periodo_before: str,
    ) -> float:
        """Retorna o total de receitas do usuário."""
        queryset = obj.movimentacoes.filter(tipo="R")
        if periodo_after:
            queryset = queryset.filter(data__gte=periodo_after)
        if periodo_before:
            queryset = queryset.filter(data__lte=periodo_before)
        if not periodo_after and not periodo_before:
            hoje = now().date()
            queryset = queryset.filter(data__month=hoje.month, data__year=hoje.year)
        return queryset.aggregate(total=Sum("valor"))["total"] or 0

    def get_total_despesas(
        self,
        obj: User,
        periodo_after: str,
        periodo_before: str,
    ) -> float:
        """Retorna o total de despesas do usuário."""
        queryset = obj.movimentacoes.filter(tipo="D")
        if periodo_after:
            queryset = queryset.filter(data__gte=periodo_after)
        if periodo_before:
            queryset = queryset.filter(data__lte=periodo_before)
        if not periodo_after and not periodo_before:
            hoje = now().date()
            queryset = queryset.filter(data__month=hoje.month, data__year=hoje.year)
        return queryset.aggregate(total=Sum("valor"))["total"] or 0

    def get_saldo(self, obj: User, periodo_after: str, periodo_before: str) -> float:
        """Retorna o saldo do usuário.

        ERRO: esse método está retornando balanço do mês atual, não o saldo.
        """
        total_receitas = self.get_total_receitas(obj, periodo_after, periodo_before)
        total_despesas = self.get_total_despesas(obj, periodo_after, periodo_before)
        saldo = 0
        if total_receitas:
            saldo = total_receitas
        if total_despesas:
            saldo -= total_despesas

        return saldo

    def get_carteira_data(self) -> dict:
        """Formato final dos dados que serão retornados pela API."""
        saldo_em_conta = self.get_saldo(
            self.user,
            self.periodo_after,
            self.periodo_before,
        )
        total_despesas = self.get_total_despesas(
            self.user,
            self.periodo_after,
            self.periodo_before,
        )
        total_receitas = self.get_total_receitas(
            self.user,
            self.periodo_after,
            self.periodo_before,
        )

        return {
            "saldo": saldo_em_conta,
            "total_despesas": total_despesas,
            "total_receitas": total_receitas,
        }
