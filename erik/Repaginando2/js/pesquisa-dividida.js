// Captura os parâmetros de pesquisa da URL
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('searchTerm');
const searchType = urlParams.get('searchType');

// Realiza a pesquisa com base nos parâmetros
let url = '';
if (searchType === 'title') {
    url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&maxResults=12`;
} else if (searchType === 'author') {
    url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchTerm}&maxResults=12`;
}

// Realiza a requisição HTTP para obter os resultados da pesquisa
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Processa os dados dos livros e os exibe na página
        const books = data.items;
        let bookInfo = '';
        books.forEach(book => {
            const volumeInfo = book.volumeInfo;
            const bookId = book.id;
            bookInfo += `
                <div class="book-info1">
                <div class="titulo">
                    <h2 style="text-align: center">${volumeInfo.title}</h2>
                    </div >
                        <div class="capa-livro" style="display: flex; justify-content: center;">
                             <img src="${volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ''}" alt="Capa do livro" style="margin: 0 auto;">
                        </div>
                         <p style="text-align: center"><a href="detalhes-livro.html?bookId=${bookId}">Detalhes</a></p>
                    </div>
                `;
        });
        document.getElementById('book-info').innerHTML = bookInfo;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('book-info').innerHTML = '<p>Nenhum livro encontrado.</p>';
    });

document.getElementById('book-search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    const searchType = document.querySelector('input[name="searchType"]:checked').value;

    let url = '';

    if (searchType === 'title') {
        url = `pesquisados-capa.html?searchTerm=${encodeURIComponent(searchTerm)}&searchType=${encodeURIComponent(searchType)}`;
    } else if (searchType === 'author') {
        url = `pesquisados-capa.html?searchTerm=${encodeURIComponent(searchTerm)}&searchType=${encodeURIComponent(searchType)}`;
    }

    window.location.href = url;
});