import { useLang } from '@/i18n/LangProvider';

export default function Closing() {
    const { t } = useLang();

    return (
        <section className="closing-section" aria-labelledby="closing-title">
            <div className="page-shell">
                <div className="closing-line">
                    <span>FRANVI</span>
                    <span aria-hidden="true">·</span>
                    <span>IT / SYSTEMS / WEB</span>
                </div>
                <p id="closing-title" className="closing-title">{t.closing.ctaTitle}</p>
                <a href={`mailto:${t.contact.emailAddress}`} className="closing-link">
                    {t.closing.ctaButton} ↗
                </a>
            </div>
        </section>
    );
}
