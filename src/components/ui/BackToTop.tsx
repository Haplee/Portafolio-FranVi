import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLang } from '@/i18n/LangProvider';

export default function BackToTop() {
    const { t } = useLang();
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setProgress(Math.min(100, Math.round((currentScroll / scrollHeight) * 100)));
            }
            setVisible(currentScroll > 380);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.8, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 16 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-ink-800/90 text-fg border border-line-strong hover:border-accent/80 hover:text-accent shadow-2xl backdrop-blur-md transition-colors cursor-pointer group"
                    aria-label={t.ui.backToTop}
                    title={t.ui.backToTop}
                >
                    <span className="text-xs font-mono font-medium text-accent">↑</span>
                    <span className="text-[10px] font-mono tracking-wider text-fg-mute group-hover:text-fg transition-colors">
                        {progress}%
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
