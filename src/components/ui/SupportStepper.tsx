import { useId, useState, useEffect, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import DiagnosticPreview from '@/components/ui/DiagnosticPreview';

interface FlowStep {
    step: string;
    summary: string;
    desc: string;
    detail: string;
}

interface SupportStepperProps {
    flow: FlowStep[];
    labels: {
        flowLabel: string;
        flowInstruction: string;
    };
    activeStep?: number;
    onStepChange?: (index: number) => void;
}

const n = (i: number) => String(i + 1).padStart(2, '0');

export default function SupportStepper({ flow, labels, activeStep: externalStep, onStepChange }: SupportStepperProps) {
    const id = useId().replace(/:/g, '');
    const [internalStep, setInternalStep] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);

    const activeStep = externalStep !== undefined ? externalStep : internalStep;

    const handleSelectStep = (index: number) => {
        if (onStepChange) {
            onStepChange(index);
        } else {
            setInternalStep(index);
        }
    };

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReducedMotion(query.matches);
        onChange();
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    const focusStep = (index: number) => {
        handleSelectStep(index);
        requestAnimationFrame(() => document.getElementById(`${id}-tab-${index}`)?.focus());
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % flow.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + flow.length) % flow.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = flow.length - 1;
        else return;

        event.preventDefault();
        focusStep(next);
    };

    const current = flow[activeStep] || flow[0];

    return (
        <div className="stepper">
            <div className="stepper-heading">
                <div>
                    <span className="eyebrow accent">{labels.flowLabel}</span>
                    <p>{labels.flowInstruction}</p>
                </div>
                <span className="stepper-count">{n(activeStep)} / {String(flow.length).padStart(2, '0')}</span>
            </div>

            <div className="stepper-tabs" role="tablist" aria-label={labels.flowLabel}>
                {flow.map((step, index) => (
                    <button
                        key={step.step}
                        type="button"
                        role="tab"
                        id={`${id}-tab-${index}`}
                        aria-selected={activeStep === index}
                        aria-controls={`${id}-panel-${index}`}
                        tabIndex={activeStep === index ? 0 : -1}
                        onClick={() => handleSelectStep(index)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={cn('stepper-tab', activeStep === index && 'is-active')}
                    >
                        <span>{n(index)}</span>
                        <strong>{step.step}</strong>
                    </button>
                ))}
            </div>

            <div
                id={`${id}-panel-${activeStep}`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${activeStep}`}
                className="stepper-panel"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={reducedMotion ? undefined : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <div className="stepper-panel-title">
                            <span>{n(activeStep)}</span>
                            <h3>{current.step}</h3>
                        </div>
                        <p className="stepper-summary">{current.summary}</p>
                        <p className="stepper-desc">{current.desc}</p>
                        <p className="stepper-detail">{current.detail}</p>

                        <DiagnosticPreview activeStep={activeStep} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
