import { cn } from '@/lib/utils';

export default function SetupSection() {
    const hardware = [
        { item: 'Monitor', detail: 'HP X24ih (144Hz IPS)', icon: 'fas fa-desktop' },
        { item: 'Keyboard', detail: 'Logitech G413 TKL SE', icon: 'fas fa-keyboard' },
        { item: 'Mouse', detail: 'Logitech G203 Lightsync', icon: 'fas fa-mouse' },
        { item: 'Headset', detail: 'Logitech G435', icon: 'fas fa-headphones' },
        { item: 'Mousepad', detail: 'Krom Knout XL RGB', icon: 'fas fa-square' },
        { item: 'Console', detail: 'Xbox Series S', icon: 'fab fa-xbox' },
    ];

    const pcSpecs = [
        { item: 'CPU', detail: 'AMD Ryzen 5 5600X', icon: 'fas fa-microchip' },
        { item: 'GPU', detail: 'NVIDIA RTX 4060 8GB', icon: 'fas fa-tv' },
        { item: 'RAM', detail: '32GB Corsair Vengeance 3600MHz', icon: 'fas fa-memory' },
        { item: 'Motherboard', detail: 'Gigabyte B550 Gaming X V2', icon: 'fas fa-chess-board' },
        { item: 'Case', detail: 'Nfortec Krater Tempered Glass', icon: 'fas fa-box' },
    ];

    return (
        <section id="setup" className="py-32 px-4 w-full bg-background relative">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 md:mb-24 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4 inline-block">
                        My Setup
                    </h2>
                    <div className="h-1.5 w-24 bg-cyan-500 rounded-full mt-2 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Peripherals */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-colors shadow-lg">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                            <i className="fas fa-gamepad"></i> Peripherals
                        </h3>
                        <ul className="space-y-4">
                            {hardware.map((hw, idx) => (
                                <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                                    <span className="flex items-center gap-3 text-slate-300">
                                        <i className={cn(hw.icon, "w-6 text-center text-slate-500")}></i>
                                        {hw.item}
                                    </span>
                                    <span className="text-slate-500 text-sm font-light text-right">{hw.detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PC Specs */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-colors shadow-lg">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                            <i className="fas fa-server"></i> PC Gaming / Workstation
                        </h3>
                        <ul className="space-y-4">
                            {pcSpecs.map((spec, idx) => (
                                <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                                    <span className="flex items-center gap-3 text-slate-300">
                                        <i className={cn(spec.icon, "w-6 text-center text-slate-500")}></i>
                                        {spec.item}
                                    </span>
                                    <span className="text-slate-500 text-sm font-light text-right">{spec.detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};


