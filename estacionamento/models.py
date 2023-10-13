from django.db import models
from django.utils import timezone


class Estaciona(models.Model):
    """
        O Orm do django vai mapear essa classe e criar uma tabela
        Ex
        create table Estaciona(
            placa = varchar(max_length=8, notnull),
            carro = varchar(max_length=30, notnull),
            data = DATETIME
        )
    """
    placa = models.CharField(max_length=8, blank=False)
    carro = models.CharField(max_length=30, blank=False)
    data = models.DateTimeField(auto_now_add=True)

    def data_formatada(self):
        """
            `data = models.DateTimeField(auto_now_add=True)` vai retorna a data
            em um formato diferente, essa função vai formatar a data para o 
            padrão pt-br
        """
        data = self.data.astimezone(timezone.get_current_timezone())
        return data.strftime('%d/%m/%Y %H:%M')