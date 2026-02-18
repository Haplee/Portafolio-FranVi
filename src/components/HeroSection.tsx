import { motion } from 'motion/react';
import SplitText from './reactbits/SplitText';
import BlurText from './reactbits/BlurText';
import ConstellationBackground from './ui/ConstellationBackground';

export default function HeroSection() {
    return (
        <section id="hero" className="relative h-screen min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden bg-background">
            <ConstellationBackground />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto space-y-8">

                {/* Profile Image with subtle glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group"
                >
                    <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-primary via-indigo-500 to-primary/50">
                        <div className="w-full h-full rounded-full overflow-hidden bg-background border-4 border-background">
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

                {/* Main Heading */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                        <SplitText
                            text="Fran Vidal"
                            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400"
                            delay={50}
                            animationFrom={{ opacity: 0, y: 30 }}
                            animationTo={{ opacity: 1, y: 0 }}
                        />
                    </h1>

                    <div className="text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl font-light">
                        <BlurText
                            text="System Administration Student & Web Developer"
                            delay={30}
                            animateBy="words"
                            direction="top"
                            className="inline-block"
                        />
                    </div>
                </div>

                {/* Call to Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                    <a
                        href="#projects"
                        className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all border border-white/5"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Scroll</span>
            </motion.div>
        </section>
    );
};


