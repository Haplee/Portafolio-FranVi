import { motion } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';
import { useGitHubData } from '@/hooks/useGitHubData';

function calcAge(): number {
    const birth = new Date('2003-07-17');
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

function calcYearsCoding(): number {
    return new Date().getFullYear() - 2021;
}

export default function StatsSection() {
    const { repos } = useGitHubData('Haplee');
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

    const stats = [
        { value: calcAge(),         label: 'Años',              suffix: '',  icon: '♋', color: 'text-amber-400',  glow: 'shadow-amber-500/15',  bg: 'from-amber-500/10' },
        { value: calcYearsCoding(), label: 'Años codeando',     suffix: '',  icon: '⌨️',  color: 'text-cyan-400',   glow: 'shadow-cyan-500/15',   bg: 'from-cyan-500/10' },
        { value: repos.length,      label: 'Repositorios',      suffix: '',  icon: '📦', color: 'text-blue-400',   glow: 'shadow-blue-500/15',   bg: 'from-blue-500/10' },
        { value: totalStars,        label: 'Estrellas GitHub',  suffix: '',  icon: '⭐', color: 'text-yellow-400', glow: 'shadow-yellow-500/15', bg: 'from-yellow-500/10' },
        { value: 8,                 label: 'Constelaciones',    suffix: '',  icon: '✨', color: 'text-purple-400', glow: 'shadow-purple-500/15', bg: 'from-purple-500/10' },
        { value: 2,                 label: 'Idiomas',           suffix: '',  icon: '🌍', color: 'text-green-400',  glow: 'shadow-green-500/15',  bg: 'from-green-500/10' },
        { value: 36,                label: 'Latitud Barbate',   suffix: '°N', icon: '📍', color: 'text-rose-400',   glow: 'shadow-rose-500/15',   bg: 'from-rose-500/10' },
        { value: 3,                 label: 'AM nacimiento',     suffix: '',  icon: '🕒', color: 'text-indigo-400', glow: 'shadow-indigo-500/15', bg: 'from-indigo-500/10' },
    ];

    return (
        <section id="stats" className="py-16 md:py-20 px-4 w-full bg-slate-900 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/3 blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i className="fas fa-chart-line mr-2" />En números
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Datos curiosos
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            whileHover={{ y: -4 }}
                            className={`
                                hologram-card relative p-5 rounded-2xl
                                bg-gradient-to-br ${s.bg} to-transparent
                                border border-slate-700/40
                                shadow-lg ${s.glow}
                                transition-shadow hover:shadow-xl
                            `}
                        >
                            <div className="text-2xl mb-2">{s.icon}</div>
                            <div className={`text-3xl md:text-4xl font-bold ${s.color} mb-1 tabular-nums`}>
                                <AnimatedCounter target={s.value} />
                                {s.suffix && <span className="text-xl ml-0.5">{s.suffix}</span>}
                            </div>
                            <div className="text-xs text-slate-500 tracking-wider">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Easter egg hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center"
                >
                    <p className="text-xs text-slate-600 font-mono">
                        Prueba: <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800/50 text-slate-500">↑↑↓↓←→←→BA</kbd>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
