import { lazy, Suspense } from 'react';
import Reveal from './ui/Reveal';
import { useLang } from '@/i18n/LangProvider';

// Leaflet y su hoja de estilos pesan ~170 KB y viven en la última sección de
// la página: chunk aparte, para que no los pague quien nunca baja hasta aquí.
const LocationMap = lazy(() => import('./ui/LocationMap'));

// Email ofuscado: se compone en tiempo de ejecución desde base64 para que la
// cadena literal no aparezca en el JS servido y no la recojan los scrapers.
const EMAIL = atob('ZnZpZGFsbWF0ZW9AZ21haWwuY29t');

interface Channel {
    name: string;
    handle: string;
    href: string;
    external: boolean;
}

// Tres canales, no cinco. Instagram y X no aportan nada a la decisión de
// contratar y su única función aquí era rellenar una rejilla de 2×3.
const CHANNELS: Channel[] = [
    {
        name: 'LinkedIn',
        handle: 'franciscovidal-mateo',
        href: 'https://linkedin.com/in/franciscovidal-mateo-2b8a4a238',
        external: true,
    },
    { name: 'GitHub', handle: 'Haplee', href: 'https://github.com/Haplee', external: true },
    { name: 'Email', handle: EMAIL, href: `mailto:${EMAIL}`, external: false },
];

export default function Contact() {
    const { t } = useLang();

    return (
        <section id="contact" className="py-loose px-6">
            <div className="mx-auto max-w-5xl">

                <Reveal>
                    <p className="label">{t.contact.label}</p>
                    <h2 className="mt-5 text-s3 font-semibold">{t.contact.title}</h2>
                    <p className="mt-5 measure text-fg-dim">{t.contact.intro}</p>
                </Reveal>

                {/* Los canales son una lista, no tarjetas: cuatro filas
                    tipográficas se comparan de un vistazo y no necesitan un
                    icono de marca cada una para distinguirse. */}
                <Reveal>
                    <ul className="mt-normal list-none m-0 p-0 border-t border-line">
                        {CHANNELS.map((c) => (
                            <li key={c.name} className="border-b border-line">
                                <a
                                    href={c.href}
                                    aria-label={c.name === 'Email' ? t.contact.emailAria : t.contact.profileAria(c.name)}
                                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
                                >
                                    <span className="text-s1 text-fg group-hover:text-accent transition-colors">
                                        {c.name}
                                    </span>
                                    <span className="font-mono text-fine text-fg-mute">{c.handle}</span>
                                </a>
                            </li>
                        ))}

                        <li className="border-b border-line">
                            <a
                                href="./assets/docs/CV-FranVidal.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
                            >
                                <span className="text-s1 text-fg group-hover:text-accent transition-colors">
                                    {t.contact.cvName}
                                    <span className="sr-only"> {t.contact.newTab}</span>
                                </span>
                                <span className="font-mono text-fine text-fg-mute">{t.contact.cvNote}</span>
                            </a>
                        </li>
                    </ul>
                </Reveal>

                {/* Dónde estoy: el mapa como dato de disponibilidad. */}
                <div className="mt-loose grid gap-normal lg:grid-cols-12 lg:gap-12">
                    <Reveal className="lg:col-span-4">
                        <p className="label">{t.contact.whereLabel}</p>
                        <p className="mt-5 text-s2 font-light">{t.contact.base}</p>
                        <p className="mt-4 measure text-fg-dim">{t.contact.remoteNote}</p>
                    </Reveal>

                    <Reveal delay={0.08} className="lg:col-span-8">
                        {/* El hueco reserva la altura del mapa para que la
                            página no dé un salto cuando el chunk aterriza. */}
                        <Suspense fallback={<div className="h-72 w-full border border-line bg-ink-800 sm:h-80" />}>
                            <LocationMap />
                        </Suspense>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
