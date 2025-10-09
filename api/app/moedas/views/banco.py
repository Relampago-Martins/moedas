from __future__ import annotations

from rest_framework import viewsets

from moedas import serializers as moedas_serializers
from moedas.filters import BancoFilter
from moedas.models import Banco, ContaBancaria


class ContaBancariaViewSet(viewsets.ModelViewSet):
    """ViewSet para Contas Bancárias."""

    queryset = ContaBancaria.objects.all()
    serializer_class = moedas_serializers.ContaBancariaSerializer

    def get_serializer_class(self):
        if self.action == "retrieve":
            return moedas_serializers.ContaBancariaSerializerDetail
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by("-saldo")


class BancoViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet para Bancos."""

    queryset = Banco.objects.all()
    serializer_class = moedas_serializers.BancoSerializer
    filterset_class = BancoFilter
