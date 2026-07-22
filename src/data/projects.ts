import type { GitHubRepo } from '@/hooks/useGitHubData';

// Proyectos curados a mano. Se usan como *fallback* cuando la API pública de
// GitHub falla o agota su cuota (60 req/hora por IP), para que la sección de
// proyectos nunca quede vacía si el enlace circula por LinkedIn.
export const curatedProjects: GitHubRepo[] = [
    {
        id: -1,
        name: 'ResolveCore',
        html_url: 'https://github.com/Haplee/ResolveCore',
        description:
            'Plataforma de soporte IT de ciclo completo (TFG): solicitud → ticket → conexión remota → diagnóstico → informe. VPS IONOS con Nginx, PHP-FPM y MariaDB, contenedorizado con Docker. Diagnósticos automatizados en PowerShell, Bash y Python.',
        language: 'PHP',
        stargazers_count: 0,
        forks_count: 0,
        pushed_at: '2026-06-01T00:00:00Z',
        updated_at: '2026-06-01T00:00:00Z',
        homepage: '',
        topics: ['soporte-it', 'wordpress', 'mantisbt', 'anydesk', 'docker'],
    },
    {
        id: -2,
        name: 'GymLog',
        html_url: 'https://github.com/Haplee/GymLog',
        description:
            'PWA de seguimiento de entrenamientos, instalable en el móvil. Registro de rutinas, series y progreso.',
        language: 'TypeScript',
        stargazers_count: 0,
        forks_count: 0,
        pushed_at: '2026-05-01T00:00:00Z',
        updated_at: '2026-05-01T00:00:00Z',
        homepage: '',
        topics: ['react', 'typescript', 'supabase', 'capacitor', 'pwa'],
    },
    {
        id: -3,
        name: 'routine-optimizer',
        html_url: 'https://github.com/Haplee/routine-optimizer',
        description:
            'Planificador para estudiantes deportistas: organiza estudio y entrenamiento con optimización de horarios.',
        language: 'TypeScript',
        stargazers_count: 0,
        forks_count: 0,
        pushed_at: '2026-04-01T00:00:00Z',
        updated_at: '2026-04-01T00:00:00Z',
        homepage: '',
        topics: ['typescript', 'scheduling'],
    },
];
