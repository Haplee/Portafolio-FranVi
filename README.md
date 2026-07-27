# Portafolio · Fran Vidal (Haplee)

Portafolio de una sola página construido con **React 19 + Vite + Tailwind CSS 4**.

Sitio en producción: <https://haplee.github.io/Portafolio-FranVi/>

## Cómo está pensado

La página no sigue la plantilla habitual de portafolio (hero → skills → rejilla de
proyectos → CTA). Con cero experiencia profesional esa estructura obliga a rellenar
secciones vacías, así que aquí la columna vertebral es **un proyecto contado entero**
—ResolveCore, el TFG— y el resto orbita a su alrededor:

| # | Sección | Responde a |
|---|---------|-----------|
| 1 | Apertura | qué eres, qué buscas, dónde |
| 2 | ResolveCore | qué has construido, y con qué criterio |
| 3 | Competencias | qué sabes hacer, anclado a dónde lo hiciste |
| 4 | Trayectoria | de dónde vienes |
| 5 | Contacto | cómo te escribo y hasta dónde te desplazas |

Reglas del sistema visual, en `src/index.css`:

- **Un solo acento** (oro `#d9a441`), reservado a elemento activo, dato clave y enlace.
  Sale del color con el que el cielo 3D dibuja Cáncer.
- **Dos voces tipográficas**: Outfit para leer, JetBrains Mono como *voz de contenido*
  (stack, fechas, rutas) — no como adorno.
- **Escala tipográfica de 6 pasos** (`text-fine`, `text-s0` … `text-s4`) y **escala de
  espaciado vertical de 4** (`py-tight` … `py-major`): cada sección recibe el peso que
  merece en lugar de que todas midan lo mismo.
- **Superficies planas**: bordes de 1 px y contraste de fondo. Sin `backdrop-filter`,
  sin glass, sin glows, sin sombras de color.
- **Nada de movimiento infinito.** Solo entrada (una vez, 12 px) y respuesta al foco o
  al puntero. La única excepción es el cielo 3D de la apertura, que es ambiente.
  Todo se anula con `prefers-reduced-motion`.

## Stack

- **React 19** + **TypeScript** (modo `strict`)
- **Vite 7** como bundler (build a `docs/` para GitHub Pages)
- **Tailwind CSS 4** (vía `@tailwindcss/vite`, tokens en `@theme`)
- **Three.js** — cielo de constelaciones de la apertura (WebGL, shaders propios).
  Chunk diferido; en móvil no se carga y se usa el fondo CSS de `StaticSky`.
- **Leaflet** — mapa del radio de desplazamiento (CartoDB Dark Matter). Chunk diferido.
- **Motion** — animaciones de entrada, con `reducedMotion="user"`

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
  components/          Una sección por archivo: Opening, CaseStudy,
                       Competencies, Path, Contact, Footer, Navbar
    ui/                Piezas visuales (cielo 3D, cielo estático, mapa, Reveal)
  hooks/               useIsMobile, useScrollSpy
  i18n/                es.ts (fuente de verdad), en.ts, LangProvider
  lib/                 Utilidades (cn)
  index.css            Tokens del sistema visual y utilidades globales
```

Todo el texto vive en `src/i18n/es.ts`; `en.ts` implementa el tipo `Dict` derivado de
él, así que TypeScript falla si una traducción se queda atrás. Los componentes iteran
directamente sobre el diccionario: no hay arrays de metadatos acoplados por índice.

## Despliegue (GitHub Pages)

`npm run build` genera el sitio en `docs/`. En **Settings → Pages** del repositorio,
selecciona `Deploy from a branch`, rama `main` y carpeta `/docs`.

## Datos externos

Ninguno en tiempo de ejecución. Las tarjetas de repositorio en vivo se retiraron: la
API pública de GitHub (60 peticiones/hora por IP) devolvía descripciones solo en
español y contadores a 0, y el texto curado que hay ahora dice más. Las únicas
peticiones a terceros son las fuentes de Google Fonts, el avatar de GitHub y las
teselas del mapa.
