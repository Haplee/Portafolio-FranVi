import { motion } from 'motion/react';
import SplitText from './reactbits/SplitText';
import BlurText from './reactbits/BlurText';
import Particles from './reactbits/Particles';

export default function HeroSection() {
    return (
        <section id="hero" className="relative h-screen min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Particles
                    particleCount={250}
                    particleSpread={10}
                    speed={0.1}
                    particleColors={['#22d3ee', '#6366f1', '#fbbf24']} // Cyan, Indigo, Amber
                    moveParticlesOnHover={true}
                    particleHoverFactor={1.5}
                    alphaParticles={true}
                    particleBaseSize={100}
                    sizeRandomness={1}
                    cameraDistance={25}
                    disableRotation={false}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: -50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-amber-400 animate-[spin_10s_linear_infinite] shadow-lg shadow-cyan-500/20">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-900 animate-[spin_10s_linear_infinite_reverse]">
                            <img
                                src="./profile.jpg"
                                alt="Fran Vidal"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Fran+Vidal&background=0f172a&color=22d3ee&size=200';
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                    <SplitText
                        text="Fran Vidal"
                        className="text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        delay={80}
                        animationFrom={{ opacity: 0, y: 50 }}
                        animationTo={{ opacity: 1, y: 0 }}

                    />
                </h1>

                <div className="text-xl md:text-2xl text-slate-300 font-light tracking-wide mb-8">
                    <BlurText
                        text="Estudiante de ASIR · Administración de Sistemas y Diseño Web"
                        delay={50}
                        animateBy="words"
                        direction="bottom"
                        className="inline-block"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex gap-6 mt-4"
                >
                    <a href="#projects" className="px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 font-medium hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300 backdrop-blur-sm">
                        Ver Proyectos
                    </a>
                    <a href="#contact" className="px-8 py-3 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 font-medium hover:bg-slate-700 hover:text-white transition-all duration-300 backdrop-blur-sm">
                        Contacto
                    </a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-500">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};


