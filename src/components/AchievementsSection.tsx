import { motion } from 'motion/react';

interface Achievement {
    title: string;
    issuer: string;
    date: string;
    icon: string;
    status: 'completed' | 'in-progress' | 'planned';
    description: string;
}

const ACHIEVEMENTS: Achievement[] = [
    {
        title: 'ASIR 1º Curso',
        issuer: 'Formación Profesional',
        date: '2022',
        icon: 'fas fa-graduation-cap',
        status: 'completed',
        description: 'Sistemas operativos, redes, hardware, scripting básico.',
    },
    {
        title: 'ASIR 2º Curso',
        issuer: 'Formación Profesional',
        date: '2025',
        icon: 'fas fa-user-graduate',
        status: 'in-progress',
        description: 'Active Directory, virtualización, seguridad, servidores web.',
    },
    {
        title: 'Primer repositorio público',
        issuer: 'GitHub @Haplee',
        date: '2023',
        icon: 'fab fa-github',
        status: 'completed',
        description: 'Inicio del viaje open source. Commits, issues, pull requests.',
    },
    {
        title: 'Portfolio profesional',
        issuer: 'Auto-desarrollado',
        date: '2025',
        icon: 'fas fa-rocket',
        status: 'completed',
        description: 'React 19 + TypeScript + Three.js. Esta web que estás viendo.',
    },
    {
        title: 'Inglés B1',
        issuer: 'Competencia lingüística',
        date: '2024',
        icon: 'fas fa-language',
        status: 'completed',
        description: 'Lectura técnica y comunicación profesional en inglés.',
    },
    {
        title: 'Primer empleo',
        issuer: 'Sysadmin / Web Dev',
        date: '2025-2026',
        icon: 'fas fa-briefcase',
        status: 'planned',
        description: 'Próximo objetivo: integrarme en un equipo profesional.',
    },
];

const STATUS_CONFIG = {
    'completed':   { color: 'text-green-400',  bg: 'bg-green-500/15', border: 'border-green-500/30',  label: '✓ Completado' },
    'in-progress': { color: 'text-cyan-400',   bg: 'bg-cyan-500/15',  border: 'border-cyan-500/30',   label: '◐ En curso' },
    'planned':     { color: 'text-amber-400',  bg: 'bg-amber-500/15', border: 'border-amber-500/30',  label: '○ Próximo' },
};

export default function AchievementsSection() {
    return (
        <section id="achievements" className="py-16 md:py-24 px-4 w-full bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-amber-500/3 blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="text-xs font-semibold text-amber-500 uppercase tracking-[0.2em] mb-3 block">
                        <i aria-hidden="true" className="fas fa-trophy mr-2" />Logros
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white section-title">
                        Hitos y formación
                    </h2>
                    <p className="text-slate-500 mt-6 max-w-xl">
                        Cada uno representa horas de estudio, errores corregidos y pequeñas victorias.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ACHIEVEMENTS.map((a, i) => {
                        const cfg = STATUS_CONFIG[a.status];
                        return (
                            <motion.div
                                key={a.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                whileHover={{ y: -4 }}
                                className="hologram-card p-5 rounded-2xl border border-slate-700/40 transition-all hover:border-slate-600/60 relative group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-12 h-12 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center`}>
                                        <i aria-hidden="true" className={`${a.icon} ${cfg.color} text-xl`} />
                                    </div>
                                    <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                                        {cfg.label}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-white mb-1 leading-tight">{a.title}</h3>
                                <p className="text-xs text-slate-500 mb-2 font-mono tracking-wide">
                                    {a.issuer} · {a.date}
                                </p>
                                <p className="text-sm text-slate-400 leading-relaxed">{a.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
