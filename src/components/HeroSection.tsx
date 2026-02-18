import { motion } from 'motion/react';
import SplitText from './reactbits/SplitText';
import BlurText from './reactbits/BlurText';
import HandballCourtBackground from './ui/HandballCourtBackground';

export default function HeroSection() {
    return (
        <section id="hero" className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden bg-slate-950">
            <HandballCourtBackground />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left: Text Content - The "Playcall" */}
                <div className="flex flex-col items-start text-left space-y-6 md:space-y-8 order-2 lg:order-1">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 text-amber-400 font-mono text-sm uppercase tracking-[0.2em] bg-amber-400/10 px-3 py-1 rounded border border-amber-400/20"
                        >
                            <i className="fas fa-circle text-[8px] animate-pulse"></i> Game On
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] italic">
                            <SplitText
                                text="TECHNICAL PLAYMAKER"
                                className="text-white drop-shadow-xl"
                                delay={40}
                                animationFrom={{ opacity: 0, x: -50 }}
                                animationTo={{ opacity: 1, x: 0 }}
                            />
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-bold text-cyan-400">
                            FRAN VIDAL
                        </h2>
                    </div>

                    <div className="text-lg md:text-xl text-slate-300 font-medium max-w-xl leading-relaxed border-l-4 border-cyan-500 pl-6">
                        <BlurText
                            text="Orchestrating robust systems and executing dynamic frontend plays."
                            delay={30}
                            animateBy="words"
                            direction="top"
                            className="inline-block"
                        />
                        <p className="mt-2 text-slate-400 font-light">
                            Blending the discipline of a Handball tactical playmaker with the precision of a Systems Administrator.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3.5 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/20"
                        >
                            <i className="fas fa-play mr-2 text-xs"></i> View Playbook
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3.5 rounded-lg border border-slate-600 bg-slate-900/50 text-white font-medium hover:border-amber-400 hover:text-amber-400 transition-all backdrop-blur-sm"
                        >
                            Scout Me
                        </a>
                    </motion.div>
                </div>

                {/* Right: The "Player Card" Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
                >
                    <div className="relative w-72 h-80 md:w-96 md:h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500">
                        {/* Card Header (Stats) */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 drop-shadow-md">
                            <div className="text-5xl font-black text-amber-400 italic">95</div>
                            <div className="text-sm font-bold text-white uppercase tracking-wider">OVR</div>
                        </div>

                        {/* Image Frame */}
                        <div className="w-full h-full relative">
                            <img
                                src="./profile.jpg"
                                alt="Fran Vidal"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Fran+Vidal&background=0f172a&color=22d3ee&size=500';
                                }}
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                        </div>

                        {/* Card Footer (Name) */}
                        <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                            <h3 className="text-3xl font-black text-white uppercase tracking-widest leading-none">Vidal</h3>
                            <div className="w-12 h-1 bg-cyan-500 mx-auto my-3 rounded-full"></div>
                            <div className="flex justify-center gap-4 text-xs font-bold font-mono text-cyan-300 tracking-widest">
                                <span>SYS.ADMIN</span>
                                <span className="text-slate-600">|</span>
                                <span>DEV</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
