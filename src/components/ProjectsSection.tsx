import { useGitHubData } from '@/hooks/useGitHubData';
import SpotlightCard from './reactbits/SpotlightCard';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';

const ProjectsSection = () => {
    const { repos, loading, error } = useGitHubData('FranVi-Asir');

    return (
        <section id="projects" className="py-24 px-4 w-full bg-slate-900/50">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 inline-block">
                        <DecryptedText
                            text="Proyectos Destacados"
                            animateOn="view"
                            revealDirection="start"
                            speed={60}
                            maxIterations={12}
                            className="text-white"
                            encryptedClassName="text-slate-600"
                        />
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mt-4 mx-auto"></div>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        Explora mis repositorios más recientes obtenidos directamente desde GitHub API.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 rounded-3xl bg-slate-800/50 animate-pulse border border-slate-700"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 bg-red-900/20 p-8 rounded-2xl border border-red-900/50">
                        <i className="fas fa-exclamation-triangle text-3xl mb-4"></i>
                        <p>Error al cargar proyectos: {error}</p>
                        <p className="text-sm mt-2 text-red-300">Verifica la conexión a internet o el límite de la API.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {repos.map((repo) => (
                            <SpotlightCard
                                key={repo.id}
                                className="h-full flex flex-col justify-between bg-slate-800/30 border-slate-700 hover:border-indigo-500/50 transition-all duration-300 group"
                                spotlightColor="rgba(99, 102, 241, 0.15)"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <i className="fas fa-folder text-indigo-400 text-2xl group-hover:text-indigo-300 transition-colors"></i>
                                        <div className="flex gap-3 text-slate-400 text-sm">
                                            <span className="flex items-center gap-1"><i className="fas fa-star text-amber-400"></i> {repo.stargazers_count}</span>
                                            <span className="flex items-center gap-1"><i className="fas fa-code-branch"></i> {repo.forks_count}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-1">
                                        {repo.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 min-h-[3.75rem]">
                                        {repo.description || 'Sin descripción disponible.'}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                                    <span className="text-xs text-slate-500 font-mono">
                                        {repo.language && (
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                                {repo.language}
                                            </span>
                                        )}
                                    </span>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium hover:underline decoration-indigo-500 underline-offset-4"
                                    >
                                        <ShinyText
                                            text="Ver en GitHub"
                                            disabled={false}
                                            speed={3}
                                            className="text-indigo-400 group-hover:text-white transition-colors"
                                            shineColor="#ffffff"
                                        />
                                        <i className="fas fa-external-link-alt ml-1 text-xs text-indigo-500 group-hover:text-white"></i>
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

export default ProjectsSection;
