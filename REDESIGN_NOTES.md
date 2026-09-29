# Rediseño y Mejoras del Portfolio FranVi

Se ha aplicado una mejora integral técnica y visual sobre el código fuente, combinando estética editorial premium con interactividad técnica avanzada para un perfil ASIR / Sysadmin / DevOps:

### Novedades implementadas:

1. **Terminal interactiva en el Hero (`InteractiveTerminal.tsx`)**:
   - Consola bash simulada con comandos reales: `help`, `neofetch`, `status`, `ping`, `skills`, `cat bio`, `contact`, `clear`.
   - Soporte para historial con flechas arriba/abajo y chips de ejecución rápida para móviles o un solo clic.
   - Pestaña conmutable en el Hero: alternar entre la terminal técnica interactiva y la ficha visual con monograma.

2. **Barra de telemetría en tiempo real (`LiveTelemetry.tsx`)**:
   - Indicador de estado del servidor VPS Debian 12 (IONOS), disponibilidad inmediata (Cádiz y remoto), y latencia de ping simulada con pulso dinámico.

3. **Caso de estudio ResolveCore (`ResolveCore.tsx` + `SupportStepper.tsx` + `DiagnosticPreview.tsx`)**:
   - Diagrama de flujo de arquitectura interactivo y sincronizado con cada fase (`REQUEST`, `TICKET`, `REMOTE`, `DIAGNOSTICS`, `REPORT`).
   - Visor de diagnósticos en tiempo real (`DiagnosticPreview.tsx`) con payloads JSON, scripts Bash, túnel AnyDesk/RDP, script PowerShell (`Invoke-SysDiagnostic.ps1`) y actas de resolución.

4. **Catálogo de proyectos (`ProjectCatalog.tsx`)**:
   - Buscador en tiempo real por tecnología o palabra clave.
   - Pestañas de filtrado (`Todos`, `Sistemas y Scripts`, `Web y PWA`, `Redes y Laboratorios`).
   - Desplegable interactivo de arquitectura por proyecto con highlights y botón para copiar el comando `git clone` en un clic.

5. **Competencias contextualizadas (`Competencies.tsx`)**:
   - Badges de entorno reales (`[PRODUCCIÓN]`, `[FCT / CLIENTES]`, `[ASIR / LAB]`, `[DESARROLLO]`).
   - Filtro por categorías de competencias.

6. **Experiencia de usuario y contacto (`Contact.tsx`, `ScrollProgressBar.tsx`, `BackToTop.tsx`)**:
   - Botón de copiado de email con feedback visual instantáneo.
   - Botón de descarga de vCard (`Fran_Vidal_ASIR.vcf`) para guardar el contacto directamente en dispositivos móviles.
   - Enlace al CV ajustado con ruta base relativa para producción en GitHub Pages.
   - Barra superior de progreso de lectura y botón flotante "Volver arriba" con porcentaje de scroll.

7. **Internacionalización completa (ES / EN)**:
   - Todas las nuevas características y textos traducidos tanto en `es.ts` como en `en.ts`.

### Validación:
- `npm run lint` ✅ (0 errores, 0 warnings)
- `npx tsc -b` ✅ (0 errores)
- `npm run build` ✅ (Generado correctamente en `docs/` en ~2s)
