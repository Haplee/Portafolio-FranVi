import SectionHeader from '@/components/ui/SectionHeader';
import SupportStepper from '@/components/ui/SupportStepper';
import { useLang } from '@/i18n/LangProvider';

const REPO_RESOLVECORE = 'https://github.com/Haplee/ResolvCore';
const n = (i: number) => String(i + 1).padStart(2, '0');

export default function ResolveCore() {
    const { t } = useLang();

    return (
        <section id="work" className="section-major" aria-labelledby="work-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    id="work-title"
                    label={t.work.featuredBadge}
                    title={t.work.title}
                    subtitle={t.work.oneLiner}
                    badge={t.work.projectCode}
                />

                <p className="mt-4 measure text-s1 text-fg-dim font-light">
                    {t.work.problem}
                </p>

                <SupportStepper flow={t.work.flow} labels={{
                    flowLabel: t.work.flowLabel,
                    flowInstruction: t.work.flowInstruction
                }} />

                <div className="mt-8 grid gap-8 lg:grid-cols-12 border-t border-line pt-6">
                    <div className="lg:col-span-7">
                        <p className="label mb-4">{t.work.decisionsLabel}</p>
                        <ol className="list-none m-0 p-0 space-y-6">
                            {t.work.decisions.map((d, i) => (
                                <li key={d.title} className="grid grid-cols-[2rem_1fr] gap-2">
                                    <span className="font-mono text-fine text-accent pt-1">{n(i)}</span>
                                    <div>
                                        <h4 className="text-s0 font-medium text-fg">{d.title}</h4>
                                        <p className="mt-1.5 text-fine text-fg-dim leading-relaxed">{d.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="lg:col-span-5">
                        <p className="label mb-4">{t.work.infraLabel}</p>
                        <dl className="m-0 border-t border-line">
                            {t.work.infra.map((row) => (
                                <div
                                    key={row.k}
                                    className="flex items-baseline justify-between gap-4 border-b border-line py-2"
                                >
                                    <dt className="font-mono text-fine text-fg-mute shrink-0">{row.k}</dt>
                                    <dd className="m-0 font-mono text-fine text-fg text-right">{row.v}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-5">
                            <a
                                href={REPO_RESOLVECORE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link text-fine font-mono inline-block"
                            >
                                {t.work.repoCta}
                                <span className="sr-only"> {t.work.newTab}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}