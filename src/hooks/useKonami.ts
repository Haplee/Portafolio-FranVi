import { useEffect, useRef } from 'react';

const KONAMI: readonly string[] = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
] as const;

// Si pasan más de estos ms entre teclas, se reinicia el progreso: obliga a
// teclear la secuencia "del tirón", como el código original de consola.
const RESET_MS = 1500;

function isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export function useKonami(onTrigger: () => void) {
    const idxRef = useRef(0);
    const lastTsRef = useRef(0);
    // Mantiene el callback fresco sin re-vincular el listener en cada render.
    const cbRef = useRef(onTrigger);
    useEffect(() => {
        cbRef.current = onTrigger;
    });

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // Ignora auto-repetición (tecla mantenida) y escritura en campos.
            if (e.repeat || isEditableTarget(e.target)) return;

            const now = e.timeStamp;
            if (idxRef.current > 0 && now - lastTsRef.current > RESET_MS) {
                idxRef.current = 0;
            }
            lastTsRef.current = now;

            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

            if (key === KONAMI[idxRef.current]) {
                idxRef.current++;
                if (idxRef.current === KONAMI.length) {
                    idxRef.current = 0;
                    cbRef.current();
                }
            } else {
                // Reinicia, pero permite que esta tecla ya cuente como inicio.
                idxRef.current = key === KONAMI[0] ? 1 : 0;
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
}
