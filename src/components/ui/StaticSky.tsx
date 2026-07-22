// Fondo de cielo estático y ligero (solo CSS, cero JS de dibujo). Se pinta
// desde el primer frame para que el hero nunca aparezca vacío, y sirve de
// base bajo la constelación 3D (y de único fondo en móvil, donde no se carga
// Three.js).
export default function StaticSky() {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
            style={{
                background: [
                    // Estrellas dispersas (puntos diminutos).
                    'radial-gradient(1.5px 1.5px at 12% 22%, rgba(226,240,255,0.9), transparent)',
                    'radial-gradient(1px 1px at 28% 48%, rgba(226,240,255,0.6), transparent)',
                    'radial-gradient(1.5px 1.5px at 42% 14%, rgba(226,240,255,0.8), transparent)',
                    'radial-gradient(1px 1px at 55% 62%, rgba(226,240,255,0.5), transparent)',
                    'radial-gradient(2px 2px at 66% 28%, rgba(251,207,36,0.7), transparent)',
                    'radial-gradient(1px 1px at 74% 55%, rgba(226,240,255,0.6), transparent)',
                    'radial-gradient(1.5px 1.5px at 82% 18%, rgba(226,240,255,0.8), transparent)',
                    'radial-gradient(1px 1px at 90% 40%, rgba(226,240,255,0.5), transparent)',
                    'radial-gradient(1px 1px at 18% 72%, rgba(226,240,255,0.55), transparent)',
                    'radial-gradient(1.5px 1.5px at 36% 84%, rgba(226,240,255,0.7), transparent)',
                    'radial-gradient(2px 2px at 8% 44%, rgba(251,207,36,0.6), transparent)',
                    'radial-gradient(1px 1px at 60% 88%, rgba(226,240,255,0.5), transparent)',
                    // Nebulosa/brillo ambiental.
                    'radial-gradient(circle at 50% 18%, rgba(34,211,238,0.10), transparent 55%)',
                    'radial-gradient(circle at 78% 72%, rgba(99,102,241,0.10), transparent 55%)',
                    // Base.
                    'linear-gradient(180deg, #020617 0%, #0b1120 60%, #0f172a 100%)',
                ].join(','),
            }}
        />
    );
}
