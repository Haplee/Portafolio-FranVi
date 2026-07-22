import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useGitHubContributions } from '@/hooks/useGitHubContributions';

const LEVEL_COLORS = [
    'bg-slate-800/60',
    'bg-cyan-900/70',
    'bg-cyan-700/80',
    'bg-cyan-500/90',
    'bg-cyan-400',
];

const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const DAYS_ES = ['', 'Lun', '', 'Mié', '', 'Vie', ''];

export default function ContributionGraph({ username }: { username: string }) {
    const { days, total, loading, error } = useGitHubContributions(username);
    const [hovered, setHovered] = useState<ContribTooltip | null>(null);

    // Build grid: 53 weeks × 7 days
    const grid = useMemo(() => {
        if (days.length === 0) return [];
        const weeks: ContribDay[][] = [];
        let week: ContribDay[] = [];
        for (const day of days) {
            week.push(day);
            const date = new Date(day.date);
            if (date.getDay() === 6) {
                weeks.push(week);
                week = [];
            }
        }
        if (week.length > 0) weeks.push(week);
        return weeks;
    }, [days]);

    if (error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hologram-card p-5 md:p-6 rounded-2xl border border-slate-700/40 relative"
        >
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <i aria-hidden="true" className="fas fa-fire text-amber-400" />
                        Contribuciones último año
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {loading ? 'Cargando…' : (
                            <>
                                <span className="text-cyan-400 font-mono font-bold">{total}</span> commits en GitHub @{username}
                            </>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span>menos</span>
                    {LEVEL_COLORS.map((c, i) => (
                        <span key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                    ))}
                    <span>más</span>
                </div>
            </div>

            <div className="relative">
                {loading ? (
                    <div className="h-32 rounded-xl bg-slate-800/30 animate-pulse" />
                ) : (
                    <div className="overflow-x-auto pb-2">
                        <div className="inline-flex gap-[3px] min-w-full">
                            {/* Day labels column */}
                            <div className="flex flex-col gap-[3px] pr-2 text-[9px] text-slate-600 justify-around">
                                {DAYS_ES.map((d, i) => (
                                    <span key={i} className="h-2.5 leading-none">{d}</span>
                                ))}
                            </div>

                            {/* Weeks */}
                            {grid.map((week, wi) => (
                                <div key={wi} className="flex flex-col gap-[3px]">
                                    {week.map((day) => (
                                        <button
                                            key={day.date}
                                            onMouseEnter={() => setHovered({ date: day.date, count: day.count })}
                                            onMouseLeave={() => setHovered(null)}
                                            className={`
                                                w-2.5 h-2.5 rounded-sm cursor-pointer transition-transform hover:scale-150
                                                ${LEVEL_COLORS[day.level]}
                                            `}
                                            aria-label={`${day.count} contribuciones el ${day.date}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tooltip */}
                {hovered && (
                    <div className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs pointer-events-none shadow-lg z-10">
                        <p className="text-white font-mono">{hovered.date}</p>
                        <p className="text-cyan-400">
                            {hovered.count === 0 ? 'Sin commits' : `${hovered.count} commit${hovered.count !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                )}
            </div>

            {/* Month labels */}
            {!loading && (
                <div className="hidden sm:flex justify-between mt-2 pl-7 pr-1 text-[9px] text-slate-600 font-mono">
                    {MONTHS_ES.map((m) => <span key={m}>{m}</span>)}
                </div>
            )}
        </motion.div>
    );
}

interface ContribTooltip { date: string; count: number; }
interface ContribDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; }
