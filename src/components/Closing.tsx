import { useLang } from '@/i18n/LangProvider';

const SOURCE = 'https://github.com/Haplee/Portafolio-FranVi';

export default function Closing() {
    const { t } = useLang();

    return (
        <section id="closing" className="section-tight" aria-labelledby="closing-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
                <h2 id="closing-title" className="text-s3 font-semibold text-fg tracking-tight">
                    {t.closing.ctaTitle}
                </h2>
                <p className="mt-3 text-s0 text-fg-dim font-light leading-relaxed">
                    {t.closing.ctaBody}
                </p>

                <div className="mt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={`mailto:${t.contact.emailAddress}`}
                        aria-label={t.contact.emailAria}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent text-accent font-mono text-fine hover:bg-accent hover:text-ink-900 transition-colors"
                    >
                        {t.closing.ctaButton}
                    </a>
                    <a
                        href={SOURCE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-fine font-mono"
                    >
                        {t.footer.source}
                    </a>
                </div>
            </div>
        </section>
    );
}