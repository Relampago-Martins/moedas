from __future__ import annotations

import calendar
from datetime import datetime
from random import choice
from typing import TYPE_CHECKING

from django.db.models import Q

from moedas.models.estrategia import Estrategia

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
        try:
            percentual_gastos = (
                carteira_periodo["total_despesas"] / carteira_periodo["total_receitas"]
            )
        except ZeroDivisionError:
            percentual_gastos = 1

        return {
            "saldo": carteira_periodo["saldo"],
            "diff_percentual": self._get_diff_percentual(
                carteira_periodo["saldo"],
                carteira_periodo_anterior["saldo"],
            ),
            "total_despesas": carteira_periodo["total_despesas"],
            "total_receitas": carteira_periodo["total_receitas"],
            "economia": carteira_periodo["economia"],
            "orcamento": {
                "limite_gastos": self.get_limite_gastos(),
                "percentual_gastos": round(
                    percentual_gastos,
                    2,
                ),
                "mensagem": self.get_mensagem_orcamento(
                    percentual_gastos,
                ),
            },
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
        total_receitas = self.get_total_receitas(obj, None, periodo_before)
        total_despesas = self.get_total_despesas(obj, None, periodo_after)
        receitas_periodo = self.get_total_receitas(obj, periodo_after, periodo_before)
        despesas_periodo = self.get_total_despesas(obj, periodo_after, periodo_before)
        economia = 0
        if receitas_periodo:
            economia = receitas_periodo
        if despesas_periodo:
            economia -= despesas_periodo

        return {
            "saldo": total_receitas - total_despesas,
            "economia": economia,
            "total_despesas": despesas_periodo,
            "total_receitas": receitas_periodo,
        }

    def get_total_receitas(
        self,
        user: User,
        periodo_after: str | None,
        periodo_before: str | None,
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
        periodo_after: str | None,
        periodo_before: str | None,
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

    def _get_filtro_periodo(self, periodo_after: str | None, periodo_before: str | None) -> Q:
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

    def get_mensagem_orcamento(self, percentual_gasto: float) -> str:
        """Retorna uma mensagem de economia."""
        estrategia = Estrategia.objects.filter(user=self.user).first()

        desempenho = ""
        if estrategia:
            desempenho: str = estrategia.get_desempenho_orcamento(percentual_gasto)

        mensagens_desempenho = {
            "economico": [
                "Você gastou menos do que o previsto. Parabéns!",
                "Excelente! Seus gastos ficaram abaixo do orçamento.",
                "Muito bem, sobrou dinheiro no fim do mês.",
            ],
            "limite": [
                "Você usou exatamente o que planejou. Equilíbrio alcançado.",
                "Seu orçamento foi seguido à risca. Boa gestão!",
                "No limite, mas sem ultrapassar. Mantenha o foco.",
            ],
            "passou_do_limite": [
                "Você ultrapassou um pouco o orçamento. Atenção nos próximos dias.",
                "Gastos ligeiramente acima do ideal. Pequenos ajustes já ajudam.",
                "Quase lá! Com um pouco mais de controle, você volta ao plano.",
            ],
            "gastou_muito": [
                "Os gastos passaram bastante do ideal. Hora de reavaliar prioridades.",
                "Seu orçamento foi comprometido. Cuidado com os excessos.",
                "Gastos elevados este mês. Tente compensar no próximo.",
            ],
            "gastou_tudo": [
                "Você extrapolou totalmente o orçamento. É importante revisar seus hábitos.",
                "Todos os recursos planejados foram usados. Vamos repensar o próximo mês?",
                "Gastos acima de 100%. Um novo plano pode ajudar a retomar o controle.",
            ],
        }

        possiveis_mensagnes: list = mensagens_desempenho.get(
            desempenho,
            ["Estratégia não encontrada."],
        )

        return choice(possiveis_mensagnes)

    def get_limite_gastos(self) -> float:
        """Retorna o limite de economia."""
        estrategia = Estrategia.objects.filter(user=self.user).first()
        if estrategia:
            return estrategia.percentual_gastos + estrategia.percentual_dividas
        return 0.0
