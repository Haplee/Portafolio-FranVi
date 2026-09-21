import { useId, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface FlowStep {
    step: string;
    summary: string;
    desc: string;
    detail: string;
}

interface CircuitDiagramProps {
    flow: FlowStep[];
    labels: {
        flowLabel: string;
        flowInstruction: string;
    };
}

const n = (i: number) => String(i + 1).padStart(2, '0');

export default function CircuitDiagram({ flow, labels }: CircuitDiagramProps) {
    const reactId = useId();
    const idPrefix = reactId.replace(/:/g, '');
    const [activeStep, setActiveStep] = useState(0);
    const currentFlow = flow[activeStep] || flow[0];

    const selectStep = (index: number) => {
        setActiveStep(index);
        window.requestAnimationFrame(() => {
            document.getElementById(`${idPrefix}-tab-${index}`)?.focus();
        });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            let next = index;
            if (event.key === 'ArrowRight') next = (index + 1) % flow.length;
            if (event.key === 'ArrowLeft') next = (index - 1 + flow.length) % flow.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = flow.length - 1;
            selectStep(next);
        }
    };

    return (
        <div className="border-t border-line pt-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                <p className="label">{labels.flowLabel}</p>
                <p className="font-mono text-fine text-fg-mute">{labels.flowInstruction}</p>
            </div>

            <div
                className="grid gap-px bg-line border border-line grid-cols-2 sm:grid-cols-5"
                role="tablist"
                aria-label={labels.flowLabel}
            >
                {flow.map((s, idx) => {
                    const isSelected = activeStep === idx;
                    return (
                        <button
                            key={s.step}
                            type="button"
                            role="tab"
                            id={`${idPrefix}-tab-${idx}`}
                            aria-selected={isSelected}
                            aria-controls={`${idPrefix}-panel-${idx}`}
                            tabIndex={isSelected ? 0 : -1}
                            onClick={() => setActiveStep(idx)}
                            onKeyDown={(event) => handleKeyDown(event, idx)}
                            className={cn(
                                'p-4 text-left transition-colors cursor-pointer',
                                isSelected
                                    ? 'bg-ink-700 text-fg'
                                    : 'bg-ink-800 text-fg-dim hover:bg-ink-700/60 hover:text-fg focus-visible:bg-ink-700'
                            )}
                        >
                            <span className={cn(
                                'font-mono text-fine block',
                                isSelected ? 'text-accent font-medium' : 'text-fg-mute'
                            )}>
                                {n(idx)}
                            </span>
                            <span className="mt-2 text-s0 font-medium block">{s.step}</span>
                            <span className="mt-1 font-mono text-fine text-fg-mute block">{s.summary}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    id={`${idPrefix}-panel-${activeStep}`}
                    role="tabpanel"
                    aria-labelledby={`${idPrefix}-tab-${activeStep}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-3 p-4 sm:p-5 bg-ink-700/50 border border-line"
                >
                    <div className="flex items-baseline gap-3">
                        <span className="font-mono text-fine text-accent">{n(activeStep)}</span>
                        <h3 className="text-s0 font-medium text-fg">{currentFlow.step} — {currentFlow.summary}</h3>
                    </div>
                    <p className="mt-1.5 text-fine text-fg-dim">{currentFlow.desc}</p>
                    <p className="mt-2.5 font-mono text-fine text-fg-mute border-t border-line/60 pt-2">
                        <span className="text-accent mr-2" aria-hidden="true">›</span>
                        {currentFlow.detail}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
