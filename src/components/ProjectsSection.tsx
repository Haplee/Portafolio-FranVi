import { useGitHubData } from '@/hooks/useGitHubData';
import SpotlightCard from './reactbits/SpotlightCard';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';

export default function ProjectsSection() {
    const { repos, loading } = useGitHubData('FranVi-Asir'); // Username is now just for show, mock fallback handles it.

    return (
        <section id="projects" className="py-24 px-4 w-full bg-slate-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 inline-block relative">
                        <DecryptedText
                            text="Proyectos Destacados"
                            animateOn="view"
                            revealDirection="center"
                            speed={60}
                            maxIterations={12}
                            className="relative z-10"
                            encryptedClassName="text-slate-700"
                        />
                        <div className="absolute -bottom-2 left-0 w-full h-3 bg-cyan-500/20 -skew-x-12 -z-0"></div>
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Una selección de mis trabajos más recientes en desarrollo web y administración de sistemas.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-80 rounded-3xl bg-slate-800/50 animate-pulse border border-slate-700/50"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {repos.map((repo) => (
                            <SpotlightCard
                                key={repo.id}
                                className="h-full flex flex-col justify-between bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/20"
                                spotlightColor="rgba(34, 211, 238, 0.1)"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/30 transition-colors">
                                            <i className="fas fa-code text-cyan-400 text-xl"></i>
                                        </div>
                                        <div className="flex gap-4 text-xs font-mono text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded-full border border-slate-800">
                                            <span className="flex items-center gap-1.5"><i className="fas fa-star text-amber-400"></i> {repo.stargazers_count}</span>
                                            <span className="flex items-center gap-1.5"><i className="fas fa-code-branch text-purple-400"></i> {repo.forks_count}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                        {repo.name}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 border-l-2 border-slate-700 pl-4 group-hover:border-cyan-500/30 transition-colors">
                                        {repo.description || 'Sin descripción disponible.'}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-medium px-3 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                                        {repo.language || 'N/A'}
                                    </span>

                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-white transition-colors group/link"
                                    >
                                        <ShinyText
                                            text="Ver Repositorio"
                                            disabled={false}
                                            speed={3}
                                            className="text-cyan-400 group-hover/link:text-white transition-colors"
                                            shineColor="#ffffff"
                                        />
                                        <i className="fas fa-arrow-right -rotate-45 group-hover/link:rotate-0 transition-transform duration-300"></i>
                                    </a>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};


