import { useGitHubData, type GitHubRepo } from '@/hooks/useGitHubData';
import { motion } from 'motion/react';
import SpotlightCard from './reactbits/SpotlightCard';
import AnimatedCounter from './AnimatedCounter';

interface Props {
    onSelectRepo: (repo: GitHubRepo) => void;
}

const LANG_COLORS: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    Python:     'bg-green-500',
    HTML:       'bg-orange-500',
    CSS:        'bg-purple-500',
    Shell:      'bg-emerald-500',
    Kotlin:     'bg-violet-500',
    Java:       'bg-red-500',
};

export default function ProjectsSection({ onSelectRepo }: Props) {
    const { repos, loading, error } = useGitHubData('Haplee');

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    return (
        <section id="projects" className="py-16 md:py-24 px-4 w-full bg-slate-900 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-1/2 w-96 h-48 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

            <div className="max-w-6xl mx-auto relative">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i className="fab fa-github mr-2" />Open Source
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title">
                        Proyectos
                    </h2>
                    <p className="text-slate-500 mt-6">
                        Repositorios públicos en GitHub — actualizados automáticamente.
                    </p>
                </motion.div>

                {/* Stats row */}
                {!loading && !error && repos.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                    >
                        {[
                            { value: repos.length, label: 'Repos', icon: 'fas fa-code-branch', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-blue-500/5', border: 'border-cyan-500/15' },
                            { value: totalStars,   label: 'Estrellas', icon: 'fas fa-star',        color: 'text-amber-400', bg: 'from-amber-500/10 to-yellow-500/5', border: 'border-amber-500/15' },
                            { value: totalForks,   label: 'Forks',     icon: 'fas fa-code-fork',   color: 'text-purple-400', bg: 'from-purple-500/10 to-violet-500/5', border: 'border-purple-500/15' },
                            { value: null,         label: 'Ver Perfil', icon: 'fab fa-github',     color: 'text-white', bg: 'from-slate-700/50 to-slate-800/30', border: 'border-slate-600/30', href: 'https://github.com/Haplee' },
                        ].map((stat, i) => (
                            stat.href ? (
                                <a
                                    key={i}
                                    href={stat.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`stat-card bg-gradient-to-br ${stat.bg} border ${stat.border} rounded-2xl p-5 text-center hover:border-cyan-500/30 group`}
                                >
                                    <div className={`text-2xl font-bold ${stat.color} group-hover:text-cyan-400 transition-colors mb-1`}>
                                        <i className={stat.icon} />
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">{stat.label}</div>
                                </a>
                            ) : (
                                <div key={i} className={`stat-card bg-gradient-to-br ${stat.bg} border ${stat.border} rounded-2xl p-5 text-center`}>
                                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                                        <AnimatedCounter target={stat.value ?? 0} />
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            )
                        ))}
                    </motion.div>
                )}

                {error && (
                    <p className="text-slate-400 text-center py-12 flex items-center justify-center gap-2">
                        <i className="fas fa-exclamation-triangle text-amber-500" />
                        {error}
                    </p>
                )}

                {/* Repo cards */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-52 rounded-2xl bg-slate-800/40 animate-pulse border border-slate-700/50" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, idx) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.04 }}
                            >
                                <SpotlightCard className="h-full" spotlightColor="rgba(34,211,238,0.08)">
                                    <button
                                        onClick={() => onSelectRepo(repo)}
                                        className="flex flex-col justify-between h-full p-6 group w-full text-left cursor-pointer"
                                    >
                                        <div>
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-9 h-9 rounded-lg bg-slate-700/60 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/10 transition-colors">
                                                    <i className="fab fa-github text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                                </div>
                                                <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors leading-tight pt-1 truncate">
                                                    {repo.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 pl-12">
                                                {repo.description || <span className="italic">Sin descripción</span>}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-slate-700/40">
                                            <div className="flex items-center gap-2">
                                                {repo.language && (
                                                    <>
                                                        <span className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] ?? 'bg-slate-500'}`} />
                                                        <span className="text-xs text-slate-500">{repo.language}</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex gap-3 text-xs text-slate-600">
                                                {repo.stargazers_count > 0 && (
                                                    <span className="flex items-center gap-1 text-amber-400/80">
                                                        <i className="fas fa-star" /> {repo.stargazers_count}
                                                    </span>
                                                )}
                                                {repo.forks_count > 0 && (
                                                    <span className="flex items-center gap-1 text-slate-500">
                                                        <i className="fas fa-code-branch" /> {repo.forks_count}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1 text-slate-600 group-hover:text-cyan-500/70 transition-colors">
                                                    <i className="fas fa-expand text-[10px]" />
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
