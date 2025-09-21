document.addEventListener('DOMContentLoaded', () => {
    const adminPanel = document.getElementById('admin');
    const cvUploadInput = document.getElementById('cv-upload');
    const saveCvButton = document.getElementById('save-cv');
    const uploadStatus = document.getElementById('upload-status');

    // --- ADMIN PANEL VISIBILITY ---
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key === 'a') {
            const isHidden = adminPanel.style.display === 'none' || adminPanel.style.display === '';
            adminPanel.style.display = isHidden ? 'block' : 'none';
        }
    });

    // --- CV HANDLING ---
    saveCvButton.addEventListener('click', () => {
        const file = cvUploadInput.files[0];
        if (!file) {
            uploadStatus.textContent = 'Por favor, selecciona un archivo PDF.';
            uploadStatus.style.color = 'red';
            return;
        }

        if (file.type !== 'application/pdf') {
            uploadStatus.textContent = 'El archivo debe ser un PDF.';
            uploadStatus.style.color = 'red';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileData = event.target.result;
            try {
                localStorage.setItem('cvData', fileData);
                uploadStatus.textContent = 'CV guardado con éxito. Refresca la página para ver los cambios.';
                uploadStatus.style.color = 'green';

                // Recargar para que el botón de descarga principal se actualice
                setTimeout(() => {
                    location.reload();
                }, 2000);

            } catch (error) {
                console.error('Error al guardar en localStorage:', error);
                uploadStatus.textContent = 'Error al guardar el CV. El archivo puede ser demasiado grande.';
                uploadStatus.style.color = 'red';
            }
        };
        reader.onerror = () => {
            console.error('Error al leer el archivo.');
            uploadStatus.textContent = 'No se pudo leer el archivo.';
            uploadStatus.style.color = 'red';
        };
        reader.readAsDataURL(file);
    });
});
