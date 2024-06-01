// Captura o bookId da URL
const urlParams2 = new URLSearchParams(window.location.search);
const bookId = urlParams2.get('bookId');

// URL da API para obter os detalhes do livro
const url2 = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

// Realiza a requisição HTTP para obter os detalhes do livro
fetch(url2)
    .then(response => response.json())
    .then(data => {
        const volumeInfo = data.volumeInfo;

        // Constrói as informações detalhadas do livro usando o template fornecido
        const bookDetailsInfo = `
        <section class="book-detail">
            <div class="book-inside">
                <p class="big-tag-green">Novo</p>
                <button type="button" class="btn-icon-like"><img src="imagens/coracao.svg" alt="Lupa"></button>
                <img class="biggerbook" src="${volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ''}" alt="">
            </div>
            <div>
                <div class="profile">
                    <img class="photo" src="imagens/pessoas/mulher-01.png" alt="Foto do usuário">
                    <div class="data-user">
                        <h2 class="name">Roberta Ferreira</h2>
                        <p>Rio de Janeiro - SP</p>
                        <img class="star-user" src="imagens/avaliacoes/avaliacao-05.png" alt="Avaliação 5 estrelas">
                        <p class="stars-subtitle">(com base em 3 classificações)</p>
                        <a href="perfil-publico.html">Ver Perfil</a>
                    </div>
                </div>
                <div class="book-description">
                    <h1>Descrição do livro</h1>
                    <p>
                        Nome do livro: <span class="about-book">${volumeInfo.title}</span> <br>
                        Autor: <span class="about-book">${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Desconhecido'}</span> <br>
                        Editora: <span class="about-book">${volumeInfo.publisher || 'Desconhecido'}</span> <br>
                        Gênero: <span class="about-book">${volumeInfo.categories ? volumeInfo.categories.join(', ') : 'Desconhecido'}</span> <br>
                        Ano de publicação: <span class="about-book">${volumeInfo.publishedDate ? volumeInfo.publishedDate.split('-')[0] : 'Desconhecido'}</span> <br>
                        Quantidade de páginas: <span class="about-book">${volumeInfo.pageCount ? volumeInfo.pageCount : 'Desconhecido'}</span> <br>
                    </p>
                </div>
                <p class="contact-phrase">Entrar em contato</p>
                
                <div id="liveAlertPlaceholder"></div>
                <div class="d-flex d-row gap-3">
                    <button type="button" class="btn btn-outline-light btn-lg contact-whatsapp" id="contact-whatsapp">
                    <img src="imagens/redes/btn-whatsapp.png">
                    </button>
                    <button type="button" class="btn btn-outline-light btn-lg contact-email" id="contact-email">
                    <img src="imagens/redes/btn-email.png">
                    </button>
                </div>
            </div>
        </section>
        `;

        // Insere o conteúdo no elemento com o id "book-details-info"
        document.getElementById('book-details-info').innerHTML = bookDetailsInfo;

        // Chama as funções para adicionar eventos aos botões
        addButtonEventListeners();
    })
    .catch(error => {
        console.error('Erro ao obter os detalhes do livro:', error);
        document.getElementById('book-details-info').innerHTML = '<p>Não foi possível carregar os detalhes do livro.</p>';
    });

// Função para adicionar eventos aos botões de contato
function addButtonEventListeners() {
    const whatsappButton = document.getElementById('contact-whatsapp');
    const emailButton = document.getElementById('contact-email');
    
    whatsappButton.addEventListener('click', () => {
        alert('Você deve estar logado para continuar.');
    });
    
    emailButton.addEventListener('click', () => {
        alert('Você deve estar logado para continuar.');
    });
}
