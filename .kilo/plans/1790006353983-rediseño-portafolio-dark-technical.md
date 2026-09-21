# Rediseño del portafolio Fran Vidal

## Lectura de diseño

Portafolio técnico para reclutadores y responsables técnicos, con una voz editorial de marca personal. La evidencia real del trabajo debe liderar la experiencia; la composición debe sentirse diseñada por una persona, no como una plantilla oscura de tarjetas.

## Contexto verificado

- Proyecto React 19 + TypeScript + Vite 7 + Tailwind CSS 4.
- La implementación actual concentra la página en `src/components/BentoGrid.tsx` y usa una cuadrícula asimétrica de módulos oscuros.
- `src/index.css` define Outfit + JetBrains Mono, fondo casi negro, líneas de 1 px y acento dorado.
- La apertura usa `StaticSky` / `ConstellationSky3D`; la disponibilidad usa `LocationMap` con Leaflet.
- El contenido real y los enlaces están en `src/i18n/es.ts` y `src/i18n/en.ts`.
- El README describe una narrativa lineal, pero no coincide con la implementación actual; la realidad del código es la fuente de verdad.
- No hay una dirección visual documentada en `DESIGN.md`.

## Decisiones confirmadas

1. **Alcance:** rediseñar contenido, composición y mundo visual, no solo la piel.
2. **Lector principal:** reclutadores y responsables técnicos, con personalidad editorial suficiente para que la marca personal sea memorable.
3. **Narrativa:** la evidencia del trabajo lidera; ResolveCore es la prueba central y el resto de proyectos la amplía.
4. **Límites:** conservar hechos verificables, proyectos, repositorios, CV, navegación, español/inglés y accesibilidad. Se permite reorganizar y reescribir para claridad.
5. **Mundo visual:** «oscuro técnico reinventado»; abandonar la cuadrícula oscura actual sin caer en una plantilla centrada, glassmorphism, gradientes azul/violeta ni tarjetas repetidas.
6. **Material visual:** sistema gráfico técnico propio basado en diagramas, flujos, esquemas y registros visuales; no usar capturas genéricas ni ilustraciones decorativas.
7. **Movimiento:** una interacción o transición principal con función narrativa; el resto debe ser discreto, sin bucles infinitos y compatible con `prefers-reduced-motion`.
8. **Color:** sistema casi monocromo. Eliminar el dorado como color de marca; reservar un único color funcional para acciones, estados activos y datos críticos.
9. **Activos actuales:** reemplazar tanto el cielo 3D como el mapa de disponibilidad. La ubicación debe comunicarse con datos y composición, no con Leaflet.
10. **Tipografía:** sustituir Outfit + JetBrains Mono por una sans técnica con más personalidad y una mono de trabajo. Autoalojar las fuentes y comprobar contraste, peso óptico y rendimiento.

## Dirección de implementación

### 1. Sistema visual

- Crear tokens semánticos para fondo, superficie, línea, texto principal, texto secundario, texto técnico y acento funcional.
- Usar una paleta casi monocroma con variaciones de valor y textura gráfica, no varios colores decorativos.
- Definir una jerarquía tipográfica con una sans de carácter para titulares y una mono para rutas, estados, fechas y datos técnicos.
- Mantener filetes de 1 px cuando comuniquen estructura; usar espacio, escala y alineación para la jerarquía.
- Eliminar sombras, brillos, glass, gradientes genéricos y radios inconsistentes.
- Establecer una retícula de 12 columnas con anchos desiguales y composiciones asimétricas; en móvil, colapsar explícitamente a una columna legible.

### 2. Nueva composición

- **Apertura:** composición partida o de registro técnico, no hero centrado. Presentar nombre, rol y disponibilidad junto a una prueba inmediata de ResolveCore. El visitante debe entender quién es Fran, qué problema resuelve y cómo contactarlo sin recorrer toda la página.
- **ResolveCore:** convertirlo en el caso central. Mostrar el circuito de soporte como un diagrama interactivo con cinco fases y una inspección técnica por fase. La interacción principal de la web debe vivir aquí.
- **Catálogo de proyectos:** tratarlo como un registro o índice técnico, no como una rejilla de tarjetas iguales. Mantener filtros por categoría, pero variar la densidad y la forma de cada entrada según su contenido.
- **Competencias:** presentar una matriz de capacidad donde cada herramienta esté vinculada a un proyecto, servidor, cliente o laboratorio real.
- **Trayectoria:** usar una línea temporal editorial con hitos desiguales, evitando la repetición de filas idénticas.
- **Contacto:** mostrar Barbate, radio de desplazamiento y canales directos mediante datos y composición; eliminar el mapa interactivo sin perder la información que aportaba.
- **Cierre:** un llamado a la acción directo y una referencia discreta al código fuente. No repetir el menú social del contacto.

### 3. Gráficos técnicos propios

- Crear componentes gráficos reutilizables para: circuito de soporte, arquitectura de ResolveCore, inventario de sistemas, estado de proyectos y disponibilidad.
- Preferir SVG/CSS semántico para diagramas y líneas; usar canvas solo si una pieza requiere densidad o animación real.
- Cada gráfico debe explicar un hecho del proyecto. No añadir decoración que no ayude a entender el trabajo.
- Mantener etiquetas, estados y relaciones legibles en español e inglés.

### 4. Archivos y dependencias

- Reestructurar `src/App.tsx` y `src/components/BentoGrid.tsx` o sustituir `BentoGrid` por una arquitectura de secciones más clara.
- Revisar `Navbar` y `Footer` para que entren en la nueva composición y no repitan patrones del sistema anterior.
- Reescribir los tokens y reglas globales en `src/index.css`.
- Actualizar `index.html` para eliminar el cargador de Google Fonts si las nuevas fuentes se autoalojan.
- Mantener la fuente de verdad bilingüe en `src/i18n/es.ts` y `src/i18n/en.ts`; añadir solo las cadenas necesarias para la nueva composición.
- Tras reemplazar cielo y mapa, buscar usos de `three`, `leaflet` y sus tipos; eliminar dependencias y chunks solo si quedan sin uso.

## Interacción y accesibilidad

- La navegación debe conservar saltos por sección, indicador activo, enlace al contenido y selector ES/EN.
- El circuito de ResolveCore debe ser usable con teclado, tener `aria-selected`/estado equivalente y foco visible.
- Mantener skip link, landmarks, texto alternativo, orden de lectura y contraste WCAG AA.
- El movimiento principal debe activarse una vez o responder a una acción concreta; no debe depender de scroll continuo ni de puntero.
- Añadir fallback estático bajo `prefers-reduced-motion` y comprobar la página sin JavaScript cuando sea razonable.
- Reservar espacio para fuentes y gráficos para evitar CLS.

## Validación obligatoria

1. Ejecutar `npm run lint`.
2. Ejecutar `npm run build`.
3. Revisar en escritorio y móvil las secciones principales, con especial atención a la apertura, ResolveCore, catálogo, competencias, trayectoria y contacto.
4. Comprobar ambos idiomas, enlaces externos, CV, foco con teclado y reducción de movimiento.
5. Auditar que no queden patrones del sistema anterior: bento genérico, dorado decorativo, cielo 3D, mapa Leaflet, Outfit/JetBrains Mono o motion repetido.
6. Verificar que todos los gráficos representen información real y que ninguna afirmación comercial haya sido inventada.

## Riesgos y decisiones de ejecución

- El script de dirección de Impeccable no pudo ejecutarse porque el agente no tiene permiso de shell; la dirección queda fijada por las decisiones confirmadas del usuario y debe tratarse como dirección aprobada. Si el agente de implementación recupera ese permiso, puede ejecutar el seed sin cambiar la dirección ya elegida.
- La selección concreta de las nuevas fuentes queda abierta dentro del criterio acordado: sans técnica con personalidad + mono de trabajo, autoalojada y con contraste verificado.
- Al retirar el cielo y el mapa, hay que conservar la información de ubicación y disponibilidad; no basta con eliminar los componentes.
- Los diagramas deben ser material de evidencia, no una nueva capa decorativa.

## Criterio de cierre

El rediseño termina cuando la página se lee como un sistema técnico editorial coherente, ResolveCore demuestra la capacidad de Fran en el primer tramo, las secciones restantes amplían esa prueba sin repetir la misma composición, y la experiencia funciona en ambos idiomas, en escritorio/móvil y con movimiento reducido.
