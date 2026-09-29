import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LangProvider';

export default function LiveTelemetry() {
    const { t } = useLang();
    const [ping, setPing] = useState(22);

    useEffect(() => {
        // Subtle realistic jitter between 19ms and 26ms
        const interval = setInterval(() => {
            setPing(Math.floor(19 + Math.random() * 8));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="telemetry-bar" aria-label="System telemetry status">
            <div className="page-shell telemetry-inner">
                <div className="telemetry-item">
                    <span className="telemetry-dot pulse-emerald" aria-hidden="true" />
                    <span className="telemetry-label">HOST:</span>
                    <span className="telemetry-value">{t.telemetry.server}</span>
                </div>

                <div className="telemetry-item">
                    <span className="telemetry-dot bg-accent" aria-hidden="true" />
                    <span className="telemetry-label">STATUS:</span>
                    <span className="telemetry-value text-accent">{t.telemetry.status}</span>
                </div>

                <div className="telemetry-item hidden sm:flex">
                    <span className="telemetry-label">DISPO:</span>
                    <span className="telemetry-value">{t.telemetry.availability}</span>
                </div>

                <div className="telemetry-item hidden md:flex">
                    <span className="telemetry-label">BASE:</span>
                    <span className="telemetry-value">{t.telemetry.location}</span>
                </div>

                <div className="telemetry-item ml-auto">
                    <span className="telemetry-label">PING:</span>
                    <span className="telemetry-value font-mono text-emerald-400">{ping}ms</span>
                </div>
            </div>
        </div>
    );
}
