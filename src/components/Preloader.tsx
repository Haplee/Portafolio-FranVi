import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    onComplete: () => void;
}

// Cancer constellation — coords inside 600x600 viewBox, centered around (300,300)
const STARS = [
    { id: 0, x: 300, y: 340, r: 6,   name: '♋' },  // Tarf (brightest)
    { id: 1, x: 220, y: 230, r: 3.5 },              // Acubens
    { id: 2, x: 380, y: 260, r: 3.5 },              // Asellus Australis
    { id: 3, x: 360, y: 180, r: 3 },                // Asellus Borealis
    { id: 4, x: 200, y: 410, r: 2.8 },              // ι Cnc
];

const LINES: [number, number][] = [
    [1, 3], [3, 2], [2, 0], [0, 4], [1, 0],
];

interface BgStar { x: number; y: number; r: number; delay: number; dur: number; }

// Estrellas de fondo generadas una sola vez al cargar el módulo. Fuera del
// render para no llamar a Math.random() durante el renderizado (pureza).
const BG_STARS: BgStar[] = Array.from({ length: 180 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.6 + 0.4,
    delay: Math.random() * 2,
    dur: 1.8 + Math.random() * 2.5,
}));

export default function Preloader({ onComplete }: Props) {
    const [visible, setVisible] = useState(true);
    const [phase, setPhase] = useState<'stars' | 'lines' | 'text' | 'done'>('stars');

    const bgStars = BG_STARS;

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('lines'), 1100);
        const t2 = setTimeout(() => setPhase('text'),  2400);
        const t3 = setTimeout(() => setPhase('done'),  4200);
        const t4 = setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 700);
        }, 4400);

        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-slate-950 overflow-hidden flex items-center justify-center"
                >
                    {/* Background twinkling stars (pure CSS, vector-crisp) */}
                    <div className="absolute inset-0">
                        {bgStars.map((s, i) => (
                            <span
                                key={i}
                                className="absolute rounded-full bg-blue-100"
                                style={{
                                    left: `${s.x}%`,
                                    top:  `${s.y}%`,
                                    width:  `${s.r}px`,
                                    height: `${s.r}px`,
                                    opacity: 0,
                                    animation: `preloader-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                                    boxShadow: '0 0 4px rgba(200, 220, 255, 0.6)',
                                }}
                            />
                        ))}
                    </div>

                    {/* Constellation SVG (always vector-sharp) */}
                    <div className="relative w-[min(85vw,85vh,560px)] aspect-square">
                        <svg
                            viewBox="0 0 600 600"
                            className="w-full h-full"
                            style={{ overflow: 'visible' }}
                        >
                            <defs>
                                <radialGradient id="prelStarGlow">
                                    <stop offset="0%"   stopColor="rgba(253,224,71,1)" />
                                    <stop offset="40%"  stopColor="rgba(251,191,36,0.6)" />
                                    <stop offset="100%" stopColor="rgba(251,191,36,0)" />
                                </radialGradient>
                                <filter id="prelGlow">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Lines — animated stroke-dashoffset */}
                            <g>
                                {LINES.map(([from, to], i) => {
                                    const f = STARS[from];
                                    const t = STARS[to];
                                    const len = Math.sqrt((t.x - f.x) ** 2 + (t.y - f.y) ** 2);
                                    return (
                                        <motion.line
                                            key={i}
                                            x1={f.x} y1={f.y}
                                            x2={t.x} y2={t.y}
                                            stroke="rgba(251, 191, 36, 0.6)"
                                            strokeWidth={1.5}
                                            strokeLinecap="round"
                                            strokeDasharray={len}
                                            initial={{ strokeDashoffset: len }}
                                            animate={{
                                                strokeDashoffset: phase === 'stars' ? len : 0,
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                delay: phase !== 'stars' ? i * 0.25 : 0,
                                                ease: 'easeInOut',
                                            }}
                                            filter="url(#prelGlow)"
                                        />
                                    );
                                })}
                            </g>

                            {/* Stars with progressive appearance */}
                            <g>
                                {STARS.map((s, i) => (
                                    <motion.g
                                        key={s.id}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.2 + i * 0.18,
                                            ease: 'easeOut',
                                        }}
                                    >
                                        {/* Outer glow */}
                                        <circle
                                            cx={s.x} cy={s.y}
                                            r={s.r * 5}
                                            fill="url(#prelStarGlow)"
                                        />
                                        {/* Core */}
                                        <circle
                                            cx={s.x} cy={s.y}
                                            r={s.r}
                                            fill="rgba(253, 224, 71, 1)"
                                            filter="url(#prelGlow)"
                                        >
                                            <animate
                                                attributeName="r"
                                                values={`${s.r};${s.r * 1.2};${s.r}`}
                                                dur="2.5s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                        {/* Label for main star */}
                                        {s.name && phase !== 'stars' && (
                                            <motion.text
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1.8, duration: 0.6 }}
                                                x={s.x}
                                                y={s.y - 18}
                                                textAnchor="middle"
                                                fill="rgba(251, 191, 36, 0.95)"
                                                fontSize={18}
                                                fontWeight="bold"
                                                fontFamily="'Outfit', sans-serif"
                                            >
                                                {s.name}
                                            </motion.text>
                                        )}
                                    </motion.g>
                                ))}
                            </g>
                        </svg>

                        {/* Text — pure DOM for crisp typography */}
                        <AnimatePresence>
                            {(phase === 'text' || phase === 'done') && (
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7, ease: 'easeOut' }}
                                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 text-center w-max max-w-[90vw]"
                                >
                                    <p className="text-amber-400 font-mono text-xs sm:text-sm tracking-[0.35em] mb-2 font-semibold">
                                        17 · 07 · 2003 · 03:00 AM
                                    </p>
                                    <p className="text-slate-500 text-[10px] sm:text-xs tracking-[0.2em] mb-4">
                                        Barbate, Cádiz · ♋ Cáncer
                                    </p>
                                    <motion.p
                                        initial={{ letterSpacing: '0.05em', opacity: 0 }}
                                        animate={{ letterSpacing: '0.3em', opacity: 1 }}
                                        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                                        className="text-slate-200 text-xl sm:text-2xl font-light tracking-[0.3em]"
                                    >
                                        FRAN VIDAL
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress bar at bottom */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <div className="w-24 h-px bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 4.2, ease: 'easeInOut' }}
                                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400"
                            />
                        </div>
                        <p className="text-[9px] text-slate-700 font-mono tracking-[0.3em] uppercase">
                            Cargando · constelación
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
