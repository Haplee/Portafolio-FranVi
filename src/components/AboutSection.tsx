import { motion } from 'motion/react';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';

export default function AboutSection() {
    return (
        <section id="about" className="py-32 px-4 w-full bg-background/50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto z-10 relative">

                {/* Header */}
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                        <DecryptedText
                            text="About Me"
                            animateOn="view"
                            revealDirection="start"
                            speed={70}
                            maxIterations={15}
                            className="text-primary"
                            parentClassName="inline-block"
                            encryptedClassName="text-muted-foreground"
                        />
                    </h2>
                    <div className="h-1.5 w-24 bg-primary rounded-full mt-2 mx-auto md:mx-0"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 text-muted-foreground leading-relaxed text-lg"
                    >
                        <p>
                            Hello! I'm <strong className="text-foreground">Fran Vidal</strong>, a technology enthusiast and System Administration student.
                            Currently pursuing my Higher Technician degree in <strong className="text-primary">Network Computer Systems Administration (ASIR)</strong>.
                        </p>
                        <p>
                            My goal is to combine my infrastructure and networking knowledge with modern web development to build complete, secure, and scalable solutions.
                            I don't just manage servers; I enjoy crafting intuitive and functional interfaces.
                        </p>

                        <div className="pt-6">
                            <a
                                href="./assets/docs/CV-FranVidal.pdf"
                                download
                                className="inline-block group relative px-8 py-3 rounded-full bg-primary/10 border border-primary/20 overflow-hidden transition-all hover:bg-primary/20 hover:border-primary/40"
                            >
                                <ShinyText
                                    text="Download CV"
                                    disabled={false}
                                    speed={3}
                                    className="font-medium text-primary group-hover:text-foreground transition-colors"
                                    shineColor="#ffffff"
                                />
                                <i className="fas fa-download ml-3 text-primary/70 group-hover:text-foreground transition-colors"></i>
                            </a>
                        </div>
                    </motion.div>

                    {/* Info Card / Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary via-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20"></div>

                        <div className="relative bg-card border border-border p-8 rounded-2xl shadow-xl backdrop-blur-sm">
                            <ul className="space-y-6">
                                <ListItem
                                    icon="fas fa-map-marker-alt"
                                    iconColor="text-red-400"
                                    label="Location"
                                    value="Barbate, Cádiz, Spain"
                                    highlight
                                />
                                <ListItem
                                    icon="fas fa-graduation-cap"
                                    iconColor="text-yellow-400"
                                    label="Education"
                                    value="ASIR (2nd Year)"
                                />
                                <ListItem
                                    icon="fas fa-heart"
                                    iconColor="text-pink-400"
                                    label="Interests"
                                    value="DevOps, Cloud, Web Design"
                                />
                                <ListItem
                                    icon="fas fa-briefcase"
                                    iconColor="text-green-400"
                                    label="Status"
                                    value="Open to Work"
                                />
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

function ListItem({ icon, iconColor, label, value, highlight = false }: { icon: string, iconColor: string, label: string, value: string, highlight?: boolean }) {
    return (
        <li className={`flex items-center gap-5 p-4 rounded-xl transition-colors ${highlight ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'}`}>
            <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 border border-border ${highlight ? 'shadow-[0_0_15px_rgba(34,211,238,0.3)]' : ''}`}>
                <i className={`${icon} ${iconColor} text-xl`}></i>
            </div>
            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">{label}</p>
                <p className={`font-medium text-lg ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
            </div>
        </li>
    );
}


