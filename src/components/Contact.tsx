import { useState } from 'react';
import { useLang } from '@/i18n/LangProvider';

const LINKEDIN = 'https://linkedin.com/in/franciscovidal-mateo-2b8a4a238';
const GITHUB = 'https://github.com/Haplee';

export default function Contact() {
    const { t } = useLang();
    const [copied, setCopied] = useState(false);

    const cvUrl = `${import.meta.env.BASE_URL}assets/docs/CV-FranVidal.html`.replace(/\/\//g, '/');

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(t.contact.emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
    };

    const handleDownloadVCard = () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
N:Vidal Mateo;Francisco;;;
FN:Francisco Vidal Mateo (Fran Vidal)
ORG:Administrador de Sistemas y Redes (ASIR)
TITLE:Administrador de Sistemas y Redes / DevOps
EMAIL;TYPE=INTERNET,PREF:${t.contact.emailAddress}
URL:https://franvi.runs-on.dev/
URL;TYPE=GitHub:${GITHUB}
URL;TYPE=LinkedIn:${LINKEDIN}
ADR;TYPE=HOME:;;Barbate;Cádiz;;Spain
NOTE:Técnico Superior en ASIR. Especializado en Linux, Docker, MikroTik, Windows Server y soporte IT.
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Fran_Vidal_ASIR.vcf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <section id="contact" className="contact-section" aria-labelledby="contact-title">
            <div className="page-shell">
                <div className="contact-kicker">
                    <span>05</span>
                    <span>{t.contact.label}</span>
                </div>

                <div className="contact-layout">
                    <div>
                        <p className="eyebrow accent">{t.contact.whereLabel}</p>
                        <h2 id="contact-title" className="contact-title">{t.contact.title}</h2>
                        <p className="contact-intro">{t.contact.intro}</p>

                        <div className="contact-vcard-wrap mt-8">
                            <button
                                type="button"
                                onClick={handleDownloadVCard}
                                className="button button-quiet"
                            >
                                <span className="text-accent" aria-hidden="true">📇</span>
                                <span>{t.contact.downloadVCard}</span>
                            </button>
                        </div>
                    </div>

                    <div className="contact-direct">
                        <div className="contact-email-row">
                            <a
                                href={`mailto:${t.contact.emailAddress}`}
                                className="contact-email"
                                aria-label={`Escribir a ${t.contact.emailAddress}`}
                            >
                                <span>{t.contact.emailAddress}</span>
                                <span aria-hidden="true">↗</span>
                            </a>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="contact-copy-btn"
                                title={t.contact.copyEmail}
                                aria-label={t.contact.copyEmail}
                            >
                                {copied ? (
                                    <span className="text-emerald-400 font-semibold">{t.contact.emailCopied}</span>
                                ) : (
                                    <span>{t.contact.copyEmail} 📋</span>
                                )}
                            </button>
                        </div>

                        <div className="contact-links">
                            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                            <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                            <a
                                href={cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.contact.cvName} ↗
                            </a>
                        </div>

                        <div className="availability">
                            <div>
                                <span>{t.contact.base}</span>
                                <span>{t.contact.radiusNote}</span>
                            </div>
                            <div>
                                <span className="text-emerald-400 font-medium">{t.contact.availability.immediate}</span>
                                <span>{t.contact.availability.remote}</span>
                            </div>
                        </div>

                        <a
                            href="https://www.openstreetmap.org/?mlat=36.1903&mlon=-5.9215#map=10/36.1903/-5.9215"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-location-link"
                        >
                            {t.contact.mapLinkLabel} ↗
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
