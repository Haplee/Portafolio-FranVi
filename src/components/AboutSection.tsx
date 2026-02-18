import { motion } from 'motion/react';

export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-4 w-full bg-slate-900">
            <div className="max-w-6xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Sobre mí</h2>
                    <div className="h-1 w-16 bg-cyan-500 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-8"
                    >
                        <p className="text-lg text-slate-300 leading-relaxed mb-4">
                            Soy <strong className="text-white">Fran Vidal</strong>, estudiante de 2º curso del Grado Superior de
                            Administración de Sistemas Informáticos en Red (ASIR).
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            Me apasiona la tecnología, la administración de sistemas y el desarrollo web.
                            Busco oportunidades donde pueda seguir aprendiendo y aportar valor con mis conocimientos.
                        </p>
                        <a
                            href="./assets/docs/CV-FranVidal.pdf"
                            download
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors"
                        >
                            <i className="fas fa-download text-sm" />
                            Descargar CV
                        </a>
                    </motion.div>

                    {/* Info rápida */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <InfoCard icon="fas fa-map-marker-alt" label="Ubicación" value="Barbate, Cádiz" />
                        <InfoCard icon="fas fa-graduation-cap" label="Formación" value="ASIR — 2º Curso" />
                        <InfoCard icon="fas fa-briefcase" label="Estado" value="Disponible para trabajar" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-1">
                <i className={`${icon} text-cyan-400`} />
                <span className="text-sm text-slate-400">{label}</span>
            </div>
            <p className="text-white font-semibold ml-7">{value}</p>
        </div>
    );
}
