let profileImages = [
    "imagens/pessoas/Bigeus.jpg",
    "imagens/pessoas/UsuarioPadraoPic.jpg",
    "imagens/pessoas/UsuarioPadraoPic.jpg",
    "imagens/pessoas/UsuarioPadraoPic.jpg",
    "imagens/pessoas/Spike.jpg",
];

document.addEventListener('DOMContentLoaded', async () => {
    async function UpdateHeader() {
        const userId = sessionStorage.getItem('id') || localStorage.getItem('id');

        if (!userId) {
            console.log('ID não encontrado no SESSION ou LOCAL storage.');
            return;
        }

        const profilePhoto = profileImages[userId - 1] || 'imagens/pessoas/UsuarioPadraoPic.jpg';
        const nomeUsuario = localStorage.getItem('nome') || sessionStorage.getItem('nome') || 'usuário';

        const profilePhotoElement = document.getElementById('profile-photo');
        const profilePhotoPreviewElement = document.getElementById('profile-photo-preview');
        const headerProfilePhotoElement = document.getElementById('header-profile-photo');
        const mensagemOlaElement = document.getElementById('mensagemOla');

        if (profilePhotoElement) {
            profilePhotoElement.src = profilePhoto;
        }

        if (profilePhotoPreviewElement) {
            profilePhotoPreviewElement.src = profilePhoto;
        }

        if (headerProfilePhotoElement) {
            headerProfilePhotoElement.src = profilePhoto;
        }

        if (mensagemOlaElement) {
            mensagemOlaElement.innerHTML = `Olá, ${nomeUsuario}!`;
        }
    }

    UpdateHeader();
});
