import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const socials = [
    {
        name: 'Instagram',
        handle: '@franvidalmateo',
        icon: 'fab fa-instagram',
        link: 'https://www.instagram.com/franvidalmateo',
        gradient: 'from-pink-600/20 via-rose-500/15 to-orange-500/10',
        border: 'hover:border-pink-500/40',
        iconColor: 'text-pink-400',
        glow: 'hover:shadow-pink-500/10',
    },
    {
        name: 'X (Twitter)',
        handle: '@FranVidalMateo',
        icon: 'fab fa-x-twitter',
        link: 'https://x.com/FranVidalMateo',
        gradient: 'from-white/10 via-slate-400/5 to-transparent',
        border: 'hover:border-white/30',
        iconColor: 'text-white',
        glow: 'hover:shadow-white/5',
    },
    {
        name: 'GitHub',
        handle: 'Haplee',
        icon: 'fab fa-github',
        link: 'https://github.com/Haplee',
        gradient: 'from-cyan-600/20 via-blue-500/10 to-transparent',
        border: 'hover:border-cyan-500/40',
        iconColor: 'text-cyan-400',
        glow: 'hover:shadow-cyan-500/10',
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 md:py-24 px-4 w-full bg-slate-900 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/2 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i className="fas fa-paper-plane mr-2" />Conectemos
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title inline-block">
                        Contacto
                    </h2>
                    <p className="text-slate-400 mt-8 max-w-lg mx-auto leading-relaxed">
                        ¿Tienes una propuesta o proyecto en mente?<br />
                        Siempre estoy abierto a explorar nuevas oportunidades.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto"
                >
                    {socials.map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04, y: -6 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className={cn(
                                'social-card relative flex flex-col items-center gap-4 py-8 px-4 rounded-2xl',
                                'border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm',
                                'shadow-xl transition-all overflow-hidden',
                                social.border,
                                social.glow
                            )}
                            aria-label={social.name}
                        >
                            {/* Gradient bg */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                            {/* Icon */}
                            <div className="relative w-16 h-16 rounded-2xl bg-slate-700/60 flex items-center justify-center border border-slate-600/40">
                                <i className={cn(social.icon, 'text-3xl text-slate-300 transition-colors', social.iconColor)} />
                            </div>

                            {/* Info */}
                            <div className="relative text-center">
                                <p className="text-sm font-semibold text-white">{social.name}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{social.handle}</p>
                            </div>

                            {/* Arrow */}
                            <div className="relative flex items-center gap-1 text-xs text-slate-600 group-hover:text-slate-400 transition-colors">
                                <span>Ver perfil</span>
                                <i className="fas fa-arrow-up-right-from-square text-[10px]" />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Email fallback */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 text-sm text-slate-600"
                >
                    También puedes encontrarme en las redes sociales para cualquier consulta.
                </motion.p>
            </div>
        </section>
    );
}
