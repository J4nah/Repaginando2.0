function handleImage(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        var img = document.createElement('img');
        img.src = reader.result;
        img.style.width = '145px';
        img.style.height = '137px';
        var div = document.getElementById('imageContainer' + event.target.id.substring(4));
        div.innerHTML = '';
        div.appendChild(img);
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        img.src = "";
    }
}

// Adicione um ouvinte de evento para cada input de arquivo
for (var i = 1; i <= 5; i++) { // Altere o número 5 para o número total de componentes
    document.getElementById('file' + i).addEventListener('change', handleImage, false);
}
