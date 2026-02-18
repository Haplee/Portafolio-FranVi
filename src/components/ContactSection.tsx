import GradientText from './reactbits/GradientText';
import { cn } from '@/lib/utils';

export default function ContactSection() {
    const socials = [
        { name: 'Email', icon: 'fas fa-envelope', link: 'mailto:franvidal2004@gmail.com', color: 'hover:text-red-400' },
        { name: 'LinkedIn', icon: 'fab fa-linkedin', link: 'https://linkedin.com/in/fran-vidal-leal', color: 'hover:text-blue-500' },
        { name: 'GitHub', icon: 'fab fa-github', link: 'https://github.com/FranVi-Asir', color: 'hover:text-foreground' },
        { name: 'Instagram', icon: 'fab fa-instagram', link: 'https://instagram.com/franvi_7', color: 'hover:text-pink-500' },
    ];

    return (
        <section id="contact" className="py-32 px-4 w-full bg-background relative">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-16">
                    <GradientText
                        colors={['#22d3ee', '#818cf8', '#f472b6', '#22d3ee']}
                        animationSpeed={6}
                        showBorder={false}
                        className="text-4xl md:text-6xl font-bold mb-6 block"
                    >
                        Get In Touch
                    </GradientText>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Do you have a proposal or project in mind? Let's talk!
                        I am always open to connecting and exploring new opportunities.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {socials.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 group"
                            aria-label={social.name}
                        >
                            <div className={cn(
                                "w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border-2 border-border flex items-center justify-center text-3xl md:text-4xl text-muted-foreground transition-all duration-300",
                                "group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
                                social.color
                            )}>
                                <i className={social.icon}></i>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};


