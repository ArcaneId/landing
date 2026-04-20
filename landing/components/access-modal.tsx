'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from './ui/button';
import { accessForm } from '@/lib/content';

type AccessModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const AccessModalContext = createContext<AccessModalContextValue | null>(null);

export function useAccessModal(): AccessModalContextValue {
  const ctx = useContext(AccessModalContext);
  if (!ctx) throw new Error('useAccessModal must be used inside AccessModalProvider');
  return ctx;
}

export function AccessModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    if (typeof document !== 'undefined') {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    queueMicrotask(() => previouslyFocused.current?.focus?.());
  }, []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <AccessModalContext.Provider value={value}>
      {children}
      <AccessModal />
    </AccessModalContext.Provider>
  );
}

type FormState = {
  email: string;
  company: string;
  role: string;
  intent: string;
  _gotcha: string;
};

const emptyForm: FormState = { email: '', company: '', role: '', intent: '', _gotcha: '' };

type Step = 'form' | 'success';

function AccessModal() {
  const { isOpen, close } = useAccessModal();
  const reduced = useReducedMotion();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<Step>('form');
  const [data, setData] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep('form');
        setData(emptyForm);
        setSubmitting(false);
        setError(null);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // ESC + focus trap
  useEffect(() => {
    if (!isOpen) return;

    function getFocusable(): HTMLElement[] {
      const root = dialogRef.current;
      if (!root) return [];
      return Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('aria-hidden'));
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'Tab') {
        const items = getFocusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', onKey);
    // Initial focus
    queueMicrotask(() => firstFieldRef.current?.focus());
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, step]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (data._gotcha) return; // bot — drop silently
      setError(null);

      const endpoint = process.env.NEXT_PUBLIC_ACCESS_FORM_ENDPOINT;
      const payload = {
        email: data.email,
        company: data.company,
        role: data.role,
        intent: data.intent,
      };

      if (!endpoint) {
        // Dev / unconfigured fallback: open user's mail client
        const subject = encodeURIComponent(`Access request — ${payload.company || payload.email}`);
        const body = encodeURIComponent(
          `Email: ${payload.email}\nCompany: ${payload.company}\nRole: ${payload.role}\n\nWhat they're trying to do:\n${payload.intent}`,
        );
        window.location.href = `mailto:access@arcane.id?subject=${subject}&body=${body}`;
        setStep('success');
        return;
      }

      setSubmitting(true);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStep('success');
      } catch {
        setError(accessForm.errorCopy);
      } finally {
        setSubmitting(false);
      }
    },
    [data],
  );

  const bookingUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_BOOKING_URL;
    if (!base) return null;
    const params = new URLSearchParams();
    // Calendly-style prefill (also harmless for other providers)
    if (data.email) params.set('email', data.email);
    if (data.company) params.set('name', data.company);
    if (data.intent) params.set('a1', data.intent);
    // Disable Calendly's branding chrome inside the modal
    params.set('hide_event_type_details', '0');
    params.set('hide_gdpr_banner', '1');
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${sep}${params.toString()}`;
  }, [data.email, data.company, data.intent]);
  const ease = [0.2, 0.7, 0.2, 1] as const;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="access-modal-root"
          className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2, ease }}
        >
          <button
            type="button"
            aria-label={accessForm.closeLabel}
            onClick={close}
            className="absolute inset-0 cursor-default bg-obsidian-950/85 backdrop-blur-sm"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: reduced ? 1 : 0.98, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.98, y: reduced ? 0 : 8 }}
            transition={{ duration: reduced ? 0 : 0.28, ease }}
            className="relative z-10 flex max-h-[calc(100vh-64px)] w-full max-w-[560px] flex-col overflow-hidden rounded-xl border border-border-1 bg-obsidian-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border-2 px-6 py-5">
              <div className="min-w-0">
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-fg-3 uppercase">
                  △ Access
                </span>
                <h2 id={titleId} className="mt-1.5 font-serif text-[22px] leading-[1.15] text-fg-1">
                  {step === 'form' ? accessForm.title : accessForm.successTitle}
                </h2>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-fg-3">
                  {step === 'form' ? accessForm.lead : accessForm.successSub}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={accessForm.closeLabel}
                className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-3 transition-colors hover:bg-obsidian-800 hover:text-fg-1"
              >
                <span className="font-mono text-[14px] leading-none">✕</span>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6">
              {step === 'form' ? (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                  <Field
                    label={accessForm.fields.email.label}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={accessForm.fields.email.placeholder}
                    value={data.email}
                    onChange={(v) => setData((d) => ({ ...d, email: v }))}
                    inputRef={firstFieldRef}
                  />
                  <Field
                    label={accessForm.fields.company.label}
                    name="company"
                    required
                    autoComplete="organization"
                    placeholder={accessForm.fields.company.placeholder}
                    value={data.company}
                    onChange={(v) => setData((d) => ({ ...d, company: v }))}
                  />
                  <Field
                    label={accessForm.fields.role.label}
                    name="role"
                    required
                    autoComplete="organization-title"
                    placeholder={accessForm.fields.role.placeholder}
                    value={data.role}
                    onChange={(v) => setData((d) => ({ ...d, role: v }))}
                  />
                  <Field
                    label={accessForm.fields.intent.label}
                    name="intent"
                    required
                    multiline
                    rows={3}
                    placeholder={accessForm.fields.intent.placeholder}
                    value={data.intent}
                    onChange={(v) => setData((d) => ({ ...d, intent: v }))}
                  />

                  {/* Honeypot */}
                  <div aria-hidden="true" className="sr-only">
                    <label>
                      Leave this field empty
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data._gotcha}
                        onChange={(e) => setData((d) => ({ ...d, _gotcha: e.target.value }))}
                      />
                    </label>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10.5px] tracking-[0.16em] text-fg-4 uppercase">
                      ☍ One business day
                    </span>
                    <Button type="submit" icon="→" disabled={submitting}>
                      {submitting ? accessForm.submitting : accessForm.submit}
                    </Button>
                  </div>

                  {error ? (
                    <p
                      role="alert"
                      className="rounded-md border border-ember-700/60 bg-ember-700/15 px-3 py-2 text-[12.5px] text-ember-400"
                    >
                      {error}
                    </p>
                  ) : null}
                </form>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-aether-700/60 bg-aether-900/40 px-3 py-1">
                    <span className="font-mono text-[11px] text-aether-300">✓ received</span>
                  </div>

                  {bookingUrl ? (
                    <>
                      <iframe
                        src={bookingUrl}
                        title="Book a kickoff call"
                        className="h-[700px] w-full rounded-md border border-border-1 bg-obsidian-950"
                        loading="lazy"
                      />
                    </>
                  ) : null}

                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={close}>
                      {accessForm.closeLabel}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  autoComplete,
  multiline,
  rows = 3,
  inputRef,
}: FieldProps) {
  const id = useId();
  const inputClass =
    'w-full rounded-md border border-border-1 bg-bg-input px-3 py-2.5 text-[13.5px] text-fg-1 placeholder:text-fg-4 transition-colors focus:border-aether-500 focus:outline-none';
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10.5px] tracking-[0.16em] text-fg-3 uppercase"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass + ' resize-y leading-[1.5]'}
        />
      ) : (
        <input
          id={id}
          ref={inputRef}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );
}
