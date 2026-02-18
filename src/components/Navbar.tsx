import { motion } from 'motion/react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useScrollSpy } from '@/hooks/useScrollSpy';

interface NavLink {
    href: string;
    label: string;
    icon: string;
}

const navLinks: NavLink[] = [
    { href: '#about', label: 'Sobre Mí', icon: 'fas fa-user' },
    { href: '#skills', label: 'Habilidades', icon: 'fas fa-microchip' },
    { href: '#projects', label: 'Proyectos', icon: 'fas fa-code-branch' },
    { href: '#setup', label: 'Setup', icon: 'fas fa-desktop' },
    { href: '#contact', label: 'Contacto', icon: 'fas fa-paper-plane' },
];

export default function Navbar() {
    const isMobile = useIsMobile();
    const activeSection = useScrollSpy(
        navLinks.map((link) => link.href.substring(1))
    );

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`fixed z-50 transition-all duration-300 transform 
        ${isMobile
                    ? 'bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm'
                    : 'top-6 left-1/2 -translate-x-1/2 w-fit'
                }`}
        >
            <nav
                className={`
          flex items-center justify-between px-2 py-2 
          bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50
          ${isMobile ? 'rounded-2xl' : 'rounded-full px-6 py-3'}
        `}
            >
                <ul className="flex items-center justify-between w-full gap-1 md:gap-6 list-none m-0 p-0">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <li key={link.href} className="relative">
                                <a
                                    href={link.href}
                                    className={`
                    relative flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 transition-colors duration-300 rounded-xl
                    ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
                  `}
                                    onClick={(e) => handleScrollTo(e, link.href)}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                                            transition={{ type: 'spring', duration: 0.6 }}
                                        />
                                    )}
                                    <i className={`${link.icon} text-lg md:text-sm`}></i>
                                    <span className="text-[10px] md:text-sm font-medium">{link.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </motion.header>
    );
}

