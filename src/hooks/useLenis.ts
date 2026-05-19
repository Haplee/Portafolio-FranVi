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
            const id = anchor.getAttribute('href');
            if (!id || id === '#') return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            // Mobile nav is bottom-fixed (no offset needed), desktop nav top-fixed (~80px)
            const isMobileNav = window.matchMedia('(max-width: 767px)').matches;
            const offset = isMobileNav ? -20 : -80;
            lenis.scrollTo(el as HTMLElement, { offset, duration: 1.4 });
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);
}
