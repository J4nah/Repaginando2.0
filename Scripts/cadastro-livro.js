// Mapeamento de nomes de gêneros para IDs
const generoIds = {
    'Ficção Científica': 1,
    'Fantasia': 2,
    'Romance': 3,
    'Mistério': 4,
    'Suspense': 5,
    'Terror/Horror': 6,
    'Policial': 7,
    'Aventura': 8,
    'História': 9,
    'Biografia': 10,
    'Autobiografia': 11,
    'Fatos Reais': 12,
    'Poesia': 13,
    'Drama': 14,
    'Comédia': 15,
    'Crônica': 16,
    'Ficção Histórica': 17,
    'Ficção Realista': 18,
    'Ficção Distópica': 19,
    'Literatura Infantil': 20,
    'Ensaios': 21,
    'Filosofia': 22,
    'Autoajuda': 23,
    'Viagem': 24,
    'Religião': 25,
};

// Mapeamento de nomes de estados para IDs
const estadoIds = {
    'Novo': 1,
    'Semi-Novo': 2,
    'Danificado': 3
};

function getGeneroMarcado() {
    const select = document.getElementById('genero');
    const generoNome = select.options[select.selectedIndex].value;
    const generoId = generoIds[generoNome];

    // Adicione estas linhas para depuração
    console.log('Genero selecionado:', generoNome);
    console.log('ID do genero correspondente:', generoId);
    
    return generoId;
}


document.addEventListener('DOMContentLoaded', function () {
    const btnCadastrar = document.getElementById('btnCadastrar');
    btnCadastrar.addEventListener('click', async function (event) {
        event.preventDefault();

        // Captura os valores dos campos
        const nomeLivro = document.getElementById('nomeLivro').value;
        const autor = document.getElementById('autor').value;
        const editora = document.getElementById('editora').value;
        const generoId = getGeneroMarcado();  // Obter o ID do gênero marcado
        const anoPublicacao = document.getElementById('anoPublicacao').value;
        const qtdePaginas = document.getElementById('qtdePaginas').value;
        const estadoLivro = estadoIds[document.getElementById('estadoLivro').value];  // Obter o ID do estado do livro

        if (!nomeLivro || !autor || !editora || !generoId || !anoPublicacao || !qtdePaginas || !estadoLivro) {
            alert('Por favor, preencha todos os campos.');
        } else {
            try {
                const response = await fetch(`${urlServer}cadastrar_livro`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nomeLivro,
                        anoPubli: anoPublicacao,
                        qtdePaginas: qtdePaginas,
                        editora: editora,
                        autor: autor,
                        generoId: generoId,  // Passar o ID do gênero marcado
                        estadoId: estadoLivro  // Passar o ID do estado do livro
                    })
                });

                if (response.ok) {
                    alert('Livro cadastrado com sucesso!');
                } else {
                    alert('Erro ao cadastrar o livro');
                }
            } catch (error) {
                console.error('Erro ao cadastrar o livro:', error);
                alert('Erro ao cadastrar o livro');
            }
        }
    });
});

