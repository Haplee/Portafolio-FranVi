import { useGitHubData } from '@/hooks/useGitHubData';
import { motion } from 'motion/react';

export default function ProjectsSection() {
    const { repos, loading, error } = useGitHubData('Haplee');

    return (
        <section id="projects" className="py-24 px-4 w-full bg-slate-900">
            <div className="max-w-6xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Proyectos</h2>
                    <div className="h-1 w-16 bg-cyan-500 rounded-full" />
                    <p className="text-slate-400 mt-3">
                        Mis repositorios de GitHub, actualizados automáticamente.
                    </p>
                </motion.div>

                {error && (
                    <p className="text-slate-400 text-center py-12">{error}</p>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-56 rounded-xl bg-slate-800/50 animate-pulse border border-slate-700" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, idx) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group flex flex-col justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/40 transition-all"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <i className="fab fa-github text-slate-400" />
                                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                            {repo.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                                        {repo.description || 'Sin descripción'}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                    {repo.language && (
                                        <span className="text-xs text-slate-500 font-medium">{repo.language}</span>
                                    )}
                                    <div className="flex gap-3 text-xs text-slate-500">
                                        {repo.stargazers_count > 0 && (
                                            <span className="flex items-center gap-1">
                                                <i className="fas fa-star text-amber-400" /> {repo.stargazers_count}
                                            </span>
                                        )}
                                        {repo.forks_count > 0 && (
                                            <span className="flex items-center gap-1">
                                                <i className="fas fa-code-branch" /> {repo.forks_count}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
