import { useLang } from '@/i18n/LangProvider';
import SectionHeader from '@/components/ui/SectionHeader';

interface SkillItem {
    name: string;
    where: string;
}

export default function Competencies() {
    const { t } = useLang();

    return (
        <section id="skills" className="section-normal" aria-labelledby="skills-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    id="skills-title"
                    label={t.skills.label}
                    title={t.skills.title}
                    subtitle={t.skills.intro}
                />

                <div className="mt-10 space-y-10">
                    {t.skills.groups.map((g) => (
                        <div key={g.category} className="border-t border-line pt-6">
                            <h3 className="font-mono text-fine text-accent uppercase tracking-wider mb-4">
                                {g.category}
                            </h3>
                            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {g.items.map((item: SkillItem) => (
                                    <div key={item.name} className="border border-line p-4 bg-ink-700/30 hover:border-line-strong transition-colors group">
                                        <dt className="font-mono text-fine text-fg mb-2">{item.name}</dt>
                                        <dd className="m-0 text-fine text-fg-dim leading-relaxed">{item.where}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}