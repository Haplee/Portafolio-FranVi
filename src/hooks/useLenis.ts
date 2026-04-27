import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        // Anchor links smooth scroll through Lenis
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!anchor) return;
            e.preventDefault();
            const id = anchor.getAttribute('href')!;
            const el = document.querySelector(id);
            if (el) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);
}
