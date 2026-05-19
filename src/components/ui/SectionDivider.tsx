import { motion } from 'motion/react';

interface Props {
    variant?: 'star' | 'line' | 'cancer';
}

export default function SectionDivider({ variant = 'star' }: Props) {
    return (
        <div className="relative w-full flex items-center justify-center py-2 md:py-3 -my-1 bg-gradient-to-b from-transparent via-slate-950/0 to-transparent overflow-hidden" aria-hidden="true">
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="flex items-center gap-3 w-full max-w-3xl px-6"
            >
                <span className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
                {variant === 'star' && (
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        className="text-cyan-500/70 text-xs select-none"
                    >
                        ✦
                    </motion.span>
                )}
                {variant === 'cancer' && (
                    <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-amber-500/80 text-sm select-none"
                    >
                        ♋
                    </motion.span>
                )}
                {variant === 'line' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/70" />}
                <span className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
            </motion.div>
        </div>
    );
}
