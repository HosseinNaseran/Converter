const dropArea = document.querySelector(".drop-area");
const fileInput = document.getElementById('upload');
const previewImage = document.getElementById('preview');
const downloadLink = document.getElementById('download');
const ads = document.getElementById('ads');
const subText = document.querySelector('.sub');


dropArea.addEventListener("click", function (e) {

    if (e.target.tagName !== "INPUT") {
        fileInput.click();
    }
});


fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        resetUI();
        return;
    }

    
    subText.textContent = `✅ ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    subText.style.color = "#2DD4BF";

    
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
                ads.style.display = "inline-block";
                previewImage.src = url;
                previewImage.style.display = 'block';
                previewImage.style.borderRadius = "25px";
            }, 'image/webp', 0.9);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
});


dropArea.addEventListener('dragenter', function () {
    dropArea.style.borderColor = '#2DD4BF';
    dropArea.style.background = 'rgba(45, 212, 191, 0.05)';
});

dropArea.addEventListener('dragover', function () {
    dropArea.style.borderColor = '#2DD4BF';
    dropArea.style.background = 'rgba(45, 212, 191, 0.05)';
});

dropArea.addEventListener('dragleave', function (e) {
    const related = e.relatedTarget;
    if (!dropArea.contains(related)) {
        dropArea.style.borderColor = '#616172';
        dropArea.style.background = 'transparent';
    }
});

dropArea.addEventListener('drop', function (e) {
    dropArea.style.borderColor = '#616172';
    dropArea.style.background = 'transparent';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const dataTransfer = new DataTransfer();
        for (const f of files) {
            dataTransfer.items.add(f);
        }
        fileInput.files = dataTransfer.files;
    
        fileInput.dispatchEvent(new Event('change'));
    }
});


function resetUI() {
    subText.textContent = 'PNG . JPEG . WebP . GIF . BMP . TIFF';
    subText.style.color = '#7a88aa';
    previewImage.style.display = 'none';
    downloadLink.style.display = 'none';
    ads.style.display = 'none';
    previewImage.src = '';
    downloadLink.href = '#';
}