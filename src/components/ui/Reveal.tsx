import { motion } from 'motion/react';
import type { ReactNode } from 'react';

// La única animación de scroll de la página: una entrada, una vez, 12 px.
// Existe para dar un instante de foco al bloque que aparece, no para llamar
// la atención — por eso es corta, sutil y no se repite al volver a subir.
// `MotionConfig reducedMotion="user"` la anula si el sistema lo pide.
export default function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}
