import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { es, type Dict } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';

const DICTS: Record<Lang, Dict> = { es, en };

// Meta traducidas: se actualizan al vuelo al cambiar de idioma.
const META: Record<Lang, { description: string; og: string; twitter: string }> = {
    es: {
        description:
            'Fran Vidal — Administrador de Sistemas y Desarrollador Web junior desde Barbate, Cádiz. Titulado en ASIR. Disponible para trabajar. React, TypeScript, Linux, Docker, Three.js.',
        og:
            'Titulado en ASIR desde Barbate, Cádiz. Portfolio con React, TypeScript y Three.js. Constelación del 17 Julio 2003 visible en el hero. Disponible para trabajar.',
        twitter: 'Titulado en ASIR · Disponible para trabajar · React + TypeScript + Three.js',
    },
    en: {
        description:
            'Fran Vidal — Junior Systems Administrator and Web Developer from Barbate, Cádiz. Qualified in ASIR. Available for work. React, TypeScript, Linux, Docker, Three.js.',
        og:
            'Qualified in ASIR from Barbate, Cádiz. Portfolio with React, TypeScript and Three.js. The constellation of 17 July 2003 visible in the hero. Available for work.',
        twitter: 'Qualified in ASIR · Available for work · React + TypeScript + Three.js',
    },
};

const STORAGE_KEY = 'lang';

interface LangCtx {
    lang: Lang;
    setLang: (l: Lang) => void;
    toggle: () => void;
    t: Dict;
}

const LangContext = createContext<LangCtx | null>(null);

function getInitialLang(): Lang {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'es' || stored === 'en') return stored;
    } catch {
        /* almacenamiento no disponible */
    }
    return 'es';
}

function setMeta(selector: string, value: string) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
}

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(getInitialLang);

    useEffect(() => {
        document.documentElement.lang = lang;
        setMeta('meta[name="description"]', META[lang].description);
        setMeta('meta[property="og:description"]', META[lang].og);
        setMeta('meta[name="twitter:description"]', META[lang].twitter);
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            /* almacenamiento no disponible */
        }
    }, [lang]);

    const setLang = (l: Lang) => setLangState(l);
    const toggle = () => setLangState((prev) => (prev === 'es' ? 'en' : 'es'));

    return (
        <LangContext.Provider value={{ lang, setLang, toggle, t: DICTS[lang] }}>
            {children}
        </LangContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LangCtx {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useLang debe usarse dentro de <LangProvider>');
    return ctx;
}
