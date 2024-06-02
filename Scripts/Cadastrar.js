async function CadastrarUsuario() {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    const aceitarTermosCheck = document.getElementById('termosUso').checked;

    if (!aceitarTermosCheck) {
        window.alert('Você deve aceitar os termos de uso para continuar.');
        return null;
    }

    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuario = {
        nomeCompleto: nomeCompleto,
        email: email,
        senha: senha
    }

    if(email === ""){
        window.alert('Preencha o campo email');
        return null;
    }

    if(!validarEmail(email)){
        window.alert('Formato de email incompatível. Tente novamente.');
        return null;
    }

    if(nomeCompleto === ""){
        window.alert('Preencha o campo Nome completo');
        return null;
    }

    if(!confirmaSenha()){
        window.alert('Confirme sua senha novamente.');
        return null;
    }

    try {
        const response = await fetch(`${urlServer}usuario/cadastro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        const data = await response.json();

        console.log(data);

        if (response.status === 201) {
            console.log('Usuario criado com sucesso');
            console.log(data);

            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('senha', data.senha);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('nome', data.nome);

            window.alert("Usuário cadastrado com sucesso!")

            window.location.href = 'home-logado.html';
        }
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    } finally {
        console.log('Requisição concluída');
    }
}


async function aviso(){
    console.log(`O ERRO:
  "   Refused to apply style from http://127.0.0.1:5500/erik/Repaginando2/css/style-fonts.css 
  because its MIME type (text/html) is not a supported stylesheet MIME type, and strict MIME checking is enabled.   "
  ESTÁ OCORRENDO DESDE QUE FOI IMPORTADO AO PROJETO, OCORRE TAMBÉM NO GITHUB PAGES`)
}

aviso();
