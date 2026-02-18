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
    { href: '#about', label: 'About', icon: 'fas fa-user' },
    { href: '#skills', label: 'Skills', icon: 'fas fa-microchip' },
    { href: '#projects', label: 'Projects', icon: 'fas fa-code-branch' },
    { href: '#setup', label: 'Setup', icon: 'fas fa-desktop' },
    { href: '#contact', label: 'Contact', icon: 'fas fa-paper-plane' },
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
            className={cn(
                "fixed z-50 transition-all duration-300 transform",
                isMobile
                    ? "bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm"
                    : "top-6 left-1/2 -translate-x-1/2 w-fit"
            )}
        >
            <nav
                className={cn(
                    "flex items-center justify-between px-2 py-2",
                    "bg-background/60 backdrop-blur-md border border-border shadow-lg",
                    isMobile ? "rounded-2xl" : "rounded-full px-4 py-2"
                )}
            >
                <ul className="flex items-center justify-between w-full gap-2 md:gap-4 list-none m-0 p-0">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <li key={link.href} className="relative">
                                <a
                                    href={link.href}
                                    className={cn(
                                        "relative flex flex-col md:flex-row items-center gap-1.5 px-3 py-2 transition-colors duration-300 rounded-xl",
                                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                    onClick={(e) => handleScrollTo(e, link.href)}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                                            transition={{ type: 'spring', duration: 0.6 }}
                                        />
                                    )}
                                    <i className={cn(link.icon, "text-lg md:text-sm")}></i>
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

