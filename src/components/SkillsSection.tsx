import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const skills = [
    {
        category: 'Frontend', items: [
            { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400' },
            { name: 'React', icon: 'fab fa-react', color: 'text-cyan-400' },
        ]
    },
    {
        category: 'Backend & Systems', items: [
            { name: 'Linux', icon: 'fab fa-linux', color: 'text-white' },
            { name: 'Windows Server', icon: 'fab fa-windows', color: 'text-blue-400' },
            { name: 'SQL', icon: 'fas fa-database', color: 'text-green-400' },
            { name: 'Docker', icon: 'fab fa-docker', color: 'text-blue-500' },
        ]
    },
    {
        category: 'Tools', items: [
            { name: 'Git', icon: 'fab fa-git-alt', color: 'text-red-500' },
            { name: 'Network Admin', icon: 'fas fa-network-wired', color: 'text-purple-400' },
        ]
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-32 px-4 w-full bg-slate-950 relative overflow-hidden">
            {/* Court lines decoration */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/2 border-l-2 border-slate-800 opacity-30 skew-y-12 rounded-l-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 md:mb-24 flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-white px-4 border-l-8 border-cyan-500 uppercase italic">
                            Player Attributes
                        </h2>
                    </div>
                    <div className="hidden md:block text-slate-500 font-mono text-sm">
                        SEASON 2026 // DATA
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden hover:border-cyan-500/50 transition-all"
                        >
                            {/* Card Top Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

                            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider flex justify-between items-center">
                                {group.category}
                                <span className="text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded">Avg: 90+</span>
                            </h3>

                            <div className="space-y-4">
                                {group.items.map((skill, skillIdx) => (
                                    <div key={skillIdx} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <i className={cn(skill.icon, "text-xl w-6 text-center text-slate-400 group-hover:text-amber-400 transition-colors")}></i>
                                            <span className="text-sm font-bold text-slate-200 uppercase tracking-tight">{skill.name}</span>
                                        </div>
                                        {/* Progress Bar Style */}
                                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all duration-1000 w-[90%] bg-current", skill.color)}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


