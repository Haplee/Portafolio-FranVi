# Corregir ResolveCore y sustituir las animaciones por un Stepper responsivo

## Objetivo

Eliminar todas las apariciones progresivas y gráficos experimentales que impiden leer el contenido, conservar el panel destacado de ResolveCore y reemplazar el circuito defectuoso por un Stepper de cinco fases basado en React Bits. La animación principal debe ocurrir únicamente cuando el usuario cambia de fase, nunca por scroll.

## Decisiones confirmadas

1. Quitar por completo los reveals, parallax, animaciones de ejes tipográficos, anillos de competencias, sparklines y progreso de la trayectoria.
2. Conservar el panel destacado de la apertura, pero rediseñarlo para que sea legible en escritorio y móvil.
3. Mostrar las cinco fases de ResolveCore: Solicitud, Ticket, Conexión remota, Diagnóstico e Informe. No usar `flow.slice(0, 3)`.
4. Usar el componente Stepper oficial de React Bits como base de la animación principal.
5. En escritorio, mostrar las cinco fases en una fila de anchos iguales y con texto completo. En móvil, usar una lista vertical completa y legible.
6. Mantener el contenido visible al subir o bajar la página; no depender de IntersectionObserver ni de `animation-timeline`.
7. Mantener la dirección visual existente: fondo oscuro técnico, una sola línea de acento cyan, Sora + IBM Plex Mono, sin glass, gradientes genéricos, Three.js ni Leaflet.

## Referencia externa

Usar como punto de partida el código TypeScript + Tailwind oficial:

- Componente: `https://reactbits.dev/components/stepper`
- Fuente TS-TW: `https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-tailwind/Components/Stepper/Stepper.tsx`
- React Bits es una biblioteca gratuita de código abierto. Su licencia es MIT + Commons Clause; permite integrarlo en una web, pero no vender, sublicenciar ni redistribuir el componente por separado. Conservar el aviso de licencia correspondiente en el código incorporado o en la documentación legal del proyecto.

No instalar una biblioteca completa ni añadir Three.js/GSAP. El proyecto ya tiene `motion`, que es la dependencia que usa el Stepper.

## Tareas de implementación

### 1. Eliminar las animaciones defectuosas

- En `src/index.css`, eliminar:
  - `@property --font-weight`, `--font-stretch`, `--ring-progress` y `--scroll-progress` si dejan de usarse.
  - Los bloques `@supports (animation-timeline: ...)`.
  - `reveal-up`, `reveal-up-delay-*`, `parallax-slow`, `font-weight-expand`, `font-stretch-expand`, `ring-draw`, `timeline-progress`, `sparkline-draw` y sus keyframes.
- Quitar esas clases de `Opening`, `ResolveCore`, `ProjectCatalog`, `Competencies`, `Timeline`, `Contact` y `Closing`.
- Eliminar la importación innecesaria de `motion` de `Opening` si solo se usaba para la entrada inicial.
- Mantener únicamente transiciones cortas de foco, hover y cambio de fase; conservar `prefers-reduced-motion`.

### 2. Limpiar los gráficos experimentales

- En `Competencies.tsx`, volver a una matriz de competencias legible sin anillos ni porcentajes inventados.
- Eliminar `level` de cada skill en `src/i18n/es.ts` y `src/i18n/en.ts`.
- En `ProjectCatalog.tsx`, eliminar el componente `Sparkline`, su SVG y el bloque de “Actividad”.
- Eliminar los arrays `sparkline` de todos los proyectos en ambos diccionarios i18n.
- En `Timeline.tsx`, eliminar el pseudo-elemento/elemento de progreso y conservar una línea temporal estática con buena separación y alineación.

### 3. Crear un Stepper de soporte reutilizable

- Crear `src/components/ui/SupportStepper.tsx` a partir del Stepper oficial de React Bits, adaptado a los datos de `t.work.flow`.
- No copiarlo ciegamente: el componente oficial tiene indicadores implementados como `motion.div`, no ofrece semántica completa de tabs y está pensado para un contenedor estrecho. Corregir:
  - botones reales para cada fase;
  - `role="tablist"`, `role="tab"` y `role="tabpanel"`;
  - `aria-selected`, `aria-controls` y `aria-labelledby`;
  - foco visible y tabindex rotativo;
  - teclado `ArrowRight`, `ArrowLeft`, `Home` y `End`;
  - transición de contenido activada solo por clic/teclado;
  - sin estado “Complete” ni botones “Back/Continue” que no aporten al caso de estudio.
- Mantener una animación breve y controlada (aprox. 180-240 ms) entre fases, con fallback estático bajo `prefers-reduced-motion`.
- No usar altura fija, `overflow: hidden` que corte texto ni posicionamiento absoluto que saque el panel del flujo. El panel debe crecer con su contenido y conservar todo el texto.

### 4. Integrar las cinco fases en el panel destacado

- En `Opening.tsx`, pasar `t.work.flow` completo al Stepper; eliminar `flow.slice(0, 3)`.
- El panel debe tener `min-w-0`, padding suficiente y contenedores que permitan el salto de línea de nombres y resúmenes.
- En escritorio (`lg`):
  - conservar la composición asimétrica de 12 columnas;
  - colocar las cinco fases en una fila de cinco columnas iguales dentro del panel;
  - mostrar número, nombre y resumen sin truncar;
  - situar el detalle activo debajo, con ancho completo.
- En móvil:
  - apilar el contenido en una columna;
  - mostrar las cinco fases como lista vertical completa;
  - evitar scroll horizontal y solapamiento con la barra inferior;
  - mantener el detalle siempre visible bajo la fase activa;
  - eliminar `sticky` en móvil y reservarlo, si procede, solo para escritorio.
- Reutilizar el mismo `SupportStepper` en `ResolveCore.tsx` para que apertura y caso completo no diverjan.

### 5. Ajustar la composición y el contenido

- Revisar el ancho del panel de apertura y la retícula para que el Stepper no quede comprimido.
- Usar saltos de línea naturales, `overflow-wrap` cuando sea necesario y tamaños de fuente que no obliguen a recortar textos largos.
- Comprobar que los enlaces, el badge, el título y el texto descriptivo no colisionen con las fases.
- Mantener intactos los hechos, repositorios, CV, navegación, idiomas y textos i18n; no añadir métricas ni afirmaciones nuevas.

## Validación obligatoria

1. Ejecutar `npm run lint` y `npm run build`.
2. Verificar en escritorio (aprox. 1440 px y 1280 px), tablet (768 px) y móvil (390 px):
   - las cinco fases son visibles y legibles;
   - ningún texto queda cortado ni se superpone;
   - el panel no provoca scroll horizontal;
   - al hacer scroll hacia arriba y hacia abajo todo el contenido permanece visible;
   - la barra de navegación móvil no tapa el contenido.
3. Probar el Stepper con teclado: Tab, flechas, Home, End y foco visible.
4. Probar ambos idiomas y confirmar que los nombres de las fases cambian correctamente.
5. Activar `prefers-reduced-motion` y confirmar que el contenido sigue completamente accesible.
6. Buscar usos residuales de `reveal-up`, `animation-timeline`, `sparkline`, `level`, anillos SVG y progreso de timeline.

## Riesgos y criterios de aceptación

- React Bits Stepper es una base visual, no una solución accesible lista para pegar; la adaptación semántica es obligatoria.
- La licencia permite usar el componente dentro del portafolio, pero no redistribuirlo como producto independiente.
- La animación debe ser un detalle funcional del flujo de soporte, no una capa decorativa ni un efecto continuo.
- Cierre aceptado cuando las cinco fases se puedan recorrer en escritorio y móvil, todo el texto sea legible, no haya desaparición por scroll y el proyecto pase lint/build.
