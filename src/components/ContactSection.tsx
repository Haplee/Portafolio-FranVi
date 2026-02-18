import GradientText from './reactbits/GradientText';

const ContactSection = () => {
    const socials = [
        { name: 'Email', icon: 'fas fa-envelope', link: 'mailto:franvidal2004@gmail.com', color: 'hover:text-red-400' },
        { name: 'LinkedIn', icon: 'fab fa-linkedin', link: 'https://linkedin.com/in/fran-vidal-leal', color: 'hover:text-blue-500' },
        { name: 'GitHub', icon: 'fab fa-github', link: 'https://github.com/FranVi-Asir', color: 'hover:text-white' },
        { name: 'Instagram', icon: 'fab fa-instagram', link: 'https://instagram.com/franvi_7', color: 'hover:text-pink-500' },
    ];

    return (
        <section id="contact" className="py-24 px-4 w-full bg-slate-900/50 relative">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-12">
                    <GradientText
                        colors={['#22d3ee', '#818cf8', '#f472b6', '#22d3ee']}
                        animationSpeed={6}
                        showBorder={false}
                        className="text-4xl md:text-6xl font-bold mb-6 block"
                    >
                        Contacto
                    </GradientText>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        ¿Tienes alguna propuesta o proyecto en mente? ¡Hablemos!
                        Estoy siempre dispuesto a conectar y explorar nuevas oportunidades.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {socials.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center gap-3 group`}
                            aria-label={social.name}
                        >
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-3xl md:text-4xl text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:border-slate-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${social.color}`}>
                                <i className={social.icon}></i>
                            </div>
                            <span className="text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
