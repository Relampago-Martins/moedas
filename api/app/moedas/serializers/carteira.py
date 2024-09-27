from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Sum


class CarteiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["saldo", "total_receitas", "total_despesas"]

    total_receitas = serializers.SerializerMethodField()
    total_despesas = serializers.SerializerMethodField()
    saldo = serializers.SerializerMethodField()

    def get_total_receitas(self, obj):
        return obj.movimentacoes.filter(tipo="R").aggregate(total=Sum("valor"))["total"] or 0

    def get_total_despesas(self, obj):
        return obj.movimentacoes.filter(tipo="D").aggregate(total=Sum("valor"))["total"] or 0

    def get_saldo(self, obj):
        total_receitas = self.get_total_receitas(obj)
        total_despesas = self.get_total_despesas(obj)
        saldo = 0
        if total_receitas:
            saldo = total_receitas
        if total_despesas:
            saldo -= total_despesas

        return saldo
