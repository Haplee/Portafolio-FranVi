import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const BARBATE: [number, number] = [36.1903, -5.9215];

export default function BarbateMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        const map = L.map(mapRef.current, {
            center: BARBATE,
            zoom: 11,
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: true,
            dragging: true,
        });
        mapInstance.current = map;

        // CartoDB Dark Matter tiles — free dark theme
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19,
            attribution: '© OpenStreetMap · © CARTO',
        }).addTo(map);

        // Custom pulsing marker — Fran's birthplace
        const markerIcon = L.divIcon({
            className: 'barbate-marker',
            html: `
                <div class="barbate-marker-ring barbate-marker-ring--outer"></div>
                <div class="barbate-marker-ring barbate-marker-ring--inner"></div>
                <div class="barbate-marker-core">♋</div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
        });
        L.marker(BARBATE, { icon: markerIcon }).addTo(map);

        // Custom popup-less label
        const labelIcon = L.divIcon({
            className: 'barbate-label',
            html: `<div class="barbate-label-box">
                <div class="barbate-label-title">♋ BARBATE</div>
                <div class="barbate-label-coords">36.190°N · 5.921°W</div>
            </div>`,
            iconSize: [140, 40],
            iconAnchor: [70, 70],
        });
        L.marker(BARBATE, { icon: labelIcon, interactive: false }).addTo(map);

        // Custom attribution control bottom-right
        L.control.attribution({ position: 'bottomright', prefix: false })
            .addAttribution('© OSM · CARTO')
            .addTo(map);

        // Add zoom control on the right
        L.control.zoom({ position: 'topright' }).addTo(map);

        return () => {
            map.remove();
            mapInstance.current = null;
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hologram-card relative rounded-2xl border border-cyan-500/15 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/60 bg-slate-900/80 relative z-10">
                <div className="flex items-center gap-2">
                    <i aria-hidden="true" className="fas fa-map-marker-alt text-amber-400" />
                    <span className="text-sm font-semibold text-white">Barbate, Cádiz · España</span>
                </div>
                <a
                    href={`https://www.openstreetmap.org/?mlat=${BARBATE[0]}&mlon=${BARBATE[1]}#map=13/${BARBATE[0]}/${BARBATE[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver Barbate en OpenStreetMap (abre en una pestaña nueva)"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                    <i aria-hidden="true" className="fas fa-external-link-alt text-[10px]" />
                    <span className="hidden sm:inline">OSM</span>
                </a>
            </div>

            {/* Real map */}
            <div className="relative">
                <div
                    ref={mapRef}
                    className="w-full h-64 sm:h-80 md:h-96 bg-slate-950"
                    style={{ background: '#0a0e1a' }}
                />
                {/* Etiqueta profesional de ubicación y disponibilidad */}
                <div className="absolute top-3 left-3 z-[500] pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/85 border border-cyan-500/25 backdrop-blur-sm text-xs font-medium text-cyan-200 shadow-lg">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                        </span>
                        Barbate, Cádiz · Disponible en la provincia y en remoto
                    </span>
                </div>
            </div>

            {/* Bottom info bar */}
            <div className="px-5 py-3 border-t border-slate-800/60 bg-slate-900/80 flex items-center justify-between text-xs">
                <div>
                    <p className="text-amber-400 font-mono font-bold">Costa de la Luz · Atlántico</p>
                    <p className="text-slate-500 text-[10px]">Donde nací el 17.07.2003 a las 3:00 AM ♋</p>
                </div>
                <p className="text-slate-500 font-mono text-[10px] hidden sm:block">
                    36.1903°N<br />5.9215°W
                </p>
            </div>
        </motion.div>
    );
}
