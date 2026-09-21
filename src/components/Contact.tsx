import { useLang } from '@/i18n/LangProvider';
import SectionHeader from '@/components/ui/SectionHeader';

const LINKEDIN = 'https://linkedin.com/in/franciscovidal-mateo-2b8a4a238';
const GITHUB = 'https://github.com/Haplee';

export default function Contact() {
    const { t } = useLang();

    return (
        <section id="contact" className="section-normal" aria-labelledby="contact-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeader
                    id="contact-title"
                    label={t.contact.whereLabel}
                    title={t.contact.title}
                    subtitle={t.contact.intro}
                />

                <div className="mt-6 grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <div className="space-y-6">
                            <div>
                                <p className="label mb-2">{t.contact.whereLabel}</p>
                                <p className="text-s1 font-medium text-fg">{t.contact.base}</p>
                                <p className="mt-2 text-fine text-fg-dim leading-relaxed">{t.contact.radiusNote}</p>
                                <p className="mt-1 text-fine text-fg-mute font-mono">{t.contact.remoteNote}</p>
                            </div>

                            <div className="border-t border-line pt-6">
                                <p className="label mb-4">{t.contact.channelsLabel}</p>
                                <dl className="space-y-3 font-mono text-fine">
                                    <div className="flex items-center justify-between py-2 border-b border-line/60">
                                        <dt className="text-fg-mute">{t.contact.emailLabel}</dt>
                                        <dd className="m-0 text-right">
                                            <a href={`mailto:${t.contact.emailAddress}`} aria-label={t.contact.emailAria} className="link text-fg hover:text-accent">
                                                {t.contact.emailAddress}
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-line/60">
                                        <dt className="text-fg-mute">{t.contact.linkedinLabel}</dt>
                                        <dd className="m-0 text-right">
                                            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label={t.contact.profileAria(t.contact.linkedinLabel)} className="link text-fg hover:text-accent">
                                                franciscovidal ↗
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-line/60">
                                        <dt className="text-fg-mute">{t.contact.githubLabel}</dt>
                                        <dd className="m-0 text-right">
                                            <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label={t.contact.profileAria(t.contact.githubLabel)} className="link text-fg hover:text-accent">
                                                @Haplee ↗
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="border-t border-line pt-6">
                                <p className="label mb-4">{t.contact.cvLabel}</p>
                                <a
                                    href="/assets/docs/CV-FranVidal.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-fine text-fg hover:text-accent transition-colors border border-line px-4 py-2 hover:border-accent"
                                >
                                    <span>{t.contact.cvName}</span>
                                    <span className="text-fg-mute">{t.contact.cvFormat} ↗</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="p-5 bg-ink-800 border border-line sticky top-24">
                            <div className="space-y-4 text-center sm:text-left">
                                <p className="label">{t.contact.coordinatesLabel}</p>
                                <p className="font-mono text-fine text-fg-mute">
                                    36.19° N, 5.92° W
                                </p>
                                <p className="text-fine text-fg-dim">{t.contact.radiusVisual}</p>

                                <div className="border-t border-line pt-4 mt-4">
                                    <p className="label mb-3">{t.contact.availabilityLabel}</p>
                                    <ul className="space-y-2 text-fine text-fg-dim font-mono">
                                        <li className="flex items-center gap-2">
                                            <span className="text-accent">●</span>
                                            <span>{t.contact.availability.immediate}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-accent">●</span>
                                            <span>{t.contact.availability.local}</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-accent">●</span>
                                            <span>{t.contact.availability.remote}</span>
                                        </li>
                                    </ul>
                                </div>

                                <a
                                    href="https://www.openstreetmap.org/?mlat=36.1903&mlon=-5.9215#map=10/36.1903/-5.9215"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={t.contact.osmAria}
                                    className="mt-4 inline-flex items-center gap-2 font-mono text-fine text-fg-mute hover:text-accent transition-colors"
                                >
                                    <span aria-hidden="true">↗</span>
                                    <span>{t.contact.mapLinkLabel}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}