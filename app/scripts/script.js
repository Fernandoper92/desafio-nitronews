

function readJson(value) {

    fetch('../../dados.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Não foi possivel ler o arquivo");
            }
            return response.json();
        })
        .then(data => {
            let results = data;
            compareData(results, value)
        })
        .catch(error => {
            console.log(error);
        })
}


function onSubmit(event) {
    event.preventDefault();
    let value = document.getElementById('input-value').value;
    value = value.toUpperCase();
    checkValue(value);

}

function checkValue(value) {
    if (value) {
        readJson(value)
    } else {
        showError();
    }
}

function compareData(result, value) {
    const encomendas = result.encomendas;
    for (i in encomendas) {
        numero = encomendas[i].numero;
        if (value == numero) {
            return showData(encomendas[i]);
        } else {
            showError();
        }

    }
}

function showData(data) {
    let success = document.querySelector('.success-grid-container');
    let error = document.querySelector('.error-flex-container');
    let price = data.valor;
    price = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    let date = data.data;
    date = date.split('T');
    date = date[0].split('-');
    date = date[2] + '/' + date[1] + '/' + date[0];
    success.setAttribute('style', 'display:grid')
    error.setAttribute('style', 'display:none')

    document.querySelector('.client-value').innerHTML = data.cliente.id + " - " + data.cliente.nome;
    document.querySelector('.price-value').innerHTML = price;
    document.querySelector('.date-value').innerHTML = date;

    if (data.entregue) { const status = document.querySelector('.status-value').innerHTML = "Entregue" };
    if (!data.entregue) { const status = document.querySelector('.status-value').innerHTML = "Entregar" };

}

function showError() {
    let success = document.querySelector('.success-grid-container');
    let error = document.querySelector('.error-flex-container');
    success.setAttribute('style', 'display:none')
    error.setAttribute('style', 'display:flex')
}