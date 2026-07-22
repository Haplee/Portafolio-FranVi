import { motion } from 'motion/react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

interface NavLink {
    href: string;
    label: string;
    icon: string;
}

const navLinks: NavLink[] = [
    { href: '#about',        label: 'Sobre mí', icon: 'fas fa-user' },
    { href: '#timeline',     label: 'Historia', icon: 'fas fa-star' },
    { href: '#now',          label: 'Ahora',    icon: 'fas fa-circle-dot' },
    { href: '#skills',       label: 'Skills',   icon: 'fas fa-microchip' },
    { href: '#projects',     label: 'Repos',    icon: 'fas fa-code-branch' },
    { href: '#achievements', label: 'Logros',   icon: 'fas fa-trophy' },
    { href: '#contact',      label: 'Contacto', icon: 'fas fa-paper-plane' },
];

export default function Navbar() {
    const isMobile = useIsMobile();
    const activeSection = useScrollSpy(navLinks.map((link) => link.href.substring(1)));

    return (
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
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <li key={link.href} className="relative">
                                <a
                                    href={link.href}
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
                                    <i aria-hidden="true" className={cn(link.icon, 'text-lg md:text-[13px]')} />
                                    <span className="text-[10px] md:text-[13px] font-medium">{link.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </motion.header>
    );
}
