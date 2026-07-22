import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import ShinyText from './reactbits/ShinyText';
import MagneticButton from './ui/MagneticButton';

// Three.js es pesado (~600 KB): se carga en un chunk aparte para no bloquear
// el primer render. El hero sigue siendo usable mientras carga (fondo vacío).
const ConstellationSky3D = lazy(() => import('./ui/ConstellationSky3D'));

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen w-full flex items-center bg-slate-950 overflow-hidden">
            <Suspense fallback={null}>
                <ConstellationSky3D />
            </Suspense>

            {/* Ambient glow blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-5 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-16 pb-32 lg:py-24 relative z-10">

                {/* Avatar — arriba en móvil */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                    className="flex justify-center order-1 lg:order-2"
                >
                    <div className="relative animate-float">
                        {/* Spinning rings — más pequeños en móvil */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                            className="absolute -inset-6 sm:-inset-10 rounded-full border border-dashed border-cyan-500/20"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                            className="absolute -inset-12 sm:-inset-20 rounded-full border border-dashed border-purple-500/10"
                        />
                        {/* Glow ring */}
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-xl" />
                        {/* Avatar */}
                        <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-2xl glow-cyan">
                            <img
                                src="https://avatars.githubusercontent.com/u/95777316?v=4"
                                alt="Fran Vidal"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                        </div>
                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 backdrop-blur-md shadow-xl whitespace-nowrap"
                        >
                            <span className="text-xs text-slate-400">⚡ ASIR · Dev · Sysadmin</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Texto — debajo del avatar en móvil */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="flex flex-col items-start space-y-5 order-2 lg:order-1"
                >
                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm animate-border-pulse"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                        </span>
                        <span className="text-xs sm:text-sm text-cyan-300 font-medium tracking-wide">Disponible para trabajar</span>
                    </motion.div>

                    {/* Name & title */}
                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(90deg, #e2e8f0 0%, #22d3ee 45%, #38bdf8 100%)' }}
                            >
                                Fran Vidal
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl font-light text-slate-400">
                            <ShinyText text="Administrador de Sistemas · Desarrollador Web" speed={4} />
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed border-l-2 border-cyan-500/40 pl-4">
                        Titulado en ASIR, apasionado por la tecnología, la administración de sistemas y el desarrollo web.
                        Siempre aprendiendo, siempre construyendo.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3 pt-1">
                        <MagneticButton
                            href="#projects"
                            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/50 transition-shadow text-sm sm:text-base"
                            strength={0.4}
                        >
                            <i aria-hidden="true" className="fas fa-code-branch text-xs sm:text-sm" />
                            <span>Ver Proyectos</span>
                        </MagneticButton>
                        <MagneticButton
                            href="#contact"
                            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl border border-slate-600/80 text-slate-300 font-medium hover:border-cyan-500/60 hover:text-white hover:bg-cyan-500/5 transition-all backdrop-blur-sm text-sm sm:text-base"
                            strength={0.3}
                        >
                            <i aria-hidden="true" className="fas fa-paper-plane text-xs sm:text-sm" />
                            <span>Contacto</span>
                        </MagneticButton>
                    </div>

                    {/* Quick info — oculto en xs, visible desde sm */}
                    <div className="hidden sm:flex flex-wrap items-center gap-4 pt-1">
                        {[
                            { icon: 'fas fa-map-marker-alt', text: 'Barbate, Cádiz' },
                            { icon: 'fas fa-graduation-cap', text: 'Técnico Superior en ASIR' },
                            { icon: 'fab fa-github', text: 'Haplee', href: 'https://github.com/Haplee' },
                        ].map((item, i) => (
                            item.href ? (
                                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors">
                                    <i aria-hidden="true" className={`${item.icon} text-cyan-500/70`} />
                                    {item.text}
                                </a>
                            ) : (
                                <span key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <i aria-hidden="true" className={`${item.icon} text-cyan-500/70`} />
                                    {item.text}
                                </span>
                            )
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator — oculto en móvil pequeño */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
            >
                <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-5 h-9 rounded-full border border-slate-700 flex items-start justify-center p-1.5"
                >
                    <div className="w-1 h-2.5 rounded-full bg-gradient-to-b from-cyan-400 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
