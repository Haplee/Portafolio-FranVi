import { motion } from 'motion/react';
import SplitText from './reactbits/SplitText';
import BlurText from './reactbits/BlurText';
import Particles from './reactbits/Particles';

export default function HeroSection() {
    return (
        <section id="hero" className="relative h-screen min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden bg-slate-900">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900 z-10 pointer-events-none"></div>
                <Particles
                    particleCount={150}
                    particleSpread={10}
                    speed={0.1}
                    particleColors={['#22d3ee', '#818cf8', '#fbbf24']}
                    moveParticlesOnHover={true}
                    particleHoverFactor={1}
                    alphaParticles={true}
                    particleBaseSize={100}
                    sizeRandomness={1}
                    cameraDistance={25}
                    disableRotation={false}
                    className="opacity-60"
                />
            </div>

            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto mt-[-50px] md:mt-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="mb-10 relative"
                >
                    <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] rounded-full"></div>
                    <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full p-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 shadow-2xl shadow-indigo-500/30">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-900">
                            <img
                                src="./profile.jpg"
                                alt="Fran Vidal"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Fran+Vidal&background=0f172a&color=22d3ee&size=200';
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight">
                    <SplitText
                        text="Fran Vidal"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-indigo-200 drop-shadow-sm"
                        delay={60}
                        animationFrom={{ opacity: 0, y: 30 }}
                        animationTo={{ opacity: 1, y: 0 }}
                    />
                </h1>

                <div className="text-lg md:text-2xl text-slate-400 font-light tracking-wide mb-10 max-w-2xl mx-auto">
                    <BlurText
                        text="Estudiante de ASIR · Administración de Sistemas y Diseño Web"
                        delay={40}
                        animateBy="words"
                        direction="top"
                        className="inline-block"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center px-4 sm:px-0"
                >
                    <a href="#projects" className="px-8 py-3.5 rounded-full bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transform hover:-translate-y-1">
                        Ver Proyectos
                    </a>
                    <a href="#contact" className="px-8 py-3.5 rounded-full bg-slate-800 text-slate-200 font-medium border border-slate-700 hover:bg-slate-700 hover:text-white transition-all duration-300 hover:border-slate-500 transform hover:-translate-y-1">
                        Contactar
                    </a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="absolute bottom-[-100px] md:bottom-[-150px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500/70 animate-pulse">Explora</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};


