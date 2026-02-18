import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function SetupSection() {
    const laptop = [
        { item: 'CPU', detail: 'AMD Ryzen 7 5800H', icon: 'fas fa-microchip' },
        { item: 'GPU', detail: 'NVIDIA RTX 3050 Ti 4GB', icon: 'fas fa-tv' },
        { item: 'RAM', detail: '16 GB (8GB x2)', icon: 'fas fa-memory' },
        { item: 'SSD', detail: '1 TB', icon: 'fas fa-hdd' },
        { item: 'HDD', detail: '512 GB', icon: 'fas fa-hdd' },
        { item: 'Pantalla', detail: '16.1" 144Hz', icon: 'fas fa-desktop' },
    ];

    const peripherals = [
        { item: 'Teclado', detail: 'Ajazz AK820Pro', icon: 'fas fa-keyboard' },
        { item: 'Ratón', detail: 'Ajazz AJ199 White Carbon Fiber', icon: 'fas fa-mouse' },
        { item: 'Auriculares', detail: 'HyperX Cloud Stinger Core', icon: 'fas fa-headphones' },
        { item: 'Alfombrilla', detail: 'TitanWolf 900×400', icon: 'fas fa-square' },
    ];

    return (
        <section id="setup" className="py-24 px-4 w-full bg-slate-950">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Mi Setup</h2>
                    <div className="h-1 w-16 bg-cyan-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Portátil */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
                    >
                        <h3 className="text-xl font-semibold text-cyan-400 mb-5 flex items-center gap-2">
                            <i className="fas fa-laptop" /> HP Victus 16
                        </h3>
                        <ul className="space-y-3">
                            {laptop.map((spec, idx) => (
                                <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-2.5 last:border-0 last:pb-0">
                                    <span className="flex items-center gap-3 text-slate-300">
                                        <i className={cn(spec.icon, 'w-5 text-center text-slate-500')} />
                                        {spec.item}
                                    </span>
                                    <span className="text-slate-500 text-sm">{spec.detail}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Periféricos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
                    >
                        <h3 className="text-xl font-semibold text-cyan-400 mb-5 flex items-center gap-2">
                            <i className="fas fa-gamepad" /> Periféricos
                        </h3>
                        <ul className="space-y-3">
                            {peripherals.map((hw, idx) => (
                                <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-2.5 last:border-0 last:pb-0">
                                    <span className="flex items-center gap-3 text-slate-300">
                                        <i className={cn(hw.icon, 'w-5 text-center text-slate-500')} />
                                        {hw.item}
                                    </span>
                                    <span className="text-slate-500 text-sm">{hw.detail}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
