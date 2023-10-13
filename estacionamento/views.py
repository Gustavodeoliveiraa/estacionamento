from django.shortcuts import render, redirect
from estacionamento.models import Estaciona
from django.http import JsonResponse


def home(request):
    """
        View responsável por carregar a tela inicial do site
    """
    return render(request, 'home.html')


def cadastra(request):
    """
        Pega os valores (placa, modelo) da url
        esses valores sao enviados pelo formulário 
        salva esses dados no banco de dados
    """
    placa = request.GET.get('placa')
    modelo = request.GET.get('modelo')
    if placa and modelo:
        # salvando no banco
        Estaciona.objects.create(placa=placa, carro=modelo)

    return redirect('home')


def todos_carros(request):
    """
        view responsável por integrar os dados do banco com o front
    """
    carros = Estaciona.objects.all()  # pega todos os carros salvos no banco

    carros_geral = []

    for carro in carros:
        """
            vai iterar por todos carros q foi pego na variável `carros`
            vai criar um dicionario com essas informações(
                isso é necessário para poder transformar a QuerySet da variável
                `carros` em um tipo de informação q possa ser convertida em um
                json
            )
        """
        carros_data = {
            'carro': carro.carro,
            'placa': carro.placa,
            'data_entrada': carro.data_formatada()
        }
        carros_geral.append(carros_data)

    return JsonResponse(carros_geral, safe=False)
