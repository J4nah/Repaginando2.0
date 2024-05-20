async function Login(){
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    const manterConectado = document.getElementById('manterConectado').checked;

    const email = document.getElementById('Email').value;
    const senha = document.getElementById('senha').value;

    if(email === ""){
        window.alert('Preencha o campo Email');
        return null;
    }

    if(senha === ""){
        window.alert('Preencha o campo Senha');
        return null;
    }

    const response = await fetch(`${urlServer}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(res => res.json())
    .then(usuario => {
        
       if(usuario.Email === email && usuario.Senha === senha){
        window.alert('Login feito com sucesso!');

        // se manterConectado estiver selecionado as informações serão adicionadas ao localStorage, 
        // ainda n sei sugerir o autoComplete das infos no login
        if(manterConectado){
            localStorage.setItem('id', usuario.Usuario_id);
            localStorage.setItem('senha', senha);
            localStorage.setItem('email', email);
            localStorage.setItem('nome', usuario.Nome_usuario);
        }
       window.location.href = 'home-logado.html';
       } else {
        window.alert('Login falhou. Verifique o email e senha.');
        email.value = "";
        senha.value = "";
       }
    })
    .catch(error => console.log(error))
 
}
