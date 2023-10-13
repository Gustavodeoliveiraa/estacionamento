document.addEventListener('DOMContentLoaded', function() {
    const pesquisar = document.querySelector('#Pesquisar');
    const cadastro = document.querySelector('#cadastro');
    const messageDiv = document.querySelector('.message')
    const voltar = document.querySelector('.voltar')
    const form = document.querySelector('.form')


    cadastro.addEventListener('click', (event) => {
        /* 
            mostra a mensagem de cadastro e atualiza a pagina automaticamente 
            apos 2.5 segundos
        */
        event.preventDefault();
        const innerHtml = '<p>Veiculo cadastrado com sucesso</p>'
        messageDiv.innerHTML = innerHtml
        messageDiv.classList.add('message-success')
        setTimeout(() => {
            messageDiv.innerHTML=''
            messageDiv.classList.remove('message-success')
            form.submit()
        }, 2500); 
    });

    pesquisar.addEventListener('click', function(event) {
        event.preventDefault();
        const div = document.querySelector('.content') // div onde mostra todos carros
        div.style.visibility = 'visible'  
        voltar.style.visibility = 'visible' //botão de voltar


        fetch(`${window.location.href}/carros`).then(response => {
            console.log(response)
            //  esse primeiro then vai retorna o objeto completo da solicitação http
            return response.json()
        }).then(data => {
            // já esse segundo then vai ter os dados ja processados, para um json
            data.forEach(element => {
                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML =
                ` 
                <td>${element.carro}</td>
                <td>${element.placa}</td>
                <td>${element.data_entrada}</td>

                `
                console.log(element.data_entrada)
                div.appendChild(novaLinha);
            });
        })
        .catch(error =>{
            // essa parte vc ignora, dev bom n deixa erros acontecer hehe
            console.error('Erro ao buscar os carros:', error);
        })

    });
    voltar.addEventListener('click', () =>{
        // redireciona para a pagina do formulário quando vc clica no botão voltar
        window.location.href = window.location.href
    })

});