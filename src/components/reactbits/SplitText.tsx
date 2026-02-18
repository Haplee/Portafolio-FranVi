import { motion, useInView, useAnimation, type UseInViewOptions } from 'motion/react';
import { useEffect, useRef } from 'react';

type SplitTextProps = {
    text: string;
    className?: string;
    delay?: number;
    animationFrom?: any;
    animationTo?: any;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
    onLetterAnimationComplete?: () => void;
};

const SplitText = ({
    text = '',
    className = '',
    delay = 100,
    animationFrom = { opacity: 0, y: 40 },
    animationTo = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-50px',
    textAlign = 'center',
    onLetterAnimationComplete,
}: SplitTextProps) => {
    const words = text.split(' ').map((word) => word.split(''));
    const letters: string[] = [];
    words.forEach((word, wordIndex) => {
        word.forEach((letter) => {
            letters.push(letter);
        });
        if (wordIndex < words.length - 1) letters.push(' ');
    });

    const ref = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as UseInViewOptions['margin'] });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <p
            ref={ref}
            className={`split-parent overflow-hidden inline-block ${className}`}
            style={{ textAlign }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.map((letter, letterIndex) => {
                        const index = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                        return (
                            <motion.span
                                key={index}
                                initial="hidden"
                                animate={controls}
                                variants={{
                                    hidden: animationFrom,
                                    visible: {
                                        ...animationTo,
                                        transition: { delay: (index * delay) / 1000 },
                                    },
                                }}
                                className="inline-block will-change-transform will-change-opacity"
                                onAnimationComplete={() => {
                                    if (index === letters.length - 1 && onLetterAnimationComplete) {
                                        onLetterAnimationComplete();
                                    }
                                }}
                            >
                                {letter}
                            </motion.span>
                        );
                    })}
                    <span className="inline-block">&nbsp;</span>
                </span>
            ))}
        </p>
    );
};

export default SplitText;
