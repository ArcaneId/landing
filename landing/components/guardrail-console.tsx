'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type Lane = 'allow' | 'review' | 'deny';

type Scenario = {
  id: string;
  task: string;
  action: string;
  resource: string;
  user: string;
  agent: string;
  workload: string;
  network: string;
  lane: Lane;
  rule: string;
  latencyMs: number;
};

const scenarios: Scenario[] = [
  {
    id: 'allow',
    task: 'reconcile-invoices-q3',
    action: 'jira.read',
    resource: 'project: FIN-OPS',
    user: 'u.olsen@acme',
    agent: 'agent.pk-93f · tier 2',
    workload: 'pod.sre-prod-4 · attested',
    network: 'corp-vpn',
    lane: 'allow',
    rule: 'jira_finance.allow · line 14',
    latencyMs: 3,
  },
  {
    id: 'review',
    task: 'close-q3-books',
    action: 'netsuite.post',
    resource: 'ledger: 2026-Q3',
    user: 'u.olsen@acme',
    agent: 'agent.pk-93f · tier 2',
    workload: 'pod.sre-prod-4 · attested',
    network: 'corp-vpn',
    lane: 'review',
    rule: 'ledger_write.requires_human · line 27',
    latencyMs: 4,
  },
  {
    id: 'deny',
    task: 'export-payroll',
    action: 'workday.export',
    resource: 'comp-table-2026',
    user: 'u.olsen@acme',
    agent: 'agent.pk-93f · tier 2',
    workload: 'laptop.mac-4c · unattested',
    network: 'public-wifi',
    lane: 'deny',
    rule: 'workload_attestation.required · line 3',
    latencyMs: 2,
  },
];

const laneCopy: Record<Lane, { label: string; color: string; bg: string; border: string; blurb: string }> = {
  allow: {
    label: 'ALLOW',
    color: 'text-allow',
    bg: 'bg-[color-mix(in_oklab,var(--color-allow)_12%,transparent)]',
    border: 'border-[color-mix(in_oklab,var(--color-allow)_45%,transparent)]',
    blurb: 'Request forwarded to resource · audit entry signed',
  },
  review: {
    label: 'REVIEW',
    color: 'text-review',
    bg: 'bg-[color-mix(in_oklab,var(--color-review)_12%,transparent)]',
    border: 'border-[color-mix(in_oklab,var(--color-review)_45%,transparent)]',
    blurb: 'Held pending human approval · escalation sent to owner',
  },
  deny: {
    label: 'DENY',
    color: 'text-deny',
    bg: 'bg-[color-mix(in_oklab,var(--color-deny)_12%,transparent)]',
    border: 'border-[color-mix(in_oklab,var(--color-deny)_45%,transparent)]',
    blurb: 'Blocked at the enforcement plane · no leakage to upstream',
  },
};

export function GuardrailConsole() {
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();
  const s = scenarios[idx];

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % scenarios.length), 4200);
    return () => clearInterval(t);
  }, [reduced]);

  const lane = laneCopy[s.lane];

  return (
    <div className="overflow-hidden rounded-xl border border-border-1 bg-obsidian-950">
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-border-2 px-4 py-2.5">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aether-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-aether-500 shadow-[0_0_10px_var(--aether-glow)]" />
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.16em] text-fg-3 uppercase">
          Guardrail · Live
        </span>
        <div className="flex-1" />
        <span className="font-mono text-[10.5px] text-fg-4">policy_ver 042</span>
        <span className="ml-3 font-mono text-[10.5px] text-fg-4">
          latency <span className="text-aether-400">{s.latencyMs}ms</span>
        </span>
      </div>

      {/* body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr]">
        {/* INBOUND TOKEN */}
        <div className="border-b border-border-2 p-5 lg:border-b-0 lg:border-r">
          <div className="mb-3 font-mono text-[9.5px] tracking-[0.18em] text-rune-500 uppercase">
            01 · Inbound
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id + '-t'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              className="space-y-2 font-mono text-[11.5px] leading-[1.7]"
            >
              <Row k="task" v={s.task} />
              <Row k="action" v={s.action} />
              <Row k="resource" v={s.resource} />
              <div className="my-3 border-t border-dashed border-border-2" />
              <Row k="user" v={s.user} />
              <Row k="agent" v={s.agent} />
              <Row k="workload" v={s.workload} flag={s.workload.includes('unattested')} />
              <Row k="net" v={s.network} flag={s.network === 'public-wifi'} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* POLICY EVAL */}
        <div className="border-b border-border-2 p-5 lg:border-b-0 lg:border-r">
          <div className="mb-3 font-mono text-[9.5px] tracking-[0.18em] text-rune-500 uppercase">
            02 · Evaluate
          </div>
          <div className="relative">
            <div className="space-y-1.5">
              {['workload.attested', 'user.role == finance', 'action in allow_set', 'rate.within_limits'].map(
                (check, i) => (
                  <Check key={check} label={check} order={i} scenarioId={s.id} />
                ),
              )}
            </div>
            <div className="mt-5 rounded-md border border-border-2 bg-obsidian-850 px-3 py-2.5">
              <div className="font-mono text-[9.5px] tracking-[0.16em] text-fg-4 uppercase">
                Matched rule
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id + '-r'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1 font-mono text-[11.5px] text-fg-2"
                >
                  {s.rule}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* OUTCOME */}
        <div className="p-5">
          <div className="mb-3 font-mono text-[9.5px] tracking-[0.18em] text-rune-500 uppercase">
            03 · Outcome
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id + '-o'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={clsx('rounded-lg border px-4 py-4', lane.border, lane.bg)}>
                <div className={clsx('font-mono text-[12px] font-medium tracking-[0.18em]', lane.color)}>
                  ● {lane.label}
                </div>
                <div className="mt-2 text-[13px] leading-[1.55] text-fg-2">{lane.blurb}</div>
              </div>

              <div className="mt-4 space-y-2 font-mono text-[11.5px]">
                <Row k="trace_id" v={`trc_${s.id}_7f3a…`} />
                <Row k="signed_by" v="sts.arcane · jwks#k2" />
                <Row k="audit" v="streamed to siem · kept 2y" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* footer strip */}
      <div className="flex items-center gap-5 border-t border-border-2 px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.18em] text-fg-4 uppercase">
          24h · 14.2M evals
        </span>
        <div className="flex-1" />
        <LaneBadge lane="allow" pct="92.4%" active={s.lane === 'allow'} />
        <LaneBadge lane="review" pct="5.1%" active={s.lane === 'review'} />
        <LaneBadge lane="deny" pct="2.5%" active={s.lane === 'deny'} />
      </div>
    </div>
  );
}

function Row({ k, v, flag }: { k: string; v: string; flag?: boolean }) {
  return (
    <div className="grid grid-cols-[70px_1fr] gap-3">
      <span className="text-fg-4">{k}</span>
      <span className={clsx(flag ? 'text-deny' : 'text-aether-300')}>{v}</span>
    </div>
  );
}

function Check({
  label,
  order,
  scenarioId,
}: {
  label: string;
  order: number;
  scenarioId: string;
}) {
  // Decide per-check outcome based on scenario
  const result =
    scenarioId === 'deny' && label === 'workload.attested'
      ? 'fail'
      : scenarioId === 'review' && label === 'action in allow_set'
        ? 'hold'
        : 'pass';

  const color =
    result === 'fail' ? 'text-deny' : result === 'hold' ? 'text-review' : 'text-allow';
  const glyph = result === 'fail' ? '✕' : result === 'hold' ? '◐' : '✓';

  return (
    <motion.div
      key={scenarioId + label}
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 * order, duration: 0.22 }}
      className="flex items-center gap-2.5 font-mono text-[11.5px]"
    >
      <span className={clsx('w-3 text-center', color)}>{glyph}</span>
      <span className="text-fg-2">{label}</span>
    </motion.div>
  );
}

function LaneBadge({ lane, pct, active }: { lane: Lane; pct: string; active: boolean }) {
  const l = laneCopy[lane];
  return (
    <div
      className={clsx(
        'flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase transition-opacity',
        active ? l.border : 'border-border-2',
        active ? l.bg : '',
        active ? 'opacity-100' : 'opacity-55',
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full', l.color.replace('text-', 'bg-'))} />
      <span className={l.color}>{l.label}</span>
      <span className="text-fg-3">{pct}</span>
    </div>
  );
}
