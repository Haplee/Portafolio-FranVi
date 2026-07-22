import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import MagneticButton from './ui/MagneticButton';

const socials = [
    {
        name: 'Instagram',
        handle: '@franvidalmateo',
        icon: 'fab fa-instagram',
        link: 'https://www.instagram.com/franvidalmateo',
        border: 'hover:border-pink-500/40',
        iconColor: 'text-pink-400',
    },
    {
        name: 'X (Twitter)',
        handle: '@FranVidalMateo',
        icon: 'fab fa-x-twitter',
        link: 'https://x.com/FranVidalMateo',
        border: 'hover:border-white/30',
        iconColor: 'text-white',
    },
    {
        name: 'GitHub',
        handle: 'Haplee',
        icon: 'fab fa-github',
        link: 'https://github.com/Haplee',
        border: 'hover:border-cyan-500/40',
        iconColor: 'text-cyan-400',
    },
];

// formsubmit.co: free, no signup. First submission triggers email confirmation.
// Replace with real activated endpoint after first email arrives.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/fvidalmateo@gmail.com';
const EMAIL = 'fvidalmateo@gmail.com';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'fallback';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactSection() {
    const [form, setForm]       = useState<FormState>({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors]   = useState<FormErrors>({});
    const [status, setStatus]   = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!form.name.trim()) e.name = 'Nombre requerido';
        if (!form.email.trim()) e.email = 'Email requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no válido';
        if (!form.message.trim()) e.message = 'Mensaje requerido';
        else if (form.message.trim().length < 10) e.message = 'Mínimo 10 caracteres';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const openMailto = () => {
        const subject = form.subject || `Contacto desde portfolio · ${form.name}`;
        const body = `De: ${form.name} <${form.email}>\n\n${form.message}`;
        const url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;

        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json',
                },
                body: JSON.stringify({
                    name:    form.name,
                    email:   form.email,
                    _subject: form.subject || `Contacto portfolio · ${form.name}`,
                    _replyto: form.email,
                    _captcha: 'false',
                    _template: 'table',
                    message: form.message,
                }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (data.success === false || data.success === 'false') {
                throw new Error(data.message || 'Servicio rechazó el envío');
            }

            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 6000);
        } catch (err) {
            // Fallback: open mailto client automatically with form contents pre-filled
            setStatus('fallback');
            setErrorMsg(err instanceof Error ? err.message : 'Error desconocido');
            setTimeout(openMailto, 800);
            setTimeout(() => setStatus('idle'), 7000);
        }
    };

    const setField = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [k]: e.target.value }));
        if (errors[k as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [k]: undefined }));
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 px-4 w-full bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/2 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-[0.2em] mb-3 block">
                        <i aria-hidden="true" className="fas fa-paper-plane mr-2" />Conectemos
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 section-title inline-block">
                        Contacto
                    </h2>
                    <p className="text-slate-400 mt-8 max-w-lg mx-auto leading-relaxed">
                        ¿Propuesta laboral, proyecto, colaboración?<br />
                        Escríbeme — respondo en menos de 24h.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 hologram-card p-6 md:p-8 rounded-2xl border border-cyan-500/15 relative overflow-visible"
                        noValidate
                    >
                        {/* Star celebration overlay */}
                        <AnimatePresence>
                            {status === 'success' && (
                                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                                    {Array.from({ length: 20 }).map((_, i) => {
                                        const angle = (i / 20) * Math.PI * 2;
                                        const dist  = 200 + Math.random() * 200;
                                        return (
                                            <motion.span
                                                key={i}
                                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                                animate={{
                                                    x: Math.cos(angle) * dist,
                                                    y: Math.sin(angle) * dist,
                                                    opacity: [0, 1, 1, 0],
                                                    scale: [0, 1.2, 1, 0.5],
                                                    rotate: 360,
                                                }}
                                                transition={{ duration: 2 + Math.random() * 0.6, ease: 'easeOut' }}
                                                className="absolute top-1/2 left-1/2 text-amber-300"
                                                style={{ fontSize: `${14 + Math.random() * 14}px`, textShadow: '0 0 8px rgba(251,191,36,0.7)' }}
                                            >
                                                ✦
                                            </motion.span>
                                        );
                                    })}
                                </div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <FormField
                                label="Nombre"
                                error={errors.name}
                                icon="fa-user"
                            >
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={setField('name')}
                                    placeholder="Tu nombre"
                                    className="input-field"
                                    disabled={status === 'sending'}
                                    autoComplete="name"
                                />
                            </FormField>
                            <FormField
                                label="Email"
                                error={errors.email}
                                icon="fa-envelope"
                            >
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={setField('email')}
                                    placeholder="tu@email.com"
                                    className="input-field"
                                    disabled={status === 'sending'}
                                    autoComplete="email"
                                />
                            </FormField>
                        </div>

                        <FormField label="Asunto (opcional)" icon="fa-tag">
                            <input
                                type="text"
                                value={form.subject}
                                onChange={setField('subject')}
                                placeholder="Oferta laboral, colaboración, etc."
                                className="input-field"
                                disabled={status === 'sending'}
                            />
                        </FormField>

                        <FormField label="Mensaje" error={errors.message} icon="fa-comment">
                            <textarea
                                value={form.message}
                                onChange={setField('message')}
                                placeholder="Cuéntame en qué piensas..."
                                rows={5}
                                className="input-field resize-none"
                                disabled={status === 'sending'}
                                maxLength={2000}
                            />
                            <p className="text-[10px] text-slate-600 mt-1 text-right font-mono">
                                {form.message.length}/2000
                            </p>
                        </FormField>

                        <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <i aria-hidden="true" className="fas fa-shield-halved text-cyan-500/60" />
                                Sin spam — directo a mi email
                            </p>
                            <MagneticButton
                                type="submit"
                                disabled={status === 'sending'}
                                className={cn(
                                    'px-6 py-3 rounded-xl font-semibold text-sm transition-all',
                                    'bg-gradient-to-r from-cyan-600 to-blue-600 text-white',
                                    'shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40',
                                    'disabled:opacity-60 disabled:cursor-not-allowed'
                                )}
                            >
                                {status === 'sending'  && (<><i aria-hidden="true" className="fas fa-spinner fa-spin" /> Enviando...</>)}
                                {status === 'idle'     && (<><i aria-hidden="true" className="fas fa-paper-plane" /> Enviar mensaje</>)}
                                {status === 'success'  && (<><i aria-hidden="true" className="fas fa-check" /> Enviado</>)}
                                {status === 'fallback' && (<><i aria-hidden="true" className="fas fa-envelope" /> Abriendo email...</>)}
                                {status === 'error'    && (<><i aria-hidden="true" className="fas fa-exclamation-triangle" /> Reintentar</>)}
                            </MagneticButton>
                        </div>

                        {/* Status messages */}
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-5 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-sm text-green-300 relative z-10"
                                >
                                    <p className="font-semibold flex items-center gap-2">
                                        <i aria-hidden="true" className="fas fa-check-circle" /> ¡Mensaje enviado!
                                    </p>
                                    <p className="text-green-400/70 text-xs mt-1">
                                        Te responderé en menos de 24h a tu email.
                                    </p>
                                </motion.div>
                            )}
                            {status === 'fallback' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-200"
                                >
                                    <p className="font-semibold flex items-center gap-2">
                                        <i aria-hidden="true" className="fas fa-envelope-open-text" /> Abriendo tu cliente de email
                                    </p>
                                    <p className="text-amber-300/70 text-xs mt-1 leading-relaxed">
                                        El servicio formsubmit.co no está disponible aún (requiere activación tras primer envío). Abro tu app de email con el mensaje listo — solo dale a <b>Enviar</b>.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={openMailto}
                                        className="mt-2 text-xs text-amber-200 underline underline-offset-2 hover:text-amber-100"
                                    >
                                        ¿No se abrió? Click aquí
                                    </button>
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300"
                                >
                                    <p className="font-semibold flex items-center gap-2">
                                        <i aria-hidden="true" className="fas fa-exclamation-circle" /> No se pudo enviar
                                    </p>
                                    <p className="text-red-400/70 text-xs mt-1">
                                        {errorMsg || `Intenta de nuevo o escríbeme directamente a ${EMAIL}`}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>

                    {/* Socials sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="lg:col-span-2 flex flex-col gap-3"
                    >
                        <div className="hologram-card p-5 rounded-2xl border border-slate-700/40">
                            <h3 className="text-sm font-bold text-white mb-1">Email directo</h3>
                            <p className="text-xs text-slate-500 mb-3">Para reclutadores / contactos formales</p>
                            <a
                                href="mailto:fvidalmateo@gmail.com"
                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/15 transition-all text-sm font-mono break-all"
                            >
                                <i aria-hidden="true" className="fas fa-envelope text-cyan-400 flex-shrink-0" />
                                fvidalmateo@gmail.com
                            </a>
                        </div>

                        <div className="hologram-card p-5 rounded-2xl border border-slate-700/40">
                            <h3 className="text-sm font-bold text-white mb-3">Redes sociales</h3>
                            <div className="space-y-2">
                                {socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-700/40 bg-slate-800/30',
                                            'transition-all',
                                            s.border
                                        )}
                                    >
                                        <i aria-hidden="true" className={cn(s.icon, s.iconColor, 'text-lg w-5 text-center')} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-white">{s.name}</p>
                                            <p className="text-[10px] text-slate-500 truncate">{s.handle}</p>
                                        </div>
                                        <i aria-hidden="true" className="fas fa-arrow-up-right-from-square text-[9px] text-slate-600" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="hologram-card p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                                    Disponible
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Busco mi primera oportunidad como sysadmin o web developer junior.
                                Respondo rápido.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FormField({
    label, error, icon, children,
}: {
    label: string;
    error?: string;
    icon: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                <i aria-hidden="true" className={cn('fas', icon, 'text-cyan-500/70 text-[11px]')} />
                {label}
                {error && (
                    <span className="text-red-400 normal-case font-normal ml-auto">{error}</span>
                )}
            </label>
            {children}
        </div>
    );
}
