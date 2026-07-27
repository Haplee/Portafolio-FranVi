import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { es, type Dict } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';

const DICTS: Record<Lang, Dict> = { es, en };

// Meta traducidas: se actualizan al vuelo al cambiar de idioma.
// Describen lo que hay en la página —el proyecto y el puesto que se busca—
// en lugar del stack con el que está hecho el portafolio: quien lee esto en
// una vista previa de LinkedIn no está contratando a Three.js.
const META: Record<Lang, { description: string; og: string; twitter: string }> = {
    es: {
        description:
            'Fran Vidal — Administrador de sistemas y redes desde Barbate, Cádiz. Titulado en ASIR. ResolveCore: plataforma de soporte IT de ciclo completo sobre VPS propio. Disponible en la provincia y en remoto.',
        og:
            'Administrador de sistemas y redes. Titulado en ASIR. Monté ResolveCore, una plataforma de soporte IT de ciclo completo, y cablé y configuré redes de clientes reales durante las prácticas.',
        twitter: 'Sistemas y redes · Titulado en ASIR · Barbate, Cádiz · Disponible',
    },
    en: {
        description:
            'Fran Vidal — Systems and network administrator from Barbate, Cádiz. Qualified in ASIR. ResolveCore: a full-cycle IT support platform on my own VPS. Available across the province and remotely.',
        og:
            'Systems and network administrator. Qualified in ASIR. Built ResolveCore, a full-cycle IT support platform, and wired and configured real client networks during my placement.',
        twitter: 'Systems and networks · Qualified in ASIR · Barbate, Cádiz · Available',
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
