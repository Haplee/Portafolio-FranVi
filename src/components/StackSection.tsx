import { motion } from 'motion/react';
import SpotlightCard from './reactbits/SpotlightCard';
import { useLang } from '@/i18n/LangProvider';

interface StackGroup {
    icon: string;
    glowColor: string;
    chip: string;
    items: string[];
}

// Cobertura técnica completa del perfil ASIR (amplitud). La profundidad con
// niveles vive en SkillsSection; aquí se listan también infra y hardware que
// no encajan en una barra de progreso.
const STACK: StackGroup[] = [
    {
        icon: 'fas fa-server',
        glowColor: 'rgba(34,211,238,0.12)',
        chip: 'border-cyan-500/25 text-cyan-300 bg-cyan-500/5',
        items: ['Linux (Ubuntu, Debian)', 'Windows 11', 'Windows Server'],
    },
    {
        icon: 'fas fa-database',
        glowColor: 'rgba(99,102,241,0.12)',
        chip: 'border-indigo-500/25 text-indigo-300 bg-indigo-500/5',
        items: ['Nginx', 'Apache', 'PHP-FPM', 'WordPress', 'MariaDB', 'MySQL', 'PostgreSQL'],
    },
    {
        icon: 'fas fa-network-wired',
        glowColor: 'rgba(16,185,129,0.12)',
        chip: 'border-emerald-500/25 text-emerald-300 bg-emerald-500/5',
        items: ['TCP/IP', 'DNS', 'DHCP', 'Firewall', 'VLAN', 'WiFi', 'MikroTik', 'Cisco'],
    },
    {
        icon: 'fas fa-shield-halved',
        glowColor: 'rgba(244,63,94,0.12)',
        chip: 'border-rose-500/25 text-rose-300 bg-rose-500/5',
        items: ['CCTV Hikvision', 'Sistemas de alarma', 'Cableado estructurado Cat6'],
    },
    {
        icon: 'fas fa-cloud',
        glowColor: 'rgba(168,85,247,0.12)',
        chip: 'border-purple-500/25 text-purple-300 bg-purple-500/5',
        items: ['VPS IONOS', 'Docker', 'VirtualBox'],
    },
    {
        icon: 'fas fa-terminal',
        glowColor: 'rgba(251,191,36,0.12)',
        chip: 'border-amber-500/25 text-amber-300 bg-amber-500/5',
        items: ['Bash', 'PowerShell', 'Python', 'AnyDesk', 'MantisBT', 'Git'],
    },
];

export default function StackSection() {
    const { t } = useLang();
    return (
        <section id="stack" className="py-16 md:py-24 px-4 w-full bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i aria-hidden="true" className="fas fa-server mr-2" />{t.stack.kicker}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title">
                        {t.stack.title}
                    </h2>
                    <p className="text-slate-500 max-w-lg mt-6">
                        {t.stack.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STACK.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                        >
                            <SpotlightCard className="p-6 h-full" spotlightColor={group.glowColor}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-11 h-11 rounded-xl bg-slate-800/60 flex items-center justify-center border border-white/5">
                                        <i aria-hidden="true" className={`${group.icon} text-white/80`} />
                                    </div>
                                    <h3 className="text-base font-semibold text-white">{t.stack.categories[idx]}</h3>
                                </div>
                                <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                                    {group.items.map((item) => (
                                        <li
                                            key={item}
                                            className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${group.chip}`}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
