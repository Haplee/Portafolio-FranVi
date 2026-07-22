import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// Email ofuscado (T15): se compone en tiempo de ejecución desde base64 para que
// la cadena literal no aparezca en el JS servido y no la recojan los scrapers.
const EMAIL = atob('ZnZpZGFsbWF0ZW9AZ21haWwuY29t');

interface ContactLink {
    name: string;
    handle: string;
    icon: string;
    href: string;
    external: boolean;
    iconColor: string;
    border: string;
    ariaLabel: string;
}

const links: ContactLink[] = [
    {
        name: 'LinkedIn',
        handle: 'franciscovidal-mateo',
        icon: 'fab fa-linkedin-in',
        href: 'https://linkedin.com/in/franciscovidal-mateo-2b8a4a238',
        external: true,
        iconColor: 'text-[#0a66c2]',
        border: 'hover:border-[#0a66c2]/50',
        ariaLabel: 'Perfil de LinkedIn de Fran Vidal (abre en una pestaña nueva)',
    },
    {
        name: 'GitHub',
        handle: 'Haplee',
        icon: 'fab fa-github',
        href: 'https://github.com/Haplee',
        external: true,
        iconColor: 'text-cyan-400',
        border: 'hover:border-cyan-500/40',
        ariaLabel: 'Perfil de GitHub de Fran Vidal (abre en una pestaña nueva)',
    },
    {
        name: 'Email',
        handle: EMAIL,
        icon: 'fas fa-envelope',
        href: `mailto:${EMAIL}`,
        external: false,
        iconColor: 'text-amber-400',
        border: 'hover:border-amber-500/40',
        ariaLabel: 'Enviar un email a Fran Vidal',
    },
    {
        name: 'Instagram',
        handle: '@franvidalmateo',
        icon: 'fab fa-instagram',
        href: 'https://www.instagram.com/franvidalmateo',
        external: true,
        iconColor: 'text-pink-400',
        border: 'hover:border-pink-500/40',
        ariaLabel: 'Perfil de Instagram de Fran Vidal (abre en una pestaña nueva)',
    },
    {
        name: 'X',
        handle: '@FranVidalMateo',
        icon: 'fab fa-x-twitter',
        href: 'https://x.com/FranVidalMateo',
        external: true,
        iconColor: 'text-white',
        border: 'hover:border-white/30',
        ariaLabel: 'Perfil de X (Twitter) de Fran Vidal (abre en una pestaña nueva)',
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 md:py-24 px-4 w-full bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/2 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i aria-hidden="true" className="fas fa-paper-plane mr-2" />Conectemos
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title inline-block">
                        Contacto
                    </h2>
                    <p className="text-slate-400 mt-8 max-w-lg mx-auto leading-relaxed">
                        ¿Propuesta laboral, proyecto o colaboración? El canal más rápido es LinkedIn o el email.
                        Respondo en menos de 24h.
                    </p>
                </motion.div>

                {/* Rejilla de enlaces */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                    {links.map((l) => (
                        <a
                            key={l.name}
                            href={l.href}
                            aria-label={l.ariaLabel}
                            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className={cn(
                                'hologram-card flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-slate-700/40 bg-slate-800/30 transition-all',
                                l.border
                            )}
                        >
                            <i aria-hidden="true" className={cn(l.icon, l.iconColor, 'text-xl w-6 text-center flex-shrink-0')} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white">{l.name}</p>
                                <p className="text-xs text-slate-500 truncate">{l.handle}</p>
                            </div>
                            <i aria-hidden="true" className="fas fa-arrow-up-right-from-square text-[10px] text-slate-600" />
                        </a>
                    ))}

                    {/* CV */}
                    <a
                        href="./assets/docs/CV-FranVidal.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Ver el currículum de Fran Vidal (abre en una pestaña nueva)"
                        className="hologram-card flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-cyan-500/25 bg-cyan-500/5 transition-all hover:border-cyan-500/50"
                    >
                        <i aria-hidden="true" className="fas fa-file-lines text-cyan-300 text-xl w-6 text-center flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">Currículum</p>
                            <p className="text-xs text-slate-500 truncate">Ver CV completo</p>
                        </div>
                        <i aria-hidden="true" className="fas fa-arrow-up-right-from-square text-[10px] text-slate-600" />
                    </a>
                </motion.div>

                {/* Disponibilidad */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="hologram-card mt-4 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                            Disponible para trabajar
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Busco mi primera oportunidad en sistemas, redes o soporte IT. Disponible en la provincia
                        de Cádiz y en remoto. Respondo rápido.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
