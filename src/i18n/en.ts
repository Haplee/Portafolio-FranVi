import type { Dict } from './es';

// English dictionary. Must implement `Dict` in full — `es.ts` is the source of
// truth for the shape. Proper nouns, tech names and locations are preserved.
export const en: Dict = {
    nav: {
        work: 'Projects',
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
            'Qualified Higher Technician in ASIR (Network Systems Administration). I engineered and deployed ResolveCore —a full-cycle IT support platform on my own Debian VPS— and actively maintain systems utilities, offline-first PWAs, and production automation scripts.',
        ctaWork: 'View projects',
        ctaContact: 'Get in touch',
        creds: ['Higher Technician in ASIR', 'English B1 in progress'],
        portraitAlt: 'Portrait of Fran Vidal',
        specs: [
            { k: 'Profile', v: 'Systems, networking and IT support' },
            { k: 'Degree', v: 'Higher Technician in ASIR (2026)' },
            { k: 'Availability', v: 'Cádiz province & remote' },
            { k: 'Status', v: 'Immediate availability' },
        ],
    },

    work: {
        sectionLabel: 'Projects and systems',
        sectionTitle: 'What I have built, and with what criteria',
        sectionIntro:
            'A unified view of my engineering work: from the design and deployment of the central case study (ResolveCore) to production utilities, offline-first web apps, and virtualized network labs.',

        // Featured Case Study #01: ResolveCore
        featuredBadge: 'Featured project · ASIR final degree',
        title: 'ResolveCore',
        oneLiner:
            'An end-to-end platform where a user requests assistance and a technician diagnoses and resolves the incident without leaving the system.',
        problem:
            'In a small organisation, technical support often scatters across calls, emails, and the memory of whoever fixed it last time. Without traceability, time is lost and identical faults are investigated from scratch repeatedly. ResolveCore closes that loop: every incident enters through a unified portal, gets prioritised and assigned to a technician, is diagnosed on the user’s machine, and concludes with a structured report archived for future reference.',

        flowLabel: 'The interactive support loop',
        flowInstruction: 'Select a phase to inspect its technical implementation:',
        flow: [
            {
                step: 'Request',
                summary: 'Structured intake',
                desc: 'The user logs the fault via the web portal. No emails going missing or unrecorded calls.',
                detail: 'The user submits a structured intake form capturing endpoint context automatically (OS version, browser, user-declared severity).',
            },
            {
                step: 'Ticket',
                summary: 'Prioritised dispatch',
                desc: 'The incident enters MantisBT with assigned technician, priority, category, and service level.',
                detail: 'The MantisBT REST integration creates the record, establishes SLA clocks, and notifies the responsible technician.',
            },
            {
                step: 'Remote session',
                summary: 'Assisted remote session',
                desc: 'Assisted remote connection into the user’s workstation launched directly from the ticket.',
                detail: 'Technicians initialize remote sessions (AnyDesk / RDP) with a single click right from the ticket dashboard.',
            },
            {
                step: 'Diagnostics',
                summary: 'Automated auditing',
                desc: 'Automated scripts auditing hardware, services, networking, and CVE vulnerabilities in seconds.',
                detail: 'Non-intrusive execution of PowerShell (Windows), Bash (Linux), or Python routines gathering disk health, memory stats, event logs, and CVE matches.',
            },
            {
                step: 'Report',
                summary: 'Audit trail and closure',
                desc: 'Diagnostic output and resolution stay attached and searchable in the system archive.',
                detail: 'Output logs and applied fixes are committed directly into the ticket record, enabling rapid resolution for recurring faults.',
            },
        ],

        infraLabel: 'Infrastructure specification',
        infra: [
            { k: 'Server', v: 'IONOS VPS · Debian Linux' },
            { k: 'Web', v: 'Nginx + PHP-FPM' },
            { k: 'Data', v: 'Relational MariaDB' },
            { k: 'Deployment', v: 'Docker · docker-compose' },
            { k: 'Ticketing', v: 'MantisBT (API integration)' },
            { k: 'Remote', v: 'AnyDesk / RDP' },
            { k: 'Diagnostics', v: 'PowerShell · Bash · Python' },
        ],

        decisionsLabel: 'Architectural decisions',
        decisions: [
            {
                title: 'Integrating MantisBT rather than writing a ticketing system from scratch',
                body:
                    'Rebuilding an issue tracker would have consumed weeks only to yield something inferior to battle-tested tools. Integrating MantisBT required studying its relational database schema and REST API, closely mirroring real-world systems work: connecting and hardening existing infrastructure.',
            },
            {
                title: 'Containerised deployment with Docker on VPS',
                body:
                    'Installing services manually on the host OS is brittle and prone to drift. Using docker-compose, the entire Nginx, PHP-FPM, and MariaDB stack spins up reproducibly in minutes, ensuring strict parity between local development and production.',
            },
            {
                title: 'Three diagnostic languages matched to the target environment',
                body:
                    'Native PowerShell for Windows endpoints, Bash for Linux servers, and Python for shared analytical routines. This separation avoids requiring heavy runtime installations on user workstations when the goal is to resolve an issue promptly.',
            },
        ],

        repoCta: 'View ResolveCore code',
        newTab: '(opens in a new tab)',

        // Other completed engineering projects
        catalogueLabel: 'Engineering catalogue',
        catalogueTitle: 'Other finished systems utilities and applications',
        catalogueIntro:
            'Production tools, memory daemons, and administrative utilities that I have designed, implemented, and verified in real environments.',
        filters: {
            all: 'All',
            systems: 'Systems & Scripts',
            web: 'Web & PWA',
            infra: 'Networks & Labs',
        },
        viewRepo: 'GitHub repository',
        viewLive: 'View live deployment',
        otherItems: [
            {
                id: 'gymlog',
                name: 'GymLog',
                category: 'web',
                categoryBadge: 'Offline-First PWA',
                tagline: 'Native progressive web app for workout logging and biomechanical analysis with full offline persistence.',
                desc: 'Progressive web app built for strength training. Features an offline-first architecture with reactive sync, 1RM calculation via the Brzycki formula, volume analytics broken down by muscle group, and biometric authentication.',
                stack: ['TypeScript', 'React 19', 'Supabase', 'Dexie / IndexedDB', 'PWA'],
                highlights: ['Offline-First with Dexie.js', 'Brzycki 1RM calculator', 'Biometric authentication', 'Live in production'],
                liveUrl: 'https://gymlog.dpdns.org',
                repoUrl: 'https://github.com/Haplee/gymlog',
            },
            {
                id: 'omniroute',
                name: 'OmniRoute-Installer',
                category: 'systems',
                categoryBadge: 'Systems & AI',
                tagline: 'Universal local language model router and installer with automatic hardware-aware selection.',
                desc: 'Automates deployment and configuration of local AI inference environments for developer machines. Detects GPU/CPU compute capability, routes queries across multiple backends, and configures environment profiles for CLI developer workflows.',
                stack: ['PowerShell', 'REST APIs', 'CLI Windows/Linux', 'Local LLMs'],
                highlights: ['GPU/VRAM detection', 'Multi-provider routing', 'Smart developer profiles', 'Unattended installation'],
                liveUrl: 'https://haplee.github.io/OmniRoute-Installer/',
                repoUrl: 'https://github.com/Haplee/OmniRoute-Installer',
            },
            {
                id: 'aceleramac',
                name: 'AceleraMac',
                category: 'systems',
                categoryBadge: 'Systems & Shell',
                tagline: 'Memory pressure monitor and automated RAM purge utility for macOS.',
                desc: 'Lightweight daemon monitoring memory pressure states in macOS. Triggers proactive flushing of inactive buffers whenever memory constraints exceed critical thresholds. Written in native POSIX Shell without third-party dependencies or root privileges.',
                stack: ['POSIX Shell', 'macOS vm_stat', 'memory_pressure', 'Launchd'],
                highlights: ['Zero external dependencies', 'No root/sudo needed', 'Negligible CPU overhead', 'Documentation on GitHub Pages'],
                liveUrl: 'https://haplee.github.io/AceleraMac/',
                repoUrl: 'https://github.com/Haplee/AceleraMac',
            },
            {
                id: 'bot-recordatorio',
                name: 'Bot-Recordatorio',
                category: 'web',
                categoryBadge: 'Web & Backend',
                tagline: 'Automated alert and recurring reminder system via Telegram Bot and transactional email.',
                desc: 'Full-stack application built with Next.js and relational storage to schedule and trigger periodic reminders for bill payments, server renewal dates, and deadlines, delivering real-time push alerts through Telegram.',
                stack: ['Next.js 16', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Telegram API'],
                highlights: ['Multi-channel delivery (Telegram + Email)', 'Data schema with Prisma', 'Deployed on Vercel', 'Automated cron schedules'],
                liveUrl: 'https://bot-recordatorio.vercel.app',
                repoUrl: 'https://github.com/Haplee/Bot-Recordatorio',
            },
            {
                id: 'autodriver',
                name: 'AutoDriver-Updater',
                category: 'systems',
                categoryBadge: 'Windows Systems',
                tagline: 'Unattended hardware audit and driver updater for Windows environments.',
                desc: 'PowerShell administration utility that inventories physical devices, checks versions against vendor catalogues, and performs silent driver updates, eliminating the need for bloated third-party software containing telemetry or adware.',
                stack: ['PowerShell', 'Windows PnP API', 'WMI / CIM', 'Windows Update'],
                highlights: ['No commercial third-party bloat', 'Precise PnP device auditing', 'Silent unattended execution', 'Audit trail log output'],
                liveUrl: 'https://haplee.github.io/AutoDriver-Updater/',
                repoUrl: 'https://github.com/Haplee/AutoDriver-Updater',
            },
            {
                id: 'scan-repair',
                name: 'Windows Scan & Repair',
                category: 'systems',
                categoryBadge: 'Systems Maintenance',
                tagline: 'Automated system file integrity verification and image restoration suite for Windows 10 & 11.',
                desc: 'Technical support script chaining filesystem check (chkdsk), protected system file verification (SFC), and Component Store health restoration (DISM) into a single deterministic maintenance sequence.',
                stack: ['Batch', 'DISM', 'SFC', 'chkdsk', 'PowerShell'],
                highlights: ['Deep DISM image repair', 'Sequential single-click execution', 'Detailed output reporting', 'Proven in IT support tasks'],
                liveUrl: 'https://haplee.github.io/Windows_Scan-Repair/',
                repoUrl: 'https://github.com/Haplee/Windows_Scan-Repair',
            },
            {
                id: 'proxychains-setup',
                name: 'Ubuntu VBox Proxychains Setup',
                category: 'infra',
                categoryBadge: 'Networking & Virtualization',
                tagline: 'Automated setup for secure virtualised lab environments in VirtualBox with Proxychains.',
                desc: 'Automation scripts to deploy Ubuntu VirtualBox instances with isolated network adapters and chained proxy routing for traffic analysis, privacy auditing, and penetration testing lab workflows.',
                stack: ['Shell Scripting', 'VirtualBox CLI', 'Proxychains', 'Tor / SOCKS5'],
                highlights: ['One-step network configuration', 'Anonymous proxy chaining', 'Isolated lab topology', 'Reproducible provisioning'],
                liveUrl: null,
                repoUrl: 'https://github.com/Haplee/ubuntu-vbox-proxychains-setup',
            },
            {
                id: 'kali-setup',
                name: 'Kali Linux Setup & Hardening',
                category: 'infra',
                categoryBadge: 'Security & Pentesting',
                tagline: 'Rapid onboarding and technical customization script for Kali Linux workstations.',
                desc: 'Bootstrap script configuring a fresh Kali Linux installation with updated repositories, essential networking and reconnaissance tools, shell ergonomic tweaks, and pre-compiled testing dependencies.',
                stack: ['Bash / Shell', 'Kali Linux', 'APT Package Management', 'Networking tools'],
                highlights: ['Curated security toolchain', 'Customised terminal environment', 'Dependency optimisation', 'Immediate lab readiness'],
                liveUrl: null,
                repoUrl: 'https://github.com/Haplee/kali-setup',
            },
        ],
    },

    skills: {
        label: 'Demonstrated competencies',
        title: 'What I can do, and where I have applied it',
        intro:
            'Every tool is anchored to the real-world environment or project where it was put to work. Anything not verified in production or an authentic lab does not appear on this list.',
        groups: [
            {
                category: 'Systems and servers',
                items: [
                    { name: 'Linux (Debian, Ubuntu, Kali)', where: 'ResolveCore VPS server, security audit environments, and daily WSL2' },
                    { name: 'Windows Server & Windows 11', where: 'Active Directory, GPO, DNS, DHCP, and IIS in ASIR labs; support scripts' },
                    { name: 'Nginx · PHP-FPM', where: 'Production web server and reverse proxy setup for ResolveCore' },
                    { name: 'MariaDB · PostgreSQL · MySQL', where: 'Databases behind ResolveCore, Bot-Recordatorio, and ASIR coursework' },
                    { name: 'Docker & docker-compose', where: 'Containerised and reproducible VPS deployment on Debian' },
                    { name: 'VirtualBox & Virtualization', where: 'Network topology labs and test virtual machines throughout ASIR' },
                ],
            },
            {
                category: 'Networks and physical infrastructure',
                items: [
                    { name: 'MikroTik · Cisco', where: 'Switches and WiFi access points on live client sites during placement' },
                    { name: 'TCP/IP, VLAN, DNS, DHCP', where: 'Subnetting and routing configuration in client sites and lab environments' },
                    { name: 'Cat6 structured cabling', where: 'Full physical cabling runs and patch panel termination during placement' },
                    { name: 'Hikvision CCTV', where: 'Remote-accessible IP cameras and NVR units installed on client sites' },
                    { name: 'Alarm systems', where: 'Installation, wiring, and routine maintenance during placement at Ingenia Market' },
                ],
            },
            {
                category: 'Automation and development',
                items: [
                    { name: 'Bash / POSIX Shell', where: 'ResolveCore diagnostics, AceleraMac daemon, and server maintenance scripts' },
                    { name: 'PowerShell', where: 'OmniRoute-Installer, AutoDriver-Updater, and Windows diagnostic tooling' },
                    { name: 'Python', where: 'ResolveCore analytics routines, cross-platform scripts, and REST API consumers' },
                    { name: 'TypeScript · React 19', where: 'GymLog (offline-first PWA), Bot-Recordatorio, and this portfolio' },
                    { name: 'Git & GitHub', where: 'Version control, branch workflows, and CI/CD pipelines across all projects' },
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
                role: 'Support and network installations',
                body:
                    'Three months working on client premises. Cat6 structured cabling end to end, switch and WiFi configuration with MikroTik and Cisco, Hikvision CCTV with remote access, and security alarm systems. Also handled in-person incident resolution directly alongside end users.',
            },
            {
                date: '2026',
                title: 'ResolveCore',
                role: 'Final degree project · ASIR',
                body:
                    'Comprehensive full-cycle IT support platform on an IONOS Debian VPS, featuring cross-platform automated diagnostics, MantisBT integration, and multi-feed CVE scanning.',
            },
            {
                date: '2026',
                title: 'Higher Technician in ASIR',
                role: 'Vocational training — Qualified',
                body:
                    'Network Systems Administration. Operating systems, network engineering, servers, relational databases, virtualisation, and cybersecurity.',
            },
            {
                date: 'Now',
                title: 'Seeking professional opportunities',
                role: 'Systems, networking, or IT support',
                body:
                    'Immediately available across Cádiz province and remotely. English B1 in progress. Actively engineering and shipping production tools.',
            },
        ],
    },

    contact: {
        label: 'Contact',
        title: 'Let’s talk',
        intro:
            'If you are seeking a professional for systems administration, networking, infrastructure, or IT support, reach out via LinkedIn or email. I respond promptly.',
        cvName: 'Curriculum Vitae',
        cvNote: 'Full version on one page',
        emailAria: 'Send an email to Fran Vidal',
        profileAria: (name: string) => `Fran Vidal’s ${name} profile (opens in a new tab)`,
        newTab: '(opens in a new tab)',

        whereLabel: 'Availability & location',
        base: 'Barbate, Cádiz',
        radiusNote: 'On-site travel across Cádiz province (the circle marks ~60 km radius from Barbate).',
        remoteNote: 'For remote roles, full availability with no geographic restrictions.',
        mapAria: 'Map of Cádiz province showing Barbate and travel radius',
        osmAria: 'View Barbate on OpenStreetMap (opens in a new tab)',
    },

    footer: {
        rights: (year: number) => `© ${year} Fran Vidal`,
        colophon: 'Built with React 19, TypeScript and Three.js. The header sky renders the celestial dome over Barbate.',
        source: 'Source code on GitHub',
    },
};
