import { useEffect, useRef } from 'react';

/*
 * Cielo nocturno del 17 de julio de 2003 a las 3:00 AM
 * desde Barbate, Cádiz (lat 36.2°N).
 *
 * Constelaciones principales visibles:
 * - Triángulo de Verano (Vega, Deneb, Altair)
 * - Cygnus, Lyra, Aquila
 * - Scorpius, Sagittarius
 * - Cassiopeia, Hercules
 */

interface Star {
    x: number;
    y: number;
    brightness: number;
    size: number;
    name?: string;
}

interface ConstellationLine {
    from: number;
    to: number;
}

interface Constellation {
    name: string;
    stars: Star[];
    lines: ConstellationLine[];
}

interface ShootingStar {
    x: number;
    y: number;
    angle: number;
    speed: number;
    length: number;
    life: number;
    maxLife: number;
}

const CONSTELLATIONS: Constellation[] = [
    {
        name: 'Cygnus',
        stars: [
            { x: 0.48, y: 0.18, brightness: 1, size: 3, name: 'Deneb' },
            { x: 0.46, y: 0.28, brightness: 0.8, size: 2.2 },
            { x: 0.42, y: 0.24, brightness: 0.6, size: 1.8 },
            { x: 0.50, y: 0.24, brightness: 0.6, size: 1.8 },
            { x: 0.44, y: 0.36, brightness: 0.7, size: 2 },
            { x: 0.38, y: 0.32, brightness: 0.5, size: 1.5 },
            { x: 0.52, y: 0.32, brightness: 0.5, size: 1.5 },
        ],
        lines: [
            { from: 0, to: 1 }, { from: 1, to: 4 },
            { from: 1, to: 2 }, { from: 1, to: 3 },
            { from: 2, to: 5 }, { from: 3, to: 6 },
        ]
    },
    {
        name: 'Lyra',
        stars: [
            { x: 0.32, y: 0.20, brightness: 1, size: 3.5, name: 'Vega' },
            { x: 0.30, y: 0.25, brightness: 0.5, size: 1.5 },
            { x: 0.34, y: 0.25, brightness: 0.5, size: 1.5 },
            { x: 0.30, y: 0.30, brightness: 0.4, size: 1.3 },
            { x: 0.34, y: 0.30, brightness: 0.4, size: 1.3 },
        ],
        lines: [
            { from: 0, to: 1 }, { from: 0, to: 2 },
            { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 },
        ]
    },
    {
        name: 'Aquila',
        stars: [
            { x: 0.55, y: 0.45, brightness: 1, size: 3, name: 'Altair' },
            { x: 0.53, y: 0.42, brightness: 0.6, size: 1.6 },
            { x: 0.57, y: 0.48, brightness: 0.6, size: 1.6 },
            { x: 0.51, y: 0.38, brightness: 0.4, size: 1.2 },
            { x: 0.59, y: 0.52, brightness: 0.4, size: 1.2 },
        ],
        lines: [
            { from: 3, to: 1 }, { from: 1, to: 0 },
            { from: 0, to: 2 }, { from: 2, to: 4 },
        ]
    },
    {
        name: 'Scorpius',
        stars: [
            { x: 0.35, y: 0.75, brightness: 1, size: 3, name: 'Antares' },
            { x: 0.33, y: 0.70, brightness: 0.6, size: 1.6 },
            { x: 0.32, y: 0.66, brightness: 0.5, size: 1.4 },
            { x: 0.34, y: 0.63, brightness: 0.5, size: 1.4 },
            { x: 0.37, y: 0.78, brightness: 0.5, size: 1.4 },
            { x: 0.40, y: 0.82, brightness: 0.5, size: 1.4 },
            { x: 0.43, y: 0.85, brightness: 0.5, size: 1.4 },
            { x: 0.45, y: 0.83, brightness: 0.6, size: 1.5 },
            { x: 0.44, y: 0.87, brightness: 0.5, size: 1.4 },
        ],
        lines: [
            { from: 3, to: 2 }, { from: 2, to: 1 }, { from: 1, to: 0 },
            { from: 0, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 },
            { from: 6, to: 7 }, { from: 6, to: 8 },
        ]
    },
    {
        name: 'Sagittarius',
        stars: [
            { x: 0.58, y: 0.78, brightness: 0.7, size: 1.8 },
            { x: 0.62, y: 0.75, brightness: 0.7, size: 1.8 },
            { x: 0.65, y: 0.78, brightness: 0.7, size: 1.8 },
            { x: 0.62, y: 0.82, brightness: 0.7, size: 1.8 },
            { x: 0.66, y: 0.73, brightness: 0.5, size: 1.4 },
            { x: 0.60, y: 0.72, brightness: 0.5, size: 1.4 },
        ],
        lines: [
            { from: 0, to: 1 }, { from: 1, to: 2 },
            { from: 2, to: 3 }, { from: 3, to: 0 },
            { from: 1, to: 4 }, { from: 1, to: 5 },
        ]
    },
    {
        name: 'Cassiopeia',
        stars: [
            { x: 0.78, y: 0.12, brightness: 0.7, size: 2 },
            { x: 0.82, y: 0.08, brightness: 0.7, size: 2 },
            { x: 0.85, y: 0.11, brightness: 0.8, size: 2.2 },
            { x: 0.88, y: 0.07, brightness: 0.7, size: 2 },
            { x: 0.92, y: 0.10, brightness: 0.7, size: 2 },
        ],
        lines: [
            { from: 0, to: 1 }, { from: 1, to: 2 },
            { from: 2, to: 3 }, { from: 3, to: 4 },
        ]
    },
    {
        name: 'Hercules',
        stars: [
            { x: 0.20, y: 0.38, brightness: 0.6, size: 1.6 },
            { x: 0.24, y: 0.42, brightness: 0.6, size: 1.6 },
            { x: 0.22, y: 0.48, brightness: 0.6, size: 1.6 },
            { x: 0.18, y: 0.45, brightness: 0.6, size: 1.6 },
            { x: 0.16, y: 0.35, brightness: 0.4, size: 1.2 },
            { x: 0.26, y: 0.52, brightness: 0.4, size: 1.2 },
        ],
        lines: [
            { from: 0, to: 1 }, { from: 1, to: 2 },
            { from: 2, to: 3 }, { from: 3, to: 0 },
            { from: 0, to: 4 }, { from: 2, to: 5 },
        ]
    },
    {
        // ♋ Cancer — signo zodiacal de Fran (17 Jul 2003, 3 AM)
        // En julio el Sol está en Cáncer → visible poniente en el oeste
        name: 'Cancer',
        stars: [
            { x: 0.08, y: 0.44, brightness: 0.75, size: 2.2, name: '♋ Cáncer' }, // Tarf (β Cnc) — la más brillante
            { x: 0.06, y: 0.38, brightness: 0.55, size: 1.5 },                     // Acubens (α Cnc)
            { x: 0.11, y: 0.40, brightness: 0.55, size: 1.5 },                     // Asellus Australis (δ Cnc)
            { x: 0.10, y: 0.35, brightness: 0.50, size: 1.4 },                     // Asellus Borealis (γ Cnc)
            { x: 0.05, y: 0.50, brightness: 0.45, size: 1.3 },                     // ι Cnc
        ],
        lines: [
            { from: 1, to: 3 }, { from: 3, to: 2 },
            { from: 2, to: 0 }, { from: 0, to: 4 },
            { from: 1, to: 0 },
        ]
    },
];

// Summer Triangle (special — drawn as dashed line connecting the 3 brightest stars)
const SUMMER_TRIANGLE = {
    vega: { x: 0.32, y: 0.20 },
    deneb: { x: 0.48, y: 0.18 },
    altair: { x: 0.55, y: 0.45 },
};

function generateBackgroundStars(count: number): Star[] {
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random(),
            y: Math.random(),
            brightness: Math.random() * 0.4 + 0.1,
            size: Math.random() * 1.2 + 0.3,
        });
    }
    return stars;
}

function createShootingStar(): ShootingStar {
    return {
        x: Math.random() * 0.8 + 0.1,
        y: Math.random() * 0.4,
        angle: Math.PI * 0.6 + Math.random() * 0.4,
        speed: 3 + Math.random() * 4,
        length: 60 + Math.random() * 80,
        life: 0,
        maxLife: 40 + Math.random() * 30,
    };
}

export default function ConstellationSky() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgStarsRef = useRef<Star[]>(generateBackgroundStars(250));
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const animationRef = useRef<number>(0);
    const rotationRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = (time: number) => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            // Slow rotation of the entire sky (like real star movement)
            rotationRef.current = time * 0.000005;
            const rot = rotationRef.current;
            const cx = w * 0.5;
            const cy = h * 0.5;

            const rotatePoint = (px: number, py: number) => {
                const dx = px - cx;
                const dy = py - cy;
                const cos = Math.cos(rot);
                const sin = Math.sin(rot);
                return {
                    x: cx + dx * cos - dy * sin,
                    y: cy + dx * sin + dy * cos,
                };
            };

            // Background stars with twinkle
            for (const star of bgStarsRef.current) {
                const twinkle = 0.5 + 0.5 * Math.sin(time * 0.0015 + star.x * 100 + star.y * 77);
                const alpha = star.brightness * (0.5 + 0.5 * twinkle);
                const pos = rotatePoint(star.x * w, star.y * h);
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
                ctx.fill();
            }

            // Summer Triangle — dashed lines connecting Vega, Deneb, Altair
            const tri = SUMMER_TRIANGLE;
            const triPoints = [
                rotatePoint(tri.vega.x * w, tri.vega.y * h),
                rotatePoint(tri.deneb.x * w, tri.deneb.y * h),
                rotatePoint(tri.altair.x * w, tri.altair.y * h),
            ];

            const triPulse = 0.15 + 0.1 * Math.sin(time * 0.001);
            ctx.setLineDash([8, 12]);
            ctx.strokeStyle = `rgba(100, 200, 255, ${triPulse})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(triPoints[0].x, triPoints[0].y);
            ctx.lineTo(triPoints[1].x, triPoints[1].y);
            ctx.lineTo(triPoints[2].x, triPoints[2].y);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);

            // Constellation lines and stars
            for (const constellation of CONSTELLATIONS) {
                const isScorpius = constellation.name === 'Scorpius';
                const isCancer  = constellation.name === 'Cancer';
                const isGolden  = isScorpius || isCancer;
                const linePulse = 0.25 + 0.1 * Math.sin(time * 0.0008);

                // Lines
                if (isGolden) {
                    ctx.strokeStyle = `rgba(251, 191, 36, ${linePulse + 0.1})`; // amber-400
                } else {
                    ctx.strokeStyle = `rgba(120, 180, 240, ${linePulse})`;
                }
                ctx.lineWidth = isGolden ? 1.4 : 1.2;

                for (const line of constellation.lines) {
                    const from = constellation.stars[line.from];
                    const to = constellation.stars[line.to];
                    const p1 = rotatePoint(from.x * w, from.y * h);
                    const p2 = rotatePoint(to.x * w, to.y * h);
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }

                // Stars
                for (const star of constellation.stars) {
                    const twinkle = 0.5 + 0.5 * Math.sin(time * 0.003 + star.x * 50 + star.y * 30);
                    const alpha = star.brightness * (0.7 + 0.3 * twinkle);
                    const pos = rotatePoint(star.x * w, star.y * h);
                    const isNamedStar = !!star.name;
                    const glowRadius = isNamedStar ? star.size * 8 : star.size * 5;

                    // Outer glow
                    const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRadius);
                    if (isGolden) {
                        const g0 = isNamedStar
                            ? `rgba(251, 191, 36, ${alpha * 0.6})`
                            : `rgba(252, 211, 77, ${alpha * 0.35})`;
                        glow.addColorStop(0, g0);
                        glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
                    } else {
                        const glowColor = isNamedStar
                            ? `rgba(140, 200, 255, ${alpha * 0.5})`
                            : `rgba(180, 210, 255, ${alpha * 0.3})`;
                        glow.addColorStop(0, glowColor);
                        glow.addColorStop(1, 'rgba(180, 210, 255, 0)');
                    }
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, glowRadius, 0, Math.PI * 2);
                    ctx.fillStyle = glow;
                    ctx.fill();

                    // Star core
                    const coreSize = isNamedStar ? star.size * 1.3 : star.size;
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, coreSize, 0, Math.PI * 2);
                    ctx.fillStyle = isGolden
                        ? `rgba(253, 224, 71, ${alpha})`
                        : `rgba(235, 245, 255, ${alpha})`;
                    ctx.fill();

                    // Star name label
                    if (isNamedStar) {
                        const labelAlpha = 0.3 + 0.15 * Math.sin(time * 0.001);
                        // Cancer gets a slightly larger, special label
                        ctx.font = isCancer ? '11px Outfit, sans-serif' : '10px Outfit, sans-serif';
                        ctx.fillStyle = isGolden
                            ? `rgba(251, 191, 36, ${labelAlpha + 0.15})`
                            : `rgba(150, 200, 240, ${labelAlpha})`;
                        ctx.textAlign = 'center';
                        ctx.fillText(star.name!, pos.x, pos.y - coreSize - 8);
                    }
                }
            }

            // Shooting stars
            if (Math.random() < 0.008) {
                shootingStarsRef.current.push(createShootingStar());
            }

            shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
                s.life++;
                if (s.life > s.maxLife) return false;

                const progress = s.life / s.maxLife;
                const fadeIn = Math.min(progress * 4, 1);
                const fadeOut = 1 - Math.pow(progress, 2);
                const alpha = fadeIn * fadeOut * 0.8;

                const headX = s.x * w + Math.cos(s.angle) * s.speed * s.life;
                const headY = s.y * h + Math.sin(s.angle) * s.speed * s.life;
                const tailX = headX - Math.cos(s.angle) * s.length * fadeOut;
                const tailY = headY - Math.sin(s.angle) * s.length * fadeOut;

                const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
                gradient.addColorStop(0, 'rgba(200, 220, 255, 0)');
                gradient.addColorStop(1, `rgba(200, 230, 255, ${alpha})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(headX, headY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                return true;
            });

            animationRef.current = requestAnimationFrame(draw);
        };

        animationRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}
