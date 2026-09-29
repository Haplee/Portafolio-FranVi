import { useLang } from '@/i18n/LangProvider';

export default function Timeline() {
    const { t } = useLang();

    return (
        <section id="path" className="path-section" aria-labelledby="path-title">
            <div className="page-shell">
                <div className="section-heading-row">
                    <div>
                        <div className="section-kicker">
                            <span>04</span>
                            <span>{t.path.label}</span>
                        </div>
                        <h2 id="path-title" className="section-title">{t.path.title}</h2>
                    </div>
                    <p className="path-status">{t.path.currentStatus}</p>
                </div>

                <ol className="timeline-list">
                    {t.path.items.map((item, index) => (
                        <li key={`${item.title}-${item.date}`}>
                            <div className="timeline-marker">
                                <span>{String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="timeline-date">{item.date}</div>
                            <div className="timeline-content">
                                <div className="timeline-role">{item.role}</div>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
