/* document.getElementById('update-photo').addEventListener('change', handleFileSelect);

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
                document.getElementById('profile-photo-preview').src = dataUrl;
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}
 */