import { useLang } from '@/i18n/LangProvider';

export default function Footer() {
    const { t } = useLang();

    return (
        <footer className="site-footer">
            <div className="page-shell footer-inner">
                <span>{t.footer.rights(new Date().getFullYear())}</span>
                <span>{t.footer.colophon}</span>
                <a href="https://github.com/Haplee/Portafolio-FranVi" target="_blank" rel="noopener noreferrer">
                    {t.footer.source} ↗
                </a>
            </div>
        </footer>
    );
}
