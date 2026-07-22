import { motion } from 'motion/react';

const ITEMS = [
    {
        date:  '17 Jul 2003 · 03:00 AM',
        title: 'Primer destello ♋',
        desc:  'Nacido bajo el signo de Cáncer en Barbate, Cádiz. El cielo aquella madrugada mostraba el Triángulo de Verano sobre el Atlántico. La misma constelación que ves en este portfolio.',
        icon:  '⭐',
        accent: 'from-amber-500/20 to-amber-500/5',
        border: 'border-amber-500/30',
        dot:    'bg-amber-400',
        text:   'text-amber-400',
    },
    {
        date:  '2021',
        title: 'ASIR comienza',
        desc:  'Inicio de Administración de Sistemas Informáticos en Red. Linux, redes, Active Directory, servidores — el comienzo de la carrera técnica.',
        icon:  '🖥️',
        accent: 'from-cyan-500/15 to-cyan-500/5',
        border: 'border-cyan-500/25',
        dot:    'bg-cyan-400',
        text:   'text-cyan-400',
    },
    {
        date:  '2022',
        title: 'Primeros proyectos',
        desc:  'HTML, CSS, JavaScript. Las primeras páginas, los primeros bugs, las primeras victorias. Bash y Python para automatizar sistemas.',
        icon:  '💻',
        accent: 'from-blue-500/15 to-blue-500/5',
        border: 'border-blue-500/25',
        dot:    'bg-blue-400',
        text:   'text-blue-400',
    },
    {
        date:  '2023',
        title: 'GitHub: Haplee',
        desc:  'Primer repositorio público. Docker, Python, React — cada commit un paso adelante. La comunidad open source como escuela continua.',
        icon:  '🐙',
        accent: 'from-purple-500/15 to-purple-500/5',
        border: 'border-purple-500/25',
        dot:    'bg-purple-400',
        text:   'text-purple-400',
    },
    {
        date:  '2024',
        title: 'Sysadmin + Dev stack',
        desc:  'HP Victus 16, RTX 3050 Ti, WSL2 + Ubuntu, Zsh + Oh My Posh. Setup definitivo para administrar sistemas y desarrollar en paralelo.',
        icon:  '⚡',
        accent: 'from-green-500/15 to-green-500/5',
        border: 'border-green-500/25',
        dot:    'bg-green-400',
        text:   'text-green-400',
    },
    {
        date:  '2025',
        title: 'Este portfolio',
        desc:  'React · TypeScript · Three.js. La constelación del 17 de julio de 2003, hora 3:00 AM, renderizada en 3D. Disponible para trabajar.',
        icon:  '🚀',
        accent: 'from-cyan-500/20 to-blue-500/10',
        border: 'border-cyan-500/40',
        dot:    'bg-cyan-400 ring-2 ring-cyan-400/30',
        text:   'text-cyan-400',
    },
    {
        date:  '2026',
        title: 'Prácticas en Ingenia Market',
        desc:  'FCT en Chiclana: cableado estructurado Cat6, switches y WiFi con MikroTik y Cisco, CCTV Hikvision con acceso remoto, sistemas de alarma y soporte de incidencias en cliente.',
        icon:  '🔧',
        accent: 'from-blue-500/15 to-blue-500/5',
        border: 'border-blue-500/25',
        dot:    'bg-blue-400',
        text:   'text-blue-400',
    },
    {
        date:  '2026',
        title: 'Titulado en ASIR',
        desc:  'Obtengo el título de Técnico Superior en Administración de Sistemas Informáticos en Red. El B1 de inglés sigue en curso.',
        icon:  '🎓',
        accent: 'from-cyan-500/20 to-blue-500/10',
        border: 'border-cyan-500/40',
        dot:    'bg-cyan-400 ring-2 ring-cyan-400/30',
        text:   'text-cyan-400',
        current: true,
    },
    {
        date:  'Próximo',
        title: 'Ejército de Tierra',
        desc:  'Siguiente paso: alistamiento en el Ejército de Tierra español. Una nueva etapa de disciplina, servicio y crecimiento.',
        icon:  '🎖️',
        accent: 'from-green-500/15 to-green-500/5',
        border: 'border-green-500/25',
        dot:    'bg-green-400',
        text:   'text-green-400',
    },
] as const;

export default function TimelineSection() {
    return (
        <section id="timeline" className="py-16 md:py-24 px-4 w-full bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-500/3 blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="text-xs font-semibold text-amber-500 uppercase tracking-[0.2em] mb-3 block">
                        ♋ Historia
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white section-title">
                        Mi Trayectoria
                    </h2>
                    <p className="text-slate-500 mt-6 max-w-lg">
                        Desde el cielo de Barbate hasta el código. Cada año, un capítulo.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical connecting line */}
                    <div
                        className="absolute left-[7px] top-2 bottom-2 w-px md:left-1/2 md:-translate-x-px"
                        style={{ background: 'linear-gradient(to bottom, rgba(251,191,36,0.5), rgba(34,211,238,0.3), transparent)' }}
                    />

                    <div className="space-y-10">
                        {ITEMS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.5 }}
                                className={`relative flex items-start gap-6 md:gap-0 ${
                                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* Dot */}
                                <div className={`
                                    relative z-10 flex-shrink-0 w-4 h-4 rounded-full mt-5
                                    md:absolute md:left-1/2 md:-translate-x-1/2 md:mt-5
                                    ${item.dot}
                                `} />

                                {/* Card */}
                                <div className={`
                                    flex-1 ml-8 md:ml-0
                                    md:w-[calc(50%-2.5rem)]
                                    ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}
                                `}>
                                    <div className={`
                                        p-5 rounded-2xl glass-card
                                        bg-gradient-to-br ${item.accent}
                                        border ${item.border}
                                        hover:border-opacity-60 transition-all duration-300
                                    `}>
                                        <div className="flex items-start gap-3 mb-2">
                                            <span className="text-2xl leading-none mt-0.5">{item.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <span className={`text-xs font-mono font-bold ${item.text} tracking-wider`}>
                                                        {item.date}
                                                    </span>
                                                    {'current' in item && item.current && (
                                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] text-cyan-400 font-semibold">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                                            ahora
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-base font-bold text-white">{item.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed pl-9">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
