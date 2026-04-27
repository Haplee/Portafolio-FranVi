import { useRef, useState } from 'react';

interface Position {
    x: number;
    y: number;
}

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export default function SpotlightCard({
    children,
    className = '',
    spotlightColor = 'rgba(34, 211, 238, 0.12)'
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300
                bg-slate-800/40 border border-slate-700/60
                hover:border-cyan-500/25 hover:shadow-xl hover:shadow-black/30
                ${className}`}
        >
            {/* Spotlight overlay */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(circle 280px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`
                }}
            />
            {/* Top-edge shimmer */}
            <div
                className="pointer-events-none absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                style={{
                    opacity: opacity * 0.5,
                    background: `linear-gradient(90deg, transparent, ${spotlightColor}, transparent)`
                }}
            />
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
}
