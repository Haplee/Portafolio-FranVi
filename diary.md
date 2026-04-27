# Diario de Desarrollo — Portafolio FranVi

## [2026-04-27] — Mejora visual completa del portafolio

### Qué se hizo
- **Rediseño visual** de todos los componentes manteniendo la estructura y temática original (dark mode, cyan/blue, ASIR/dev)
- **HeroSection**: badge de disponibilidad con ping animado, botones con gradiente + glow, quick info row (ubicación, formación, GitHub), avatar con glow ring y floating badge "ASIR · Dev · Sysadmin"; título "Fran Vidal" cambiado a gradiente blanco→cyan discreto (tamaño reducido de 7xl a 6xl)
- **AboutSection**: eyebrow label animado, `section-title` con gradiente underline, botón secundario de GitHub, emoji en info cards, idiomas añadidos
- **SkillsSection**: barras de progreso animadas con nivel (Básico→Experto), Python y Bash añadidos, gradiente distinto por categoría
- **ProjectsSection**: stats cards con gradiente + hover lift (`stat-card`), colores de lenguaje por punto de color, contadores numéricos animados (`AnimatedCounter` con easeOutExpo)
- **SetupSection**: badges de spec por componente, fila de Software añadida (SO, editor, terminal, shell), efectos hover por categoría
- **ContactSection**: tarjetas sociales más grandes con handle visible, gradiente de fondo en hover, animación spring
- **Navbar**: glassmorphism intensificado (backdrop-blur:20px, inline styles para máximo soporte), active pill con gradiente cyan+indigo y glow
- **Footer**: línea de gradiente superior, social links como botones con hover coloreado
- **SpotlightCard**: radio ampliado a 280px, shimmer en borde superior, z-index correcto para contenido

### Nuevos componentes
- `ScrollProgressBar.tsx` — barra de progreso de scroll con gradient y Motion `useSpring`
- `BackToTop.tsx` — botón flotante que aparece al pasar 400px, con `AnimatePresence`
- `AnimatedCounter.tsx` — contador animado activado por `useInView`
- `hooks/useLenis.ts` — scroll suave con Lenis (instalado: `npm install lenis`)

### ConstellationSky
- **Scorpius** (visible sobre Barbate): líneas, estrellas y glow en **dorado** (amber-400/yellow-300)
- **Cáncer** (signo zodiacal de Fran, nacido el 17-Jul-2003 a las 3:00 AM): constelación añadida al mapa con las estrellas principales (Tarf, Acubens, Asellus Australis/Borealis) posicionada en el cuadrante oeste (poniente), todo en **dorado**; etiqueta "♋ Cáncer" ligeramente más grande

### CSS (`index.css`)
- Variables de glow (`--glow-cyan`, `--glow-purple`)
- Utilidades: `.glow-cyan`, `.glass-card`, `.gradient-border`, `.shimmer-text`, `.stat-card`, `.social-card`, `.section-title` (gradiente underline)
- Animaciones: `fadeInUp`, `fadeInLeft`, `pulse-glow`, `float`, `shimmer`, `borderPulse`
- Scrollbar personalizada con gradiente cyan→purple
- Textura de ruido sutil (SVG inline, opacity 0.018)

### Por qué
- El portafolio tenía una base sólida pero los componentes eran visualmente genéricos; el objetivo era hacerlo memorable sin cambiar la temática ni la estructura de secciones

### Estado actual
- Funcionando en desarrollo (`npm run dev` en `localhost:5173`)
- Lenis smooth scroll activo
- Barra de progreso de scroll visible
- Botón "volver arriba" funcional
- Dos constelaciones doradas en el hero (Scorpius + ♋ Cáncer)
