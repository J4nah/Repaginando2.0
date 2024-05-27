document.addEventListener('DOMContentLoaded', async function () {
    // Função para fazer a requisição ao banco de dados
    async function getUserGenres() {
        try {
            const usuarioId = localStorage.getItem('id') || sessionStorage.getItem('id');
            const response = await fetch(`${urlServer}generos_usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: usuarioId }) // Substitua 1 pelo ID do usuário logado
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao obter gêneros do usuário:', error);
            return [];
        }
    }

    // Função para marcar os gêneros na tela
    async function populateGenerosInteresse() {
        const userGenres = await getUserGenres(); // Obtém os gêneros do usuário
        const genresNames = [
            'Ficção Científica',
            'Fantasia',
            'Romance',
            'Mistério',
            'Suspense',
            'Terror/Horror',
            'Policial',
            'Aventura',
            'História',
            'Biografia',
            'Autobiografia',
            'Fatos Reais',
            'Poesia',
            'Drama',
            'Comédia',
            'Crônica',
            'Ficção Histórica',
            'Ficção Realista',
            'Ficção Distópica',
            'Literatura Infantil',
            'Ensaios',
            'Filosofia',
            'autoajuda',
            'Viagem',
            'Religião'
        ];

        userGenres.forEach(genre => {
            const checkboxId = genresNames[genre.Genero_id - 1];
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    // Chama a função para marcar os gêneros ao carregar a página
    await populateGenerosInteresse();
});
