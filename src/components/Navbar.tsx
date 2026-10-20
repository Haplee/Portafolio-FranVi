import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLang, type Lang } from '@/i18n/LangProvider';
import { cn } from '@/lib/utils';

const SECTIONS = ['work', 'skills', 'path', 'contact'] as const;
const SECTION_IDS: string[] = [...SECTIONS];
const LANGS: Lang[] = ['es', 'en'];

export default function Navbar() {
    const isMobile = useIsMobile();
    const { t, lang, setLang } = useLang();
    const active = useScrollSpy(SECTION_IDS);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const langToggle = (
        <div className="lang-switch" role="group" aria-label={t.nav.switchTo}>
            {LANGS.map((l) => (
                <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={cn('lang-button', lang === l && 'is-active')}
                >
                    {l}
                </button>
            ))}
        </div>
    );

    const links = SECTIONS.map((id) => (
        <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? 'location' : undefined}
            className={cn('nav-link', active === id && 'is-active')}
        >
            {t.nav[id]}
        </a>
    ));

    return (
        <>
            <a href="#main" className="skip-link">{t.nav.skipToContent}</a>
            <header
                className={cn(
                    'site-nav',
                    scrolled && 'is-scrolled',
                    isMobile && 'is-mobile'
                )}
            >
                <nav className="nav-inner" aria-label={t.nav.primaryNav}>
                    <a href="#top" className="brand-mark" aria-label="Fran Vidal, inicio">
                        <span className="brand-dot" aria-hidden="true" />
                        <span>FV</span>
                    </a>

                    <div className="nav-links">
                        {links}
                    </div>

                    {langToggle}
                </nav>
            </header>
        </>
    );
}
