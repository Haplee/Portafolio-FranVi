import { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

export default function SoundToggle() {
    const [isOn, setIsOn] = useState(false);
    const ctxRef  = useRef<AudioContext | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const oscsRef = useRef<OscillatorNode[]>([]);

    const start = useCallback(() => {
        const ctx = new AudioContext();
        ctxRef.current = ctx;

        const master = ctx.createGain();
        master.gain.setValueAtTime(0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 2.5);
        master.connect(ctx.destination);
        gainRef.current = master;

        // Deep 55 Hz drone with LFO
        const o1 = ctx.createOscillator();
        o1.type = 'sine';
        o1.frequency.value = 55;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.07;
        const lfoG = ctx.createGain();
        lfoG.gain.value = 3.5;
        lfo.connect(lfoG);
        lfoG.connect(o1.frequency);
        const f1 = ctx.createBiquadFilter();
        f1.type = 'lowpass';
        f1.frequency.value = 280;
        o1.connect(f1);
        f1.connect(master);

        // 5th (E1)
        const o2 = ctx.createOscillator();
        o2.type = 'sine';
        o2.frequency.value = 82.4;
        const g2 = ctx.createGain();
        g2.gain.value = 0.38;
        o2.connect(g2);
        g2.connect(master);

        // High shimmer (triangle)
        const o3 = ctx.createOscillator();
        o3.type = 'triangle';
        o3.frequency.value = 220;
        const g3 = ctx.createGain();
        g3.gain.value = 0.012;
        const f3 = ctx.createBiquadFilter();
        f3.type = 'bandpass';
        f3.frequency.value = 600;
        o3.connect(f3);
        f3.connect(g3);
        g3.connect(master);

        [o1, lfo, o2, o3].forEach(o => o.start());
        oscsRef.current = [o1, lfo, o2, o3];
    }, []);

    const stop = useCallback(() => {
        if (!ctxRef.current || !gainRef.current) return;
        const ctx  = ctxRef.current;
        const gain = gainRef.current;
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8);
        setTimeout(() => {
            oscsRef.current.forEach(o => { try { o.stop(); } catch { /* already stopped */ } });
            ctx.close();
            ctxRef.current  = null;
            gainRef.current = null;
            oscsRef.current = [];
        }, 2000);
    }, []);

    const toggle = () => {
        if (isOn) stop(); else start();
        setIsOn(v => !v);
    };

    return (
        <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            title={isOn ? 'Silenciar' : 'Sonido ambiente'}
            aria-label={isOn ? 'Silenciar sonido ambiente' : 'Activar sonido ambiente'}
            className={`
                fixed bottom-24 right-5 z-50
                w-11 h-11 rounded-full flex items-center justify-center
                border backdrop-blur-md transition-all duration-300
                ${isOn
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-900/80 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-500'
                }
            `}
        >
            {isOn ? (
                /* sound-on icon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
            ) : (
                /* sound-off icon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
            )}
            {isOn && (
                <motion.span
                    className="absolute inset-0 rounded-full border border-cyan-400/30"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
            )}
        </motion.button>
    );
}
