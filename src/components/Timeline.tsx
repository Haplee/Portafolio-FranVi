import { useLang } from '@/i18n/LangProvider';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Timeline() {
    const { t } = useLang();

    return (
        <section id="path" className="section-tight" aria-labelledby="path-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    id="path-title"
                    label={t.path.label}
                    title={t.path.title}
                />

                <ol className="mt-6 list-none m-0 p-0 space-y-8 border-t border-line pt-4">
                    {t.path.items.map((item) => (
                        <li
                            key={item.title}
                            className="relative pl-8 sm:pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-line sm:before:left-4"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                                <span className="font-mono text-fine text-accent">
                                    {item.date}
                                </span>
                                <span className="font-mono text-fine text-fg-mute">
                                    {item.role}
                                </span>
                            </div>
                            <h3 className="text-s0 font-medium text-fg">{item.title}</h3>
                            <p className="mt-2 text-fine text-fg-dim leading-relaxed">{item.body}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-8 pt-6 border-t border-line font-mono text-fine text-fg-mute">
                    <p>{t.path.currentStatus}</p>
                </div>
            </div>
        </section>
    );
}