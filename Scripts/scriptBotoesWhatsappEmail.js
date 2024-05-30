function addButtonEventListeners() {
    // Adiciona o evento de clique para o botão de WhatsApp
    document.getElementById('contact-whatsapp').addEventListener('click', () => {
        alert(`Aviso Importante: As informações de contato exibidas aqui, incluindo e-mail e WhatsApp, são confidenciais e devem ser tratadas com responsabilidade. Lembre-se de que o uso indevido dessas informações pode ter consequências legais. Pedimos que você as utilize com respeito e consideração pelo direito à privacidade do indivíduo. Obrigado pela sua compreensão. 
       
    E - mail: robertaFerreira@gmail.com`);
    });

    // Adiciona o evento de clique para o botão de Email
    document.getElementById('contact-email').addEventListener('click', () => {
        alert(`Aviso Importante: As informações de contato exibidas aqui, incluindo e-mail e WhatsApp, são confidenciais e devem ser tratadas com responsabilidade. Lembre-se de que o uso indevido dessas informações pode ter consequências legais. Pedimos que você as utilize com respeito e consideração pelo direito à privacidade do indivíduo. Obrigado pela sua compreensão. 
       
    Telefone: (15) 99623 - 4090`);
    });
}




const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

const whatsappAlertTrigger = document.getElementById('contact-whatsapp')
if (whatsappAlertTrigger) {
    whatsappAlertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'dark')
    })
}

const emailAlertTrigger = document.getElementById('contact-email')
if (emailAlertTrigger) {
    emailAlertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'success')
    })
}

// Verifica se a função de adicionar eventos foi definida antes de chamar
if (typeof addButtonEventListeners === 'function') {
    addButtonEventListeners();
}


