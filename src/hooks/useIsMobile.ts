import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
    // Inicializa de forma síncrona con el ancho real para acertar en el primer
    // render (así en móvil no se llega a montar/cargar Three.js).
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.innerWidth < breakpoint
    );

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}
