from django.contrib import admin

from moedas.models import Categoria, ContaBancaria, Despesa, OrcamentoMensal
from moedas.models.banco import Banco


# Register your models here.
class CategoriaAdmin(admin.ModelAdmin):
    """Admin para o modelo Categoria."""

    list_display = ("sigla", "nome", "cor", "icone", "is_base", "tipo")
    list_filter = ("tipo",)
    search_fields = ("sigla", "nome", "tipo")


class DespesaAdmin(admin.ModelAdmin):
    """Admin para o modelo Despesa."""

    list_display = ("descricao", "valor", "data", "forma_pagamento", "categoria")
    list_filter = ("forma_pagamento", "categoria")
    search_fields = ("descricao", "categoria__nome")


class OrcamentoMensalAdmin(admin.ModelAdmin):
    """Admin para o modelo OrcamentoMensal."""

    list_display = ("user",)
    search_fields = ("user__username",)
    list_filter = ("user",)


class ContaBancariaAdmin(admin.ModelAdmin):
    """Admin para o modelo ContaBancaria."""

    list_display = ("nome", "saldo", "user")
    search_fields = ("nome", "user__username")
    list_filter = ("user",)


class BancoAdmin(admin.ModelAdmin):
    """Admin para o modelo Banco."""

    search_fields = ("nome", "abreviacao", "ispb")
    list_display = ("nome", "abreviacao", "ispb", "foto")


admin.site.register(Banco, BancoAdmin)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Despesa, DespesaAdmin)
admin.site.register(OrcamentoMensal, OrcamentoMensalAdmin)
admin.site.register(ContaBancaria, ContaBancariaAdmin)

# Titulo da página do admin
admin.site.site_header = "ProsperApp Admin"
admin.site.site_title = "ProsperApp Admin"
