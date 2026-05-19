import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    onComplete: () => void;
}

// Cancer constellation centered at (0.5, 0.5) in normalized [0-1] coords
const CANCER_STARS_N = [
    { nx: 0.500, ny: 0.520, size: 3.5, name: '♋' },
    { nx: 0.465, ny: 0.445, size: 2.0 },
    { nx: 0.540, ny: 0.470, size: 2.0 },
    { nx: 0.530, ny: 0.400, size: 1.8 },
    { nx: 0.460, ny: 0.580, size: 1.5 },
];
const CANCER_LINES_N = [
    [1, 3], [3, 2], [2, 0], [0, 4], [1, 0],
];

export default function Preloader({ onComplete }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const exitingRef = useRef(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio, 2);

        const resize = () => {
            canvas.width  = canvas.offsetWidth  * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();

        const w = () => canvas.offsetWidth;
        const h = () => canvas.offsetHeight;

        // Random background stars with staggered appearance
        const bgStars = Array.from({ length: 220 }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.2 + 0.2,
            a: Math.random() * 0.5 + 0.1,
            t: Math.random() * 1100, // appear time ms
        }));

        let startTime: number | null = null;
        let animId: number;

        const draw = (ts: number) => {
            if (!startTime) startTime = ts;
            const el = ts - startTime;

            const cw = w(), ch = h();
            ctx.clearRect(0, 0, cw, ch);

            // Background stars
            for (const s of bgStars) {
                const p = Math.min((el - s.t) / 500, 1);
                if (p <= 0) continue;
                const twinkle = 0.6 + 0.4 * Math.sin(ts * 0.0022 + s.x * 80 + s.y * 60);
                ctx.beginPath();
                ctx.arc(s.x * cw, s.y * ch, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200,220,255,${s.a * p * twinkle})`;
                ctx.fill();
            }

            // Cancer constellation — appears from 1.2s to 2.6s
            const consP = Math.max(0, Math.min((el - 1200) / 1400, 1));
            if (consP > 0) {
                const scale = Math.min(cw, ch) * 0.22;

                const stars = CANCER_STARS_N.map(s => ({
                    x: s.nx * cw,
                    y: s.ny * ch,
                    size: s.size,
                    name: s.name,
                }));

                // Trace constellation lines
                let remaining = consP * CANCER_LINES_N.length;
                for (const [fi, ti] of CANCER_LINES_N) {
                    const seg = Math.min(remaining, 1);
                    if (seg <= 0) break;
                    remaining -= 1;

                    const fx = stars[fi].x, fy = stars[fi].y;
                    const tx = stars[ti].x, ty = stars[ti].y;
                    const ex = fx + (tx - fx) * seg;
                    const ey = fy + (ty - fy) * seg;

                    ctx.beginPath();
                    ctx.moveTo(fx, fy);
                    ctx.lineTo(ex, ey);
                    ctx.strokeStyle = `rgba(251,191,36,${0.45 * consP})`;
                    ctx.lineWidth = 1.3;
                    ctx.stroke();
                }

                // Stars
                for (const star of stars) {
                    const twinkle = 0.65 + 0.35 * Math.sin(ts * 0.003 + star.x);
                    const alpha = consP * twinkle;
                    const gr = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 7);
                    gr.addColorStop(0, `rgba(253,224,71,${alpha * 0.55})`);
                    gr.addColorStop(1, 'rgba(253,224,71,0)');
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 7, 0, Math.PI * 2);
                    ctx.fillStyle = gr;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(253,224,71,${alpha})`;
                    ctx.fill();
                }

                // Star label (♋)
                const a = consP * 0.8;
                ctx.font = `bold ${12 + scale * 0.04}px "Outfit", sans-serif`;
                ctx.fillStyle = `rgba(251,191,36,${a})`;
                ctx.textAlign = 'center';
                ctx.fillText('♋', stars[0].x, stars[0].y - stars[0].size - 10);
            }

            // Text — from 2.7s
            const textP = Math.max(0, Math.min((el - 2700) / 700, 1));
            if (textP > 0) {
                const centerX = cw / 2;
                const baseY   = ch * 0.72;
                ctx.textAlign = 'center';
                ctx.globalAlpha = textP;

                ctx.font = '11px "Courier New", monospace';
                ctx.fillStyle = 'rgba(251,191,36,0.85)';
                ctx.letterSpacing = '0.3em';
                ctx.fillText('17 · 07 · 2003 · 03:00 AM', centerX, baseY);

                ctx.font = '10px "Outfit", sans-serif';
                ctx.fillStyle = 'rgba(148,163,184,0.65)';
                ctx.letterSpacing = '0.15em';
                ctx.fillText('Barbate, Cádiz', centerX, baseY + 22);

                ctx.font = `${14 + cw * 0.01}px "Outfit", sans-serif`;
                ctx.fillStyle = 'rgba(226,232,240,0.85)';
                ctx.letterSpacing = '0.25em';
                ctx.fillText('FRAN VIDAL', centerX, baseY + 52);

                ctx.globalAlpha = 1;
                ctx.letterSpacing = '0';
            }

            animId = requestAnimationFrame(draw);
        };

        animId = requestAnimationFrame(draw);

        // Schedule exit
        const t = setTimeout(() => {
            exitingRef.current = true;
            setVisible(false);
            setTimeout(onComplete, 650);
        }, 4400);

        return () => {
            cancelAnimationFrame(animId);
            clearTimeout(t);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center"
                >
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        aria-hidden="true"
                    />
                    {/* Loading indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <div className="w-20 h-px bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 4.2, ease: 'easeInOut' }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
