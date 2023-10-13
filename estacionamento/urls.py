from django.urls import path
from estacionamento.views import home, cadastra, todos_carros

urlpatterns = [
    path('', home, name='home'),
    path('cadastra/', cadastra, name='cadastra'),
    path('carros/', todos_carros, name='carros'),
]
