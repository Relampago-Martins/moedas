from __future__ import annotations

import calendar
from datetime import datetime, timedelta
from typing import TYPE_CHECKING

from django.db.models import Q

if TYPE_CHECKING:
    from django.contrib.auth.models import User
from django.db.models import Sum
from django.utils.timezone import now
from rest_framework import serializers


class CarteiraSerializer(serializers.Serializer):
    """Serializer com as informações financeiras mais importantes do usuário.

    - Saldo em conta
    - Total de despesas
    - Diferença percentual do saldo em conta em relação ao mês anterior
    - Total
    """

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

    def get_carteira_data(self) -> dict:
        """Formato final dos dados que serão retornados pela API."""
        carteira_periodo = self.get_carteira_periodo(
            self.user,
            self.periodo_after,
            self.periodo_before,
        )
        carteira_periodo_anterior = self.get_carteira_periodo(
            self.user,
            *self.get_periodo_anterior(self.periodo_after, self.periodo_before),
        )

        return {
            "saldo": carteira_periodo["saldo"],
            "diff_percentual": self._get_diff_percentual(
                carteira_periodo["saldo"],
                carteira_periodo_anterior["saldo"],
            ),
            "total_despesas": carteira_periodo["total_despesas"],
            "total_receitas": carteira_periodo["total_receitas"],
        }

    def get_carteira_periodo(
        self,
        obj: User,
        periodo_after: str,
        periodo_before: str,
    ) -> float:
        """Retorna as informações da carteira para determinado período.

        ERRO: esse método está retornando balanço do mês atual, não o saldo.
        """
        total_receitas = self.get_total_receitas(obj, periodo_after, periodo_before)
        total_despesas = self.get_total_despesas(obj, periodo_after, periodo_before)
        saldo = 0
        if total_receitas:
            saldo = total_receitas
        if total_despesas:
            saldo -= total_despesas

        return {
            "saldo": saldo,
            "total_despesas": total_despesas,
            "total_receitas": total_receitas,
        }

    def get_total_receitas(
        self,
        user: User,
        periodo_after: str,
        periodo_before: str,
    ) -> float:
        """Retorna o total de receitas do usuário."""
        queryset = user.movimentacoes.filter(tipo="R")
        queryset = queryset.filter(
            self._get_filtro_periodo(periodo_after, periodo_before),
        )
        return queryset.aggregate(total=Sum("valor"))["total"] or 0

    def get_total_despesas(
        self,
        user: User,
        periodo_after: str,
        periodo_before: str,
    ) -> float:
        """Retorna o total de despesas do usuário."""
        queryset = user.movimentacoes.filter(tipo="D")
        queryset = queryset.filter(
            self._get_filtro_periodo(periodo_after, periodo_before),
        )
        return queryset.aggregate(total=Sum("valor"))["total"] or 0

    def get_periodo_anterior(self, periodo_after: str, periodo_before: str) -> tuple:
        """Retorna o período anterior ao informado.

        Recebe inicio e fim no formato YYYY-MM-DD;
        Retorna inicio e fim no mesmo formato porém referente a um mês anterior.

        OBS: não suporta períodos que abrangem mais de um mês.
        """
        if not periodo_after and not periodo_before:
            mes_atual = now().date()

            if mes_atual.month == 1:
                _, ultimo_dia = calendar.monthrange(mes_atual.year - 1, 12)
                mes_passado = mes_atual.replace(
                    day=ultimo_dia,
                    month=12,
                    year=mes_atual.year - 1,
                )
            else:
                _, ultimo_dia = calendar.monthrange(mes_atual.year, mes_atual.month - 1)
                mes_passado = mes_atual.replace(
                    day=ultimo_dia,
                    month=mes_atual.month - 1,
                )

            return (
                mes_passado.replace(day=1).strftime("%Y-%m-%d"),
                mes_passado.strftime("%Y-%m-%d"),
            )

        if periodo_after and periodo_before:
            mes = datetime.strptime(periodo_after, "%Y-%m-%d").date()

            if mes.month == 1:
                _, ultimo_dia = calendar.monthrange(mes.year - 1, 12)
                mes_anterior = mes.replace(
                    day=ultimo_dia,
                    month=12,
                    year=mes.year - 1,
                )
            else:
                _, ultimo_dia = calendar.monthrange(mes.year, mes.month - 1)
                mes_anterior = mes.replace(
                    day=ultimo_dia,
                    month=mes.month - 1,
                )

            return (
                mes_anterior.replace(day=1).strftime("%Y-%m-%d"),
                mes_anterior.strftime("%Y-%m-%d"),
            )
        return None, None

    def _get_filtro_periodo(self, periodo_after: str, periodo_before: str) -> Q:
        """Retorna um filtro de período."""
        qs = Q()
        if periodo_after:
            qs &= Q(data__gte=periodo_after)
        if periodo_before:
            qs &= Q(data__lte=periodo_before)
        if not periodo_after and not periodo_before:
            hoje = now().date()
            qs &= Q(
                data__month=hoje.month,
                data__year=hoje.year,
            )
        return qs

    def _get_diff_percentual(self, saldo_atual: float, saldo_anterior: float) -> float:
        """Retorna a diferença percentual do saldo em relação ao mês anterior."""
        if saldo_anterior:
            percentual = (saldo_atual - saldo_anterior) / saldo_anterior * 100
            if saldo_anterior < 0 and saldo_atual < 0:
                percentual = abs(percentual)
            return round(percentual, 2)
        return 0
