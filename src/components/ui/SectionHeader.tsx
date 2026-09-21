import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    id?: string;
    label: string;
    title: string;
    subtitle?: string;
    badge?: string;
    className?: string;
}

export default function SectionHeader({ id, label, title, subtitle, badge, className }: SectionHeaderProps) {
    return (
        <div className={cn('border-b border-line pb-4', className)}>
            {label && <p className="label text-accent">{label}</p>}
            <h2 id={id} className="mt-1 text-s2 font-semibold text-fg">{title}</h2>
            {subtitle && <p className="mt-2 text-fine text-fg-dim leading-relaxed">{subtitle}</p>}
            {badge && (
                <span className="mt-3 inline-block font-mono text-fine text-fg-mute">{badge}</span>
            )}
        </div>
    );
}