import { useGitHubData } from '@/hooks/useGitHubData';
import ShinyText from './reactbits/ShinyText';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function ProjectsSection() {
    // Ensuring we handle the mock data gracefully if username changes or API fails
    const { repos, loading } = useGitHubData('FranVi-Asir');

    return (
        <section id="projects" className="py-32 px-4 w-full bg-slate-950 relative">
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="mb-16 md:mb-24 flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 flex items-center justify-center rounded-lg -skew-x-12 border-2 border-white/20 shadow-lg">
                        <i className="fas fa-clipboard-list text-3xl text-white skew-x-12"></i>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Playbook</span>
                        </h2>
                        <p className="text-slate-400 font-mono text-sm mt-1">CODE REPOSITORIES // EXECUTED PLAYS</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={cn("h-80 rounded-3xl bg-slate-900/50 animate-pulse border border-slate-800")}></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {repos.map((repo, idx) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative h-full flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]"
                            >
                                {/* Tactical Corner Marker */}
                                <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <i className="fas fa-crosshairs text-cyan-400"></i>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                                            <i className="fas fa-code text-cyan-400 text-xl"></i>
                                        </div>
                                        <div className="flex gap-2 text-[10px] font-bold font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
                                            <span className="flex items-center gap-1.5"><i className="fas fa-star text-amber-400"></i> {repo.stargazers_count}</span>
                                            <span className="flex items-center gap-1.5"><i className="fas fa-code-branch text-blue-400"></i> {repo.forks_count}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors font-mono tracking-tight">
                                        {repo.name}
                                    </h3>

                                    <div className="h-1 w-12 bg-slate-800 mb-4 group-hover:w-full group-hover:bg-cyan-500/50 transition-all duration-500"></div>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {repo.description || 'No detailed strategy available for this play.'}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        {repo.language || 'N/A'}
                                    </span>

                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors group/link uppercase tracking-wider"
                                    >
                                        <ShinyText
                                            text="Execute"
                                            disabled={false}
                                            speed={2}
                                            className="text-current group-hover/link:text-white transition-colors"
                                            shineColor="#ffffff"
                                        />
                                        <i className="fas fa-chevron-right text-xs group-hover/link:translate-x-1 transition-transform"></i>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};


