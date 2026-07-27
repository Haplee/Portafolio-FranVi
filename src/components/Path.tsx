import Reveal from './ui/Reveal';
import { useLang } from '@/i18n/LangProvider';

// De nueve eventos a cuatro. Fuera el nacimiento con hora, "compré este
// portátil" y "hice este portafolio". La FCT en Ingenia Market es trabajo real
// con las manos y aquí era una línea: ahora abre la lista y es la entrada más
// larga. Sección apretada a propósito — importa, pero no es la columna
// vertebral de la página.
export default function Path() {
    const { t } = useLang();

    return (
        <section id="path" className="bg-ink-800 py-normal px-6">
            <div className="mx-auto max-w-5xl">

                <Reveal>
                    <p className="label">{t.path.label}</p>
                    <h2 className="mt-5 text-s3 font-semibold">{t.path.title}</h2>
                </Reveal>

                <Reveal>
                    <ol className="mt-tight list-none m-0 p-0 border-t border-line">
                        {t.path.items.map((item) => (
                            <li
                                key={item.title}
                                className="grid gap-2 border-b border-line py-7 sm:grid-cols-12 sm:gap-8"
                            >
                                {/* La fecha vive fuera de la columna de texto:
                                    se escanea en vertical sin leer nada más. */}
                                <p className="sm:col-span-2 font-mono text-fine text-accent">{item.date}</p>

                                <div className="sm:col-span-10">
                                    <h3 className="text-s1 font-medium">{item.title}</h3>
                                    <p className="mt-1 font-mono text-fine text-fg-mute">{item.role}</p>
                                    <p className="mt-4 measure text-fg-dim">{item.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            </div>
        </section>
    );
}
