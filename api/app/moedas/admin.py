from django.contrib import admin

from moedas.models import Categoria, ContaBancaria, Despesa, OrcamentoMensal


# Register your models here.
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("sigla", "nome", "cor", "icone", "is_base", "tipo")
    list_filter = ("tipo",)
    search_fields = ("sigla", "nome", "tipo")


class DespesaAdmin(admin.ModelAdmin):
    list_display = ("descricao", "valor", "data", "forma_pagamento", "categoria")
    list_filter = ("forma_pagamento", "categoria")
    search_fields = ("descricao", "categoria__nome")


class OrcamentoMensalAdmin(admin.ModelAdmin):
    list_display = ("user",)
    search_fields = ("user__username",)
    list_filter = ("user",)


class ContaBancariaAdmin(admin.ModelAdmin):
    list_display = ("nome", "saldo", "user")
    search_fields = ("nome", "user__username")
    list_filter = ("user",)


admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Despesa, DespesaAdmin)
admin.site.register(OrcamentoMensal, OrcamentoMensalAdmin)
admin.site.register(ContaBancaria, ContaBancariaAdmin)

# Titulo da página do admin
admin.site.site_header = "ProsperApp Admin"
admin.site.site_title = "ProsperApp Admin"
