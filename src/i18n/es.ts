// Diccionario en español — fuente de verdad. El tipo `Dict` se deriva de aquí
// y `en.ts` debe implementarlo por completo.
//
// A diferencia de la versión anterior, aquí NO hay acoplamiento posicional con
// arrays de metadatos en los componentes: cada entrada trae su texto completo
// y los componentes iteran directamente sobre el diccionario. Si se añade un
// ítem, se añade en un solo sitio.
export const es = {
    nav: {
        work: 'Proyecto',
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
            'Técnico Superior en ASIR. Como proyecto de fin de grado monté una plataforma de soporte IT de ciclo completo sobre un VPS propio, y durante las prácticas cablé, configuré y mantuve redes de clientes reales.',
        ctaWork: 'Ver el proyecto',
        ctaContact: 'Escribirme',
        creds: ['Técnico Superior en ASIR', 'Inglés B1 en curso'],
        portraitAlt: 'Retrato de Fran Vidal',
    },

    work: {
        label: 'Proyecto de fin de grado',
        title: 'ResolveCore',
        // Una frase que explica el proyecto entero a alguien que no lo conoce.
        oneLiner:
            'Una plataforma donde un usuario pide ayuda y un técnico se la resuelve sin salir del sistema.',
        problem:
            'En una empresa pequeña el soporte informático se reparte entre el correo, el teléfono y la memoria de quien lo arregló la última vez. No queda registro, nadie sabe cuánto se tarda y el mismo fallo se resuelve tres veces desde cero. ResolveCore cierra ese circuito: cada incidencia entra por un sitio, se le asigna un técnico, se diagnostica sobre la máquina del usuario y termina en un informe que queda guardado.',

        flowLabel: 'El circuito',
        flow: [
            { step: 'Solicitud', desc: 'El usuario describe el problema desde el portal. Sin correos que se pierden.' },
            { step: 'Ticket', desc: 'La solicitud entra en el gestor de incidencias con prioridad y técnico asignado.' },
            { step: 'Conexión remota', desc: 'El técnico entra en la máquina del usuario desde el propio ticket.' },
            { step: 'Diagnóstico', desc: 'Scripts que recogen estado del sistema, red, discos y servicios.' },
            { step: 'Informe', desc: 'Resultado y solución quedan adjuntos al ticket y consultables después.' },
        ],

        infraLabel: 'Infraestructura',
        infra: [
            { k: 'Servidor', v: 'VPS IONOS · Debian' },
            { k: 'Web', v: 'Nginx + PHP-FPM' },
            { k: 'Datos', v: 'MariaDB' },
            { k: 'Despliegue', v: 'Docker · docker-compose' },
            { k: 'Incidencias', v: 'MantisBT' },
            { k: 'Remoto', v: 'AnyDesk' },
            { k: 'Diagnóstico', v: 'PowerShell · Bash · Python' },
        ],

        decisionsLabel: 'Tres decisiones',
        decisions: [
            {
                title: 'Integrar MantisBT en vez de escribir mi propio gestor de tickets',
                body:
                    'Reimplementar un gestor de incidencias me habría costado semanas para llegar a algo peor que lo que ya existe y está probado. Integrarlo me obligó a leer su modelo de datos y su API, que se parece bastante más a lo que uno hace en un puesto real: conectar herramientas que ya están, no reescribirlas.',
            },
            {
                title: 'Docker sobre el VPS, no instalación directa',
                body:
                    'Instalar Nginx, PHP y MariaDB a mano sobre el servidor funciona hasta que algo se rompe y no hay forma de saber qué cambió. Con contenedores puedo levantar el entorno entero desde cero en minutos y el que corre en mi portátil es idéntico al de producción.',
            },
            {
                title: 'Tres lenguajes de diagnóstico en vez de uno',
                body:
                    'PowerShell para los clientes Windows, Bash para los Linux y Python para lo que tenía que funcionar en ambos. Unificarlo todo en un solo lenguaje habría obligado a instalar un runtime en máquinas de usuario, que es justo lo que no quieres tocar cuando entras a arreglar algo.',
            },
        ],

        repoCta: 'Ver el repositorio',

        alsoLabel: 'También en GitHub',
        also: [
            {
                name: 'GymLog',
                stack: 'TypeScript · React · Supabase',
                desc: 'Registro de entrenamientos como PWA instalable en el móvil: rutinas, series y progreso.',
            },
            {
                name: 'routine-optimizer',
                stack: 'TypeScript',
                desc: 'Planificador para estudiantes que además entrenan: encaja horas de estudio y de gimnasio sin solaparlas.',
            },
        ],
        profileCta: 'Perfil completo en GitHub',
        newTab: '(abre en una pestaña nueva)',
    },

    skills: {
        label: 'Competencias',
        title: 'Qué sé hacer, y dónde lo he hecho',
        // Sin barras de nivel autoevaluadas: cada línea dice dónde se usó.
        // Es lo que de verdad distingue haber tocado algo de haberlo leído.
        intro:
            'Cada herramienta va con el sitio donde la he usado. Lo que no he tocado fuera de un temario, no está en esta lista.',
        groups: [
            {
                category: 'Sistemas y servidores',
                items: [
                    { name: 'Linux (Debian, Ubuntu)', where: 'Servidor de ResolveCore y entorno diario en WSL2' },
                    { name: 'Windows Server', where: 'Active Directory, GPO, DNS, DHCP e IIS en laboratorio ASIR' },
                    { name: 'Nginx · PHP-FPM', where: 'Servidor web de ResolveCore' },
                    { name: 'MariaDB · MySQL · PostgreSQL', where: 'Base de datos de ResolveCore y prácticas de ASIR' },
                    { name: 'Docker', where: 'Despliegue de ResolveCore en VPS' },
                    { name: 'VirtualBox', where: 'Laboratorios de red y de servidores durante ASIR' },
                ],
            },
            {
                category: 'Redes e instalación',
                items: [
                    { name: 'MikroTik · Cisco', where: 'Switches y WiFi en instalaciones de cliente durante la FCT' },
                    { name: 'TCP/IP, VLAN, DNS, DHCP', where: 'Configuración de red en clientes y en laboratorio' },
                    { name: 'Cableado estructurado Cat6', where: 'Instalaciones completas en cliente durante la FCT' },
                    { name: 'CCTV Hikvision', where: 'Cámaras con acceso remoto, montadas y configuradas en cliente' },
                    { name: 'Sistemas de alarma', where: 'Instalación y mantenimiento durante la FCT' },
                ],
            },
            {
                category: 'Automatización y desarrollo',
                items: [
                    { name: 'Bash', where: 'Diagnósticos de ResolveCore y scripting de servidor' },
                    { name: 'PowerShell', where: 'Diagnósticos sobre clientes Windows en ResolveCore' },
                    { name: 'Python', where: 'Scripts multiplataforma y consumo de APIs REST' },
                    { name: 'Git', where: 'Todos los proyectos; ramas, merges y resolución de conflictos' },
                    { name: 'React · TypeScript', where: 'Este sitio y GymLog' },
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
                role: 'FCT — Soporte e instalaciones',
                body:
                    'Tres meses en instalaciones de cliente. Cableado estructurado Cat6 de principio a fin, configuración de switches y puntos WiFi con MikroTik y Cisco, montaje de CCTV Hikvision con acceso remoto y sistemas de alarma. También atención de incidencias en el propio cliente, que es donde se aprende a explicar un problema técnico a alguien que solo quiere que su ordenador vuelva a funcionar.',
            },
            {
                date: '2026',
                title: 'ResolveCore',
                role: 'Proyecto de fin de grado',
                body: 'Plataforma de soporte IT de ciclo completo sobre VPS propio. Detallada más arriba.',
            },
            {
                date: '2026',
                title: 'Técnico Superior en ASIR',
                role: 'Formación Profesional — titulado',
                body:
                    'Administración de Sistemas Informáticos en Red. Sistemas operativos, redes, servidores, bases de datos, virtualización y seguridad.',
            },
            {
                date: 'Ahora',
                title: 'Buscando la primera oportunidad',
                role: 'Sistemas, redes o soporte IT',
                body:
                    'Disponible en la provincia de Cádiz y en remoto. Inglés B1 en curso. Sigo montando cosas mientras tanto.',
            },
        ],
    },

    contact: {
        label: 'Contacto',
        title: 'Hablemos',
        intro:
            'Si buscas a alguien para sistemas, redes o soporte, escríbeme por LinkedIn o al correo. Respondo en menos de 24 horas.',
        cvName: 'Currículum',
        cvNote: 'Versión completa, en una página',
        emailAria: 'Enviar un email a Fran Vidal',
        profileAria: (name: string) => `Perfil de ${name} de Fran Vidal (abre en una pestaña nueva)`,
        newTab: '(abre en una pestaña nueva)',

        // El mapa dejó de conmemorar un lugar de nacimiento y ahora responde
        // "¿dónde estás y hasta dónde te desplazas?".
        whereLabel: 'Dónde estoy',
        base: 'Barbate, Cádiz',
        radiusNote: 'Me desplazo por la provincia de Cádiz — el círculo marca unos 60 km desde Barbate.',
        remoteNote: 'Para trabajo remoto, sin límite.',
        mapAria: 'Mapa de la provincia de Cádiz con Barbate y el radio de desplazamiento',
        osmAria: 'Ver Barbate en OpenStreetMap (abre en una pestaña nueva)',
    },

    footer: {
        rights: (year: number) => `© ${year} Fran Vidal`,
        colophon: 'Hecho con React, TypeScript y Three.js. El cielo del encabezado es el de Barbate.',
        source: 'Código fuente',
    },
};

export type Dict = typeof es;
