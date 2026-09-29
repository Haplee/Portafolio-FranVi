import { useState } from 'react';
import { useLang } from '@/i18n/LangProvider';
import SupportStepper from '@/components/ui/SupportStepper';
import { cn } from '@/lib/utils';

const REPO_RESOLVECORE = 'https://github.com/Haplee/ResolvCore';

const FLOW_NODES = [
    { label: 'REQUEST', index: 0 },
    { label: 'TICKET', index: 1 },
    { label: 'REMOTE', index: 2 },
    { label: 'DIAGNOSTICS', index: 3 },
    { label: 'REPORT', index: 4 },
];

export default function ResolveCore() {
    const { t } = useLang();
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="work" className="feature-section" aria-labelledby="work-title">
            <div className="page-shell">
                <div className="section-kicker">
                    <span>01</span>
                    <span>{t.work.featuredBadge}</span>
                    <span className="section-kicker-line" />
                    <span>CASE STUDY</span>
                </div>

                <div className="feature-heading">
                    <div>
                        <p className="eyebrow accent">{t.work.projectCode}</p>
                        <h2 id="work-title" className="feature-title">{t.work.title}</h2>
                    </div>
                    <p className="feature-summary">{t.work.oneLiner}</p>
                </div>

                <div className="feature-layout">
                    <div className="feature-main">
                        <div className="architecture-board" aria-label="Diagrama interactivo de flujo de soporte">
                            <div className="architecture-label">
                                <span>SUPPORT / SYSTEM FLOW</span>
                                <span className="text-[10px] text-accent font-mono">Fase activa: {FLOW_NODES[activeStep]?.label}</span>
                            </div>
                            <div className="architecture-track">
                                {FLOW_NODES.map((node, i) => (
                                    <div key={node.label} className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveStep(node.index)}
                                            className={cn(
                                                'arch-node-btn',
                                                activeStep === node.index && 'is-active'
                                            )}
                                            aria-label={`Ver fase ${node.label}`}
                                        >
                                            <span className="arch-node-dot" />
                                            {node.label}
                                        </button>
                                        {i < FLOW_NODES.length - 1 && (
                                            <i className={cn('arch-node-connector', activeStep > i && 'is-passed')} />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="architecture-foot">
                                <span>DEBIAN VPS</span>
                                <span>DOCKER</span>
                                <span>NGINX</span>
                                <span>MARIADB</span>
                            </div>
                        </div>

                        <p className="feature-problem">{t.work.problem}</p>

                        <SupportStepper
                            flow={t.work.flow}
                            activeStep={activeStep}
                            onStepChange={setActiveStep}
                            labels={{
                                flowLabel: t.work.flowLabel,
                                flowInstruction: t.work.flowInstruction,
                            }}
                        />
                    </div>

                    <aside className="feature-aside">
                        <div className="feature-aside-block">
                            <span className="eyebrow">STACK</span>
                            <dl>
                                {t.work.infra.map((row) => (
                                    <div key={row.k}>
                                        <dt>{row.k}</dt>
                                        <dd>{row.v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="feature-aside-block">
                            <span className="eyebrow">{t.work.decisionsLabel}</span>
                            <ol>
                                {t.work.decisions.map((decision) => (
                                    <li key={decision.title}>
                                        <strong>{decision.title}</strong>
                                        <p>{decision.body}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <a
                            href={REPO_RESOLVECORE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="feature-repo-link"
                        >
                            <span>{t.work.repoCta}</span>
                            <span aria-hidden="true">↗</span>
                        </a>
                    </aside>
                </div>
            </div>
        </section>
    );
}
