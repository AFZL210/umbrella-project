// [color, background color]
const themeColors = {
    'Pink': ['#ff1493', '#e2a9cd'],
    'Blue': ['#00a5ec', '#e7f6fc'],
    'Yellow': ['#feb13f', '#fef5eb']
};

document.addEventListener('DOMContentLoaded', () => {
    const umbrella = document.getElementById('umbrella');
    const logo = document.getElementById('logo');
    const loader = document.getElementById('loader');
    const uploadInput = document.getElementById('logo-upload');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const uploadIcon = document.getElementById('upload-icon');
    const uploadText = document.getElementById('upload-text');
    const fileName = document.getElementById('file-name');
    const removeLogoBtn = document.getElementById('remove-logo');

    let currentLogoFile = null;

    const updateTheme = (color) => {
        document.documentElement.style.setProperty('--theme-color', themeColors[color][0]);
        document.documentElement.style.setProperty('--background-color', themeColors[color][1]);
    };

    const showLoader = () => {
        loader.classList.remove('hidden');
        umbrella.style.opacity = '0';
    };

    const hideLoader = () => {
        loader.classList.add('hidden');
        umbrella.style.opacity = '1';
    };

    const hideLogo = () => {
        logo.classList.add('hidden');
    };

    const showLogo = () => {
        if (currentLogoFile) {
            logo.classList.remove('hidden');
        }
    };

    const updateUploadButton = (isLoading = false) => {
        if (isLoading) {
            uploadIcon.src = './assets/icons/loader_icon.svg';
            uploadIcon.classList.remove('loader');
            uploadIcon.classList.add('upload-btn-loader');
            uploadText.classList.add('hidden');
            fileName.classList.remove('hidden');
        } else if (currentLogoFile) {
            uploadIcon.classList.remove('loader');
            uploadIcon.classList.remove('upload-btn-loader');
            uploadIcon.src = './assets/icons/upload_icon.svg';
            uploadText.classList.add('hidden');
            fileName.classList.remove('hidden');
            fileName.textContent = currentLogoFile.name;
            removeLogoBtn.classList.remove('hidden');
        } else {
            uploadIcon.classList.remove('loader');
            uploadIcon.src = './assets/icons/upload_icon.svg';
            uploadText.classList.remove('hidden');
            fileName.classList.add('hidden');
            removeLogoBtn.classList.add('hidden');
            uploadText.textContent = 'UPLOAD LOGO';
        }
    };

    const changeUmbrellaColor = (color) => {
        showLoader();
        hideLogo();

        if (currentLogoFile) {
            updateUploadButton(true);
        }

        setTimeout(() => {
            umbrella.src = `assets/umbrella/${color}.png`;
            updateTheme(color);
            hideLoader();
            showLogo();
            if (currentLogoFile) {
                updateUploadButton(false);
            }
        }, 1000);
    };

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            changeUmbrellaColor(swatch.dataset.color);
        });
    });

    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            showLoader();
            updateUploadButton(true);

            const reader = new FileReader();
            reader.onload = (event) => {
                setTimeout(() => {
                    currentLogoFile = file;
                    logo.src = event.target.result;
                    showLogo();
                    hideLoader();
                    updateUploadButton();
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    });

    removeLogoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentLogoFile = null;
        hideLogo();
        updateUploadButton();
        uploadInput.value = '';
    });

    umbrella.addEventListener('load', hideLoader);
});
