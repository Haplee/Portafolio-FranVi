import { motion } from 'motion/react';
import { useLang } from '@/i18n/LangProvider';

type Status = 'completed' | 'in-progress' | 'planned';

// Metadatos visuales; título/issuer/descripción salen del diccionario por índice.
const ACHIEVEMENTS: { date: string; icon: string; status: Status }[] = [
    { date: '2022', icon: 'fas fa-graduation-cap', status: 'completed' },
    { date: '2026', icon: 'fas fa-user-graduate',  status: 'completed' },
    { date: '2023', icon: 'fab fa-github',         status: 'completed' },
    { date: '2025', icon: 'fas fa-rocket',         status: 'completed' },
    { date: '2026', icon: 'fas fa-language',        status: 'in-progress' },
    { date: '2026', icon: 'fas fa-shield-halved',   status: 'planned' },
];

const STATUS_STYLE: Record<Status, { color: string; bg: string; border: string }> = {
    'completed':   { color: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/30' },
    'in-progress': { color: 'text-cyan-400',  bg: 'bg-cyan-500/15',  border: 'border-cyan-500/30' },
    'planned':     { color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' },
};

const STATUS_KEY: Record<Status, 'completed' | 'inProgress' | 'planned'> = {
    'completed': 'completed',
    'in-progress': 'inProgress',
    'planned': 'planned',
};

export default function AchievementsSection() {
    const { t } = useLang();
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
                        <i aria-hidden="true" className="fas fa-trophy mr-2" />{t.achievements.kicker}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white section-title">
                        {t.achievements.title}
                    </h2>
                    <p className="text-slate-500 mt-6 max-w-xl">
                        {t.achievements.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ACHIEVEMENTS.map((a, i) => {
                        const cfg = STATUS_STYLE[a.status];
                        const item = t.achievements.items[i];
                        return (
                            <motion.div
                                key={i}
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
                                        {t.achievements.status[STATUS_KEY[a.status]]}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-white mb-1 leading-tight">{item.title}</h3>
                                <p className="text-xs text-slate-500 mb-2 font-mono tracking-wide">
                                    {item.issuer} · {a.date}
                                </p>
                                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
