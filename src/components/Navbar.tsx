import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLang, type Lang } from '@/i18n/LangProvider';
import { cn } from '@/lib/utils';

// Cuatro entradas principales, una por cada sección de la página.
// Lista canónica compartida entre navegación y scrollspy.
const SECTIONS = ['work', 'skills', 'path', 'contact'] as const;

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
                            'font-mono text-fine uppercase tracking-widest transition-colors cursor-pointer',
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
                'font-mono text-fine tracking-wide transition-colors border-b py-0.5 whitespace-nowrap',
                active === id
                    ? 'text-accent border-accent'
                    : 'text-fg-dim border-transparent hover:text-fg'
            )}
        >
            {t.nav[id]}
        </a>
    ));

    // En móvil la barra vive abajo, al alcance del pulgar, con scroll horizontal si es necesario
    if (isMobile) {
        return (
            <>
                <a href="#main" className="skip-link font-mono text-fine">{t.nav.skipToContent}</a>
                <header className="fixed bottom-0 inset-x-0 z-50 bg-ink-900 border-t border-line">
                    <nav className="flex items-center justify-between px-4 py-2.5 gap-3 overflow-x-auto">
                        <div className="flex items-center gap-3 shrink-0">{links}</div>
                        <div className="shrink-0">{langToggle}</div>
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
                    scrolled ? 'bg-ink-900/95 border-b border-line' : 'bg-transparent border-b border-transparent'
                )}
            >
                <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between gap-8">
                    {/* El nombre solo aparece cuando el titular de la apertura
                        ya no está en pantalla */}
                    <a
                        href="#top"
                        className={cn(
                            'font-mono text-fine text-fg transition-opacity duration-300',
                            scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        )}
                    >
                        Fran Vidal
                    </a>
                    <div className="flex items-center gap-6">
                        {links}
                        <span aria-hidden="true" className="w-px h-3.5 bg-line-strong" />
                        {langToggle}
                    </div>
                </nav>
            </header>
        </>
    );
}
