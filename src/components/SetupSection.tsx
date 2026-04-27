import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import SpotlightCard from './reactbits/SpotlightCard';

export default function SetupSection() {
    const laptop = [
        { item: 'CPU',      detail: 'AMD Ryzen 7 5800H',          icon: 'fas fa-microchip',  badge: 'AMD' },
        { item: 'GPU',      detail: 'NVIDIA RTX 3050 Ti 4GB',     icon: 'fas fa-tv',         badge: 'NVIDIA' },
        { item: 'RAM',      detail: '16 GB (8GB × 2)',             icon: 'fas fa-memory',     badge: '16 GB' },
        { item: 'SSD',      detail: '1 TB NVMe',                   icon: 'fas fa-hdd',        badge: '1 TB' },
        { item: 'HDD',      detail: '512 GB',                      icon: 'fas fa-hdd',        badge: '512 GB' },
        { item: 'Pantalla', detail: '16.1″ FHD 144 Hz',           icon: 'fas fa-desktop',    badge: '144 Hz' },
    ];

    const peripherals = [
        { item: 'Teclado',     detail: 'Ajazz AK820 Pro',                 icon: 'fas fa-keyboard', badge: 'Mech' },
        { item: 'Ratón',       detail: 'Ajazz AJ199 White Carbon Fiber',  icon: 'fas fa-mouse',    badge: 'Carbon' },
        { item: 'Auriculares', detail: 'HyperX Cloud Stinger Core',       icon: 'fas fa-headphones',badge: 'HyperX' },
        { item: 'Alfombrilla', detail: 'TitanWolf 900 × 400',             icon: 'fas fa-square',   badge: 'XL' },
    ];

    const software = [
        { item: 'SO',       detail: 'Windows 11 + WSL2 (Ubuntu)',  icon: 'fab fa-linux' },
        { item: 'Editor',   detail: 'VS Code',                      icon: 'fas fa-code' },
        { item: 'Terminal', detail: 'Zsh + Oh My Posh',            icon: 'fas fa-terminal' },
        { item: 'Shell',    detail: 'Bash / PowerShell',            icon: 'fas fa-hashtag' },
    ];

    return (
        <section id="setup" className="py-16 md:py-24 px-4 w-full bg-slate-950 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i className="fas fa-laptop mr-2" />Hardware & Software
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title">
                        Mi Setup
                    </h2>
                    <p className="text-slate-500 max-w-lg mt-6">
                        El equipo y herramientas con los que trabajo cada día.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Laptop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SpotlightCard className="h-full p-6" spotlightColor="rgba(34,211,238,0.10)">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center border border-cyan-500/15 p-3">
                                    <i className="fas fa-laptop text-2xl text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">HP Victus 16</h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                                        Portátil Gaming
                                    </p>
                                </div>
                            </div>
                            <ul className="space-y-2.5">
                                {laptop.map((spec, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0 group"
                                    >
                                        <span className="flex items-center gap-3 text-slate-300 text-sm">
                                            <span className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                                <i className={cn(spec.icon, 'text-xs text-cyan-400/70 group-hover:text-cyan-400 transition-colors')} />
                                            </span>
                                            {spec.item}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400 font-mono hidden sm:block">
                                                {spec.badge}
                                            </span>
                                            <span className="text-sm text-slate-500">{spec.detail}</span>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </SpotlightCard>
                    </motion.div>

                    {/* Peripherals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <SpotlightCard className="h-full p-6" spotlightColor="rgba(168,85,247,0.10)">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center border border-purple-500/15 p-3">
                                    <i className="fas fa-gamepad text-2xl text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Periféricos</h3>
                                    <p className="text-xs text-slate-500">Equipamiento de trabajo</p>
                                </div>
                            </div>
                            <ul className="space-y-2.5">
                                {peripherals.map((hw, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0 group"
                                    >
                                        <span className="flex items-center gap-3 text-slate-300 text-sm">
                                            <span className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                                                <i className={cn(hw.icon, 'text-xs text-purple-400/70 group-hover:text-purple-400 transition-colors')} />
                                            </span>
                                            {hw.item}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400 font-mono hidden sm:block">
                                                {hw.badge}
                                            </span>
                                            <span className="text-sm text-slate-500">{hw.detail}</span>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </SpotlightCard>
                    </motion.div>
                </div>

                {/* Software row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <SpotlightCard className="p-6" spotlightColor="rgba(34,211,238,0.06)">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/15">
                                <i className="fas fa-terminal text-emerald-400 text-sm" />
                            </div>
                            <h3 className="text-base font-semibold text-white">Software</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {software.map((sw, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all group">
                                    <i className={cn(sw.icon, 'text-emerald-400/70 group-hover:text-emerald-400 transition-colors')} />
                                    <div>
                                        <p className="text-xs text-slate-500">{sw.item}</p>
                                        <p className="text-sm text-slate-300 font-medium">{sw.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>
                </motion.div>
            </div>
        </section>
    );
}
