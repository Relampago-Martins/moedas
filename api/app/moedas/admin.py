from django.contrib import admin
from moedas.models import Categoria

# Register your models here.
# Adicione admin para o model de Categoria


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("sigla", "nome", "cor", "icone", "is_base", "tipo")
    list_filter = ("tipo",)
    search_fields = ("sigla", "nome", "tipo")


admin.site.register(Categoria, CategoriaAdmin)
