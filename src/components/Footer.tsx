import { useLang } from '@/i18n/LangProvider';

const SOURCE = 'https://github.com/Haplee/Portafolio-FranVi';

// Un colofón, no un segundo menú. Los enlaces sociales ya están en Contacto
// justo encima; repetirlos aquí solo servía para que el pie pareciese lleno.
export default function Footer() {
    const { t } = useLang();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-line px-6 py-tight pb-24 md:pb-tight">
            <div className="mx-auto max-w-5xl flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-fine text-fg-mute">{t.footer.rights(year)}</p>
                <p className="text-fine text-fg-mute measure">
                    {t.footer.colophon}{' '}
                    <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="link">
                        {t.footer.source}
                    </a>
                </p>
            </div>
        </footer>
    );
}
