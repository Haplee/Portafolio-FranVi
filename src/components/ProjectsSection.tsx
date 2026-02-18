import { useGitHubData } from '@/hooks/useGitHubData';
import SpotlightCard from './reactbits/SpotlightCard';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import { cn } from '@/lib/utils';

export default function ProjectsSection() {
    // Ensuring we handle the mock data gracefully if username changes or API fails
    const { repos, loading } = useGitHubData('FranVi-Asir');

    return (
        <section id="projects" className="py-32 px-4 w-full bg-background relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 inline-block relative">
                        <DecryptedText
                            text="Featured Projects"
                            animateOn="view"
                            revealDirection="center"
                            speed={60}
                            maxIterations={12}
                            className="relative z-10"
                            encryptedClassName="text-muted-foreground"
                        />
                        <div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -skew-x-12 -z-0"></div>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        A selection of my recent work in web development and system administration.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={cn("h-80 rounded-3xl bg-muted/50 animate-pulse border border-border")}></div>

                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {repos.map((repo) => (
                            <SpotlightCard
                                key={repo.id}
                                className="h-full flex flex-col justify-between bg-card border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
                                spotlightColor="rgba(34, 211, 238, 0.1)"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                                            <i className="fas fa-code text-primary text-xl"></i>
                                        </div>
                                        <div className="flex gap-4 text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border">
                                            <span className="flex items-center gap-1.5"><i className="fas fa-star text-amber-400"></i> {repo.stargazers_count}</span>
                                            <span className="flex items-center gap-1.5"><i className="fas fa-code-branch text-purple-400"></i> {repo.forks_count}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {repo.name}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 border-l-2 border-border pl-4 group-hover:border-primary/30 transition-colors">
                                        {repo.description || 'No description available.'}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                                    <span className="text-xs font-medium px-3 py-1 rounded-md bg-secondary text-secondary-foreground border border-border">
                                        {repo.language || 'N/A'}
                                    </span>

                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors group/link"
                                    >
                                        <ShinyText
                                            text="View Repository"
                                            disabled={false}
                                            speed={3}
                                            className="text-primary group-hover/link:text-foreground transition-colors"
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


