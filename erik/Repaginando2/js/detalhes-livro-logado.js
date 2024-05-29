const urlParams2 = new URLSearchParams(window.location.search);
const bookId = urlParams2.get('bookId');

// URL da API para obter os detalhes do livro
const url2 = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

// Realiza a requisição HTTP para obter os detalhes do livro
fetch(url2)
    .then(response => response.json())
    .then(data => {
        const volumeInfo = data.volumeInfo;
        // Constrói as informações detalhadas do livro
        const bookDetailsInfo = `
        <div class="book-info">
            <h2 style="text-align: center; line-height: 150%;">${volumeInfo.title}</h2>
                <div style="display: flex; justify-content: center;">
                    <img src="${volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ''}" alt="Capa do livro" style="margin: 0 auto;">
                </div>
        <br>
            <p><b>Autor:</b> ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Desconhecido'}</p>
            <p><b>Número de Páginas:</b> ${volumeInfo.pageCount ? volumeInfo.pageCount : 'Desconhecido'}</p>
            <p><b>ISBN:</b> ${volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : 'Desconhecido'}</p>
            <p><b>Gênero:</b> ${volumeInfo.categories ? volumeInfo.categories.join(', ') : 'Desconhecido'}</p>
            <p style="text-align: justify"><b>Resumo:</b> ${volumeInfo.description ? volumeInfo.description : 'Não disponível'}</p>
        </div>
        `;
        
        // Insere as informações detalhadas na página
        document.getElementById('book-details-info').innerHTML = bookDetailsInfo;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('book-details-info').innerHTML = '<p>Não foi possível carregar os detalhes do livro.</p>';
    });
