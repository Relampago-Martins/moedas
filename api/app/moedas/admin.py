from django.contrib import admin
from moedas.models import Categoria, Despesa

# Register your models here.
# Adicione admin para o model de Categoria


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("sigla", "nome", "cor", "icone", "is_base", "tipo")
    list_filter = ("tipo",)
    search_fields = ("sigla", "nome", "tipo")


class DespesaAdmin(admin.ModelAdmin):
    list_display = ("descricao", "valor", "data", "forma_pagamento", "categoria")
    list_filter = ("forma_pagamento", "categoria")
    search_fields = ("descricao", "categoria__nome")


admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Despesa, DespesaAdmin)

# Titulo da página do admin
admin.site.site_header = "ProsperApp Admin"
admin.site.site_title = "ProsperApp Admin"
