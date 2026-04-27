import { motion } from 'motion/react';
import { useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #22d3ee, #818cf8, #a855f7)',
            }}
        />
    );
}
