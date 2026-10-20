# Portafolio · Fran Vidal (Haplee)

Portafolio de una sola página construido con **React 19 + Vite + Tailwind CSS 4**.

Sitio en producción: <https://franvi.runs-on.dev/>

## Dirección visual

El portfolio usa una estética editorial oscura con acento rojo/coral. La portada prioriza identidad y claridad; ResolveCore funciona como caso de estudio; el resto de proyectos se presenta como un índice técnico editorial. No se utilizan grids de tarjetas repetitivas, mapas interactivos ni animaciones continuas.

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
| 5 | Catálogo | qué más has terminado, filtrable y buscable |
| 6 | Cierre y contacto | cómo te escribo y hasta dónde te desplazas |

Reglas del sistema visual, en `src/index.css`:

- **Un solo acento** (coral `#ff4d6d`), reservado a elemento activo, dato clave y enlace.
- **Dos voces tipográficas**: Sora para leer, IBM Plex Mono como *voz de contenido*
  (stack, fechas, rutas), no como adorno. Ambas se sirven desde `src/assets/fonts`.
- **Superficies planas**: bordes de 1 px y contraste de fondo. Sin `backdrop-filter`,
  sin glass, sin glows, sin sombras de color.
- **Movimiento medido.** Entradas cortas y respuesta al foco o al puntero, sin bucles.
  Todo se anula con `prefers-reduced-motion`.

## Stack

- **React 19** + **TypeScript** (modo `strict`)
- **Vite 7** como bundler (build a `docs/` para GitHub Pages)
- **Tailwind CSS 4** (vía `@tailwindcss/vite`, tokens en `@theme`)
- **Motion** para las transiciones del catálogo, con `reducedMotion="user"`
- Sin Three.js, sin Leaflet y sin mapas: la apertura es CSS puro.

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
  components/          Una sección por archivo: Opening, ResolveCore,
                       Competencies, Timeline, ProjectCatalog, Contact,
                       Closing, Footer, Navbar
    ui/                Piezas compartidas (terminal, telemetría, diagramas,
                       botón de volver arriba)
  hooks/               useIsMobile, useScrollSpy
  i18n/                es.ts (fuente de verdad), en.ts, LangProvider
  lib/                 Utilidades (cn)
  assets/fonts/        Sora e IBM Plex Mono, servidas en local
  index.css            Tokens del sistema visual y utilidades globales
```

Todo el texto vive en `src/i18n/es.ts`; `en.ts` implementa el tipo `Dict` derivado de
él, así que TypeScript falla si una traducción se queda atrás. Los componentes iteran
directamente sobre el diccionario: no hay arrays de metadatos acoplados por índice.

## Despliegue (GitHub Pages)

`npm run build` genera el sitio en `docs/`. En **Settings → Pages** del repositorio,
selecciona `Deploy from a branch`, rama `main` y carpeta `/docs`.

## Datos externos

Sin datos en tiempo de ejecución. Las tarjetas de repositorio en vivo se retiraron: la
API pública de GitHub (60 peticiones/hora por IP) devolvía descripciones solo en
español y contadores a 0, y el texto curado que hay ahora dice más. La única petición externa es el avatar de
GitHub; las fuentes se sirven desde el propio dominio.
