import Reveal from './ui/Reveal';
import { useLang } from '@/i18n/LangProvider';

const REPO = 'https://github.com/Haplee/ResolveCore';
const GH_USER = 'https://github.com/Haplee';

const n = (i: number) => String(i + 1).padStart(2, '0');

// La sección más larga de la página, y a propósito. Con cero experiencia
// profesional lo honesto no es enumerar diez proyectos de 200 px: es enseñar
// uno entero — qué problema resuelve, cómo circula el trabajo por dentro, con
// qué está montado y qué se decidió y por qué. Lo último es lo que separa
// "seguí un tutorial" de "sé lo que hago".
export default function CaseStudy() {
    const { t } = useLang();

    return (
        <section id="work" className="bg-ink-800 py-major px-6">
            <div className="mx-auto max-w-5xl">

                <Reveal>
                    <p className="label">{t.work.label}</p>
                    <h2 className="mt-5 text-s3 font-semibold">{t.work.title}</h2>
                    <p className="mt-5 measure text-s2 text-fg-dim font-light">{t.work.oneLiner}</p>
                </Reveal>

                <Reveal>
                    <p className="mt-12 measure text-fg-dim">{t.work.problem}</p>
                </Reveal>

                {/* ── El circuito ──
                    Como figura, no como lista de viñetas: cinco celdas que se
                    leen de izquierda a derecha y explican el proyecto entero
                    de un vistazo. Las divisiones son el fondo asomando por un
                    hueco de 1 px, no bordes ni sombras. */}
                <Reveal>
                    <figure className="mt-normal m-0">
                        <figcaption className="label mb-5">{t.work.flowLabel}</figcaption>
                        <ol className="grid gap-px bg-line border border-line list-none m-0 p-0 sm:grid-cols-5">
                            {t.work.flow.map((s, i) => (
                                <li key={s.step} className="bg-ink-800 p-5">
                                    <span className="font-mono text-fine text-accent">{n(i)}</span>
                                    <h3 className="mt-3 text-s0 font-medium">{s.step}</h3>
                                    <p className="mt-2 text-fine text-fg-mute">{s.desc}</p>
                                </li>
                            ))}
                        </ol>
                    </figure>
                </Reveal>

                {/* ── Decisiones + infraestructura ──
                    Composición asimétrica: la columna de lectura ocupa siete
                    doceavos y la ficha técnica se queda al margen, en voz
                    mono. Son dos registros distintos y se ven distintos sin
                    necesidad de una tarjeta que los encierre. */}
                <div className="mt-loose grid gap-normal lg:grid-cols-12 lg:gap-12">

                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="label mb-8">{t.work.decisionsLabel}</p>
                            <ol className="list-none m-0 p-0 space-y-10">
                                {t.work.decisions.map((d, i) => (
                                    <li key={d.title} className="grid grid-cols-[2.5rem_1fr]">
                                        <span className="font-mono text-fine text-accent pt-1">{n(i)}</span>
                                        <div>
                                            <h3 className="text-s1 font-medium">{d.title}</h3>
                                            <p className="mt-3 text-fg-dim">{d.body}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-9">
                        <Reveal delay={0.08}>
                            <p className="label mb-5">{t.work.infraLabel}</p>
                            <dl className="m-0 border-t border-line">
                                {t.work.infra.map((row) => (
                                    <div
                                        key={row.k}
                                        className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                                    >
                                        <dt className="font-mono text-fine text-fg-mute shrink-0">{row.k}</dt>
                                        <dd className="m-0 font-mono text-fine text-fg text-right">{row.v}</dd>
                                    </div>
                                ))}
                            </dl>
                            <a
                                href={REPO}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link inline-block mt-6 text-fine font-mono"
                            >
                                {t.work.repoCta}
                                <span className="sr-only"> {t.work.newTab}</span>
                            </a>
                        </Reveal>
                    </div>
                </div>

                {/* ── Lo demás ──
                    Dos repositorios, dos líneas cada uno. Sin rejilla de
                    tarjetas y sin contadores de estrellas: un 0 repetido tres
                    veces no informa de nada bueno. */}
                <Reveal>
                    <div className="mt-loose">
                        <p className="label mb-5">{t.work.alsoLabel}</p>
                        <ul className="list-none m-0 p-0 border-t border-line">
                            {t.work.also.map((p) => (
                                <li key={p.name} className="grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:gap-6">
                                    <div className="sm:col-span-4">
                                        <a
                                            href={`${GH_USER}/${p.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link"
                                        >
                                            {p.name}
                                            <span className="sr-only"> {t.work.newTab}</span>
                                        </a>
                                        <p className="mt-1 font-mono text-fine text-fg-mute">{p.stack}</p>
                                    </div>
                                    <p className="text-fg-dim sm:col-span-8">{p.desc}</p>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={GH_USER}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link inline-block mt-6 text-fine font-mono"
                        >
                            {t.work.profileCta}
                            <span className="sr-only"> {t.work.newTab}</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
