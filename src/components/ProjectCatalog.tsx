import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '@/i18n/LangProvider';
import { cn } from '@/lib/utils';

type ProjectCategory = 'all' | 'systems' | 'web' | 'infra';

const n = (i: number) => String(i + 1).padStart(2, '0');

export default function ProjectCatalog() {
    const { t } = useLang();
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
    const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);

    const filters: { key: ProjectCategory; label: string }[] = [
        { key: 'all', label: t.work.filters.all },
        { key: 'systems', label: t.work.filters.systems },
        { key: 'web', label: t.work.filters.web },
        { key: 'infra', label: t.work.filters.infra },
    ];

    const q = searchQuery.toLowerCase().trim();

    const projects = t.work.otherItems.filter((item) => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        if (!matchesCategory) return false;
        if (!q) return true;
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.desc.toLowerCase().includes(q) || item.tagline.toLowerCase().includes(q);
        const matchesStack = item.stack.some((tech) => tech.toLowerCase().includes(q));
        const matchesBadge = item.categoryBadge.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesStack || matchesBadge;
    });

    const toggleExpand = (id: string) => {
        setExpandedProjectId((prev) => (prev === id ? null : id));
    };

    const copyCloneCommand = (project: typeof t.work.otherItems[0]) => {
        const cmd = `git clone ${project.repoUrl}.git`;
        navigator.clipboard.writeText(cmd);
        setCopiedProjectId(project.id);
        setTimeout(() => setCopiedProjectId(null), 2200);
    };

    return (
        <section id="catalog" className="projects-section" aria-labelledby="catalog-title">
            <div className="page-shell">
                <div className="section-heading-row">
                    <div>
                        <div className="section-kicker">
                            <span>02</span>
                            <span>{t.work.catalogueLabel}</span>
                        </div>
                        <h2 id="catalog-title" className="section-title">{t.work.catalogueTitle}</h2>
                    </div>
                    <p>{t.work.catalogueIntro}</p>
                </div>

                <div className="project-controls">
                    <div className="project-filters" role="group" aria-label={t.work.catalogueLabel}>
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                type="button"
                                aria-pressed={activeCategory === filter.key}
                                onClick={() => setActiveCategory(filter.key)}
                                className={cn('filter-button', activeCategory === filter.key && 'is-active')}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="project-search-wrap">
                        <span className="search-icon" aria-hidden="true">⌕</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.work.searchPlaceholder}
                            className="project-search-input"
                            aria-label={t.work.searchPlaceholder}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="search-clear-btn"
                                aria-label={t.work.clearSearch}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <div className="project-count-row">
                    <span>
                        {projects.length} {projects.length === 1 ? 'proyecto' : 'proyectos'}
                        {searchQuery && ` filtrados por "${searchQuery}"`}
                    </span>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="text-xs text-accent underline cursor-pointer"
                        >
                            {t.work.clearSearch}
                        </button>
                    )}
                </div>

                {projects.length === 0 ? (
                    <div className="project-empty-state">
                        <p>{t.work.searchEmpty}</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('all');
                            }}
                            className="button button-quiet mt-4"
                        >
                            {t.work.clearSearch}
                        </button>
                    </div>
                ) : (
                    <div className="project-list">
                        {projects.map((project, index) => {
                            const isExpanded = expandedProjectId === project.id;
                            const isCopied = copiedProjectId === project.id;

                            return (
                                <article className={cn('project-row', isExpanded && 'is-open')} key={project.id}>
                                    <div className="project-index">{n(index)}</div>

                                    <div className="project-identity">
                                        <span className="project-category">{project.categoryBadge}</span>
                                        <h3>{project.name}</h3>
                                        <p>{project.tagline}</p>
                                    </div>

                                    <div className="project-details">
                                        <p>{project.desc}</p>
                                        <div className="project-stack">
                                            {project.stack.map((tech) => (
                                                <button
                                                    key={tech}
                                                    type="button"
                                                    onClick={() => setSearchQuery(tech)}
                                                    className="project-tech-tag"
                                                    title={`Filtrar por ${tech}`}
                                                >
                                                    {tech}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="project-highlights">
                                            {project.highlights.slice(0, 3).map((highlight) => (
                                                <span key={highlight}>↳ {highlight}</span>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => toggleExpand(project.id)}
                                            className="project-expand-btn"
                                            aria-expanded={isExpanded}
                                        >
                                            <span>{isExpanded ? t.work.collapseDetails : t.work.expandDetails}</span>
                                            <span aria-hidden="true" className={cn('expand-arrow', isExpanded && 'is-rotated')}>
                                                ↓
                                            </span>
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="project-drawer"
                                                >
                                                    <div className="project-drawer-content">
                                                        <div className="font-mono text-xs text-accent font-semibold mb-2">
                                                            {project.categoryBadge} · Highlights técnicos:
                                                        </div>
                                                        <ul className="project-drawer-list">
                                                            {project.highlights.map((h) => (
                                                                <li key={h}>
                                                                    <span className="text-emerald-400 mr-2">✓</span>
                                                                    {h}
                                                                </li>
                                                            ))}
                                                        </ul>

                                                        <div className="project-clone-row">
                                                            <div className="clone-code font-mono text-[11px] text-fg-dim">
                                                                git clone {project.repoUrl}.git
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => copyCloneCommand(project)}
                                                                className="clone-copy-btn"
                                                            >
                                                                {isCopied ? t.work.copied : t.work.cloneCmd}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="project-links">
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-action-link"
                                        >
                                            <span>GitHub</span>
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-action-link is-live"
                                            >
                                                <span className="live-dot" aria-hidden="true" />
                                                <span>Live</span>
                                                <span aria-hidden="true">↗</span>
                                            </a>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
