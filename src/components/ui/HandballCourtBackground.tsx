import { useEffect, useRef } from 'react';

interface Player {
    x: number;
    y: number;
    vx: number;
    vy: number;
    role: 'dev' | 'sysadmin' | 'ball';
    radius: number;
}

export default function HandballCourtBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const players: Player[] = [];
        const numPlayers = 15;

        // Create Players (Nodes)
        for (let i = 0; i < numPlayers; i++) {
            players.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                role: Math.random() > 0.5 ? 'dev' : 'sysadmin',
                radius: Math.random() * 2 + 2,
            });
        }

        // The "Ball" (Special Node)
        const ball: Player = {
            x: width / 2,
            y: height / 2,
            vx: 2,
            vy: 1.5,
            role: 'ball',
            radius: 6
        };
        players.push(ball);

        const drawCourt = (ctx: CanvasRenderingContext2D) => {
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.05;

            // Center Circle
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 100, 0, Math.PI * 2);
            ctx.stroke();

            // 9m Line (Dashed)
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.arc(width * 0.1, height / 2, height * 0.4, -Math.PI / 2, Math.PI / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(width * 0.9, height / 2, height * 0.4, Math.PI / 2, -Math.PI / 2);
            ctx.stroke();

            // 6m Line (Solid)
            ctx.setLineDash([]);
            ctx.globalAlpha = 0.1;
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#fbbf24'; // Warning color
            ctx.beginPath();
            ctx.arc(width * 0.1, height / 2, height * 0.25, -Math.PI / 2, Math.PI / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(width * 0.9, height / 2, height * 0.25, Math.PI / 2, -Math.PI / 2);
            ctx.stroke();
        };

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Court Lines
            drawCourt(ctx);

            // Update & Draw Players
            players.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw
                ctx.beginPath();
                ctx.globalAlpha = p.role === 'ball' ? 1 : 0.6;
                ctx.fillStyle = p.role === 'ball' ? '#ffffff' : (p.role === 'dev' ? '#22d3ee' : '#818cf8');

                if (p.role === 'ball') {
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#ffffff';
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Connections (Passes)
                players.forEach((other) => {
                    const dx = p.x - other.x;
                    const dy = p.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = p.role === 'ball' || other.role === 'ball' ? '#fbbf24' : '#22d3ee';
                        ctx.globalAlpha = (1 - dist / 150) * 0.3;
                        ctx.lineWidth = p.role === 'ball' || other.role === 'ball' ? 1.5 : 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
