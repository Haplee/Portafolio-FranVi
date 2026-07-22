import { motion } from 'motion/react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLang, type Lang } from '@/i18n/LangProvider';
import { cn } from '@/lib/utils';

interface NavItem {
    id: 'about' | 'timeline' | 'now' | 'skills' | 'stack' | 'projects' | 'achievements' | 'contact';
    icon: string;
}

const navItems: NavItem[] = [
    { id: 'about',        icon: 'fas fa-user' },
    { id: 'timeline',     icon: 'fas fa-star' },
    { id: 'now',          icon: 'fas fa-circle-dot' },
    { id: 'skills',       icon: 'fas fa-microchip' },
    { id: 'stack',        icon: 'fas fa-server' },
    { id: 'projects',     icon: 'fas fa-code-branch' },
    { id: 'achievements', icon: 'fas fa-trophy' },
    { id: 'contact',      icon: 'fas fa-paper-plane' },
];

const LANGS: Lang[] = ['es', 'en'];

export default function Navbar() {
    const isMobile = useIsMobile();
    const { t, lang, setLang } = useLang();
    const activeSection = useScrollSpy(navItems.map((item) => item.id));

    return (
        <>
            {/* Selector de idioma */}
            <div className="fixed top-4 right-4 z-50">
                <div
                    className="flex items-center gap-0.5 p-0.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-lg"
                    role="group"
                    aria-label={t.nav.switchTo}
                >
                    {LANGS.map((l) => (
                        <button
                            key={l}
                            type="button"
                            onClick={() => setLang(l)}
                            aria-pressed={lang === l}
                            className={cn(
                                'px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase transition-colors',
                                lang === l ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
                            )}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            <motion.header
                initial={{ y: isMobile ? 100 : -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={cn(
                    'fixed z-50 transition-all duration-300',
                    isMobile
                        ? 'bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-sm'
                        : 'top-5 left-1/2 -translate-x-1/2 w-fit'
                )}
            >
                <nav
                    className={cn(
                        'flex items-center px-2 py-2',
                        'bg-slate-900/75 backdrop-blur-xl',
                        'border border-white/8 shadow-2xl shadow-black/40',
                        isMobile ? 'rounded-2xl' : 'rounded-full px-4'
                    )}
                    style={{
                        background: 'rgba(15,23,42,0.80)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderColor: 'rgba(255,255,255,0.06)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                >
                    <ul className="flex items-center justify-between w-full gap-1 md:gap-2 list-none m-0 p-0" role="list">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id} className="relative">
                                    <a
                                        href={`#${item.id}`}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={cn(
                                            'relative flex flex-col md:flex-row items-center gap-1 px-3 py-2 transition-all duration-300 rounded-xl text-sm',
                                            isActive
                                                ? 'text-cyan-300'
                                                : 'text-slate-500 hover:text-slate-200'
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute inset-0 rounded-xl -z-10"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(99,102,241,0.08))',
                                                    border: '1px solid rgba(34,211,238,0.18)',
                                                    boxShadow: '0 0 20px rgba(34,211,238,0.08)',
                                                }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <i aria-hidden="true" className={cn(item.icon, 'text-lg md:text-[13px]')} />
                                        <span className="text-[10px] md:text-[13px] font-medium">{t.nav[item.id]}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </motion.header>
        </>
    );
}
