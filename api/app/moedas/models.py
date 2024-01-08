from django.db import models

TIPO_MOVIMENTACAO = (
    ('D', 'Despesa'),
    ('R', 'Receita'),
)


# Create your models here.
class Orcamento(models.Model):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    mes = models.IntegerField()
    ano = models.IntegerField()
    descricao = models.CharField(max_length=100)
    def __str__(self):
        return self.nome


class Movimentacao(models.Model):
    valor = models.DecimalField(
        max_digits=10, decimal_places=2)
    data = models.DateField()
    descricao = models.CharField(
        max_length=100)
    tipo = models.CharField(
        max_length=1, choices=TIPO_MOVIMENTACAO)
    orcamento = models.ForeignKey(
        Orcamento, on_delete=models.CASCADE, related_name='movimentacoes', null=True, blank=True)

    def __str__(self):
        return self.nome
