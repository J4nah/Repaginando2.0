document.addEventListener('DOMContentLoaded', async () => {
    async function PopulateProfile() {
        const idSession = sessionStorage.getItem('id');
        const idLocal = localStorage.getItem('id');

        if (!idSession && !idLocal) {
            console.log('ID não encontrado no SESSION ou LOCAL storage.');
            return;
        }

        const userId = idSession || idLocal;

        // Carregar as imagens de perfil do localStorage
        let storedProfileImages = localStorage.getItem('profileImages');
        if (storedProfileImages) {
            profileImages = JSON.parse(storedProfileImages);
        }

        try {
            const response = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId })
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor.');
            }

            const usuario = await response.json();

            document.getElementById('nomeUsuario').value = usuario.Nome_usuario || '';
            document.getElementById('bio-input').value = usuario.Usuario_bio || '';
            document.getElementById('mensagemOla').innerHTML = `Olá, ${usuario.Nome_usuario || ''}!`;

            buscarEstados(usuario.Uf);
            buscarCidades(usuario.Cidade, usuario.Uf);

            if (usuario.Celular || usuario.Email) {
                document.getElementById('telefone').value = usuario.Celular;
                document.getElementById('email').value = usuario.Email;
            }

            // Atualiza a foto do perfil com base no ID do usuário
            const profilePhoto = profileImages[userId - 1] || 'imagens/pessoas/UsuarioPadraoPic.jpg';
            document.getElementById('profile-photo').src = profilePhoto;
            document.getElementById('profile-photo-preview').src = profilePhoto;
            document.getElementById('header-profile-photo').src = profilePhoto;
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    }

    document.getElementById('update-photo').addEventListener('change', handleFileSelect);
    PopulateProfile();
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 500;
                canvas.height = 500;
                ctx.drawImage(img, 0, 0, 500, 500);
                const dataUrl = canvas.toDataURL('image/png');

                // Atualiza as imagens de perfil
                document.getElementById('profile-photo').src = dataUrl;
                document.getElementById('profile-photo-preview').src = dataUrl;
                document.getElementById('header-profile-photo').src = dataUrl;

                // Atualiza a constante profileImages com a nova imagem
                const userId = sessionStorage.getItem('id') || localStorage.getItem('id');
                if (userId) {
                    profileImages[userId - 1] = dataUrl;

                    // Salvar a constante profileImages no localStorage
                    localStorage.setItem('profileImages', JSON.stringify(profileImages));
                }
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// Simulação do armazenamento das imagens de perfil
let profileImages = [
    "imagens/pessoas/Bigeus.jpg",
    "imagens/pessoas/UsuarioPadraoPic.jpg",
    "imagens/pessoas/UsuarioPadraoPic.jpg",
    "imagens/pessoas/UsuarioPadraoPic.jpg",
    "imagens/pessoas/Spike.jpg",
];

// Carregar as imagens de perfil do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    let storedProfileImages = localStorage.getItem('profileImages');
    if (storedProfileImages) {
        profileImages = JSON.parse(storedProfileImages);
    }
});
