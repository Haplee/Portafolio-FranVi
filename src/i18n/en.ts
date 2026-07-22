import type { Dict } from './es';

// English dictionary. Proper nouns (technologies, "Higher Technician in ASIR",
// place names, hardware models) are kept as-is in the components.
export const en: Dict = {
    nav: {
        about: 'About',
        timeline: 'Journey',
        now: 'Now',
        skills: 'Skills',
        stack: 'Systems',
        projects: 'Repos',
        achievements: 'Awards',
        contact: 'Contact',
        switchTo: 'Cambiar a español',
    },
    hero: {
        available: 'Available for work',
        role: 'Systems Administrator · Web Developer',
        description:
            'Qualified in ASIR, passionate about technology, systems administration and web development. Always learning, always building.',
        ctaProjects: 'View Projects',
        ctaContact: 'Contact',
        quickEducation: 'Higher Technician in ASIR',
    },
    about: {
        kicker: 'Who I am',
        title: 'About me',
        subtitle: 'A technology enthusiast, always learning.',
        bioTitle: 'Biography',
        bioSubtitle: 'Get to know my story',
        bioPre: "I'm",
        bioPost:
            ', a qualified Higher Technician in Computer Systems and Network Administration (ASIR).',
        bio2:
            'I love technology, systems administration and web development. With the qualification in hand and my English B1 in progress, my next step is to enlist in the Spanish Army.',
        cvBtn: 'View CV',
        cards: {
            location: 'Location',
            education: 'Education',
            educationValue: 'ASIR — Qualified',
            status: 'Status',
            statusValue: 'Available for work',
            languages: 'Languages',
            languagesValue: 'ES • EN (B1 in progress)',
        },
    },
    stats: {
        kicker: 'By the numbers',
        title: 'Fun facts',
        years: 'Years',
        coding: 'Years coding',
        repos: 'Repositories',
        stars: 'GitHub stars',
        tryHint: 'Try:',
    },
    timeline: {
        kicker: 'Story',
        title: 'My Journey',
        subtitle: 'From the skies of Barbate to code. Each year, a chapter.',
        now: 'now',
        next: 'Next',
        items: [
            {
                title: 'First spark ♋',
                desc: 'Born under the sign of Cancer in Barbate, Cádiz. That night the sky showed the Summer Triangle over the Atlantic. The same constellation you see in this portfolio.',
            },
            {
                title: 'ASIR begins',
                desc: 'Start of Computer Systems and Network Administration. Linux, networks, Active Directory, servers — the beginning of the technical career.',
            },
            {
                title: 'First projects',
                desc: 'HTML, CSS, JavaScript. The first pages, the first bugs, the first wins. Bash and Python to automate systems.',
            },
            {
                title: 'GitHub: Haplee',
                desc: 'First public repository. Docker, Python, React — every commit a step forward. The open source community as a continuous school.',
            },
            {
                title: 'Sysadmin + Dev stack',
                desc: 'HP Victus 16, RTX 3050 Ti, WSL2 + Ubuntu, Zsh + Oh My Posh. The definitive setup to administer systems and develop in parallel.',
            },
            {
                title: 'This portfolio',
                desc: 'React · TypeScript · Three.js. The constellation of July 17, 2003, 3:00 AM, rendered in 3D. Available for work.',
            },
            {
                title: 'Internship at Ingenia Market',
                desc: 'Work placement in Chiclana: Cat6 structured cabling, switches and WiFi with MikroTik and Cisco, Hikvision CCTV with remote access, alarm systems and on-site incident support.',
            },
            {
                title: 'Qualified in ASIR',
                desc: 'I earn the Higher Technician degree in Computer Systems and Network Administration. My English B1 is still in progress.',
            },
            {
                title: 'Spanish Army',
                desc: 'Next step: enlisting in the Spanish Army. A new stage of discipline, service and growth.',
            },
        ],
    },
    now: {
        kicker: 'Right now',
        title: 'What am I doing?',
        subtitle: 'A snapshot of my present. What I learn, build and look for — updated regularly.',
        columns: [
            {
                category: 'Learning',
                items: [
                    { name: 'React + TypeScript', detail: 'Going deeper into advanced hooks and composition patterns' },
                    { name: 'Docker + Kubernetes', detail: 'Containers and orchestration for modern sysadmin' },
                    { name: 'English B1', detail: 'Certification in progress: technical reading and professional communication' },
                ],
            },
            {
                category: 'Building',
                items: [
                    { name: 'This portfolio', detail: 'React 19, TypeScript, Three.js, GSAP — open source' },
                    { name: 'Automation scripts', detail: 'Bash + Python to manage Linux servers' },
                    { name: 'ASIR projects', detail: 'Active Directory, networks, virtualization' },
                ],
            },
            {
                category: 'Looking for',
                items: [
                    { name: 'Spanish Army', detail: 'Next step: enlisting in the Spanish Army' },
                    { name: 'First opportunity', detail: 'Junior sysadmin or junior web developer — full-time or internship' },
                    { name: 'Small teams', detail: 'Where I can learn from seniors and contribute from day 1' },
                    { name: 'Modern stack', detail: 'TypeScript, React, Linux, Docker — companies betting on the future' },
                ],
            },
        ],
    },
    skills: {
        kicker: 'Tech stack',
        title: 'Skills',
        subtitle: 'Technologies and tools I work with every day.',
        levels: ['', 'Basic', 'Basic', 'Intermediate', 'Advanced', 'Expert'],
        groups: [
            {
                category: 'Systems',
                descriptions: [
                    'My daily system on WSL2. Ubuntu, Bash scripting, systemd service management.',
                    'Active Directory, GPOs, DNS, DHCP, IIS. Core of the ASIR syllabus.',
                    'MySQL, PostgreSQL. CRUD, joins, indexes, normalization.',
                    'Containers, docker-compose, Dockerfiles. Modern deployment stack.',
                ],
            },
            {
                category: 'Networks & Scripting',
                descriptions: [
                    'TCP/IP, subnetting, VLANs, routing. MikroTik and Cisco in a real environment during my placement.',
                    'Automation scripts for sysadmin. Zsh + Oh My Posh as my daily shell.',
                    'Automation and diagnostics on Windows. Used in the ResolveCore final project.',
                    'Scripting, automation, parsing. REST APIs with requests.',
                ],
            },
            {
                category: 'Development & Tools',
                descriptions: [
                    'Branches, merges, rebases, conflict resolution. Professional workflow with GitHub.',
                    'Hooks, context, Motion. This portfolio is built with React 19.',
                    'Static typing in strict mode. The base of this portfolio and of GymLog.',
                    'Utility-first. All the styling of this site.',
                ],
            },
        ],
    },
    stack: {
        kicker: 'Systems profile',
        title: 'Technical coverage',
        subtitle:
            'Systems administration, networking, servers and IT support skills — the core of my ASIR profile.',
        categories: [
            'Systems',
            'Servers & Databases',
            'Networks',
            'Security & telecom',
            'Cloud & containers',
            'Scripting & tools',
        ],
    },
    projects: {
        kicker: 'Open Source',
        title: 'Projects',
        subtitle: 'Public repositories on GitHub — updated automatically.',
        repos: 'Repos',
        stars: 'Stars',
        forks: 'Forks',
        profile: 'View Profile',
        fallbackNote: 'Hand-picked featured projects.',
        noDesc: 'No description',
    },
    achievements: {
        kicker: 'Achievements',
        title: 'Milestones & education',
        subtitle: 'Each one represents hours of study, fixed mistakes and small wins.',
        status: {
            completed: '✓ Completed',
            inProgress: '◐ In progress',
            planned: '○ Next',
        },
        items: [
            { title: 'ASIR Year 1', issuer: 'Vocational Training', description: 'Operating systems, networks, hardware, basic scripting.' },
            { title: 'Qualified in ASIR', issuer: 'Vocational Training', description: 'Higher Technician degree in Computer Systems and Network Administration obtained.' },
            { title: 'First public repository', issuer: 'GitHub @Haplee', description: 'Start of the open source journey. Commits, issues, pull requests.' },
            { title: 'Professional portfolio', issuer: 'Self-developed', description: 'React 19 + TypeScript + Three.js. This site you are viewing.' },
            { title: 'English B1', issuer: 'Language skills', description: 'B1 certification in progress: technical reading and professional communication in English.' },
            { title: 'Spanish Army', issuer: 'Spanish Army', description: 'Next step: enlisting in the Spanish Army.' },
        ],
    },
    setup: {
        kicker: 'Hardware & Software',
        title: 'My Setup',
        subtitle: 'The gear and tools I work with every day.',
        laptopSub: 'Gaming Laptop',
        periphTitle: 'Peripherals',
        periphSub: 'Work equipment',
        softwareTitle: 'Software',
        labels: {
            display: 'Display',
            keyboard: 'Keyboard',
            mouse: 'Mouse',
            headphones: 'Headphones',
            mousepad: 'Mousepad',
            os: 'OS',
            editor: 'Editor',
            terminal: 'Terminal',
            shell: 'Shell',
        },
    },
    contact: {
        kicker: "Let's connect",
        title: 'Contact',
        intro:
            'A job offer, a project or a collaboration? The fastest channel is LinkedIn or email. I reply within 24h.',
        cvName: 'Résumé',
        cvSub: 'View full CV',
        cvAria: "View Fran Vidal's résumé (opens in a new tab)",
        availTitle: 'Available for work',
        availText:
            'Looking for my first opportunity in systems, networking or IT support. Available in the province of Cádiz and remotely. I reply fast.',
        newTab: '(opens in a new tab)',
        emailAria: 'Send an email to Fran Vidal',
        profileAria: (name: string) => `Fran Vidal's ${name} profile (opens in a new tab)`,
    },
    footer: {
        role: 'Web Developer · Sysadmin',
        rights: (year: number) => `© ${year} Fran Vidal. All rights reserved.`,
        madeWith: 'Made with',
        using: 'using',
    },
    barbate: {
        headerTitle: 'Barbate, Cádiz · Spain',
        availLabel: 'Barbate, Cádiz · Available in the province and remotely',
        osmAria: 'View Barbate on OpenStreetMap (opens in a new tab)',
        bottomTitle: 'Costa de la Luz · Atlantic',
        bottomSub: 'Where I was born on 17.07.2003 at 3:00 AM ♋',
    },
    overlay: {
        stars: 'Stars',
        forks: 'Forks',
        updated: 'Updated:',
        viewGithub: 'View on GitHub',
        demo: 'Demo',
        noDesc: 'No description available.',
        close: 'Close',
    },
};
