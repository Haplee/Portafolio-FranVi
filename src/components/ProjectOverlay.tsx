import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { GitHubRepo } from '@/hooks/useGitHubData';
import { useLang } from '@/i18n/LangProvider';

interface Props {
    repo: GitHubRepo | null;
    onClose: () => void;
}

const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3b82f6',
    JavaScript: '#facc15',
    Python:     '#22c55e',
    HTML:       '#f97316',
    CSS:        '#a855f7',
    Shell:      '#10b981',
    Kotlin:     '#7c3aed',
    Java:       '#ef4444',
};

export default function ProjectOverlay({ repo, onClose }: Props) {
    const { t, lang } = useLang();
    // Escape key
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [onClose]);

    // Lock scroll
    useEffect(() => {
        if (repo) document.body.style.overflow = 'hidden';
        else      document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [repo]);

    const updated = repo
        ? new Date(repo.pushed_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    return (
        <AnimatePresence>
            {repo && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[200] bg-slate-950/75 backdrop-blur-sm"
                    />

                    {/* Side panel */}
                    <motion.aside
                        key="panel"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                        className="fixed right-0 top-0 bottom-0 z-[201] w-full max-w-md bg-slate-900 border-l border-slate-700/40 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    <i aria-hidden="true" className="fab fa-github text-slate-300 text-sm" />
                                </div>
                                <h2 className="font-semibold text-white truncate">{repo.name}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-3"
                                aria-label={t.overlay.close}
                            >
                                <i aria-hidden="true" className="fas fa-times text-sm" />
                            </button>
                        </div>

                        <div className="p-5 space-y-5">
                            {/* Description */}
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {repo.description || <span className="italic text-slate-500">{t.overlay.noDesc}</span>}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 text-center">
                                    <div className="text-xl font-bold text-amber-400 mb-1">
                                        {repo.stargazers_count} <i aria-hidden="true" className="fas fa-star text-sm" />
                                    </div>
                                    <div className="text-xs text-slate-500">{t.overlay.stars}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 text-center">
                                    <div className="text-xl font-bold text-purple-400 mb-1">
                                        {repo.forks_count} <i aria-hidden="true" className="fas fa-code-branch text-sm" />
                                    </div>
                                    <div className="text-xs text-slate-500">{t.overlay.forks}</div>
                                </div>
                            </div>

                            {/* Language + meta */}
                            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 space-y-3 text-sm">
                                {repo.language && (
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <span
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ background: LANG_COLORS[repo.language] ?? '#94a3b8' }}
                                        />
                                        <span>{repo.language}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-slate-400">
                                    <i aria-hidden="true" className="fas fa-clock text-slate-500 w-4 text-center" />
                                    <span>{t.overlay.updated} {updated}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                                >
                                    <i aria-hidden="true" className="fab fa-github" />
                                    {t.overlay.viewGithub}
                                </a>
                                {repo.homepage && (
                                    <a
                                        href={repo.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-600 text-slate-300 text-sm hover:border-cyan-500/60 hover:text-white transition-all"
                                    >
                                        <i aria-hidden="true" className="fas fa-external-link-alt text-xs" />
                                        {t.overlay.demo}
                                    </a>
                                )}
                            </div>

                            {/* Hologram decorative footer */}
                            <div className="hologram-card p-4 rounded-xl text-center">
                                <p className="text-xs text-slate-600 font-mono tracking-wider">
                                    github.com/Haplee/{repo.name}
                                </p>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
