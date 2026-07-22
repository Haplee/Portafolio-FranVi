export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative py-14 bg-slate-950 border-t border-slate-800/60 overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/3 blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Brand */}
                    <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                            <i aria-hidden="true" className="fas fa-code text-cyan-400 text-sm" />
                        </div>
                        <div>
                            <p className="text-white font-semibold">Fran Vidal</p>
                            <p className="text-xs text-slate-500">Desarrollador Web · Sysadmin</p>
                        </div>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-3">
                        {[
                            { href: 'https://linkedin.com/in/franciscovidal-mateo-2b8a4a238', icon: 'fab fa-linkedin-in', label: 'LinkedIn',  hoverColor: 'hover:text-[#0a66c2] hover:bg-[#0a66c2]/10' },
                            { href: 'https://github.com/Haplee',                    icon: 'fab fa-github',    label: 'GitHub',    hoverColor: 'hover:text-cyan-400 hover:bg-cyan-500/10' },
                            { href: 'https://x.com/FranVidalMateo',                 icon: 'fab fa-x-twitter', label: 'X',         hoverColor: 'hover:text-white hover:bg-white/10' },
                            { href: 'https://www.instagram.com/franvidalmateo',     icon: 'fab fa-instagram', label: 'Instagram', hoverColor: 'hover:text-pink-400 hover:bg-pink-500/10' },
                        ].map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700/60 text-slate-500 transition-all ${s.hoverColor} hover:border-slate-600`}
                            >
                                <i aria-hidden="true" className={`${s.icon} text-base`} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                    <p className="text-slate-600 text-sm">
                        © {year} Fran Vidal. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-slate-700">
                        Hecho con <span className="text-red-500/70">❤</span> usando{' '}
                        <span className="text-slate-500">React · Tailwind · Motion</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
