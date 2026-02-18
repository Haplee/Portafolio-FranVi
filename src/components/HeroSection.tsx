import { motion } from 'motion/react';
import ConstellationSky from './ui/ConstellationSky';

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen w-full flex items-center bg-slate-950 overflow-hidden">
            <ConstellationSky />

            <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24 relative z-10">

                {/* Texto */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-start space-y-6 order-2 lg:order-1"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-cyan-400 font-medium tracking-wide uppercase">
                            Disponible para trabajar
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                            Fran Vidal
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-light">
                            Administrador de Sistemas · Desarrollador Web
                        </p>
                    </div>

                    <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                        Estudiante de ASIR apasionado por la tecnología, la administración de sistemas y el desarrollo web.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <a
                            href="#projects"
                            className="px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition-colors"
                        >
                            Ver Proyectos
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-cyan-500 hover:text-white transition-colors"
                        >
                            Contacto
                        </a>
                    </div>
                </motion.div>

                {/* Foto de GitHub */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center order-1 lg:order-2"
                >
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                        <img
                            src="https://avatars.githubusercontent.com/u/95777316?v=4"
                            alt="Fran Vidal"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
