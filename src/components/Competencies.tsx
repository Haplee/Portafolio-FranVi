import { useState } from 'react';
import { useLang } from '@/i18n/LangProvider';
import { cn } from '@/lib/utils';

export default function Competencies() {
    const { t } = useLang();
    const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');

    const getContextBadge = (where: string) => {
        const lower = where.toLowerCase();
        if (lower.includes('vps') || lower.includes('producción') || lower.includes('production')) {
            return { label: 'PRODUCCIÓN', color: 'badge-emerald' };
        }
        if (lower.includes('fct') || lower.includes('clientes') || lower.includes('ingenia')) {
            return { label: 'FCT / CLIENTES', color: 'badge-amber' };
        }
        if (lower.includes('asir') || lower.includes('laboratorio')) {
            return { label: 'ASIR / LAB', color: 'badge-cyan' };
        }
        return { label: 'DESARROLLO', color: 'badge-violet' };
    };

    const visibleGroups = t.skills.groups.filter((_, index) =>
        selectedGroup === 'all' || selectedGroup === index
    );

    return (
        <section id="skills" className="skills-section" aria-labelledby="skills-title">
            <div className="page-shell">
                <div className="section-heading-row">
                    <div>
                        <div className="section-kicker">
                            <span>03</span>
                            <span>{t.skills.label}</span>
                        </div>
                        <h2 id="skills-title" className="section-title">{t.skills.title}</h2>
                    </div>
                    <p>{t.skills.intro}</p>
                </div>

                <div className="skills-filter-tabs" role="group" aria-label="Filtrar competencias">
                    <button
                        type="button"
                        onClick={() => setSelectedGroup('all')}
                        className={cn('filter-button', selectedGroup === 'all' && 'is-active')}
                    >
                        Todas
                    </button>
                    {t.skills.groups.map((group, index) => (
                        <button
                            key={group.category}
                            type="button"
                            onClick={() => setSelectedGroup(index)}
                            className={cn('filter-button', selectedGroup === index && 'is-active')}
                        >
                            {group.category}
                        </button>
                    ))}
                </div>

                <div className="skills-grid">
                    {visibleGroups.map((group, index) => (
                        <section className="skill-group" key={group.category}>
                            <div className="skill-group-head">
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <h3>{group.category}</h3>
                            </div>
                            <div className="skill-list">
                                {group.items.map((item) => {
                                    const badge = getContextBadge(item.where);
                                    return (
                                        <div className="skill-row" key={item.name}>
                                            <div className="skill-row-title">
                                                <strong>{item.name}</strong>
                                                <span className={cn('skill-context-badge', badge.color)}>
                                                    {badge.label}
                                                </span>
                                            </div>
                                            <span className="skill-row-where">{item.where}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
