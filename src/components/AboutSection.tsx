import { motion } from 'motion/react';
import ShinyText from './reactbits/ShinyText';
import { cn } from '@/lib/utils';

export default function AboutSection() {
    return (
        <section id="about" className="py-32 px-4 w-full bg-slate-950 relative overflow-hidden">
            {/* Background Pattern: Tactical Xs and Os */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="max-w-7xl mx-auto z-10 relative">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Header: The Scout Report */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-12 mb-4"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Scouting</span> Report
                        </h2>
                        <div className="h-2 w-32 bg-amber-400 skew-x-[-20deg]"></div>
                    </motion.div>

                    {/* Bio Card: The "Player Bio" */}
                    <div className="md:col-span-8 bg-slate-900/80 border-l-4 border-amber-400 p-8 rounded-r-3xl backdrop-blur-md shadow-lg">
                        <h3 className="text-xl font-mono text-cyan-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                            <i className="fas fa-id-card"></i> Player Bio
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed mb-6 font-light">
                            <strong className="text-white">Fran Vidal</strong> is a versatile <strong className="text-cyan-400">Backcourt / SysAdmin</strong> hybrid.
                            Known for strong defense (Security/Infrastructure) and explosive attacks (Frontend/UX).
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed mb-8 font-light">
                            Currently training in the <strong className="text-amber-400">ASIR League</strong> (2nd Year).
                            Looking to sign with a team that values tactical intelligence and clean execution.
                        </p>

                        <a
                            href="./assets/docs/CV-FranVidal.pdf"
                            download
                            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider rounded-sm skew-x-[-10deg] transition-all"
                        >
                            <ShinyText
                                text="Download Stats (CV)"
                                disabled={false}
                                speed={3}
                                className="skew-x-[10deg]"
                                shineColor="#ffffff"
                            />
                            <i className="fas fa-download text-sm skew-x-[10deg]"></i>
                        </a>
                    </div>

                    {/* Location Card: "Home Court" */}
                    <div className="md:col-span-4 bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-700/50 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <i className="fas fa-map text-9xl text-white"></i>
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-3xl mb-4 font-bold border-4 border-slate-900">
                                <i className="fas fa-home"></i>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Home Court</h3>
                                <p className="text-3xl font-black text-white uppercase italic">Barbate</p>
                                <p className="text-sm text-slate-400 mt-1 font-mono">Cádiz, Spain</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <StatCard colSpan="md:col-span-4" label="XP Level" value="LVL 2" sub="ASIR Student" color="text-green-400" />
                    <StatCard colSpan="md:col-span-4" label="Role" value="Full Stack" sub="Offense & Defense" color="text-amber-400" />
                    <StatCard colSpan="md:col-span-4" label="Contract" value="Free Agent" sub="Open to Work" color="text-cyan-400" />

                </div>
            </div>
        </section>
    );
};

function StatCard({ colSpan, label, value, sub, color }: { colSpan: string, label: string, value: string, sub: string, color: string }) {
    return (
        <div className={cn(colSpan, "bg-slate-900/50 border border-slate-800 p-6 flex flex-col justify-center items-center text-center hover:bg-slate-800/80 transition-all rounded-xl")}>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">{label}</p>
            <p className={cn("text-4xl font-black italic uppercase", color)}>{value}</p>
            <p className="text-sm text-slate-400 font-mono mt-2">{sub}</p>
        </div>
    );
}
