import DecryptedText from './reactbits/DecryptedText';
import ScrollFloat from './reactbits/ScrollFloat';
import ShinyText from './reactbits/ShinyText';

const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 w-full bg-slate-900/50 relative">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        <DecryptedText
                            text="Sobre Mí"
                            animateOn="view"
                            revealDirection="start"
                            speed={70}
                            maxIterations={15}
                            className="text-cyan-400"
                            parentClassName="inline-block"
                            encryptedClassName="text-slate-700"
                        />
                    </h2>
                    <div className="h-1 w-20 bg-cyan-500 rounded-full mt-2 mx-auto md:mx-0"></div>
                </div>

                <ScrollFloat
                    animationDuration={0.8}
                    ease="back.out(1.5)"
                    stagger={0.1}
                    containerClassName="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                        <p>
                            ¡Hola! Soy <strong className="text-white">Fran Vidal</strong>, un apasionado de la tecnología y la administración de sistemas.
                            Actualmente estoy cursando el Grado Superior en <strong className="text-cyan-400">Administración de Sistemas Informáticos en Red (ASIR)</strong>.
                        </p>
                        <p>
                            Mi objetivo es combinar mis conocimientos en infraestructura y redes con el desarrollo web moderno para crear soluciones completas, seguras y escalables.
                            No solo me limito a administrar servidores; también disfruto diseñando interfaces intuitivas y funcionales.
                        </p>
                        <div className="pt-4">
                            <a
                                href="./assets/docs/CV-FranVidal.pdf"
                                download
                                className="inline-block group relative px-8 py-3 rounded-xl bg-indigo-600/20 border border-indigo-500/50 overflow-hidden transition-all hover:bg-indigo-600/30 hover:border-indigo-400"
                            >
                                <ShinyText
                                    text="Descargar CV"
                                    disabled={false}
                                    speed={3}
                                    className="font-medium text-indigo-300 group-hover:text-white transition-colors"
                                    shineColor="#ffffff"
                                />
                                <i className="fas fa-download ml-2 text-indigo-400 group-hover:text-white transition-colors"></i>
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl blur-2xl opacity-20"></div>
                        <div className="relative bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
                            <ul className="space-y-4">
                                {[
                                    { label: 'Ubicación', value: 'España, Barbate', icon: 'fas fa-map-marker-alt text-red-400' },
                                    { label: 'Estudios', value: 'ASIR (2º Año)', icon: 'fas fa-graduation-cap text-yellow-400' },
                                    { label: 'Intereses', value: 'DevOps, Cloud, Web Design', icon: 'fas fa-heart text-pink-400' },
                                    { label: 'Disponibilidad', value: 'Open to Work', icon: 'fas fa-briefcase text-green-400' },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                                            <i className={item.icon}></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</p>
                                            <p className="text-slate-200 font-medium">{item.value}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ScrollFloat>
            </div>
        </section>
    );
};

export default AboutSection;
