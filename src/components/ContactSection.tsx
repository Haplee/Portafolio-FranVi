import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const socials = [
    { name: 'Instagram', icon: 'fab fa-instagram', link: 'https://www.instagram.com/franvidalmateo', color: 'hover:text-pink-500 hover:border-pink-500/30' },
    { name: 'X', icon: 'fab fa-x-twitter', link: 'https://x.com/FranVidalMateo', color: 'hover:text-white hover:border-white/30' },
    { name: 'GitHub', icon: 'fab fa-github', link: 'https://github.com/Haplee', color: 'hover:text-white hover:border-white/30' },
];

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 px-4 w-full bg-slate-900">
            <div className="max-w-4xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Contacto</h2>
                    <div className="h-1 w-16 bg-cyan-500 rounded-full mx-auto" />
                    <p className="text-slate-400 mt-4 max-w-lg mx-auto">
                        ¿Tienes una propuesta o proyecto en mente? ¡Hablemos!
                        Siempre estoy abierto a conectar y explorar nuevas oportunidades.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6">
                    {socials.map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                'flex flex-col items-center gap-2 w-20 h-20 rounded-xl border border-slate-700 bg-slate-800/50 justify-center text-slate-400 transition-all',
                                social.color
                            )}
                            aria-label={social.name}
                        >
                            <i className={cn(social.icon, 'text-2xl')} />
                            <span className="text-[10px] font-medium">{social.name}</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
