// Diccionario en español — fuente de verdad. El tipo `Dict` se deriva de aquí
// y `en.ts` debe implementarlo por completo.
// Los nombres propios (tecnologías, "Técnico Superior en ASIR", topónimos,
// modelos de hardware) no se traducen y viven en los componentes.
export const es = {
    nav: {
        about: 'Sobre mí',
        timeline: 'Historia',
        now: 'Ahora',
        skills: 'Skills',
        stack: 'Sistemas',
        projects: 'Repos',
        achievements: 'Logros',
        contact: 'Contacto',
        switchTo: 'Switch to English',
    },
    hero: {
        available: 'Disponible para trabajar',
        role: 'Administrador de Sistemas · Desarrollador Web',
        description:
            'Titulado en ASIR, apasionado por la tecnología, la administración de sistemas y el desarrollo web. Siempre aprendiendo, siempre construyendo.',
        ctaProjects: 'Ver Proyectos',
        ctaContact: 'Contacto',
        quickEducation: 'Técnico Superior en ASIR',
    },
    about: {
        kicker: 'Quién soy',
        title: 'Sobre mí',
        subtitle: 'Un apasionado de la tecnología en constante aprendizaje.',
        bioTitle: 'Biografía',
        bioSubtitle: 'Conoce mi historia',
        bioPre: 'Soy',
        bioPost:
            ', Técnico Superior en Administración de Sistemas Informáticos en Red (ASIR), titulado.',
        bio2:
            'Me apasiona la tecnología, la administración de sistemas y el desarrollo web. Con la titulación en el bolsillo y el B1 de inglés en curso, mi siguiente paso es alistarme en el Ejército de Tierra español.',
        cvBtn: 'Ver CV',
        cards: {
            location: 'Ubicación',
            education: 'Formación',
            educationValue: 'ASIR — Titulado',
            status: 'Estado',
            statusValue: 'Disponible para trabajar',
            languages: 'Idiomas',
            languagesValue: 'ES • EN (B1 en curso)',
        },
    },
    stats: {
        kicker: 'En números',
        title: 'Datos curiosos',
        years: 'Años',
        coding: 'Años codeando',
        repos: 'Repositorios',
        stars: 'Estrellas GitHub',
        tryHint: 'Prueba:',
    },
    timeline: {
        kicker: 'Historia',
        title: 'Mi Trayectoria',
        subtitle: 'Desde el cielo de Barbate hasta el código. Cada año, un capítulo.',
        now: 'ahora',
        next: 'Próximo',
        items: [
            {
                title: 'Primer destello ♋',
                desc: 'Nacido bajo el signo de Cáncer en Barbate, Cádiz. El cielo aquella madrugada mostraba el Triángulo de Verano sobre el Atlántico. La misma constelación que ves en este portfolio.',
            },
            {
                title: 'ASIR comienza',
                desc: 'Inicio de Administración de Sistemas Informáticos en Red. Linux, redes, Active Directory, servidores — el comienzo de la carrera técnica.',
            },
            {
                title: 'Primeros proyectos',
                desc: 'HTML, CSS, JavaScript. Las primeras páginas, los primeros bugs, las primeras victorias. Bash y Python para automatizar sistemas.',
            },
            {
                title: 'GitHub: Haplee',
                desc: 'Primer repositorio público. Docker, Python, React — cada commit un paso adelante. La comunidad open source como escuela continua.',
            },
            {
                title: 'Sysadmin + Dev stack',
                desc: 'HP Victus 16, RTX 3050 Ti, WSL2 + Ubuntu, Zsh + Oh My Posh. Setup definitivo para administrar sistemas y desarrollar en paralelo.',
            },
            {
                title: 'Este portfolio',
                desc: 'React · TypeScript · Three.js. La constelación del 17 de julio de 2003, hora 3:00 AM, renderizada en 3D. Disponible para trabajar.',
            },
            {
                title: 'Prácticas en Ingenia Market',
                desc: 'FCT en Chiclana: cableado estructurado Cat6, switches y WiFi con MikroTik y Cisco, CCTV Hikvision con acceso remoto, sistemas de alarma y soporte de incidencias en cliente.',
            },
            {
                title: 'Titulado en ASIR',
                desc: 'Obtengo el título de Técnico Superior en Administración de Sistemas Informáticos en Red. El B1 de inglés sigue en curso.',
            },
            {
                title: 'Ejército de Tierra',
                desc: 'Siguiente paso: alistamiento en el Ejército de Tierra español. Una nueva etapa de disciplina, servicio y crecimiento.',
            },
        ],
    },
    now: {
        kicker: 'Ahora mismo',
        title: '¿Qué estoy haciendo?',
        subtitle: 'Snapshot de mi presente. Lo que aprendo, construyo y busco — actualizado regularmente.',
        columns: [
            {
                category: 'Aprendiendo',
                items: [
                    { name: 'React + TypeScript', detail: 'Profundizando hooks avanzados y patrones de composición' },
                    { name: 'Docker + Kubernetes', detail: 'Contenedores y orquestación para sysadmin moderno' },
                    { name: 'Inglés B1', detail: 'Certificación en curso: lectura técnica y comunicación profesional' },
                ],
            },
            {
                category: 'Construyendo',
                items: [
                    { name: 'Este portfolio', detail: 'React 19, TypeScript, Three.js, GSAP — open source' },
                    { name: 'Scripts de automatización', detail: 'Bash + Python para gestionar servidores Linux' },
                    { name: 'Proyectos ASIR', detail: 'Active Directory, redes, virtualización' },
                ],
            },
            {
                category: 'Buscando',
                items: [
                    { name: 'Ejército de Tierra', detail: 'Próximo paso: alistamiento en el Ejército de Tierra español' },
                    { name: 'Primera oportunidad', detail: 'Sysadmin junior o Desarrollador Web junior — full-time o prácticas' },
                    { name: 'Equipos pequeños', detail: 'Donde pueda aprender de seniors y aportar desde día 1' },
                    { name: 'Stack moderno', detail: 'TypeScript, React, Linux, Docker — empresas que apuesten por el futuro' },
                ],
            },
        ],
    },
    skills: {
        kicker: 'Stack técnico',
        title: 'Habilidades',
        subtitle: 'Tecnologías y herramientas con las que trabajo a diario.',
        levels: ['', 'Básico', 'Básico', 'Intermedio', 'Avanzado', 'Experto'],
        groups: [
            {
                category: 'Sistemas',
                descriptions: [
                    'Mi sistema diario en WSL2. Ubuntu, scripting Bash, gestión de servicios systemd.',
                    'Active Directory, GPOs, DNS, DHCP, IIS. Núcleo del temario ASIR.',
                    'MySQL, PostgreSQL. CRUD, joins, índices, normalización.',
                    'Contenedores, docker-compose, Dockerfiles. Stack moderno de despliegue.',
                ],
            },
            {
                category: 'Redes y Scripting',
                descriptions: [
                    'TCP/IP, subnetting, VLANs, routing. MikroTik y Cisco en entorno real durante la FCT.',
                    'Scripts de automatización para sysadmin. Zsh + Oh My Posh como shell diario.',
                    'Automatización y diagnósticos en Windows. Usado en el TFG ResolveCore.',
                    'Scripting, automatización, parsing. APIs REST con requests.',
                ],
            },
            {
                category: 'Desarrollo y Herramientas',
                descriptions: [
                    'Branches, merges, rebases, conflict resolution. Workflow profesional con GitHub.',
                    'Hooks, context, Motion. Este portfolio está construido con React 19.',
                    'Tipado estático en modo strict. La base de este portfolio y de GymLog.',
                    'Utility-first. Todo el estilado de este sitio.',
                ],
            },
        ],
    },
    stack: {
        kicker: 'Perfil de sistemas',
        title: 'Cobertura técnica',
        subtitle:
            'Competencias de administración de sistemas, redes, servidores y soporte IT — el núcleo de mi perfil ASIR.',
        categories: [
            'Sistemas',
            'Servidores y BBDD',
            'Redes',
            'Seguridad y telecom',
            'Cloud y contenedores',
            'Scripting y herramientas',
        ],
    },
    projects: {
        kicker: 'Open Source',
        title: 'Proyectos',
        subtitle: 'Repositorios públicos en GitHub — actualizados automáticamente.',
        repos: 'Repos',
        stars: 'Estrellas',
        forks: 'Forks',
        profile: 'Ver Perfil',
        fallbackNote: 'Proyectos destacados seleccionados a mano.',
        noDesc: 'Sin descripción',
    },
    achievements: {
        kicker: 'Logros',
        title: 'Hitos y formación',
        subtitle: 'Cada uno representa horas de estudio, errores corregidos y pequeñas victorias.',
        status: {
            completed: '✓ Completado',
            inProgress: '◐ En curso',
            planned: '○ Próximo',
        },
        items: [
            { title: 'ASIR 1º Curso', issuer: 'Formación Profesional', description: 'Sistemas operativos, redes, hardware, scripting básico.' },
            { title: 'Titulado en ASIR', issuer: 'Formación Profesional', description: 'Título de Técnico Superior en Administración de Sistemas Informáticos en Red obtenido.' },
            { title: 'Primer repositorio público', issuer: 'GitHub @Haplee', description: 'Inicio del viaje open source. Commits, issues, pull requests.' },
            { title: 'Portfolio profesional', issuer: 'Auto-desarrollado', description: 'React 19 + TypeScript + Three.js. Esta web que estás viendo.' },
            { title: 'Inglés B1', issuer: 'Competencia lingüística', description: 'Certificación B1 en curso: lectura técnica y comunicación profesional en inglés.' },
            { title: 'Ejército de Tierra', issuer: 'Ejército de Tierra español', description: 'Siguiente paso: alistamiento en el Ejército de Tierra español.' },
        ],
    },
    setup: {
        kicker: 'Hardware & Software',
        title: 'Mi Setup',
        subtitle: 'El equipo y herramientas con los que trabajo cada día.',
        laptopSub: 'Portátil Gaming',
        periphTitle: 'Periféricos',
        periphSub: 'Equipamiento de trabajo',
        softwareTitle: 'Software',
        labels: {
            display: 'Pantalla',
            keyboard: 'Teclado',
            mouse: 'Ratón',
            headphones: 'Auriculares',
            mousepad: 'Alfombrilla',
            os: 'SO',
            editor: 'Editor',
            terminal: 'Terminal',
            shell: 'Shell',
        },
    },
    contact: {
        kicker: 'Conectemos',
        title: 'Contacto',
        intro:
            '¿Propuesta laboral, proyecto o colaboración? El canal más rápido es LinkedIn o el email. Respondo en menos de 24h.',
        cvName: 'Currículum',
        cvSub: 'Ver CV completo',
        cvAria: 'Ver el currículum de Fran Vidal (abre en una pestaña nueva)',
        availTitle: 'Disponible para trabajar',
        availText:
            'Busco mi primera oportunidad en sistemas, redes o soporte IT. Disponible en la provincia de Cádiz y en remoto. Respondo rápido.',
        newTab: '(abre en una pestaña nueva)',
        emailAria: 'Enviar un email a Fran Vidal',
        profileAria: (name: string) => `Perfil de ${name} de Fran Vidal (abre en una pestaña nueva)`,
    },
    footer: {
        role: 'Desarrollador Web · Sysadmin',
        rights: (year: number) => `© ${year} Fran Vidal. Todos los derechos reservados.`,
        madeWith: 'Hecho con',
        using: 'usando',
    },
    barbate: {
        headerTitle: 'Barbate, Cádiz · España',
        availLabel: 'Barbate, Cádiz · Disponible en la provincia y en remoto',
        osmAria: 'Ver Barbate en OpenStreetMap (abre en una pestaña nueva)',
        bottomTitle: 'Costa de la Luz · Atlántico',
        bottomSub: 'Donde nací el 17.07.2003 a las 3:00 AM ♋',
    },
    overlay: {
        stars: 'Stars',
        forks: 'Forks',
        updated: 'Actualizado:',
        viewGithub: 'Ver en GitHub',
        demo: 'Demo',
        noDesc: 'Sin descripción disponible.',
        close: 'Cerrar',
    },
    contrib: {
        title: 'Contribuciones último año',
        loading: 'Cargando…',
        commitsOn: 'commits en GitHub',
        less: 'menos',
        more: 'más',
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        days: ['', 'Lun', '', 'Mié', '', 'Vie', ''],
        noCommits: 'Sin commits',
        dayAria: (count: number, date: string) => `${count} contribuciones el ${date}`,
        commitCount: (n: number) => `${n} commit${n !== 1 ? 's' : ''}`,
    },
};

export type Dict = typeof es;
