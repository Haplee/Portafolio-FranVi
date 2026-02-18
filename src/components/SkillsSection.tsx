import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const skills = [
    {
        category: 'Frontend',
        items: [
            { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400' },
            { name: 'React', icon: 'fab fa-react', color: 'text-cyan-400' },
        ]
    },
    {
        category: 'Backend y Sistemas',
        items: [
            { name: 'Linux', icon: 'fab fa-linux', color: 'text-white' },
            { name: 'Windows Server', icon: 'fab fa-windows', color: 'text-blue-400' },
            { name: 'SQL', icon: 'fas fa-database', color: 'text-green-400' },
            { name: 'Docker', icon: 'fab fa-docker', color: 'text-blue-500' },
        ]
    },
    {
        category: 'Herramientas',
        items: [
            { name: 'Git', icon: 'fab fa-git-alt', color: 'text-red-500' },
            { name: 'Redes', icon: 'fas fa-network-wired', color: 'text-purple-400' },
        ]
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-24 px-4 w-full bg-slate-950">
            <div className="max-w-6xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Habilidades</h2>
                    <div className="h-1 w-16 bg-cyan-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
                        >
                            <h3 className="text-lg font-semibold text-white mb-5">{group.category}</h3>
                            <div className="space-y-3">
                                {group.items.map((skill, skillIdx) => (
                                    <div key={skillIdx} className="flex items-center gap-3 group">
                                        <i className={cn(skill.icon, 'text-xl w-6 text-center', skill.color)} />
                                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
