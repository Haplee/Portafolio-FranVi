import { motion } from 'motion/react';
import { useLang } from '@/i18n/LangProvider';

// Solo metadatos visuales; categoría e items salen del diccionario por índice.
const NOW_META = [
    { icon: '📚', accent: 'border-cyan-500/30 bg-cyan-500/5', chipColor: 'text-cyan-400' },
    { icon: '🔨', accent: 'border-purple-500/30 bg-purple-500/5', chipColor: 'text-purple-400' },
    { icon: '🎯', accent: 'border-amber-500/30 bg-amber-500/5', chipColor: 'text-amber-400' },
];

export default function NowSection() {
    const { t } = useLang();
    const NOW_ITEMS = t.now.columns.map((col, i) => ({ ...NOW_META[i], ...col }));
    return (
        <section id="now" className="py-16 md:py-24 px-4 w-full bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em]">
                            <i aria-hidden="true" className="fas fa-circle-dot mr-2 animate-pulse text-green-400" />{t.now.kicker}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white section-title">
                        {t.now.title}
                    </h2>
                    <p className="text-slate-500 mt-6 max-w-xl">
                        {t.now.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {NOW_ITEMS.map((col, ci) => (
                        <motion.div
                            key={col.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.1 }}
                            className={`hologram-card p-5 rounded-2xl border ${col.accent}`}
                        >
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/30">
                                <span className="text-2xl">{col.icon}</span>
                                <h3 className={`text-sm font-bold uppercase tracking-wider ${col.chipColor}`}>
                                    {col.category}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {col.items.map((it, i) => (
                                    <motion.li
                                        key={it.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: ci * 0.1 + i * 0.06 + 0.2 }}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-cyan-500/60 mt-1.5 text-xs">▸</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white mb-0.5">{it.name}</p>
                                            <p className="text-xs text-slate-500 leading-relaxed">{it.detail}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
