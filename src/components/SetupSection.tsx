import DecryptedText from './reactbits/DecryptedText';

export default function SetupSection() {
    const hardware = [
        { item: 'Monitor', detail: 'HP X24ih (144Hz IPS)', icon: 'fas fa-desktop' },
        { item: 'Teclado', detail: 'Logitech G413 TKL SE', icon: 'fas fa-keyboard' },
        { item: 'Ratón', detail: 'Logitech G203 Lightsync', icon: 'fas fa-mouse' },
        { item: 'Auriculares', detail: 'Logitech G435', icon: 'fas fa-headphones' },
        { item: 'Alfombrilla', detail: 'Krom Knout XL RGB', icon: 'fas fa-square' },
        { item: 'Consola', detail: 'Xbox Series S', icon: 'fab fa-xbox' },
    ];

    const pcSpecs = [
        { item: 'CPU', detail: 'AMD Ryzen 5 5600X', icon: 'fas fa-microchip' },
        { item: 'GPU', detail: 'NVIDIA RTX 4060 8GB', icon: 'fas fa-tv' },
        { item: 'RAM', detail: '32GB Corsair Vengeance 3600MHz', icon: 'fas fa-memory' },
        { item: 'Placa Base', detail: 'Gigabyte B550 Gaming X V2', icon: 'fas fa-chess-board' },
        { item: 'Caja', detail: 'Nfortec Krater Vidrio Templado', icon: 'fas fa-box' },
    ];

    return (
        <section id="setup" className="py-24 px-4 w-full bg-slate-900 relative">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 inline-block">
                        <DecryptedText
                            text="Mi Setup"
                            animateOn="view"
                            revealDirection="end"
                            speed={80}
                            maxIterations={15}
                            className="text-white"
                            encryptedClassName="text-slate-600"
                        />
                    </h2>
                    <div className="h-1 w-24 bg-teal-500 rounded-full mt-4 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Peripherals */}
                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-teal-500/30 transition-colors">
                        <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-3">
                            <i className="fas fa-gamepad"></i> Periféricos
                        </h3>
                        <ul className="space-y-4">
                            {hardware.map((hw, idx) => (
                                <li key={idx} className="flex items-center justify-between border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
                                    <span className="flex items-center gap-3 text-slate-300">
                                        <i className={`${hw.icon} w-6 text-center text-slate-500`}></i>
                                        {hw.item}
                                    </span>
                                    <span className="text-slate-400 text-sm font-light text-right">{hw.detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PC Specs */}
                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm hover:border-teal-500/30 transition-colors">
                        <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-3">
                            <i className="fas fa-server"></i> PC Gaming / Workstation
                        </h3>
                        <ul className="space-y-4">
                            {pcSpecs.map((spec, idx) => (
                                <li key={idx} className="flex items-center justify-between border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
                                    <span className="flex items-center gap-3 text-slate-300">
                                        <i className={`${spec.icon} w-6 text-center text-slate-500`}></i>
                                        {spec.item}
                                    </span>
                                    <span className="text-slate-400 text-sm font-light text-right">{spec.detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};


