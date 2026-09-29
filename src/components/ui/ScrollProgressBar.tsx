import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-rose-400 to-amber-300 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(255,77,109,0.7)]"
            style={{ scaleX }}
            aria-hidden="true"
        />
    );
}
