from rest_framework import serializers
from django.db.models import Sum
from django.utils.timezone import now


class CarteiraSerializer(serializers.Serializer):
    saldo_em_conta = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_despesas = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_receitas = serializers.DecimalField(max_digits=10, decimal_places=2)

    def get_total_receitas(self, obj, periodo_after, periodo_before):
        queryset = obj.movimentacoes.filter(tipo="R")
        if periodo_after:
            queryset = queryset.filter(data__gte=periodo_after)
        if periodo_before:
            queryset = queryset.filter(data__lte=periodo_before)
        if not periodo_after and not periodo_before:
            hoje = now().date()
            queryset = queryset.filter(data__month=hoje.month, data__year=hoje.year)
        return queryset.aggregate(total=Sum("valor"))["total"] or 0

    def get_total_despesas(self, obj, periodo_after, periodo_before):
        queryset = obj.movimentacoes.filter(tipo="D")
        if periodo_after:
            queryset = queryset.filter(data__gte=periodo_after)
        if periodo_before:
            queryset = queryset.filter(data__lte=periodo_before)
        if not periodo_after and not periodo_before:
            hoje = now().date()
            queryset = queryset.filter(data__month=hoje.month, data__year=hoje.year)
        return queryset.aggregate(total=Sum("valor"))["total"] or 0

    def get_saldo(self, obj, periodo_after, periodo_before):
        total_receitas = self.get_total_receitas(obj, periodo_after, periodo_before)
        total_despesas = self.get_total_despesas(obj, periodo_after, periodo_before)
        saldo = 0
        if total_receitas:
            saldo = total_receitas
        if total_despesas:
            saldo -= total_despesas

        return saldo

    def __init__(self, user, periodo_after=None, periodo_before=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = user
        self.periodo_after = periodo_after
        self.periodo_before = periodo_before
        self._data = self.get_carteira_data()

    def get_carteira_data(self):
        saldo_em_conta = self.get_saldo(
            self.user, self.periodo_after, self.periodo_before
        )
        total_despesas = self.get_total_despesas(
            self.user, self.periodo_after, self.periodo_before
        )
        total_receitas = self.get_total_receitas(
            self.user, self.periodo_after, self.periodo_before
        )

        return {
            "saldo": saldo_em_conta,
            "total_despesas": total_despesas,
            "total_receitas": total_receitas,
        }
