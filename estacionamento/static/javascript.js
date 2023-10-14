document.addEventListener('DOMContentLoaded', function() {
    const pesquisar = document.querySelector('#Pesquisar');
    const cadastro = document.querySelector('#cadastro');
    const messageDiv = document.querySelector('.message');
    const voltar = document.querySelector('.voltar');
    const form = document.querySelector('.form');

    cadastro.addEventListener('click', (event) => {
        /* 
            mostra a mensagem de cadastro e atualiza a página automaticamente 
            após 2.5 segundos
        */
        event.preventDefault();
        const innerHtml = '<p>Veículo cadastrado com sucesso</p>';
        messageDiv.innerHTML = innerHtml;
        messageDiv.classList.add('message-success');
        setTimeout(() => {
            messageDiv.innerHTML = '';
            messageDiv.classList.remove('message-success');
            form.submit();
        }, 2500);
    });

    pesquisar.addEventListener('click', function(event) {
        event.preventDefault();
        const div = document.querySelector('.content'); // div onde mostra todos os carros
        div.style.visibility = 'visible';
        voltar.style.visibility = 'visible'; // botão de voltar

        fetch(`${window.location.href}/carros`).then(response => {
            return response.json();
        }).then(data => {
            data.forEach(element => {
                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML =
                    `<td id="carro">${element.carro}</td>
                    <td id="placa" >${element.placa}</td>
                    <td id="dataDeEntrada" >${element.data_entrada}</td>`;

                div.appendChild(novaLinha);
                if (!novaLinha.onclick === true) {
                    selecionaLinha(novaLinha, data);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os carros:', error);
        });
    });

    voltar.addEventListener('click', () => {
        // redireciona para a página do formulário quando você clica no botão voltar
        window.location.href = window.location.href;
    });
});

function selecionaLinha(novaLinha, data) {
    novaLinha.addEventListener('click', (event) => {
        const clickForaDaPlaca = event.target.id;
        if (clickForaDaPlaca === "placa") {
            novaLinha.style.background = "red";
            const placa = event.target.innerHTML;
            mostrarData(data, placa);
            novaLinha.remove(   )
        } else {
            alert('Clique na placa para remover o veículo e cobrar o valor');
        }
    });
}

function mostrarData(data, placa) {
    const dataDeEntrada = encontrarDataEntrada(placa, data);
    if (dataDeEntrada) {
        const valorACobrar = calcularValorACobrar(dataDeEntrada);
        alert(`Data de entrada para a placa ${placa}: ${dataDeEntrada} - Valor a cobrar: R$ ${valorACobrar.toFixed(2)}`);
        
    } else {
        alert(`Data de entrada não encontrada para a placa ${placa}`);
    }
}

function encontrarDataEntrada(placa, data) {
    for (const element of data) {
        if (element.placa === placa) {
            return element.data_entrada;
        }
    }
    return null;
}

function calcularValorACobrar(dataDeEntrada) {
    const dataEntrada = new Date(parseDataHora(dataDeEntrada));
    const dataAtual = new Date();
    
    const diferencaEmMilissegundos = dataAtual - dataEntrada;
    const diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);
    
    const valorHora = 4.80;
    const valorACobrar = valorHora * diferencaEmHoras;
    
    return valorACobrar;
}

function parseDataHora(dataHoraString) {
    const partes = dataHoraString.split(" ");
    const dataPartes = partes[0].split("/");
    const horaPartes = partes[1].split(":");
    
    const dia = parseInt(dataPartes[0]);
    const mes = parseInt(dataPartes[1]) - 1;
    const ano = parseInt(dataPartes[2]);
    const hora = parseInt(horaPartes[0]);
    const minutos = parseInt(horaPartes[1]);
    
    return new Date(ano, mes, dia, hora, minutos);
}
