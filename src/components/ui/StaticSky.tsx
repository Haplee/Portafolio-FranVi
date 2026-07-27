// Fondo de cielo estático (solo CSS, cero JS de dibujo). Se pinta desde el
// primer frame para que la apertura nunca aparezca vacía, sirve de base bajo
// la constelación 3D y es el único fondo en móvil, donde no se carga Three.js.
//
// La nebulosa cyan/índigo original se ha quitado: el acento de la página es
// oro y un segundo color ambiental compitiendo con él era decoración.
export default function StaticSky() {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
            style={{
                background: [
                    // Estrellas dispersas (puntos diminutos).
                    'radial-gradient(1.5px 1.5px at 12% 22%, rgba(233,231,226,0.85), transparent)',
                    'radial-gradient(1px 1px at 28% 48%, rgba(233,231,226,0.55), transparent)',
                    'radial-gradient(1.5px 1.5px at 42% 14%, rgba(233,231,226,0.75), transparent)',
                    'radial-gradient(1px 1px at 55% 62%, rgba(233,231,226,0.45), transparent)',
                    'radial-gradient(2px 2px at 66% 28%, rgba(251,207,36,0.6), transparent)',
                    'radial-gradient(1px 1px at 74% 55%, rgba(233,231,226,0.55), transparent)',
                    'radial-gradient(1.5px 1.5px at 82% 18%, rgba(233,231,226,0.75), transparent)',
                    'radial-gradient(1px 1px at 90% 40%, rgba(233,231,226,0.45), transparent)',
                    'radial-gradient(1px 1px at 18% 72%, rgba(233,231,226,0.5), transparent)',
                    'radial-gradient(1.5px 1.5px at 36% 84%, rgba(233,231,226,0.65), transparent)',
                    'radial-gradient(2px 2px at 8% 44%, rgba(251,207,36,0.55), transparent)',
                    'radial-gradient(1px 1px at 60% 88%, rgba(233,231,226,0.45), transparent)',
                    // Base: el mismo casi negro del resto de la página, para que
                    // la apertura funda con el documento en lugar de recortarse.
                    'linear-gradient(180deg, #05070c 0%, #07090f 55%, #0b0e15 100%)',
                ].join(','),
            }}
        />
    );
}
