document.getElementById('telefone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '');
    var match;

    if (x.length > 11) {
        // Formato internacional +55 (XX) XXXXX-XXXX
        match = x.match(/(\d{0,2})(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !match[2] ? '+' + match[1] : '+' + match[1] + ' (' + match[2] + ') ' + match[3] + (match[4] ? '-' + match[4] : '');
    } else {
        // Formato nacional (XX) XXXXX-XXXX
        match = x.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !match[2] ? match[1] : '(' + match[1] + ') ' + match[2] + (match[3] ? '-' + match[3] : '');
    }
});