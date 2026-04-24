const identityRows = [
  { k: 'User', v: 'u.olsen@acme' },
  { k: 'Agent', v: 'agent.pk-93f' },
  { k: 'Workload', v: 'pod.sre-prod-4' },
] as const;

const gateChecks = ['identity binding', 'action scope', 'argument policy'] as const;

export function DelegationJourneyDiagram() {
  return (
    <div className="relative overflow-hidden bg-obsidian-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(63,232,196,0.08),transparent_24%),radial-gradient(circle_at_50%_78%,rgba(242,194,107,0.05),transparent_18%)]"
      />

      <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="mb-8 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.22em] text-fg-4 uppercase">
          <span className="hidden h-px w-16 bg-border-2 lg:block" />
          <span>Composite identity</span>
          <span className="text-aether-400">Policy decision</span>
          <span>Scoped enforcement</span>
          <span className="hidden h-px w-16 bg-border-2 lg:block" />
        </div>

        <div className="relative mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] lg:items-center lg:gap-10">
          <FlowBeam side="left" />
          <FlowBeam side="right" />

          <section className="relative rounded-[22px] border border-border-1 bg-[linear-gradient(180deg,rgba(20,23,34,0.98),rgba(12,15,23,0.98))] p-6 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.72)] lg:p-7">
            <StageTag n="01" label="Delegated request" />
            <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-aether-300 uppercase">
              Bound composite identity
            </p>
            <div className="mt-5 space-y-3">
              {identityRows.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[86px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border-2 bg-obsidian-900/70 px-4 py-3"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-fg-4 uppercase">
                    {row.k}
                  </span>
                  <span className="text-[15px] font-medium text-fg-1">{row.v}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[28ch] text-[13px] leading-[1.65] text-fg-3">
              The request carries who is acting, through what software, and from what trusted
              runtime.
            </p>
          </section>

          <section className="relative mx-auto w-full max-w-[300px]">
            <div className="absolute inset-[-18px] rounded-[30px] bg-[radial-gradient(circle,rgba(63,232,196,0.17),transparent_68%)] blur-xl" />
            <div className="relative rounded-[28px] border border-aether-700/45 bg-[linear-gradient(180deg,rgba(6,32,26,0.86),rgba(9,14,22,0.98))] p-4 shadow-[0_24px_60px_-32px_rgba(63,232,196,0.42)]">
              <div className="rounded-[22px] border border-aether-500/55 bg-[linear-gradient(180deg,rgba(15,18,28,0.95),rgba(11,14,22,0.98))] p-5">
                <StageTag n="02" label="Arcane policy gate" accent />
                <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-aether-300 uppercase">
                  Decision in &lt; 5 ms
                </p>
                <div className="mt-5 space-y-2">
                  {gateChecks.map((check) => (
                    <div
                      key={check}
                      className="flex items-center justify-between rounded-lg border border-border-2 bg-obsidian-900/75 px-3 py-2.5"
                    >
                      <span className="font-mono text-[12px] text-fg-2">{check}</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-aether-400 shadow-[0_0_10px_rgba(63,232,196,0.45)]" />
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-aether-700/50 bg-aether-900/35 px-4 py-3">
                  <div className="font-mono text-[10px] tracking-[0.16em] text-aether-300 uppercase">
                    Outcome
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-aether-400" />
                    <span className="font-mono text-[16px] tracking-[0.14em] text-aether-300 uppercase">
                      Allow
                    </span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-[1.55] text-fg-3">
                    Review and deny remain explicit first-class lanes.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-5 max-w-[230px]">
              <div className="absolute left-1/2 top-[-18px] h-[18px] w-px -translate-x-1/2 border-l border-dashed border-rune-500/45" />
              <div className="rounded-[18px] border border-rune-500/60 bg-[linear-gradient(180deg,rgba(30,22,8,0.8),rgba(18,13,5,0.98))] px-4 py-4 shadow-[0_18px_42px_-28px_rgba(217,154,43,0.45)]">
                <StageTag n="04" label="Signed audit trail" tone="rune" />
                <p className="mt-3 text-[13px] leading-[1.6] text-fg-2">
                  Every decision records the composite identity, task, rule, and outcome.
                </p>
              </div>
            </div>
          </section>

          <section className="relative rounded-[22px] border border-border-1 bg-[linear-gradient(180deg,rgba(20,23,34,0.98),rgba(12,15,23,0.98))] p-6 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.72)] lg:p-7">
            <StageTag n="03" label="Enforced call" />
            <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-aether-300 uppercase">
              Approved call only
            </p>
            <div className="mt-5 rounded-xl border border-border-2 bg-obsidian-900/70 px-4 py-4">
              <div className="font-mono text-[10px] tracking-[0.16em] text-fg-4 uppercase">
                Target
              </div>
              <div className="mt-3 text-[18px] font-medium tracking-[-0.02em] text-fg-1">
                GitHub repo
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill>push allowed</Pill>
                <Pill>branch != main</Pill>
                <Pill>scoped token</Pill>
              </div>
            </div>
            <p className="mt-5 max-w-[28ch] text-[13px] leading-[1.65] text-fg-3">
              Arcane sits in the action path, so the resource receives the constrained call instead
              of a broad credential ceiling.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function FlowBeam({ side }: { side: 'left' | 'right' }) {
  const sideClass =
    side === 'left'
      ? 'left-[29%] right-[50%] bg-[linear-gradient(90deg,rgba(63,232,196,0.15),rgba(63,232,196,0.8)_78%,rgba(63,232,196,0))]'
      : 'left-[50%] right-[12%] bg-[linear-gradient(90deg,rgba(63,232,196,0),rgba(63,232,196,0.82)_22%,rgba(63,232,196,0.12))]';

  const markerClass = side === 'left' ? 'right-[-1px]' : 'left-[-1px] rotate-180';

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute top-1/2 hidden h-px -translate-y-1/2 lg:block ${sideClass}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[9px] border-l-[16px] border-y-transparent border-l-aether-400/90 lg:block ${markerClass}`}
      />
    </>
  );
}

function StageTag({
  n,
  label,
  accent = false,
  tone = 'steel',
}: {
  n: string;
  label: string;
  accent?: boolean;
  tone?: 'steel' | 'rune';
}) {
  const colorClass = accent
    ? 'text-aether-300'
    : tone === 'rune'
      ? 'text-rune-400'
      : 'text-fg-4';

  return (
    <div className={`font-mono text-[11px] tracking-[0.22em] uppercase ${colorClass}`}>
      {`0${n}`.slice(-2)} · {label}
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-border-1 bg-obsidian-850 px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-fg-2 uppercase">
      {children}
    </span>
  );
}
