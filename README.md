# Portafolio Personal con API de GitHub

Este es un portafolio personal de una sola página que muestra tu información de perfil y tus 6 repositorios más recientes de GitHub. Está diseñado para ser visualmente atractivo, con un tema oscuro, un efecto de neón y un diseño responsivo.

## Características

-   **Tema oscuro con degradado:** Un fondo oscuro y elegante.
-   **Efecto de neón:** Tu nombre resalta con un llamativo efecto de neón amarillo.
-   **Diseño responsivo:** Se ve genial tanto en dispositivos de escritorio como en móviles.
-   **Dinámico:** Carga automáticamente tu información de perfil y tus repositorios más recientes desde la API de GitHub.
-   **Personalizable:** Fácil de configurar con tu propio nombre de usuario de GitHub.

## Cómo usarlo

1.  **Clona o descarga este repositorio.**
2.  **Abre `index.html` en tu navegador.**
    -   ¡Y eso es todo! Tu portafolio ahora mostrará tu información.

## Actualizar los datos de GitHub

Este portafolio carga los datos de perfil y repositorios desde el archivo local `github-data.json`. Para actualizar esta información con los datos más recientes de tu perfil de GitHub, sigue estos pasos:

1.  **Abre una terminal o línea de comandos.**
2.  **Ejecuta los siguientes comandos para obtener los datos más recientes de la API de GitHub:**
    ```bash
    # Reemplaza 'tu-nombre-de-usuario' con tu nombre de usuario de GitHub
    USERNAME="tu-nombre-de-usuario"

    # Obtener datos del perfil
    curl "https://api.github.com/users/$USERNAME" > user.json

    # Obtener datos de los repositorios
    curl "https://api.github.com/users/$USERNAME/repos" > repos.json
    ```
3.  **Combina los archivos en `github-data.json`:**
    -   Abre el archivo `github-data.json` en un editor de texto.
    -   Reemplaza el contenido del objeto `user` con el contenido de `user.json`.
    -   Reemplaza el contenido del array `repos` con el contenido de `repos.json`.
    -   Guarda el archivo `github-data.json`.

Después de seguir estos pasos, tu portafolio mostrará la información más reciente.

## Tecnologías utilizadas

-   **HTML5:** Para la estructura de la página.
-   **CSS3:** Para los estilos, incluyendo Flexbox, Grid, media queries y animaciones.
-   **JavaScript (ES6):** Para interactuar con la API de GitHub y manipular el DOM.

## Vista previa

Puedes abrir el archivo `index.html` localmente para ver cómo se ve. Para una demostración en vivo, puedes alojar estos archivos en servicios como GitHub Pages, Netlify o Vercel.
