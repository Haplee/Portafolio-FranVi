// Diccionario en español — fuente de verdad. El tipo `Dict` se deriva de aquí
// y `en.ts` debe implementarlo por completo.
//
// Sin acoplamiento posicional por índice: cada entrada trae su texto completo
// y los componentes iteran directamente sobre el diccionario.
export const es = {
    nav: {
        work: 'Proyectos',
        skills: 'Competencias',
        path: 'Trayectoria',
        contact: 'Contacto',
        switchTo: 'Switch to English',
        skipToContent: 'Saltar al contenido',
    },

    hero: {
        location: 'Barbate, Cádiz · disponible en la provincia y en remoto',
        role: 'Administrador de sistemas y redes',
        // La respuesta de 20 segundos: qué es, qué ha construido, con qué.
        lead:
            'Técnico Superior en ASIR. Diseñé y desplegué ResolveCore —plataforma de soporte IT de ciclo completo sobre un VPS Debian propio— y mantengo utilidades de sistemas, aplicaciones PWA offline-first y scripts de automatización en producción.',
        ctaWork: 'Ver proyectos',
        ctaContact: 'Escribirme',
        creds: ['Técnico Superior en ASIR', 'Inglés B1 en curso'],
        portraitAlt: 'Retrato de Fran Vidal',
        specs: [
            { k: 'Perfil', v: 'Sistemas, redes y soporte IT' },
            { k: 'Titulación', v: 'Técnico Superior ASIR (2026)' },
            { k: 'Disponibilidad', v: 'Provincia de Cádiz y remoto' },
            { k: 'Estado', v: 'Incorporación inmediata' },
        ],
    },

    work: {
        sectionLabel: 'Proyectos y sistemas',
        sectionTitle: 'Qué he construido, y con qué criterio',
        sectionIntro:
            'Una visión unificada de mi trabajo técnico: desde el diseño y despliegue del caso de estudio central (ResolveCore) hasta utilidades de sistemas, aplicaciones en producción y laboratorios de red.',

        // Caso Destacado #01: ResolveCore
        featuredBadge: 'Proyecto destacado · Fin de grado ASIR',
        title: 'ResolveCore',
        oneLiner:
            'Una plataforma integral donde un usuario solicita ayuda y un técnico diagnostica y resuelve la incidencia sin salir del sistema.',
        problem:
            'En una empresa pequeña el soporte informático suele dispersarse entre llamadas, correos y la memoria de quien intervino la última vez. Sin trazabilidad, se pierde tiempo y el mismo fallo se investiga desde cero múltiples veces. ResolveCore cierra ese circuito: cada incidencia entra por un portal único, se asigna con prioridad a un técnico, se diagnostica sobre la máquina del usuario y concluye con un informe estructurado que queda registrado para consultas futuras.',

        flowLabel: 'El circuito interactivo de soporte',
        flowInstruction: 'Selecciona una fase para ver el mecanismo en detalle:',
        flow: [
            {
                step: 'Solicitud',
                summary: 'Entrada controlada',
                desc: 'El usuario describe el problema desde el portal web. Sin correos perdidos ni llamadas sin registrar.',
                detail: 'El usuario rellena un formulario estructurado con captura automática de contexto inicial (SO, navegador, urgencia declarada).',
            },
            {
                step: 'Ticket',
                summary: 'Gestión y prioridad',
                desc: 'La incidencia entra en MantisBT con técnico asignado, prioridad, categoría y nivel de servicio.',
                detail: 'La API de MantisBT genera el ticket, establece SLAs y notifica al técnico responsable según el tipo de servicio afectado.',
            },
            {
                step: 'Conexión remota',
                summary: 'Sesión asistida',
                desc: 'Sesión asistida sobre la máquina del usuario iniciada directamente desde el propio ticket.',
                detail: 'El técnico abre un túnel de soporte remoto (AnyDesk / RDP) con un solo clic desde la interfaz de la incidencia.',
            },
            {
                step: 'Diagnóstico',
                summary: 'Auditoría automatizada',
                desc: 'Scripts automatizados que auditan hardware, servicios, red y vulnerabilidades CVE en segundos.',
                detail: 'Ejecución no invasiva de scripts en PowerShell (Windows), Bash (Linux) o Python que recolectan estado de discos, RAM, eventos y CVEs.',
            },
            {
                step: 'Informe',
                summary: 'Histórico y cierre',
                desc: 'Diagnóstico y solución quedan adjuntos y archivados en el histórico del sistema para consultas futuras.',
                detail: 'El informe resultante queda anexado como evidencia auditable, facilitando soluciones inmediatas ante incidencias recurrentes.',
            },
        ],

        infraLabel: 'Ficha de infraestructura',
        infra: [
            { k: 'Servidor', v: 'VPS IONOS · Debian Linux' },
            { k: 'Web', v: 'Nginx + PHP-FPM' },
            { k: 'Datos', v: 'MariaDB relacional' },
            { k: 'Despliegue', v: 'Docker · docker-compose' },
            { k: 'Gestor tickets', v: 'MantisBT (integración API)' },
            { k: 'Remoto', v: 'AnyDesk / RDP' },
            { k: 'Diagnóstico', v: 'PowerShell · Bash · Python' },
        ],

        decisionsLabel: 'Decisiones de arquitectura',
        decisions: [
            {
                title: 'Integrar MantisBT en vez de reescribir un gestor de tickets desde cero',
                body:
                    'Reescribir un gestor de incidencias habría consumido semanas para obtener una solución inferior a herramientas probadas en producción. Integrar MantisBT me obligó a estudiar su esquema relacional y su API REST, reflejando el trabajo real de sistemas: conectar y robustecer servicios existentes.',
            },
            {
                title: 'Despliegue contenedorizado con Docker sobre VPS',
                body:
                    'Configurar servicios a mano directamente sobre el sistema base es frágil ante actualizaciones o fallos. Con docker-compose todo el entorno de Nginx, PHP-FPM y MariaDB se levanta de forma reproducible en minutos, garantizando paridad idéntica entre laboratorio local y producción.',
            },
            {
                title: 'Tres lenguajes de diagnóstico según el entorno objetivo',
                body:
                    'PowerShell nativo para clientes Windows, Bash para servidores Linux y Python para módulos analíticos compartidos. Esta separación evita forzar la instalación de runtimes pesados en máquinas de clientes cuando precisamente se accede a solucionar un fallo.',
            },
        ],

        repoCta: 'Ver código de ResolveCore',
        newTab: '(abre en una pestaña nueva)',

        // Catálogo de otros proyectos profesionales completados
        catalogueLabel: 'Catálogo de ingeniería',
        catalogueTitle: 'Otras utilidades de sistemas y aplicaciones terminadas',
        catalogueIntro:
            'Proyectos de software, daemons de monitorización y herramientas de administración que he diseñado, implementado y probado en entornos reales.',
        filters: {
            all: 'Todos',
            systems: 'Sistemas y Scripts',
            web: 'Web y PWA',
            infra: 'Redes y Laboratorios',
        },
        viewRepo: 'Repositorio en GitHub',
        viewLive: 'Ver despliegue en vivo',
        otherItems: [
            {
                id: 'gymlog',
                name: 'GymLog',
                category: 'web',
                categoryBadge: 'PWA Offline-First',
                tagline: 'PWA nativa para registro y análisis biomecánico de entrenamientos con persistencia offline total.',
                desc: 'Aplicación progresiva diseñada para atletas y entrenadores de fuerza. Incorpora arquitectura offline-first con sincronización reactiva, cálculo de repetición máxima (1RM) mediante la fórmula Brzycki, analítica de volumen por grupo muscular y autenticación biométrica.',
                stack: ['TypeScript', 'React 19', 'Supabase', 'Dexie / IndexedDB', 'PWA'],
                highlights: ['Persistencia offline con Dexie.js', 'Cálculo 1RM Brzycki', 'Autenticación biométrica', 'En producción'],
                liveUrl: 'https://gymlog.dpdns.org',
                repoUrl: 'https://github.com/Haplee/gymlog',
            },
            {
                id: 'omniroute',
                name: 'OmniRoute-Installer',
                category: 'systems',
                categoryBadge: 'Sistemas & IA',
                tagline: 'Router e instalador universal de modelos de lenguaje locales con selección automática de hardware.',
                desc: 'Automatiza el despliegue e integración de entornos de inferencia local de IA en puestos de desarrollo. Detecta automáticamente aceleración GPU/CPU, enruta peticiones entre proveedores y configura perfiles de entorno para herramientas de línea de comandos.',
                stack: ['PowerShell', 'REST APIs', 'CLI Windows/Linux', 'Local LLMs'],
                highlights: ['Detección de recursos de GPU/VRAM', 'Router multi-proveedor', 'Perfiles inteligentes para devs', 'Instalación desatendida'],
                liveUrl: 'https://haplee.github.io/OmniRoute-Installer/',
                repoUrl: 'https://github.com/Haplee/OmniRoute-Installer',
            },
            {
                id: 'aceleramac',
                name: 'AceleraMac',
                category: 'systems',
                categoryBadge: 'Sistemas & Shell',
                tagline: 'Vigilante de presión de memoria y liberación asistida de RAM para macOS.',
                desc: 'Daemon ligero para monitorización de la presión de memoria en macOS. Ejecuta liberaciones preventivas de buffers inactivos cuando el consumo supera los umbrales críticos. Escrito en Shell nativo, sin dependencias externas y sin requerir permisos de superusuario.',
                stack: ['POSIX Shell', 'macOS vm_stat', 'memory_pressure', 'Launchd'],
                highlights: ['Cero dependencias externas', 'Sin necesidad de sudo/root', 'Bajo consumo de CPU', 'Página y docs en GitHub Pages'],
                liveUrl: 'https://haplee.github.io/AceleraMac/',
                repoUrl: 'https://github.com/Haplee/AceleraMac',
            },
            {
                id: 'bot-recordatorio',
                name: 'Bot-Recordatorio',
                category: 'web',
                categoryBadge: 'Web & Backend',
                tagline: 'Sistema automatizado de alertas y recordatorios periódicos vía Telegram Bot y correo electrónico.',
                desc: 'Plataforma web con Next.js y base de datos relacional para la programación y despacho de notificaciones automáticas para cobros recurrentes, vencimientos de servidores y fechas señaladas, con alertas push instantáneas en Telegram.',
                stack: ['Next.js 16', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Telegram API'],
                highlights: ['Despacho multi-canal (Telegram + Email)', 'Modelado de datos con Prisma', 'Desplegado en producción en Vercel', 'Tareas programadas automatizadas'],
                liveUrl: 'https://bot-recordatorio.vercel.app',
                repoUrl: 'https://github.com/Haplee/Bot-Recordatorio',
            },
            {
                id: 'autodriver',
                name: 'AutoDriver-Updater',
                category: 'systems',
                categoryBadge: 'Sistemas Windows',
                tagline: 'Auditor y actualizador desatendido de controladores para entornos Windows.',
                desc: 'Herramienta de administración en PowerShell para inventariar dispositivos hardware, contrastar versiones con catálogos oficiales y desplegar actualizaciones de controladores de manera silenciosa, evitando software de terceros con publicidad o telemetría invasiva.',
                stack: ['PowerShell', 'Windows PnP API', 'WMI / CIM', 'Windows Update'],
                highlights: ['Sin software comercial de terceros', 'Auditoría precisa de dispositivos PnP', 'Modo de ejecución desatendido', 'Registro de auditoría en log'],
                liveUrl: 'https://haplee.github.io/AutoDriver-Updater/',
                repoUrl: 'https://github.com/Haplee/AutoDriver-Updater',
            },
            {
                id: 'scan-repair',
                name: 'Windows Scan & Repair',
                category: 'systems',
                categoryBadge: 'Sistemas & Mantenimiento',
                tagline: 'Suite automatizada de verificación de integridad y reparación de sistemas Windows 10 y 11.',
                desc: 'Script de mantenimiento para soporte técnico que orquesta la comprobación de sectores de disco (chkdsk), la verificación de integridad de archivos protegidos (SFC) y la restauración de la imagen del sistema contra componentes saludables (DISM).',
                stack: ['Batch', 'DISM', 'SFC', 'chkdsk', 'PowerShell'],
                highlights: ['Reparación profunda de imagen de sistema', 'Ejecución secuencial con un clic', 'Generación de informes de diagnóstico', 'Utilizado en soporte diario'],
                liveUrl: 'https://haplee.github.io/Windows_Scan-Repair/',
                repoUrl: 'https://github.com/Haplee/Windows_Scan-Repair',
            },
            {
                id: 'proxychains-setup',
                name: 'Ubuntu VBox Proxychains Setup',
                category: 'infra',
                categoryBadge: 'Redes & Virtualización',
                tagline: 'Aprovisionamiento automatizado de laboratorio seguro en VirtualBox con Proxychains y SOCKS5.',
                desc: 'Automatización del despliegue de máquinas virtuales Ubuntu en VirtualBox configurando interfaces de red aisladas y enrutamiento encadenado a través de proxies para laboratorios de análisis de tráfico, privacidad y pruebas de penetración.',
                stack: ['Shell Scripting', 'VirtualBox CLI', 'Proxychains', 'Tor / SOCKS5'],
                highlights: ['Configuración de red en un paso', 'Encadenamiento de proxies anónimos', 'Entorno de laboratorio aislado', 'Despliegue reproducible'],
                liveUrl: null,
                repoUrl: 'https://github.com/Haplee/ubuntu-vbox-proxychains-setup',
            },
            {
                id: 'kali-setup',
                name: 'Kali Linux Setup & Hardening',
                category: 'infra',
                categoryBadge: 'Seguridad & Pentesting',
                tagline: 'Script de inicialización y personalización técnica para estaciones de trabajo Kali Linux.',
                desc: 'Script de despliegue rápido que prepara una estación de trabajo Kali Linux con repositorios actualizados, utilidades esenciales de análisis de red, scripts de auditoría y configuración personalizada de terminal para tareas de administración y seguridad.',
                stack: ['Bash / Shell', 'Kali Linux', 'Gestión de paquetes APT', 'Networking tools'],
                highlights: ['Alineación de herramientas de auditoría', 'Personalización de entorno de terminal', 'Optimización de dependencias', 'Listo para intervención en red'],
                liveUrl: null,
                repoUrl: 'https://github.com/Haplee/kali-setup',
            },
        ],
    },

    skills: {
        label: 'Competencias comprobadas',
        title: 'Qué sé hacer, y dónde lo he aplicado',
        intro:
            'Cada herramienta va acompañada del entorno real o proyecto donde ha sido utilizada. Lo que no he tocado en producción o en laboratorio real, no figura en esta lista.',
        groups: [
            {
                category: 'Sistemas y servidores',
                items: [
                    { name: 'Linux (Debian, Ubuntu, Kali)', where: 'Servidor VPS de ResolveCore, estaciones de auditoría y WSL2 diario' },
                    { name: 'Windows Server & Windows 11', where: 'Active Directory, GPO, DNS, DHCP e IIS en ASIR; scripts de soporte' },
                    { name: 'Nginx · PHP-FPM', where: 'Servidor web de producción y proxy inverso en ResolveCore' },
                    { name: 'MariaDB · PostgreSQL · MySQL', where: 'Bases de datos de ResolveCore, Bot-Recordatorio y prácticas ASIR' },
                    { name: 'Docker & docker-compose', where: 'Despliegue contenedorizado y reproducible en VPS Debian' },
                    { name: 'VirtualBox & Virtualización', where: 'Laboratorios de topologías de red y máquinas de prueba en ASIR' },
                ],
            },
            {
                category: 'Redes e infraestructura física',
                items: [
                    { name: 'MikroTik · Cisco', where: 'Switches y puntos de acceso WiFi en clientes reales durante la FCT' },
                    { name: 'TCP/IP, VLAN, DNS, DHCP', where: 'Segmentación y direccionamiento en clientes y en laboratorio' },
                    { name: 'Cableado estructurado Cat6', where: 'Instalaciones completas y conectorizado de racks durante la FCT' },
                    { name: 'CCTV Hikvision', where: 'Cámaras con acceso remoto y grabadores NVR montados en cliente' },
                    { name: 'Sistemas de alarma', where: 'Montaje, cableado y mantenimiento durante las prácticas en Ingenia Market' },
                ],
            },
            {
                category: 'Automatización y desarrollo',
                items: [
                    { name: 'Bash / POSIX Shell', where: 'Diagnósticos de ResolveCore, AceleraMac y scripting de servidores' },
                    { name: 'PowerShell', where: 'OmniRoute-Installer, AutoDriver-Updater y diagnósticos Windows' },
                    { name: 'Python', where: 'Módulos analíticos de ResolveCore, scripts multiplataforma y consumo de APIs' },
                    { name: 'TypeScript · React 19', where: 'GymLog (PWA offline-first), Bot-Recordatorio y este portafolio' },
                    { name: 'Git & GitHub', where: 'Control de versiones, flujos de ramas y despliegues CI/CD en todos los proyectos' },
                ],
            },
        ],
    },

    path: {
        label: 'Trayectoria',
        title: 'De dónde vengo',
        items: [
            {
                date: '2026',
                title: 'Prácticas en Ingenia Market · Chiclana',
                role: 'FCT — Soporte e instalaciones de red',
                body:
                    'Tres meses en instalaciones de cliente. Cableado estructurado Cat6 de principio a fin, configuración de switches y puntos WiFi con MikroTik y Cisco, montaje de CCTV Hikvision con acceso remoto y sistemas de alarma. También atención de incidencias in situ, resolviendo problemas técnicos directamente ante el usuario.',
            },
            {
                date: '2026',
                title: 'ResolveCore',
                role: 'Proyecto de fin de grado · ASIR',
                body:
                    'Plataforma integral de soporte IT de ciclo completo sobre VPS IONOS Debian, con diagnóstico automatizado cross-platform, integración de MantisBT y CVE scanner.',
            },
            {
                date: '2026',
                title: 'Técnico Superior en ASIR',
                role: 'Formación Profesional — Titulado',
                body:
                    'Administración de Sistemas Informáticos en Red. Sistemas operativos, redes, servidores, bases de datos relacionales, virtualización y ciberseguridad.',
            },
            {
                date: 'Ahora',
                title: 'Buscando oportunidad profesional',
                role: 'Sistemas, redes o soporte técnico',
                body:
                    'Disponible de forma inmediata en la provincia de Cádiz y en remoto. Inglés B1 en curso. Manteniendo y desarrollando herramientas en producción.',
            },
        ],
    },

    contact: {
        label: 'Contacto',
        title: 'Hablemos',
        intro:
            'Si buscas un profesional para administración de sistemas, redes, infraestructuras o soporte IT, contáctame por LinkedIn o correo electrónico. Respondo con prontitud.',
        cvName: 'Currículum Vitae',
        cvNote: 'Versión completa en una página',
        emailAria: 'Enviar un correo a Fran Vidal',
        profileAria: (name: string) => `Perfil de ${name} de Fran Vidal (abre en una pestaña nueva)`,
        newTab: '(abre en una pestaña nueva)',

        whereLabel: 'Disponibilidad y ubicación',
        base: 'Barbate, Cádiz',
        radiusNote: 'Desplazamiento directo por la provincia de Cádiz (el radio delimita aprox. 60 km desde Barbate).',
        remoteNote: 'Para trabajo en remoto, disponibilidad completa sin límite geográfico.',
        mapAria: 'Mapa de la provincia de Cádiz con Barbate y el radio de desplazamiento',
        osmAria: 'Ver Barbate en OpenStreetMap (abre en una pestaña nueva)',
    },

    footer: {
        rights: (year: number) => `© ${year} Fran Vidal`,
        colophon: 'Construido con React 19, TypeScript y Three.js. El cielo del encabezado reproduce la bóveda de Barbate.',
        source: 'Código fuente en GitHub',
    },
};

export type Dict = typeof es;
