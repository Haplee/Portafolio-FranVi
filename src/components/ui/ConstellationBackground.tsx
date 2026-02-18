import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    isSpecial?: boolean; // The Barbate/Cádiz star
}

export default function ConstellationBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: Star[] = [];
        const numStars = 100;
        const connectionDistance = 150;

        // Create stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        // Add the special "Barbate, Cádiz" star (fixed position or visually distinct)
        // Placing it slightly off-center to represent a location on a map or valid focal point
        const specialStar: Star = {
            x: width * 0.4, // Roughly South-West if we map screen to Spain conceptually, or just artistic placement
            y: height * 0.7,
            radius: 4,
            vx: 0,
            vy: 0,
            isSpecial: true,
        };
        stars.push(specialStar);

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, width, height);

            // Update and draw stars
            stars.forEach((star) => {
                if (!star.isSpecial) {
                    star.x += star.vx;
                    star.y += star.vy;

                    // Bounce off edges
                    if (star.x < 0 || star.x > width) star.vx *= -1;
                    if (star.y < 0 || star.y > height) star.vy *= -1;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

                if (star.isSpecial) {
                    ctx.fillStyle = '#22d3ee'; // Cyan for the special star
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#22d3ee';
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.shadowBlur = 0;
                }

                ctx.fill();

                // Connect stars
                stars.forEach((otherStar) => {
                    const dx = star.x - otherStar.x;
                    const dy = star.y - otherStar.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(otherStar.x, otherStar.y);

                        const opacity = 1 - distance / connectionDistance;

                        if (star.isSpecial || otherStar.isSpecial) {
                            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.8})`; // Cyan connections for special star
                            ctx.lineWidth = 1.5;
                        } else {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                            ctx.lineWidth = 0.5;
                        }

                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            // Keep special star updated relatively
            specialStar.x = width * 0.45;
            specialStar.y = height * 0.75;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}
