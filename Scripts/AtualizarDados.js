// Função para coletar os gêneros marcados
function getGenerosMarcados() {
    const checkboxes = document.querySelectorAll('input[name="genero"]');
    const generosMarcados = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            generosMarcados.push(checkbox.value);
        }
    });

    return generosMarcados;
}

// Função para atualizar os dados do usuário
async function AtualizarDados(event) {
    event.preventDefault();

    // Obter os valores dos inputs
    var nomeUsuario = document.getElementById('nomeUsuario').value;
    var bio = document.getElementById('bio-input').value;
    var estado = document.getElementById('estado').value;
    var cidade = document.getElementById('cidades').value;
    var celular = document.getElementById('telefone').value;
    var email = document.getElementById('email').value;

    const userId = localStorage.getItem('id') || sessionStorage.getItem('id');

    // Verificar se os campos não estão vazios
    if (!nomeUsuario || !bio || !estado || !cidade || !celular || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Dados a serem atualizados
    var dadosAtualizados = {
        Nome_usuario: nomeUsuario,
        Usuario_bio: bio,
        Uf: estado,
        Cidade: cidade,
        Celular: celular,
        Email: email
    };

    try {
        const response = await fetch(`${urlServer}atualizar_usuario/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        });
        const data = await response.json();

        if (response.ok) {
            // Limpar armazenamento anterior
            localStorage.clear();
            sessionStorage.clear();

            // Selecionar armazenamento adequado
            const storage = isUsingLocalStorage() ? localStorage : sessionStorage;

            // Atualizar armazenamento com novos dados
            storage.setItem('id', userId);
            storage.setItem('estado', estado);
            storage.setItem('celular', celular);
            storage.setItem('cidade', cidade);
            storage.setItem('bio', bio);
            storage.setItem('email', email);
            storage.setItem('nome', nomeUsuario);

            console.log('Dados do usuário atualizados com sucesso:', data);

            // Obter os gêneros marcados
            const generosMarcados = getGenerosMarcados();

            // Atualizar os gêneros de interesse do usuário
            const generoResponse = await fetch(`${urlServer}atualizar_generos/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ generos: generosMarcados })
            });

            const generoData = await generoResponse.json();

            if (generoResponse.ok) {
                alert('Informações atualizadas com sucesso');
                window.location.href = 'perfil.html';
            } else {
                console.error('Erro na resposta do servidor (gêneros):', generoData);
                alert('Erro ao atualizar gêneros do usuário');
            }
        } else {
            console.error('Erro na resposta do servidor:', data);
            alert('Erro ao atualizar dados do usuário');
        }
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        alert('Erro ao atualizar dados do usuário');
    }
}

// Adicionar o event listener para o botão 'btnAtualizarDados'
document.getElementById('btnAtualizarDados').addEventListener('click', AtualizarDados);
