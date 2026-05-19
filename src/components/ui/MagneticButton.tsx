import { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    strength?: number;
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    type = 'button',
    href,
    target,
    rel,
    disabled,
    strength = 0.35,
}: Props) {
    const ref = useRef<HTMLElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current || disabled) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPos({ x: x * strength, y: y * strength });
    };

    const handleLeave = () => setPos({ x: 0, y: 0 });

    const common = {
        ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
        className,
        onMouseMove: handleMove,
        onMouseLeave: handleLeave,
        onClick,
    };

    const inner = (
        <motion.span
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.4 }}
            className="inline-flex items-center justify-center gap-2 pointer-events-none"
        >
            {children}
        </motion.span>
    );

    if (href) {
        return <a {...common} href={href} target={target} rel={rel}>{inner}</a>;
    }
    return <button {...common} type={type} disabled={disabled}>{inner}</button>;
}
