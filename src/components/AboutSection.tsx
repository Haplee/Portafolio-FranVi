import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import SpotlightCard from './reactbits/SpotlightCard';
import { useLang } from '@/i18n/LangProvider';

// Leaflet + su CSS se cargan bajo demanda (el mapa está por debajo del pliegue).
const BarbateMap = lazy(() => import('./ui/BarbateMap'));

export default function AboutSection() {
    const { t } = useLang();
    return (
        <section id="about" className="py-16 md:py-24 px-4 w-full bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i aria-hidden="true" className="fas fa-user mr-2" />{t.about.kicker}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title">
                        {t.about.title}
                    </h2>
                    <p className="text-slate-500 max-w-xl mt-6">
                        {t.about.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bio card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2"
                    >
                        <SpotlightCard className="p-8 h-full" spotlightColor="rgba(34,211,238,0.12)">
                            <div className="flex items-center gap-4 mb-7">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 flex items-center justify-center border border-cyan-500/20">
                                    <i aria-hidden="true" className="fas fa-terminal text-cyan-400 text-lg" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{t.about.bioTitle}</h3>
                                    <p className="text-xs text-slate-500">{t.about.bioSubtitle}</p>
                                </div>
                            </div>

                            <p className="text-base text-slate-300 leading-relaxed mb-4">
                                {t.about.bioPre} <strong className="text-cyan-400 glow-text-cyan">Fran Vidal</strong>{t.about.bioPost}
                            </p>
                            <p className="text-base text-slate-400 leading-relaxed mb-8">
                                {t.about.bio2}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="./assets/docs/CV-FranVidal.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                                >
                                    <i aria-hidden="true" className="fas fa-file-alt text-sm" />
                                    {t.about.cvBtn}
                                </a>
                                <a
                                    href="https://github.com/Haplee"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-600 hover:border-cyan-500/50 text-slate-300 hover:text-white font-medium rounded-xl transition-all hover:bg-cyan-500/5"
                                >
                                    <i aria-hidden="true" className="fab fa-github text-sm" />
                                    GitHub
                                </a>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Info cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4"
                    >
                        <SpotlightCard className="p-5" spotlightColor="rgba(34,211,238,0.10)">
                            <InfoCard
                                label={t.about.cards.location}
                                value="Barbate, Cádiz"
                                emoji="📍"
                            />
                        </SpotlightCard>
                        <SpotlightCard className="p-5" spotlightColor="rgba(34,211,238,0.10)">
                            <InfoCard
                                label={t.about.cards.education}
                                value={t.about.cards.educationValue}
                                emoji="🎓"
                            />
                        </SpotlightCard>
                        <SpotlightCard className="p-5" spotlightColor="rgba(34,238,180,0.10)">
                            <InfoCard
                                label={t.about.cards.status}
                                value={t.about.cards.statusValue}
                                emoji="✅"
                                highlight
                            />
                        </SpotlightCard>
                        <SpotlightCard className="p-5" spotlightColor="rgba(168,85,247,0.10)">
                            <InfoCard
                                label={t.about.cards.languages}
                                value={t.about.cards.languagesValue}
                                emoji="🌐"
                            />
                        </SpotlightCard>
                    </motion.div>
                </div>

                {/* Birthplace map */}
                <div className="mt-8">
                    <Suspense fallback={<div className="h-64 sm:h-80 md:h-96 rounded-2xl bg-slate-800/40 animate-pulse border border-slate-700/50" />}>
                        <BarbateMap />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}

function InfoCard({
    label, value, highlight, emoji
}: {
    label: string; value: string; highlight?: boolean; emoji?: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg
                ${highlight
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20'
                    : 'bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/15'
                }`}
            >
                <span>{emoji}</span>
            </div>
            <div>
                <span className="text-xs text-slate-500 block mb-0.5 uppercase tracking-wide">{label}</span>
                <p className={`text-sm font-semibold ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</p>
            </div>
        </div>
    );
}
