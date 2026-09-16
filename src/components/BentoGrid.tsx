import { lazy, Suspense, useState } from 'react';
import Reveal from './ui/Reveal';
import StaticSky from './ui/StaticSky';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useLang } from '@/i18n/LangProvider';
import { cn } from '@/lib/utils';

// Three.js chunk diferido; en móvil se usa StaticSky
const ConstellationSky3D = lazy(() => import('./ui/ConstellationSky3D'));
// Leaflet mapa diferido
const LocationMap = lazy(() => import('./ui/LocationMap'));

const REPO_RESOLVECORE = 'https://github.com/Haplee/ResolvCore';
const EMAIL = atob('ZnZpZGFsbWF0ZW9AZ21haWwuY29t');

type ProjectCategory = 'all' | 'systems' | 'web' | 'infra';

const n = (i: number) => String(i + 1).padStart(2, '0');

export default function BentoGrid() {
    const isMobile = useIsMobile();
    const { t } = useLang();
    const [activeFlowStep, setActiveFlowStep] = useState(0);
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

    const currentFlow = t.work.flow[activeFlowStep] || t.work.flow[0];

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 md:py-10 pt-20 md:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

                {/* ══════════════════════════════════════════════════════════════
                    BENTO 01: HERO & IDENTIDAD (col-span-12 lg:col-span-8)
                    ══════════════════════════════════════════════════════════════ */}
                <Reveal className="col-span-12 lg:col-span-8 flex">
                    <article className="relative w-full overflow-hidden p-6 sm:p-8 md:p-10 bg-ink-800 border border-line flex flex-col justify-between min-h-[380px]">
                        {/* Fondo cielo nocturno integrado en el Bento */}
                        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
                            <StaticSky />
                            {!isMobile && (
                                <Suspense fallback={null}>
                                    <div className="absolute inset-0">
                                        <ConstellationSky3D />
                                    </div>
                                </Suspense>
                            )}
                        </div>

                        {/* Contenido frontal */}
                        <div className="relative z-10">
                            <div className="flex items-center justify-between gap-4">
                                <span className="label text-accent font-medium">
                                    {t.hero.location}
                                </span>
                                <span className="font-mono text-fine text-fg-mute">
                                    SYSADMIN · DEV
                                </span>
                            </div>

                            <h1 className="mt-6 text-s4 font-semibold text-fg tracking-tight">
                                Fran Vidal
                            </h1>
                            <p className="mt-2 text-s2 text-fg-dim font-light">
                                {t.hero.role}
                            </p>

                            <p className="mt-6 measure-tight text-s0 text-fg-dim font-light leading-relaxed">
                                {t.hero.lead}
                            </p>
                        </div>

                        <div className="relative z-10 mt-8 pt-6 border-t border-line flex flex-wrap items-center gap-6">
                            <a href="#work" className="link font-mono text-fine">
                                {t.hero.ctaWork} ↓
                            </a>
                            <a href="#skills" className="link font-mono text-fine">
                                {t.nav.skills} ↓
                            </a>
                            <a href="#contact" className="link font-mono text-fine">
                                {t.hero.ctaContact} ↓
                            </a>
                        </div>
                    </article>
                </Reveal>

                {/* ══════════════════════════════════════════════════════════════
                    BENTO 02: PERFIL & CANALES DIRECTOS (col-span-12 lg:col-span-4)
                    ══════════════════════════════════════════════════════════════ */}
                <Reveal delay={0.05} className="col-span-12 lg:col-span-4 flex">
                    <article className="w-full p-6 bg-ink-800 border border-line flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 border-b border-line pb-4">
                                <img
                                    src="https://avatars.githubusercontent.com/u/95777316?v=4"
                                    alt={t.hero.portraitAlt}
                                    width={72}
                                    height={72}
                                    className="w-16 h-16 object-cover border border-line-strong shrink-0"
                                />
                                <div>
                                    <h2 className="text-s0 font-medium text-fg">Francisco Vidal</h2>
                                    <p className="font-mono text-fine text-fg-mute mt-0.5">Barbate, Cádiz</p>
                                    <span className="inline-block mt-1 font-mono text-fine text-accent">
                                        Técnico Superior ASIR
                                    </span>
                                </div>
                            </div>

                            {/* Especificaciones de perfil */}
                            <dl className="mt-4 m-0 space-y-2">
                                {t.hero.specs.map((s) => (
                                    <div key={s.k} className="border-b border-line/60 pb-1.5 flex justify-between gap-2">
                                        <dt className="font-mono text-fine text-fg-mute uppercase tracking-wider">{s.k}</dt>
                                        <dd className="m-0 font-mono text-fine text-fg text-right">{s.v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* Canales y CV */}
                        <div className="mt-6 pt-4 border-t border-line space-y-2 font-mono text-fine">
                            <a
                                href="./assets/docs/CV-FranVidal.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between py-1 text-fg hover:text-accent transition-colors"
                            >
                                <span>{t.contact.cvName}</span>
                                <span className="text-fg-mute group-hover:text-accent">HTML ↗</span>
                            </a>
                            <a
                                href="https://linkedin.com/in/franciscovidal-mateo-2b8a4a238"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between py-1 text-fg hover:text-accent transition-colors"
                            >
                                <span>LinkedIn</span>
                                <span className="text-fg-mute group-hover:text-accent">franciscovidal ↗</span>
                            </a>
                            <a
                                href="https://github.com/Haplee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between py-1 text-fg hover:text-accent transition-colors"
                            >
                                <span>GitHub</span>
                                <span className="text-fg-mute group-hover:text-accent">@Haplee ↗</span>
                            </a>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="group flex items-center justify-between py-1 text-fg hover:text-accent transition-colors"
                            >
                                <span>Email</span>
                                <span className="text-fg-mute group-hover:text-accent">{EMAIL}</span>
                            </a>
                        </div>
                    </article>
                </Reveal>

                {/* ══════════════════════════════════════════════════════════════
                    BENTO 03: CASO INSIGNIA RESOLVECORE (col-span-12)
                    ══════════════════════════════════════════════════════════════ */}
                <Reveal delay={0.08} className="col-span-12">
                    <section id="work" className="p-6 sm:p-8 md:p-10 bg-ink-800 border border-line">
                        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
                            <div>
                                <span className="label text-accent font-medium">
                                    {t.work.featuredBadge}
                                </span>
                                <h2 className="mt-2 text-s3 font-semibold text-fg">
                                    {t.work.title}
                                </h2>
                            </div>
                            <span className="font-mono text-fine text-fg-mute">
                                PROYECTO 01 · CICLO COMPLETO DE SOPORTE
                            </span>
                        </div>

                        <p className="mt-4 measure text-s1 text-fg-dim font-light">
                            {t.work.oneLiner}
                        </p>
                        <p className="mt-4 measure text-fine text-fg-mute leading-relaxed">
                            {t.work.problem}
                        </p>

                        {/* Circuito interactivo de las 5 fases */}
                        <div className="mt-8 border-t border-line pt-6">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                                <p className="label">{t.work.flowLabel}</p>
                                <p className="font-mono text-fine text-fg-mute">{t.work.flowInstruction}</p>
                            </div>

                            <div className="grid gap-px bg-line border border-line grid-cols-2 sm:grid-cols-5">
                                {t.work.flow.map((s, idx) => {
                                    const isSelected = activeFlowStep === idx;
                                    return (
                                        <button
                                            key={s.step}
                                            type="button"
                                            onClick={() => setActiveFlowStep(idx)}
                                            className={cn(
                                                'p-4 text-left transition-colors cursor-pointer',
                                                isSelected
                                                    ? 'bg-ink-700 text-fg'
                                                    : 'bg-ink-800 text-fg-dim hover:bg-ink-700/60 hover:text-fg'
                                            )}
                                        >
                                            <span className={cn(
                                                'font-mono text-fine block',
                                                isSelected ? 'text-accent font-medium' : 'text-fg-mute'
                                            )}>
                                                {n(idx)}
                                            </span>
                                            <span className="mt-2 text-s0 font-medium block">{s.step}</span>
                                            <span className="mt-1 font-mono text-fine text-fg-mute block">{s.summary}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Inspección técnica activa del paso seleccionado */}
                            <div className="mt-3 p-4 sm:p-5 bg-ink-700/50 border border-line">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-fine text-accent">{n(activeFlowStep)}</span>
                                    <h3 className="text-s0 font-medium text-fg">{currentFlow.step} — {currentFlow.summary}</h3>
                                </div>
                                <p className="mt-1.5 text-fine text-fg-dim">{currentFlow.desc}</p>
                                <p className="mt-2.5 font-mono text-fine text-fg-mute border-t border-line/60 pt-2">
                                    <span className="text-accent mr-2" aria-hidden="true">›</span>
                                    {currentFlow.detail}
                                </p>
                            </div>
                        </div>

                        {/* Decisiones + Infraestructura */}
                        <div className="mt-8 grid gap-8 lg:grid-cols-12 border-t border-line pt-6">
                            <div className="lg:col-span-7">
                                <p className="label mb-4">{t.work.decisionsLabel}</p>
                                <ol className="list-none m-0 p-0 space-y-6">
                                    {t.work.decisions.map((d, i) => (
                                        <li key={d.title} className="grid grid-cols-[2rem_1fr] gap-2">
                                            <span className="font-mono text-fine text-accent pt-1">{n(i)}</span>
                                            <div>
                                                <h4 className="text-s0 font-medium text-fg">{d.title}</h4>
                                                <p className="mt-1.5 text-fine text-fg-dim leading-relaxed">{d.body}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="lg:col-span-5">
                                <p className="label mb-4">{t.work.infraLabel}</p>
                                <dl className="m-0 border-t border-line">
                                    {t.work.infra.map((row) => (
                                        <div
                                            key={row.k}
                                            className="flex items-baseline justify-between gap-4 border-b border-line py-2"
                                        >
                                            <dt className="font-mono text-fine text-fg-mute shrink-0">{row.k}</dt>
                                            <dd className="m-0 font-mono text-fine text-fg text-right">{row.v}</dd>
                                        </div>
                                    ))}
                                </dl>

                                <div className="mt-5">
                                    <a
                                        href={REPO_RESOLVECORE}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link text-fine font-mono inline-block"
                                    >
                                        {t.work.repoCta}
                                        <span className="sr-only"> {t.work.newTab}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* ══════════════════════════════════════════════════════════════
                    BENTO 04: CATÁLOGO DE PROYECTOS PROFESIONALES (col-span-12 lg:col-span-8)
                    ══════════════════════════════════════════════════════════════ */}
                <Reveal delay={0.1} className="col-span-12 lg:col-span-8 flex">
                    <section className="w-full p-6 sm:p-8 bg-ink-800 border border-line flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
                                <div>
                                    <p className="label">{t.work.catalogueLabel}</p>
                                    <h2 className="mt-1 text-s2 font-semibold text-fg">{t.work.catalogueTitle}</h2>
                                </div>
                                <span className="font-mono text-fine text-fg-mute">
                                    {filteredProjects.length} PROYECTOS
                                </span>
                            </div>

                            {/* Filtros planos */}
                            <div className="mt-5 flex flex-wrap items-center gap-2 border-b border-line pb-4" role="tablist">
                                {filterKeys.map((f) => {
                                    const isActive = activeCategory === f.key;
                                    return (
                                        <button
                                            key={f.key}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            onClick={() => setActiveCategory(f.key)}
                                            className={cn(
                                                'font-mono text-fine uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer',
                                                isActive
                                                    ? 'border-accent text-accent bg-ink-700'
                                                    : 'border-line text-fg-mute hover:text-fg hover:border-line-strong bg-transparent'
                                            )}
                                        >
                                            {f.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Grid de proyectos terminados */}
                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                {filteredProjects.map((p, idx) => (
                                    <article
                                        key={p.id}
                                        className="p-5 bg-ink-700/40 border border-line hover:border-line-strong transition-colors flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-baseline justify-between gap-2 border-b border-line/60 pb-2">
                                                <span className="label text-accent font-medium">
                                                    {p.categoryBadge}
                                                </span>
                                                <span className="font-mono text-fine text-fg-mute">
                                                    {n(idx + 1)}
                                                </span>
                                            </div>

                                            <h3 className="mt-3 text-s0 font-medium text-fg">
                                                {p.name}
                                            </h3>
                                            <p className="mt-1 text-fine text-fg-dim font-light leading-relaxed">
                                                {p.tagline}
                                            </p>

                                            <ul className="mt-3 space-y-1 list-none m-0 p-0 border-t border-line/40 pt-2">
                                                {p.highlights.slice(0, 3).map((h) => (
                                                    <li key={h} className="font-mono text-fine text-fg-mute flex items-center gap-1.5">
                                                        <span className="text-accent select-none" aria-hidden="true">›</span>
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-line/60">
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {p.stack.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="font-mono text-fine px-1.5 py-0.2 bg-ink-800 text-fg-dim border border-line"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-4 text-fine font-mono">
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
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* ══════════════════════════════════════════════════════════════
                    BENTO 05: DISPONIBILIDAD & MAPA LEAFLET (col-span-12 lg:col-span-4)
                    ══════════════════════════════════════════════════════════════ */}
                <Reveal delay={0.12} className="col-span-12 lg:col-span-4 flex">
                    <section id="contact" className="w-full p-6 bg-ink-800 border border-line flex flex-col justify-between">
                        <div>
                            <div className="border-b border-line pb-3">
                                <p className="label">{t.contact.whereLabel}</p>
                                <h2 className="mt-1 text-s1 font-semibold text-fg">{t.contact.base}</h2>
                            </div>

                            <p className="mt-3 text-fine text-fg-dim leading-relaxed">
                                {t.contact.radiusNote}
                            </p>
                            <p className="mt-2 text-fine text-fg-mute font-mono">
                                {t.contact.remoteNote}
                            </p>
                        </div>

                        {/* Mapa Leaflet CartoDB Dark Matter */}
                        <div className="mt-5 border border-line overflow-hidden">
                            <Suspense fallback={<div className="h-64 w-full bg-ink-900 animate-pulse" />}>
                                <div className="h-64 w-full">
                                    <LocationMap />
                                </div>
                            </Suspense>
                        </div>

                        <div className="mt-4 pt-3 border-t border-line flex justify-between items-baseline font-mono text-fine">
                            <span className="text-fg-mute">Barbate (36.19° N, 5.92° W)</span>
                            <a href={`mailto:${EMAIL}`} className="link text-fine">
                                {EMAIL}
                            </a>
                        </div>
                    </section>
                </Reveal>

                {/* ══════════════════════════════════════════════════════════════
                    BENTO 06: COMPETENCIAS COMPROBADAS (col-span-12 lg:col-span-6)
                    ══════════════════════════════════════════════════════════════ */}
                <Reveal delay={0.14} className="col-span-12 lg:col-span-6 flex">
                    <section id="skills" className="w-full p-6 sm:p-8 bg-ink-800 border border-line flex flex-col justify-between">
                        <div>
                            <div className="border-b border-line pb-4">
                                <p className="label">{t.skills.label}</p>
                                <h2 className="mt-1 text-s2 font-semibold text-fg">{t.skills.title}</h2>
                                <p className="mt-2 text-fine text-fg-mute leading-relaxed">{t.skills.intro}</p>
                            </div>

                            <div className="mt-5 space-y-6">
                                {t.skills.groups.map((g) => (
                                    <div key={g.category}>
                                        <h3 className="font-mono text-fine text-accent uppercase tracking-wider mb-2">
                                            {g.category}
                                        </h3>
                                        <ul className="list-none m-0 p-0 border-t border-line">
                                            {g.items.map((item) => (
                                                <li
                                                    key={item.name}
                                                    className="border-b border-line/60 py-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                                                >
                                                    <span className="font-mono text-fine text-fg">{item.name}</span>
                                                    <span className="text-fine text-fg-mute sm:text-right">{item.where}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* ══════════════════════════════════════════════════════════════
                    BENTO 07: TRAYECTORIA PROFESIONAL (col-span-12 lg:col-span-6)
                    ══════════════════════════════════════════════════════════════ */}
                <Reveal delay={0.16} className="col-span-12 lg:col-span-6 flex">
                    <section id="path" className="w-full p-6 sm:p-8 bg-ink-800 border border-line flex flex-col justify-between">
                        <div>
                            <div className="border-b border-line pb-4">
                                <p className="label">{t.path.label}</p>
                                <h2 className="mt-1 text-s2 font-semibold text-fg">{t.path.title}</h2>
                            </div>

                            <ol className="mt-5 list-none m-0 p-0 space-y-6 border-t border-line pt-2">
                                {t.path.items.map((item) => (
                                    <li key={item.title} className="grid grid-cols-[3.5rem_1fr] gap-3 border-b border-line/60 pb-5">
                                        <span className="font-mono text-fine text-accent pt-0.5">{item.date}</span>
                                        <div>
                                            <h3 className="text-s0 font-medium text-fg">{item.title}</h3>
                                            <p className="font-mono text-fine text-fg-mute mt-0.5">{item.role}</p>
                                            <p className="mt-2 text-fine text-fg-dim leading-relaxed">{item.body}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="mt-6 pt-4 border-t border-line font-mono text-fine text-fg-mute">
                            <span>Estado actual: Abierto a oportunidades en sistemas, redes y soporte IT</span>
                        </div>
                    </section>
                </Reveal>

            </div>
        </div>
    );
}
