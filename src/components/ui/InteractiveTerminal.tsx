import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { useLang } from '@/i18n/LangProvider';

interface HistoryItem {
    id: string;
    command: string;
    output: React.ReactNode;
}

export default function InteractiveTerminal() {
    const { t } = useLang();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const executeCommand = (cmd: string) => {
        const cleanCmd = cmd.trim();
        if (!cleanCmd) return;

        setCommandHistory((prev) => [...prev, cleanCmd]);
        setHistoryIndex(-1);

        const id = `${Date.now()}-${Math.random()}`;
        const parts = cleanCmd.toLowerCase().split(' ');
        const main = parts[0];

        let output: React.ReactNode = null;

        switch (main) {
            case 'help':
                output = (
                    <div className="terminal-help-grid">
                        <div className="text-accent font-semibold mb-1">{t.terminal.helpHint}</div>
                        <div className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-1 text-xs">
                            <span className="text-emerald-400 font-mono">neofetch</span>
                            <span className="text-fg-dim">{t.terminal.commands.neofetch}</span>
                            <span className="text-emerald-400 font-mono">status</span>
                            <span className="text-fg-dim">{t.terminal.commands.status}</span>
                            <span className="text-emerald-400 font-mono">ping</span>
                            <span className="text-fg-dim">{t.terminal.commands.ping}</span>
                            <span className="text-emerald-400 font-mono">skills</span>
                            <span className="text-fg-dim">{t.terminal.commands.skills}</span>
                            <span className="text-emerald-400 font-mono">cat bio</span>
                            <span className="text-fg-dim">{t.terminal.commands.bio}</span>
                            <span className="text-emerald-400 font-mono">contact</span>
                            <span className="text-fg-dim">{t.terminal.commands.contact}</span>
                            <span className="text-emerald-400 font-mono">clear</span>
                            <span className="text-fg-dim">{t.terminal.commands.clear}</span>
                        </div>
                    </div>
                );
                break;

            case 'neofetch':
            case 'fastfetch':
            case 'specs':
                output = (
                    <div className="flex flex-col sm:flex-row gap-4 py-1 text-xs">
                        <pre className="text-accent font-mono leading-tight select-none hidden sm:block">
{`  _,met$$$$$gg.
,g$$$$$$$$$$$$$$$P.
,g$$P"        """Y$$.".
,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`."Y$$$$P"'
  \`$$b      "-.__
   \`Y$$
    \`Y$$.
      \`$$b.
        \`Y$$b.
          \`"Y$b._
              \`"""`}
                        </pre>
                        <div className="grid gap-1 font-mono text-xs">
                            <div className="text-accent font-bold">fran@vps-barbate</div>
                            <div className="text-fg-mute">------------------------</div>
                            <div><span className="text-emerald-400">OS:</span> Debian GNU/Linux 12 (bookworm) x86_64</div>
                            <div><span className="text-emerald-400">Host:</span> IONOS Cloud VPS (Production)</div>
                            <div><span className="text-emerald-400">Kernel:</span> 6.1.0-28-amd64 #1 SMP PREEMPT</div>
                            <div><span className="text-emerald-400">Uptime:</span> 142 days, 18 hours, 32 mins</div>
                            <div><span className="text-emerald-400">Role:</span> Técnico Superior ASIR · Sysadmin & Networks</div>
                            <div><span className="text-emerald-400">Shell:</span> bash 5.2.15 / PowerShell 7.4</div>
                            <div><span className="text-emerald-400">Stack:</span> Linux, Docker, MikroTik, Nginx, MariaDB</div>
                            <div><span className="text-emerald-400">Status:</span> <span className="text-emerald-300 font-semibold">● Open to Work (Cádiz & Remote)</span></div>
                        </div>
                    </div>
                );
                break;

            case 'status':
                output = (
                    <div className="grid gap-1.5 py-1 text-xs font-mono">
                        <div className="text-fg-dim font-bold pb-1 border-b border-line/40">SYSTEM HEALTH & INFRASTRUCTURE REPORT</div>
                        <div className="flex items-center justify-between">
                            <span>ResolveCore (VPS Debian / Docker)</span>
                            <span className="text-emerald-400 font-semibold">[200 OK] 21ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>GymLog PWA (Production)</span>
                            <span className="text-emerald-400 font-semibold">[200 OK] 28ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>MantisBT REST API Endpoint</span>
                            <span className="text-emerald-400 font-semibold">[ACTIVE] SSL A+</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>MikroTik VLAN & WireGuard Gateway</span>
                            <span className="text-emerald-400 font-semibold">[ONLINE]</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-line/40 text-accent">
                            <span>Disponibilidad Fran Vidal</span>
                            <span className="font-bold">INMEDIATA (Presencial / Remoto)</span>
                        </div>
                    </div>
                );
                break;

            case 'ping': {
                const target = parts[1] || 'resolvcore.haplee.net';
                output = (
                    <div className="grid gap-1 text-xs font-mono py-1">
                        <div className="text-fg-dim">PING {target} (51.254.112.48): 56 data bytes</div>
                        <div>64 bytes from 51.254.112.48: icmp_seq=1 ttl=54 time=21.4 ms</div>
                        <div>64 bytes from 51.254.112.48: icmp_seq=2 ttl=54 time=22.1 ms</div>
                        <div>64 bytes from 51.254.112.48: icmp_seq=3 ttl=54 time=20.9 ms</div>
                        <div className="text-emerald-400 pt-1">--- {target} ping statistics ---</div>
                        <div className="text-fg-dim">3 packets transmitted, 3 received, 0% packet loss, time 2003ms</div>
                    </div>
                );
                break;
            }

            case 'skills':
                output = (
                    <div className="grid gap-2 text-xs font-mono py-1">
                        <div>
                            <span className="text-accent font-semibold">[Sistemas & Servidores]</span>
                            <p className="text-fg-dim">Linux (Debian, Ubuntu, Kali), Windows Server (AD, GPO, DNS, DHCP), Docker, Nginx, MariaDB, VirtualBox.</p>
                        </div>
                        <div>
                            <span className="text-accent font-semibold">[Redes & Físico]</span>
                            <p className="text-fg-dim">MikroTik, Cisco switches, TCP/IP, VLAN, Cableado estructurado Cat6, CCTV Hikvision, Alarmas.</p>
                        </div>
                        <div>
                            <span className="text-accent font-semibold">[Scripting & Dev]</span>
                            <p className="text-fg-dim">Bash / POSIX Shell, PowerShell, Python, TypeScript, React 19, Git / CI/CD.</p>
                        </div>
                    </div>
                );
                break;

            case 'bio':
            case 'cat':
                output = (
                    <div className="text-xs font-mono py-1 text-fg-dim leading-relaxed">
                        <span className="text-accent font-semibold">Fran Vidal (Haplee) —</span> {t.terminal.bioText}
                    </div>
                );
                break;

            case 'whoami':
                output = (
                    <div className="text-xs font-mono text-emerald-400">
                        fran-vidal: Técnico Superior en ASIR · Sysadmin / DevOps / Web
                    </div>
                );
                break;

            case 'contact':
                output = (
                    <div className="grid gap-1.5 text-xs font-mono py-1">
                        <div><span className="text-accent">Email:</span> <a href={`mailto:${t.contact.emailAddress}`} className="underline hover:text-white">{t.contact.emailAddress}</a></div>
                        <div><span className="text-accent">LinkedIn:</span> <a href="https://linkedin.com/in/franciscovidal-mateo-2b8a4a238" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">franciscovidal-mateo</a></div>
                        <div><span className="text-accent">GitHub:</span> <a href="https://github.com/Haplee" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">github.com/Haplee</a></div>
                    </div>
                );
                break;

            case 'clear':
                setHistory([]);
                setInput('');
                return;

            default:
                output = (
                    <div className="text-xs font-mono text-rose-400">
                        bash: comando no encontrado: `{cleanCmd}`. Escribe <span className="text-emerald-400 font-bold">help</span> para ver la lista de comandos disponibles.
                    </div>
                );
                break;
        }

        setHistory((prev) => [...prev, { id, command: cleanCmd, output }]);
        setInput('');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        executeCommand(input);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(nextIndex);
            setInput(commandHistory[nextIndex]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;
            const nextIndex = historyIndex + 1;
            if (nextIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInput('');
            } else {
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        }
    };

    const quickCommands = ['neofetch', 'status', 'ping', 'cat bio', 'skills', 'help'];

    return (
        <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
            <div className="terminal-header">
                <div className="flex items-center gap-1.5">
                    <span className="terminal-dot bg-rose-500/80" />
                    <span className="terminal-dot bg-amber-500/80" />
                    <span className="terminal-dot bg-emerald-500/80" />
                </div>
                <div className="terminal-title">fran@vps-barbate:~# bash</div>
                <div className="text-[10px] font-mono text-fg-mute hidden sm:block">Debian 12 · 6.1-amd64</div>
            </div>

            <div className="terminal-body">
                <div className="terminal-welcome text-xs font-mono text-fg-dim pb-2 mb-2 border-b border-line/40">
                    <span className="text-accent font-semibold">{t.terminal.welcome}</span>
                    <div className="text-[11px] text-fg-mute mt-0.5">
                        {t.terminal.helpHint} <span className="text-emerald-400 font-bold">help</span>, <span className="text-emerald-400 font-bold">neofetch</span>, <span className="text-emerald-400 font-bold">status</span>.
                    </div>
                </div>

                {history.map((item) => (
                    <div key={item.id} className="terminal-history-item mb-2.5 font-mono">
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-emerald-400 font-bold">fran@vps:~$</span>
                            <span className="text-fg">{item.command}</span>
                        </div>
                        <div className="mt-1 pl-4 text-fg-dim border-l border-line/40">
                            {item.output}
                        </div>
                    </div>
                ))}

                <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono text-xs pt-1">
                    <span className="text-emerald-400 font-bold whitespace-nowrap">fran@vps:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={history.length === 0 ? "escribe 'neofetch' o 'status'..." : ""}
                        className="flex-1 bg-transparent border-none outline-none text-fg font-mono text-xs placeholder:text-fg-mute/50 p-0 m-0"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                </form>

                <div ref={terminalEndRef} />
            </div>

            <div className="terminal-quick-bar">
                <span className="terminal-quick-label">{t.terminal.quickRun}</span>
                <div className="terminal-quick-chips">
                    {quickCommands.map((cmd) => (
                        <button
                            key={cmd}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                executeCommand(cmd);
                            }}
                            className="terminal-chip"
                        >
                            {cmd}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
