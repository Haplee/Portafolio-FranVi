import { useEffect, useRef } from 'react';

const KONAMI: string[] = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

export function useKonami(onTrigger: () => void) {
    const idxRef = useRef(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            const expected = KONAMI[idxRef.current];
            if (key === expected) {
                idxRef.current++;
                if (idxRef.current === KONAMI.length) {
                    onTrigger();
                    idxRef.current = 0;
                }
            } else {
                idxRef.current = key === KONAMI[0] ? 1 : 0;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onTrigger]);
}
