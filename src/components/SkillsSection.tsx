import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useSvglIcons } from '@/hooks/useSvglIcons';
import SpotlightCard from './reactbits/SpotlightCard';

interface Skill {
    name: string;
    svglName: string;
    level?: number; // 1-5
}

interface SkillGroup {
    category: string;
    icon: string;
    gradient: string;
    glowColor: string;
    items: Skill[];
}

const skills: SkillGroup[] = [
    {
        category: 'Frontend',
        icon: 'fas fa-code',
        gradient: 'from-cyan-500/20 to-blue-500/10',
        glowColor: 'rgba(34,211,238,0.15)',
        items: [
            { name: 'HTML5',      svglName: 'HTML5',      level: 4 },
            { name: 'CSS3',       svglName: 'CSS',         level: 4 },
            { name: 'JavaScript', svglName: 'JavaScript',  level: 3 },
            { name: 'React',      svglName: 'React',       level: 3 },
        ]
    },
    {
        category: 'Backend y Sistemas',
        icon: 'fas fa-server',
        gradient: 'from-blue-500/20 to-purple-500/10',
        glowColor: 'rgba(99,102,241,0.15)',
        items: [
            { name: 'Linux',          svglName: 'Linux',   level: 5 },
            { name: 'Windows Server', svglName: 'Windows', level: 4 },
            { name: 'SQL',            svglName: 'MySQL',   level: 3 },
            { name: 'Docker',         svglName: 'Docker',  level: 3 },
        ]
    },
    {
        category: 'Herramientas',
        icon: 'fas fa-toolbox',
        gradient: 'from-purple-500/20 to-pink-500/10',
        glowColor: 'rgba(168,85,247,0.15)',
        items: [
            { name: 'Git',   svglName: 'Git',    level: 4 },
            { name: 'Redes', svglName: '',       level: 4 },
            { name: 'Bash',  svglName: '',       level: 4 },
            { name: 'Python',svglName: 'Python', level: 3 },
        ]
    }
];

const allSvglNames = skills
    .flatMap((group) => group.items)
    .map((item) => item.svglName)
    .filter(Boolean);

const LEVEL_LABELS = ['', 'Básico', 'Básico', 'Intermedio', 'Avanzado', 'Experto'];
const LEVEL_COLORS = ['', 'bg-slate-500', 'bg-slate-500', 'bg-blue-500', 'bg-cyan-500', 'bg-green-500'];

export default function SkillsSection() {
    const stableNames = useMemo(() => allSvglNames, []);
    const { icons, loading } = useSvglIcons(stableNames);

    return (
        <section id="skills" className="py-16 md:py-24 px-4 w-full bg-slate-950 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/4 right-0 w-60 h-60 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i className="fas fa-microchip mr-2" />Stack técnico
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title">
                        Habilidades
                    </h2>
                    <p className="text-slate-500 max-w-lg mt-6">
                        Tecnologías y herramientas con las que trabajo a diario.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((group, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <SpotlightCard className="p-6 h-full" spotlightColor={group.glowColor}>
                                {/* Card header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center border border-white/5`}>
                                        <i className={`${group.icon} text-white/80`} />
                                    </div>
                                    <h3 className="text-base font-semibold text-white">{group.category}</h3>
                                </div>

                                {/* Skills list */}
                                <div className="space-y-4">
                                    {group.items.map((skill, skillIdx) => {
                                        const svgUrl = skill.svglName ? icons[skill.svglName] : null;
                                        const level = skill.level ?? 3;

                                        return (
                                            <motion.div
                                                key={skillIdx}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                                                className="group/skill"
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <div className="flex items-center gap-2.5">
                                                        {loading ? (
                                                            <div className="w-5 h-5 rounded bg-slate-700 animate-pulse" />
                                                        ) : svgUrl ? (
                                                            <img src={svgUrl} alt={skill.name} className="w-5 h-5 object-contain" />
                                                        ) : (
                                                            <span className="w-5 h-5 flex items-center justify-center text-slate-500 text-xs">
                                                                <i className="fas fa-terminal" />
                                                            </span>
                                                        )}
                                                        <span className="text-sm text-slate-300 group-hover/skill:text-white transition-colors font-medium">
                                                            {skill.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] text-slate-600 group-hover/skill:text-slate-500 transition-colors">
                                                        {LEVEL_LABELS[level]}
                                                    </span>
                                                </div>
                                                {/* Progress bar */}
                                                <div className="h-1 w-full bg-slate-700/60 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${(level / 5) * 100}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.8, delay: idx * 0.1 + skillIdx * 0.07, ease: 'easeOut' }}
                                                        className={`h-full rounded-full ${LEVEL_COLORS[level]}`}
                                                    />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
