const urlServer = "http://localhost:3000/";

let currentUrl = window.location.href;

let idUsuarioUtil = 0;

function isUsingLocalStorage() {
    const tool = localStorage.getItem('nome')
    if (!tool) {
        return false;
    } else {
        return true;
    }
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
