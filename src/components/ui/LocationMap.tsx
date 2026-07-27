import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLang } from '@/i18n/LangProvider';

const BARBATE: [number, number] = [36.1903, -5.9215];
const RADIUS_M = 60_000;

// El mapa dejó de conmemorar un lugar de nacimiento —marcador ♋ pulsante,
// hora del parto, coordenadas en Courier— y pasó a responder la única
// pregunta que un mapa puede responder aquí: dónde estás y hasta dónde te
// desplazas. El círculo es el dato; el punto solo lo ancla.
export default function LocationMap() {
    const { t } = useLang();
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        // Mapa no interactivo, a propósito: es una figura que ilustra un dato
        // que el texto ya dice ("unos 60 km desde Barbate"), no una
        // herramienta de navegación. Además evita dos problemas reales — que
        // el arrastre secuestre el scroll en móvil y que queden botones
        // enfocables dentro de un elemento anunciado como imagen.
        const map = L.map(mapRef.current, {
            center: BARBATE,
            zoom: 9,
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
        });
        mapInstance.current = map;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19,
        }).addTo(map);

        const radius = L.circle(BARBATE, {
            radius: RADIUS_M,
            className: 'loc-radius',
            interactive: false,
        }).addTo(map);

        L.marker(BARBATE, {
            icon: L.divIcon({ className: 'loc-marker', iconSize: [14, 14], iconAnchor: [7, 7] }),
            interactive: false,
            keyboard: false,
        }).addTo(map);

        // El encuadre lo decide el radio, no un nivel de zoom escrito a mano:
        // si mañana cambia la distancia, el mapa se reencuadra solo.
        map.fitBounds(radius.getBounds(), { padding: [24, 24] });

        L.control.attribution({ position: 'bottomright', prefix: false })
            .addAttribution('© OSM · CARTO')
            .addTo(map);

        return () => {
            map.remove();
            mapInstance.current = null;
        };
    }, []);

    return (
        <figure className="m-0">
            <div
                ref={mapRef}
                role="img"
                aria-label={t.contact.mapAria}
                className="h-72 w-full border border-line bg-ink-800 sm:h-80"
            />
            <figcaption className="mt-3 text-fine text-fg-mute">
                {t.contact.radiusNote}{' '}
                <a
                    href={`https://www.openstreetmap.org/?mlat=${BARBATE[0]}&mlon=${BARBATE[1]}#map=10/${BARBATE[0]}/${BARBATE[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                >
                    OpenStreetMap
                    <span className="sr-only"> — {t.contact.osmAria}</span>
                </a>
            </figcaption>
        </figure>
    );
}
