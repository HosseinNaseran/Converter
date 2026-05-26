
const fileInput = document.getElementById('upload');
const previewImage = document.getElementById('preview');
const downloadLink = document.getElementById('download');
const ads = document.getElementById('ads')

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;


    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;


            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function (blob) {

                const url = URL.createObjectURL(blob);


                downloadLink.href = url;
                downloadLink.style.display = 'inline-block';
                ads.style.display = "inline-block"

                previewImage.src = url;
                previewImage.style.display = 'block';
                previewImage.style.borderRadius = "25px"

            }, 'image/webp', 0.9);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});