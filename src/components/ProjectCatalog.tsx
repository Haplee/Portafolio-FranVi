import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { useLang } from '@/i18n/LangProvider';
import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

type ProjectCategory = 'all' | 'systems' | 'web' | 'infra';

const n = (i: number) => String(i + 1).padStart(2, '0');

function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);
    return reduced;
}

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

function TiltCard({ children, className, ...props }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        if (prefersReducedMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (event.clientX - centerX) / (rect.width / 2);
        const deltaY = (event.clientY - centerY) / (rect.height / 2);
        setRotateY(deltaX * 3);
        setRotateX(-deltaY * 3);
    }

    function handleMouseLeave() {
        if (prefersReducedMotion) return;
        setRotateX(0);
        setRotateY(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
            }}
            className={cn('relative', className)}
            {...props}
        >
            <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>
        </motion.div>
    );
}

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    'aria-pressed'?: boolean | 'true' | 'false';
    type?: 'button' | 'submit' | 'reset';
}

function MagneticButton({ children, className, onClick, 'aria-pressed': ariaPressed, type = 'button' }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const prefersReducedMotion = useReducedMotion();

    function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
        if (prefersReducedMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (event.clientX - centerX) / 4;
        const deltaY = (event.clientY - centerY) / 4;
        setTranslate({ x: deltaX, y: deltaY });
    }

    function handleMouseLeave() {
        if (prefersReducedMotion) return;
        setTranslate({ x: 0, y: 0 });
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            aria-pressed={ariaPressed}
            type={type}
            style={{
                x: translate.x,
                y: translate.y,
            }}
            className={cn('relative', className)}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

export default function ProjectCatalog() {
    const { t } = useLang();
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

    const filterKeys: { key: ProjectCategory; label: string }[] = [
        { key: 'all', label: t.work.filters.all },
        { key: 'systems', label: t.work.filters.systems },
        { key: 'web', label: t.work.filters.web },
        { key: 'infra', label: t.work.filters.infra },
    ];

    const filteredProjects = t.work.otherItems.filter(
        (item) => activeCategory === 'all' || item.category === activeCategory
    );

    return (
        <section id="catalog" className="section-normal" aria-labelledby="catalog-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    id="catalog-title"
                    label={t.work.catalogueLabel}
                    title={t.work.catalogueTitle}
                    subtitle={t.work.catalogueIntro}
                    badge={`${filteredProjects.length} ${t.work.projectsLabel}`}
                />

                <div className="mt-5 flex flex-wrap items-center gap-2 border-b border-line pb-4" role="group" aria-label={t.work.catalogueLabel}>
                    {filterKeys.map((f) => {
                        const isActive = activeCategory === f.key;
                        return (
                            <MagneticButton
                                key={f.key}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setActiveCategory(f.key)}
                                className={cn(
                                    'font-mono text-fine uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer',
                                    isActive
                                        ? 'border-accent text-accent bg-ink-700'
                                        : 'border-line text-fg-mute hover:text-fg hover:border-line-strong bg-transparent'
                                )}
                            >
                                {f.label}
                            </MagneticButton>
                        );
                    })}
                </div>

                <div className="mt-6 space-y-8">
                    {filteredProjects.map((p, idx) => (
                        <TiltCard
                            key={p.id}
                            className="p-5 bg-ink-700/40 border border-line hover:border-line-strong transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 border-b border-line/60 pb-3">
                                <div className="flex items-baseline gap-3">
                                    <span className="label text-accent font-medium">
                                        {p.categoryBadge}
                                    </span>
                                    <span className="font-mono text-fine text-fg-mute">
                                        {n(idx + 1)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-fine font-mono sm:ml-auto">
                                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="link">
                                        {t.work.viewRepo}
                                        <span className="sr-only"> {t.work.newTab}</span>
                                    </a>
                                    {p.liveUrl && (
                                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link">
                                            {t.work.viewLive}
                                            <span className="sr-only"> {t.work.newTab}</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_280px]">
                                <div>
                                    <h3 className="text-s0 font-medium text-fg">{p.name}</h3>
                                    <p className="mt-1 text-fine text-fg-dim font-light leading-relaxed">
                                        {p.tagline}
                                    </p>
                                    <p className="mt-3 text-fine text-fg-mute leading-relaxed">{p.desc}</p>

                                    <ul className="mt-3 space-y-1 list-none m-0 p-0 border-t border-line/40 pt-2">
                                        {p.highlights.slice(0, 3).map((h) => (
                                            <li key={h} className="font-mono text-fine text-fg-mute flex items-center gap-1.5">
                                                <span className="text-accent select-none" aria-hidden="true">›</span>
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-l border-line/40 pl-4 sm:border-l-0 sm:border-t sm:border-line/40 sm:pt-4 sm:pl-0">
                                    <p className="label mb-2">{t.work.stackLabel}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {p.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="font-mono text-fine px-2 py-0.5 bg-ink-800 text-fg-dim border border-line"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}