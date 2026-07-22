import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={scrollTop}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34,211,238,0.4)' }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    aria-label="Volver arriba"
                    className="fixed z-50 w-10 h-10 rounded-xl
                        bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md
                        flex items-center justify-center text-cyan-400
                        shadow-lg shadow-black/40 transition-colors
                        hover:bg-cyan-500/10 hover:border-cyan-500/60
                        /* móvil: por encima del navbar inferior; desktop: esquina inferior derecha */
                        bottom-24 right-4
                        sm:bottom-8 sm:right-6"
                >
                    <i aria-hidden="true" className="fas fa-chevron-up text-xs" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
