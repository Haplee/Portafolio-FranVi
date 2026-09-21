import { useLang } from '@/i18n/LangProvider';
import SupportStepper from '@/components/ui/SupportStepper';

const REPO_RESOLVECORE = 'https://github.com/Haplee/ResolvCore';

export default function Opening() {
    const { t } = useLang();

    return (
        <section id="opening" className="section-major" aria-labelledby="opening-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://github.com/Haplee.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-accent shrink-0"
                                />
                                <div>
                                    <span className="label text-accent font-medium">
                                        {t.hero.location}
                                    </span>
                                </div>
                            </div>
                            <span className="font-mono text-fine text-fg-mute shrink-0">
                                {t.hero.discipline}
                            </span>
                        </div>

                        <h1 id="opening-title" className="text-s4 font-semibold text-fg tracking-tight">
                            Fran Vidal
                        </h1>
                        <p className="mt-2 text-s2 text-fg-dim font-light">
                            {t.hero.role}
                        </p>

                        <p className="mt-4 measure-tight text-s0 text-fg-dim font-light leading-relaxed">
                            {t.hero.lead}
                        </p>

                        <dl className="mt-6 m-0 space-y-2 border-t border-line pt-4">
                            {t.hero.specs.map((s) => (
                                <div key={s.k} className="border-b border-line/60 pb-1.5 flex justify-between gap-2">
                                    <dt className="font-mono text-fine text-fg-mute uppercase tracking-wider">{s.k}</dt>
                                    <dd className="m-0 font-mono text-fine text-fg text-right">{s.v}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center gap-4">
                            <a href="#work" className="link font-mono text-fine">
                                {t.hero.ctaWork} ↓
                            </a>
                            <a href="#skills" className="link font-mono text-fine">
                                {t.nav.skills} ↓
                            </a>
                            <a href="#contact" className="link font-mono text-fine">
                                {t.hero.ctaContact} ↓
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="p-5 sm:p-6 bg-ink-800 border border-line sticky top-24">
                            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                                <div>
                                    <span className="label text-accent font-medium">
                                        {t.work.featuredBadge}
                                    </span>
                                    <h3 className="mt-2 text-s1 font-semibold text-fg">
                                        {t.work.title}
                                    </h3>
                                </div>
                                <span className="font-mono text-fine text-fg-mute">
                                    {t.work.projectCode}
                                </span>
                            </div>

                            <p className="mt-3 measure text-s0 text-fg-dim font-light">
                                {t.work.oneLiner}
                            </p>

                            <SupportStepper flow={t.work.flow} labels={{
                                flowLabel: t.work.flowLabel,
                                flowInstruction: t.work.flowInstruction
                            }} />

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
            </div>
        </section>
    );
}