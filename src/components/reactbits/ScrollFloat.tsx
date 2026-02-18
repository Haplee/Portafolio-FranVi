import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, type UseInViewOptions } from 'motion/react';

interface ScrollFloatProps {
    children: React.ReactNode;
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
    containerClassName?: string;
    textClassName?: string;
}

const ScrollFloat = ({
    children,
    animationDuration = 1,
    ease = 'back.out(2)',
    stagger = 0.05,
    containerClassName = '',
    textClassName = '',
}: ScrollFloatProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -100px 0px" as UseInViewOptions['margin'] });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            className={containerClassName}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: animationDuration,
                            ease: ease as any,
                            staggerChildren: stagger,
                        },
                    },
                }}
                className={textClassName}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default ScrollFloat;
