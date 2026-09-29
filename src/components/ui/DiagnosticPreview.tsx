import { useLang } from '@/i18n/LangProvider';

interface DiagnosticPreviewProps {
    activeStep: number;
}

export default function DiagnosticPreview({ activeStep }: DiagnosticPreviewProps) {
    const { t } = useLang();

    const snippets = [
        // 0: Solicitud / Intake
        {
            filename: 'client_intake_payload.json',
            lang: 'JSON',
            content: `{
  "timestamp": "2026-09-29T14:32:00Z",
  "client_origin": "192.168.10.45",
  "user": "contabilidad-puesto03@empresa.local",
  "os_detected": "Windows 11 Pro 23H2 (Build 22631.3007)",
  "browser": "Chrome 128.0.6613.120",
  "issue_category": "Rendimiento y Red",
  "declared_severity": "HIGH",
  "symptom": "Bloqueos intermitentes al acceder al recurso compartido SMB"
}`,
            status: 'INTAKE VALIDATED · 200 OK',
        },
        // 1: Ticket / MantisBT API
        {
            filename: 'mantisbt_dispatch.sh',
            lang: 'BASH / REST',
            content: `curl -X POST "https://resolvecore.local/api/rest/issues" \\
  -H "Authorization: Bearer \${MANTIS_API_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "summary": "Fallo SMB y latencia alta en estación Contabilidad-03",
    "project": { "id": 1, "name": "Infraestructura Local" },
    "category": { "name": "Sistemas y Redes" },
    "priority": { "id": 40, "name": "urgent" },
    "handler": { "name": "fvidal", "real_name": "Fran Vidal" },
    "sla_target_hours": 2
  }'

# Response: HTTP 201 Created | Issue #1042 queued`,
            status: 'TICKET #1042 DISPATCHED · SLA 2H',
        },
        // 2: Conexión remota / Remote
        {
            filename: 'remote_session_tunnel.log',
            lang: 'SSH / TUNNEL',
            content: `[14:32:15] [AUTH] Authenticated operator: fvidal (ASIR Sysadmin)
[14:32:16] [INIT] Handshake with client agent (AnyDesk / RDP tunnel)
[14:32:16] [CRYPTO] TLS 1.3 / ChaCha20-Poly1305 / ECDSA-SHA384
[14:32:17] [ROUTE] Forwarding local:5900 -> remote:3389 via WireGuard VPS
[14:32:18] [TUNNEL] Secure assisted channel OPEN. Latency: 18.4ms
[14:32:18] [READY] Remote desktop interactive session established.`,
            status: 'REMOTE TUNNEL ESTABLISHED · TLS 1.3',
        },
        // 3: Diagnóstico / Diagnostics
        {
            filename: 'Invoke-SysDiagnostic.ps1',
            lang: 'POWERSHELL / AUDIT',
            content: `PS C:\\Support> .\\Invoke-SysDiagnostic.ps1 -Target localhost -FullAudit

[INFO] Auditing hardware, disks, event logs and network interfaces...
[PASS] CPU: Intel Core i5-12400 (6 Cores / 12 Threads) @ 2.50GHz (Load: 14%)
[PASS] Memory: 16.0 GB DDR4 (Allocated: 5.8 GB / 36%)
[WARN] Disk 0 (C: NVMe): Health 99% | 0 Bad Sectors | Free: 18.2 GB (< 10% space)
[FAIL] Network: DNS primary 192.168.10.1 unreachable (Falling back to 1.1.1.1)
[WARN] CVE Scan: OpenSSL 1.1.1k vulnerable to CVE-2023-0286 -> Automated patch ready
[EXEC] Flushed DNS cache, repaired SMB NetBIOS binding, queued package update.`,
            status: 'DIAGNOSTIC COMPLETE · 1 FAULT AUTO-REPAIRED',
        },
        // 4: Informe / Report
        {
            filename: 'ticket_1042_resolution.md',
            lang: 'MARKDOWN / EVIDENCE',
            content: `## Informe Técnico de Cierre — Incidencia #1042
- **Técnico interviniente:** Fran Vidal Mateo (Téc. Sup. ASIR)
- **Causa raíz:** Enrutamiento DNS saturado y espacio crítico en partición C:.
- **Acciones ejecutadas:**
  1. Purga desatendida de temporales y logs de Windows (recuperados 24.6 GB).
  2. Reconfiguración de balanceo DNS en switch MikroTik.
  3. Comprobación de integridad con DISM y SFC: 0 errores pendientes.
- **Estado final:** Incidencia RESUELTA. Máquina operativa al 100%.
- **Evidencia archivada:** Hash SHA-256 adjunto en MariaDB / MantisBT.`,
            status: 'ARCHIVED & CLOSED · AUDIT EVIDENCE STORED',
        },
    ];

    const current = snippets[activeStep] || snippets[0];

    return (
        <div className="diagnostic-window mt-6">
            <div className="diagnostic-header flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-ink-700 border-b border-line">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-accent/80 flex-shrink-0" />
                    <span className="font-mono text-[11px] text-fg font-medium truncate sm:overflow-visible">{current.filename}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold">{current.status}</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-ink-600/70 border border-line rounded text-fg-mute uppercase">
                        {current.lang}
                    </span>
                </div>
            </div>
            <pre className="diagnostic-body font-mono text-[10px] sm:text-[11px] leading-relaxed text-fg-dim overflow-x-auto p-3 sm:p-4 bg-ink-900/90 border border-line border-t-0 rounded-b">
                <code>{current.content}</code>
            </pre>
            <div className="text-[10px] font-mono text-fg-mute px-3 sm:px-4 py-2 bg-ink-800/40 border-x border-b border-line rounded-b flex flex-wrap items-center justify-between gap-2">
                <span>{t.work.inspectDiagnostics}</span>
                <span className="text-accent">ResolveCore v1.0.4 · VPS</span>
            </div>
        </div>
    );
}
