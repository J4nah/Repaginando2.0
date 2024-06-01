function confirmaSenha(){
    const senha = document.getElementById('senha').value;

    const senhaConfirm = document.getElementById('confirmarSenha').value;
    if(senha === "" || senhaConfirm === ""){
        window.alert('Algum campo de senha está em branco');
        return null
    }

    if(senha === senhaConfirm){
        return true
    }else{
        return false
    }
}