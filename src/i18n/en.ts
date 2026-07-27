import type { Dict } from './es';

// English dictionary. Must implement `Dict` in full — `es.ts` is the source of
// truth for the shape. Proper nouns (technologies, place names, the ASIR
// qualification) are kept as they are.
export const en: Dict = {
    nav: {
        work: 'Project',
        skills: 'Skills',
        path: 'Background',
        contact: 'Contact',
        switchTo: 'Cambiar a español',
        skipToContent: 'Skip to content',
    },

    hero: {
        location: 'Barbate, Cádiz · available across the province and remotely',
        role: 'Systems and network administrator',
        lead:
            'Qualified in ASIR, the Spanish higher vocational degree in network systems administration. For my final project I built a full-cycle IT support platform on my own VPS, and during my placement I wired, configured and maintained real client networks.',
        ctaWork: 'See the project',
        ctaContact: 'Get in touch',
        creds: ['Higher Technician in ASIR', 'English B1 in progress'],
        portraitAlt: 'Portrait of Fran Vidal',
    },

    work: {
        label: 'Final degree project',
        title: 'ResolveCore',
        oneLiner:
            'A platform where a user asks for help and a technician fixes it without leaving the system.',
        problem:
            'In a small company, IT support lives across email, the phone and whoever remembers fixing it last time. Nothing is logged, nobody knows how long anything takes, and the same fault gets solved three times from scratch. ResolveCore closes that loop: every incident comes in through one door, gets a technician assigned, is diagnosed on the user’s own machine, and ends in a report that stays on file.',

        flowLabel: 'The loop',
        flow: [
            { step: 'Request', desc: 'The user describes the problem in the portal. No emails going missing.' },
            { step: 'Ticket', desc: 'The request enters the issue tracker with a priority and an assigned technician.' },
            { step: 'Remote session', desc: 'The technician connects to the user’s machine straight from the ticket.' },
            { step: 'Diagnostics', desc: 'Scripts collect system, network, disk and service state.' },
            { step: 'Report', desc: 'Findings and fix are attached to the ticket and searchable later.' },
        ],

        infraLabel: 'Infrastructure',
        infra: [
            { k: 'Server', v: 'IONOS VPS · Debian' },
            { k: 'Web', v: 'Nginx + PHP-FPM' },
            { k: 'Data', v: 'MariaDB' },
            { k: 'Deployment', v: 'Docker · docker-compose' },
            { k: 'Ticketing', v: 'MantisBT' },
            { k: 'Remote', v: 'AnyDesk' },
            { k: 'Diagnostics', v: 'PowerShell · Bash · Python' },
        ],

        decisionsLabel: 'Three decisions',
        decisions: [
            {
                title: 'Integrating MantisBT rather than writing my own ticket system',
                body:
                    'Reimplementing an issue tracker would have cost me weeks to end up with something worse than what already exists and is battle-tested. Integrating it forced me to read its data model and its API, which is a lot closer to the actual job: wiring together tools that are already there instead of rewriting them.',
            },
            {
                title: 'Docker on the VPS, not a direct install',
                body:
                    'Installing Nginx, PHP and MariaDB by hand on the server works right up until something breaks and there is no way to tell what changed. With containers I can rebuild the whole environment from scratch in minutes, and the one running on my laptop is identical to production.',
            },
            {
                title: 'Three diagnostic languages instead of one',
                body:
                    'PowerShell for Windows clients, Bash for Linux, and Python for whatever had to run on both. Unifying everything into a single language would have meant installing a runtime on user machines — exactly what you do not want to touch when you are there to fix something.',
            },
        ],

        repoCta: 'View the repository',

        alsoLabel: 'Also on GitHub',
        also: [
            {
                name: 'GymLog',
                stack: 'TypeScript · React · Supabase',
                desc: 'Workout tracker as an installable PWA: routines, sets and progress.',
            },
            {
                name: 'routine-optimizer',
                stack: 'TypeScript',
                desc: 'Planner for students who also train: fits study and gym hours together without clashes.',
            },
        ],
        profileCta: 'Full profile on GitHub',
        newTab: '(opens in a new tab)',
    },

    skills: {
        label: 'Skills',
        title: 'What I can do, and where I have done it',
        intro:
            'Every tool comes with the place I used it. Anything I have only met in a syllabus is not on this list.',
        groups: [
            {
                category: 'Systems and servers',
                items: [
                    { name: 'Linux (Debian, Ubuntu)', where: 'ResolveCore server and daily environment on WSL2' },
                    { name: 'Windows Server', where: 'Active Directory, GPO, DNS, DHCP and IIS in the ASIR lab' },
                    { name: 'Nginx · PHP-FPM', where: 'Web server behind ResolveCore' },
                    { name: 'MariaDB · MySQL · PostgreSQL', where: 'ResolveCore database and ASIR coursework' },
                    { name: 'Docker', where: 'Deploying ResolveCore to the VPS' },
                    { name: 'VirtualBox', where: 'Network and server labs throughout ASIR' },
                ],
            },
            {
                category: 'Networks and installation',
                items: [
                    { name: 'MikroTik · Cisco', where: 'Switches and WiFi on client sites during my placement' },
                    { name: 'TCP/IP, VLAN, DNS, DHCP', where: 'Network configuration on client sites and in the lab' },
                    { name: 'Cat6 structured cabling', where: 'Full installations on client sites during my placement' },
                    { name: 'Hikvision CCTV', where: 'Cameras with remote access, installed and configured on site' },
                    { name: 'Alarm systems', where: 'Installation and maintenance during my placement' },
                ],
            },
            {
                category: 'Automation and development',
                items: [
                    { name: 'Bash', where: 'ResolveCore diagnostics and server scripting' },
                    { name: 'PowerShell', where: 'Diagnostics on Windows clients in ResolveCore' },
                    { name: 'Python', where: 'Cross-platform scripts and REST API work' },
                    { name: 'Git', where: 'Every project; branches, merges and conflict resolution' },
                    { name: 'React · TypeScript', where: 'This site and GymLog' },
                ],
            },
        ],
    },

    path: {
        label: 'Background',
        title: 'Where I come from',
        items: [
            {
                date: '2026',
                title: 'Placement at Ingenia Market · Chiclana',
                role: 'Support and installations',
                body:
                    'Three months on client sites. Cat6 structured cabling end to end, switch and WiFi configuration with MikroTik and Cisco, Hikvision CCTV with remote access, and alarm systems. Plus first-line support on site, which is where you learn to explain a technical problem to someone who just wants their computer working again.',
            },
            {
                date: '2026',
                title: 'ResolveCore',
                role: 'Final degree project',
                body: 'Full-cycle IT support platform on my own VPS. Covered in detail above.',
            },
            {
                date: '2026',
                title: 'Higher Technician in ASIR',
                role: 'Vocational training — qualified',
                body:
                    'Network Systems Administration. Operating systems, networking, servers, databases, virtualisation and security.',
            },
            {
                date: 'Now',
                title: 'Looking for a first role',
                role: 'Systems, networks or IT support',
                body:
                    'Available across Cádiz province and remotely. English B1 in progress. Still building things in the meantime.',
            },
        ],
    },

    contact: {
        label: 'Contact',
        title: 'Let’s talk',
        intro:
            'If you are looking for someone for systems, networks or support, message me on LinkedIn or by email. I reply within 24 hours.',
        cvName: 'CV',
        cvNote: 'Full version, one page',
        emailAria: 'Send an email to Fran Vidal',
        profileAria: (name: string) => `Fran Vidal’s ${name} profile (opens in a new tab)`,
        newTab: '(opens in a new tab)',

        whereLabel: 'Where I am',
        base: 'Barbate, Cádiz',
        radiusNote: 'I travel across Cádiz province — the circle marks roughly 60 km from Barbate.',
        remoteNote: 'For remote work, no limit.',
        mapAria: 'Map of Cádiz province showing Barbate and the travel radius',
        osmAria: 'View Barbate on OpenStreetMap (opens in a new tab)',
    },

    footer: {
        rights: (year: number) => `© ${year} Fran Vidal`,
        colophon: 'Built with React, TypeScript and Three.js. The sky in the header is the one over Barbate.',
        source: 'Source code',
    },
};
