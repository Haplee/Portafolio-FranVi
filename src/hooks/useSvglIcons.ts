import { useState, useEffect, useRef } from 'react';
import type { SvglIcon } from '@/types/svgl';

const SVGL_API_URL = 'https://api.svgl.app';

interface UseSvglIconsResult {
    icons: Record<string, string>;
    loading: boolean;
    error: string | null;
}

function getSvgUrl(icon: SvglIcon): string {
    if (typeof icon.route === 'string') return icon.route;
    // Dark variant for our dark portfolio background
    return icon.route.dark;
}

export function useSvglIcons(names: string[]): UseSvglIconsResult {
    const [icons, setIcons] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const cacheRef = useRef<Record<string, string> | null>(null);

    useEffect(() => {
        if (cacheRef.current) {
            setIcons(cacheRef.current);
            setLoading(false);
            return;
        }

        const fetchIcons = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(SVGL_API_URL);
                if (!response.ok) throw new Error('Error al obtener los iconos de SVGL');

                const data: SvglIcon[] = await response.json();

                const matched: Record<string, string> = {};

                for (const name of names) {
                    const match = data.find(
                        (icon) => icon.title.toLowerCase() === name.toLowerCase()
                    );
                    if (match) {
                        matched[name] = getSvgUrl(match);
                    }
                }

                cacheRef.current = matched;
                setIcons(matched);
            } catch (err) {
                console.warn('Error al cargar iconos SVGL:', err);
                setError('No se pudieron cargar los iconos.');
            } finally {
                setLoading(false);
            }
        };

        fetchIcons();
    }, [names]);

    return { icons, loading, error };
}
