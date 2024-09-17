document.addEventListener('DOMContentLoaded', function() {
    // Quando a página carregar, busca os produtos da API
    fetchProductsFromAPI();
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores do formulário
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const barCode = document.getElementById('barCode').value;

    // Cria o objeto do produto
    const product = {
        name: name,
        image: image,
        bar_code: parseInt(barCode)
    };

    // Envia o produto para a API
    sendProductToAPI(product);

    // Limpa o formulário
    document.getElementById('productForm').reset();
});

// Função para buscar produtos da API
function fetchProductsFromAPI() {
    const apiUrl = 'https://teste.sebasnet.cloud/produto/?skip=0&limit=100'; // Substitua pela URL da sua API

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(product => addProductToList(product));
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
}

// Função para enviar um novo produto para a API
function sendProductToAPI(product) {
    const apiUrl = 'https://teste.sebasnet.cloud/produto/'; // Substitua pela URL da sua API

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Produto cadastrado com sucesso:', data);

        // Adiciona o produto recém-cadastrado à lista
        addProductToList(product);
    })
    .catch(error => {
        console.error('Erro ao cadastrar o produto:', error);
    });
}

// Função para adicionar um produto na lista da página
function addProductToList(product) {
    const productList = document.getElementById('productList');

    // Cria o elemento de lista
    const li = document.createElement('li');
    li.className = 'product-item';

    li.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="info">
            <h3>${product.name}</h3>
            <p>Código de Barras: ${product.bar_code}</p>
        </div>
    `;

    // Adiciona o produto à lista
    productList.appendChild(li);
}
