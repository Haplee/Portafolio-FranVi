import SpotlightCard from './reactbits/SpotlightCard';
import DecryptedText from './reactbits/DecryptedText';
import { cn } from '@/lib/utils';

const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
    { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400' },
    { name: 'React', icon: 'fab fa-react', color: 'text-cyan-400' },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'text-red-500' },
    { name: 'Linux', icon: 'fab fa-linux', color: 'text-white' },
    { name: 'Windows Server', icon: 'fab fa-windows', color: 'text-blue-400' },
    { name: 'Docker', icon: 'fab fa-docker', color: 'text-blue-500' },
    { name: 'SQL', icon: 'fas fa-database', color: 'text-green-400' },
    { name: 'Network Admin', icon: 'fas fa-network-wired', color: 'text-purple-400' },
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-32 px-4 w-full bg-background relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16 md:mb-24 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 inline-block">
                        <DecryptedText
                            text="Technical Skills"
                            animateOn="view"
                            revealDirection="center"
                            speed={50}
                            maxIterations={10}
                            className="text-foreground"
                            encryptedClassName="text-muted-foreground"
                        />
                    </h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-indigo-500 rounded-full mt-2 mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {skills.map((skill, index) => (
                        <SpotlightCard
                            key={index}
                            className="flex flex-col items-center justify-center p-6 gap-4 bg-card border-border hover:border-primary/50 transition-colors group cursor-default shadow-sm"
                            spotlightColor="rgba(34, 211, 238, 0.15)"
                        >
                            <i className={cn(skill.icon, "text-5xl transition-transform duration-300 group-hover:scale-110 drop-shadow-md", skill.color)}></i>
                            <span className="text-muted-foreground font-medium tracking-wide group-hover:text-foreground transition-colors">{skill.name}</span>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};


