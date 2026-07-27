import Reveal from './ui/Reveal';
import { useLang } from '@/i18n/LangProvider';

// Antes esto eran dos secciones (Skills y Stack) que repetían Linux, Windows
// Server, Docker, Bash, PowerShell, Python y Git, más barras de nivel
// autoevaluadas. Un junior declarándose "Linux 5/5 · 5 años" se lee como
// bandera roja; "Linux — servidor de ResolveCore" se lee como evidencia.
// De ahí la forma: no es una rejilla de tarjetas, es una ficha técnica.
export default function Competencies() {
    const { t } = useLang();

    return (
        <section id="skills" className="py-loose px-6">
            <div className="mx-auto max-w-5xl">

                <Reveal>
                    <p className="label">{t.skills.label}</p>
                    <h2 className="mt-5 text-s3 font-semibold">{t.skills.title}</h2>
                    <p className="mt-5 measure text-fg-dim">{t.skills.intro}</p>
                </Reveal>

                <div className="mt-normal space-y-normal">
                    {t.skills.groups.map((g, gi) => (
                        <Reveal key={g.category} delay={gi * 0.05}>
                            <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
                                {/* La categoría hace de rótulo al margen, no de
                                    cabecera de tarjeta: el contenido manda. */}
                                <h3 className="lg:col-span-3 text-s1 font-medium text-fg-dim">
                                    {g.category}
                                </h3>

                                <ul className="lg:col-span-9 list-none m-0 p-0 border-t border-line">
                                    {g.items.map((item) => (
                                        <li
                                            key={item.name}
                                            className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-12 sm:gap-6"
                                        >
                                            <span className="sm:col-span-5 font-mono text-fine text-fg">
                                                {item.name}
                                            </span>
                                            <span className="sm:col-span-7 text-fine text-fg-mute">
                                                {item.where}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
