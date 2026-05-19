import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useKonami } from '@/hooks/useKonami';

export default function KonamiEffect() {
    const [active, setActive] = useState(false);

    useKonami(() => {
        // Scroll to hero
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Trigger meteor shower in constellation
        window.dispatchEvent(new CustomEvent('konami-burst'));
        // Show golden flash overlay
        setActive(true);
        setTimeout(() => setActive(false), 4000);
    });

    return (
        <AnimatePresence>
            {active && (
                <>
                    {/* Golden flash overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.35, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="fixed inset-0 z-[300] pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.6), transparent 70%)' }}
                    />

                    {/* Floating ♋ symbols */}
                    <div className="fixed inset-0 z-[301] pointer-events-none overflow-hidden">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.span
                                key={i}
                                initial={{
                                    x: `${Math.random() * 100}%`,
                                    y: '110vh',
                                    rotate: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: '-10vh',
                                    rotate: 360,
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 3.5 + Math.random() * 1.5,
                                    delay: i * 0.15,
                                    ease: 'easeOut',
                                }}
                                style={{
                                    fontSize: `${24 + Math.random() * 28}px`,
                                    color: 'rgba(251,191,36,0.85)',
                                    textShadow: '0 0 15px rgba(251,191,36,0.6)',
                                }}
                                className="absolute"
                            >
                                ♋
                            </motion.span>
                        ))}
                    </div>

                    {/* Konami badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[302] pointer-events-none"
                    >
                        <div className="px-5 py-3 rounded-full bg-gradient-to-r from-amber-500/30 to-amber-400/30 border border-amber-400/60 backdrop-blur-md shadow-2xl">
                            <p className="text-amber-300 font-mono text-sm tracking-widest flex items-center gap-2">
                                <span>♋</span>
                                <span>KONAMI · METEOR SHOWER</span>
                                <span>♋</span>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
