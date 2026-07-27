import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLang, type Lang } from '@/i18n/LangProvider';
import { cn } from '@/lib/utils';

// Cuatro entradas, una por sección. Antes el nav enlazaba 8 de 11 secciones y
// tres eran inalcanzables; ahora la lista de secciones y la lista del nav son
// literalmente la misma, así que ese desajuste no puede volver.
const SECTIONS = ['work', 'skills', 'path', 'contact'] as const;

// Referencia estable: `useScrollSpy` la usa como dependencia de su efecto, y
// un array nuevo en cada render volvería a montar el listener de scroll en
// cada evento de scroll.
const SECTION_IDS: string[] = [...SECTIONS];

const LANGS: Lang[] = ['es', 'en'];

export default function Navbar() {
    const isMobile = useIsMobile();
    const { t, lang, setLang } = useLang();
    const active = useScrollSpy(SECTION_IDS);
    const [scrolled, setScrolled] = useState(false);

    // El nav es transparente sobre la apertura (el cielo se ve entero) y se
    // asienta sobre fondo sólido en cuanto empieza el documento.
    useEffect(() => {
        if (isMobile) return;
        const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isMobile]);

    const langToggle = (
        <div className="flex items-center gap-2" role="group" aria-label={t.nav.switchTo}>
            {LANGS.map((l, i) => (
                <span key={l} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-fg-mute/40">/</span>}
                    <button
                        type="button"
                        onClick={() => setLang(l)}
                        aria-pressed={lang === l}
                        className={cn(
                            'font-mono text-fine uppercase tracking-widest transition-colors',
                            lang === l ? 'text-accent' : 'text-fg-mute hover:text-fg'
                        )}
                    >
                        {l}
                    </button>
                </span>
            ))}
        </div>
    );

    const links = SECTIONS.map((id) => (
        <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? 'true' : undefined}
            className={cn(
                'font-mono text-fine tracking-wide transition-colors border-b',
                active === id
                    ? 'text-accent border-accent'
                    : 'text-fg-dim border-transparent hover:text-fg'
            )}
        >
            {t.nav[id]}
        </a>
    ));

    // En móvil la barra vive abajo, al alcance del pulgar, y no compite con el
    // titular de la apertura.
    if (isMobile) {
        return (
            <>
                <a href="#main" className="skip-link font-mono text-fine">{t.nav.skipToContent}</a>
                <header className="fixed bottom-0 inset-x-0 z-50 bg-ink-900/95 border-t border-line backdrop-blur-none">
                    <nav className="flex items-center justify-between px-5 py-3">
                        <div className="flex items-center gap-4">{links}</div>
                        {langToggle}
                    </nav>
                </header>
            </>
        );
    }

    return (
        <>
            <a href="#main" className="skip-link font-mono text-fine">{t.nav.skipToContent}</a>
            <header
                className={cn(
                    'fixed top-0 inset-x-0 z-50 transition-colors duration-300',
                    scrolled ? 'bg-ink-900/92 border-b border-line' : 'bg-transparent border-b border-transparent'
                )}
            >
                <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between gap-8">
                    {/* El nombre solo aparece cuando el titular de la apertura
                        ya no está en pantalla: mientras se ve, repetirlo sobra. */}
                    <a
                        href="#top"
                        className={cn(
                            'font-mono text-fine text-fg transition-opacity duration-300',
                            scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        )}
                    >
                        Fran Vidal
                    </a>
                    <div className="flex items-center gap-7">
                        {links}
                        <span aria-hidden="true" className="w-px h-3.5 bg-line-strong" />
                        {langToggle}
                    </div>
                </nav>
            </header>
        </>
    );
}
