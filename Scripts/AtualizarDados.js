async function AtualizarDados() {
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
        console.log('Dados do usuário atualizados com sucesso:', data);
        alert('Informações atualizadas com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        alert('Erro ao atualizar dados do usuário');
    }
}