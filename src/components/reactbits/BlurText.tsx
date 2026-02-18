import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, type UseInViewOptions } from 'motion/react';

interface BlurTextProps {
    text?: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    animationFrom?: { filter: string; opacity: number; transform: string };
    animationTo?: { filter: string; opacity: number; transform: string };
    easing?: string;
    onAnimationComplete?: () => void;
}

const BlurText = ({
    text = '',
    delay = 200,
    className = '',
    animateBy = 'words', // 'words' or 'letters'
    direction = 'top', // 'top' or 'bottom'
    threshold = 0.1,
    rootMargin = '-50px',
    animationFrom,
    animationTo,
    easing = 'easeOut',
    onAnimationComplete,
}: BlurTextProps) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const ref = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as UseInViewOptions['margin'] });
    const controls = useAnimation();

    const defaultFrom =
        direction === 'top'
            ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
            : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

    const defaultTo = [
        {
            filter: 'blur(5px)',
            opacity: 0.5,
            transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
        },
        { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
    ];

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const variants = {
        hidden: animationFrom || defaultFrom,
        visible: {
            ...(animationTo || defaultTo[1]),
            transition: {
                staggerChildren: delay / 1000,
                ease: easing,
            },
        },
    } as any;

    return (
        <p ref={ref} className={`blur-text ${className}`}>
            <motion.span
                initial="hidden"
                animate={controls}
                variants={variants}
                onAnimationComplete={onAnimationComplete}
            >
                {elements.map((element, index) => (
                    <motion.span
                        key={index}
                        className="inline-block"
                        variants={{
                            hidden: animationFrom || defaultFrom,
                            visible: animationTo || defaultTo[1],
                        }}
                        transition={{
                            duration: 0.8,
                            ease: easing as any,
                            delay: (index * delay) / 1000
                        }}
                    >
                        {element}
                        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                    </motion.span>
                ))}
            </motion.span>
        </p>
    );
};

export default BlurText;
