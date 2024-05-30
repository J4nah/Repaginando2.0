const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
}

const emailTrigger = document.getElementById('emailAlertBtn');
if (emailTrigger) {
    emailTrigger.addEventListener('click', () => {
        appendAlert(`Aviso Importante: As informações de contato exibidas aqui, incluindo e-mail e WhatsApp, são confidenciais e devem ser tratadas com responsabilidade. Lembre-se de que o uso indevido dessas informações pode ter consequências legais. Pedimos que você as utilize com respeito e consideração pelo direito à privacidade do indivíduo. Obrigado pela sua compreensão. 
       \n
       ***********Telefone: (15) 99623 - 4090`, 'dark');
    });
}

const whatsappTrigger = document.getElementById('whatsappAlertBtn');
if (whatsappTrigger) {
    whatsappTrigger.addEventListener('click', () => {
        appendAlert(`Aviso Importante: As informações de contato exibidas aqui, incluindo e-mail e WhatsApp, são confidenciais e devem ser tratadas com responsabilidade. Lembre-se de que o uso indevido dessas informações pode ter consequências legais. Pedimos que você as utilize com respeito e consideração pelo direito à privacidade do indivíduo. Obrigado pela sua compreensão. 
       \n
      ***********  E - mail: robertaFerreira@gmail.com`, 'dark');
    });
}
