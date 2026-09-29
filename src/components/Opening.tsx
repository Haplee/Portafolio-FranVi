import { useLang } from '@/i18n/LangProvider';

const GITHUB = 'https://github.com/Haplee';
const LINKEDIN = 'https://linkedin.com/in/franciscovidal-mateo-2b8a4a238';

export default function Opening() {
    const { t } = useLang();

    return (
        <section id="opening" className="hero-section" aria-labelledby="opening-title">
            <div className="page-shell">
                <div className="hero-grid">
                    <div className="hero-copy">
                        <div className="eyebrow-row">
                            <span className="eyebrow accent">{t.hero.location}</span>
                            <span className="eyebrow">{t.hero.discipline}</span>
                        </div>

                        <h1 id="opening-title" className="hero-title">
                            FRAN
                            <span>VIDAL.</span>
                        </h1>

                        <p className="hero-role">{t.hero.role}</p>
                        <p className="hero-lead">{t.hero.lead}</p>

                        <div className="hero-actions">
                            <a href="#work" className="button button-primary">
                                {t.hero.ctaWork}
                                <span aria-hidden="true">↘</span>
                            </a>
                            <a href="#contact" className="button button-quiet">
                                {t.hero.ctaContact}
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>

                        <div className="hero-meta">
                            <div>
                                <span className="hero-meta-label">{t.hero.specs[0].k}</span>
                                <span>{t.hero.specs[0].v}</span>
                            </div>
                            <div>
                                <span className="hero-meta-label">{t.hero.specs[1].k}</span>
                                <span>{t.hero.specs[1].v}</span>
                            </div>
                            <div>
                                <span className="hero-meta-label">{t.hero.specs[3].k}</span>
                                <span>{t.hero.specs[3].v}</span>
                            </div>
                        </div>
                    </div>

                    <aside className="hero-art" aria-label="Perfil de Fran Vidal">
                        <div className="hero-art-grid" aria-hidden="true" />
                        <div className="hero-art-top">
                            <span>01 — PROFILE</span>
                            <span>ASIR / IT</span>
                        </div>
                        <div className="hero-monogram">FV</div>
                        <div className="hero-art-bottom">
                            <div className="hero-person">
                                <img src="https://github.com/Haplee.png" alt={t.hero.portraitAlt} />
                                <div>
                                    <strong>Francisco Vidal Mateo</strong>
                                    <span>{t.hero.creds[0]}</span>
                                </div>
                            </div>
                            <div className="hero-links">
                                <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="hero-scroll-note">
                    <span>SCROLL TO EXPLORE</span>
                    <span aria-hidden="true">↓</span>
                </div>
            </div>
        </section>
    );
}
