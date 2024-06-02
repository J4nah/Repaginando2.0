const urlServer = "http://localhost:3000/";

let currentUrl = window.location.href;

let idUsuarioUtil = 0;

function isUsingLocalStorage() {
    return localStorage.getItem('manterConectado') === 'true';
}

function isLivroAutorSelected() {
    const authorSearch = document.getElementById('authorSearch');
    const livroSearch = document.getElementById('livroSearch');

    if (!authorSearch.checked && !livroSearch.checked) {
        window.alert("Selecione um parâmetro de pesquisa.");
        return false;
    }

    return true;
}
