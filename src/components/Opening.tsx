import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import StaticSky from './ui/StaticSky';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useLang } from '@/i18n/LangProvider';

// Three.js pesa ~500 KB: chunk aparte para no bloquear el primer render.
// StaticSky pinta desde el primer frame y el 3D se funde encima al llegar.
// En móvil no se carga.
const ConstellationSky3D = lazy(() => import('./ui/ConstellationSky3D'));

export default function Opening() {
    const isMobile = useIsMobile();
    const { t } = useLang();

    return (
        <section className="relative min-h-svh w-full flex items-end overflow-hidden">
            <StaticSky />

            {!isMobile && (
                <Suspense fallback={null}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, ease: 'easeOut' }}
                        className="absolute inset-0"
                    >
                        <ConstellationSky3D />
                    </motion.div>
                </Suspense>
            )}

            {/* El texto se apoya abajo a la izquierda: deja el cielo entero
                visible arriba y coloca la lectura donde el ojo aterriza.
                Nada centrado — la simetría es lo que hace que una apertura
                parezca una plantilla. */}
            <div className="relative z-10 w-full mx-auto max-w-5xl px-6 pb-24 pt-32 md:pb-28">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-end">

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-8"
                    >
                        <p className="label mb-6">{t.hero.location}</p>

                        <h1 className="text-s4 font-semibold">Fran Vidal</h1>

                        <p className="mt-3 text-s2 text-fg-dim font-light">{t.hero.role}</p>

                        {/* La respuesta de veinte segundos. Medida corta a
                            propósito: si no cabe en cinco líneas, sobra. */}
                        <p className="mt-8 measure-tight text-s1 text-fg-dim">{t.hero.lead}</p>

                        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <a href="#work" className="link text-s1">{t.hero.ctaWork}</a>
                            <a href="#contact" className="link text-s1">{t.hero.ctaContact}</a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-4 flex items-end gap-5 lg:block"
                    >
                        {/* Retrato: cuadrado, borde de un píxel, sin anillos
                            girando ni halo. Está porque un reclutador quiere
                            ponerle cara a un nombre, no como adorno. */}
                        <img
                            src="https://avatars.githubusercontent.com/u/95777316?v=4"
                            alt={t.hero.portraitAlt}
                            width={160}
                            height={160}
                            className="w-24 h-24 lg:w-40 lg:h-40 object-cover border border-line-strong"
                        />
                        <ul className="lg:mt-5 space-y-1.5 list-none m-0 p-0">
                            {t.hero.creds.map((c) => (
                                <li key={c} className="font-mono text-fine text-fg-mute">{c}</li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
