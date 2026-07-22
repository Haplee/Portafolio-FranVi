# Portafolio · Fran Vidal (Haplee)

Portafolio personal de una sola página construido con **React 19 + Vite + Tailwind CSS 4**.
Incluye un cielo de constelaciones en **Three.js**, un mapa de Barbate con **Leaflet**,
scroll suave con **Lenis** y animaciones con **Motion**. Los proyectos y las contribuciones
se cargan en vivo desde la API de GitHub.

Sitio en producción: <https://haplee.github.io/>

## Stack

- **React 19** + **TypeScript** (modo `strict`)
- **Vite 7** como bundler (build a `docs/` para GitHub Pages)
- **Tailwind CSS 4** (vía `@tailwindcss/vite`)
- **Three.js** — hero con constelaciones y estrellas fugaces (WebGL, shaders propios)
- **Leaflet** — mapa oscuro de Barbate (CartoDB Dark Matter)
- **Lenis** — scroll suave
- **Motion** — animaciones de entrada y transiciones
- **OGL** — partículas ligeras en algunos fondos

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo (Vite)
npm run build     # type-check + build de producción a docs/
npm run preview   # sirve el build de docs/
npm run lint      # ESLint
```

## Estructura

```
src/
  components/          Secciones de la página (Hero, About, Projects, …)
    reactbits/         Efectos de texto reutilizables (BlurText, ShinyText, …)
    ui/                Componentes visuales (mapa, constelaciones, gráficos)
  hooks/               Hooks de datos y comportamiento (GitHub, Lenis, scroll-spy, …)
  lib/                 Utilidades (cn, etc.)
  types/               Tipos compartidos
  index.css            Estilos globales y utilidades Tailwind
```

## Despliegue (GitHub Pages)

`npm run build` genera el sitio en `docs/`. En **Settings → Pages** del repositorio,
selecciona `Deploy from a branch`, rama `main` y carpeta `/docs`.

## Datos externos

- **Repositorios:** `https://api.github.com/users/Haplee/repos` (API pública, sin token;
  límite de 60 peticiones/hora por IP).
- **Contribuciones:** `https://github-contributions-api.jogruber.de`.
