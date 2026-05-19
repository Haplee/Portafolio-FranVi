import { createContext, useContext, useEffect, useState } from 'react';

type Scheme = 'noche' | 'cosmos' | 'amanecer';

interface ThemeCtxValue {
    scheme: Scheme;
    nextScheme: () => void;
}

const ThemeContext = createContext<ThemeCtxValue>({
    scheme: 'noche',
    nextScheme: () => {},
});

const SCHEMES: Scheme[] = ['noche', 'cosmos', 'amanecer'];
const ICONS: Record<Scheme, string> = {
    noche: '🌙',
    cosmos: '🔮',
    amanecer: '🌅',
};
const LABELS: Record<Scheme, string> = {
    noche: 'Noche',
    cosmos: 'Cosmos',
    amanecer: 'Amanecer',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [scheme, setScheme] = useState<Scheme>(() => {
        const s = localStorage.getItem('portfolio-scheme');
        return (SCHEMES.includes(s as Scheme) ? s : 'noche') as Scheme;
    });

    useEffect(() => {
        document.documentElement.dataset.scheme = scheme;
        localStorage.setItem('portfolio-scheme', scheme);
    }, [scheme]);

    const nextScheme = () => {
        const idx = SCHEMES.indexOf(scheme);
        setScheme(SCHEMES[(idx + 1) % SCHEMES.length]);
    };

    return (
        <ThemeContext.Provider value={{ scheme, nextScheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
export { ICONS, LABELS };
