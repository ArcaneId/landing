import { DelegationJourneyDiagram } from './diagrams/delegation-journey';
import { Container } from './ui/container';
import { SectionHeader } from './ui/section-header';
import { SpecCard } from './ui/spec-card';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border-2 bg-obsidian-950 px-7 py-[88px] lg:py-[112px]">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          eyebrowGlyph="△"
          title="From delegated task to governed outcome — one evaluation, one signed decision."
          lead="A composite identity is bound, exchanged for a short-lived task-scoped token, evaluated against policy in under five milliseconds, and enforced inline at the tool call or proxy boundary. Every step leaves a cryptographic trace."
          maxWidth={780}
        />

        <div className="mt-10 overflow-hidden rounded-[22px] border border-border-1 bg-obsidian-950 shadow-[0_32px_80px_-48px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2.5 border-b border-border-2 px-4 py-3">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-aether-400 uppercase">
              △ Guided flow
            </span>
            <div className="flex-1" />
            <span className="font-mono text-[10px] text-fg-4">
              from task delegation to enforced action
            </span>
          </div>
          <DelegationJourneyDiagram />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['Composite identity stays attached', 'User, agent, and workload are bound into one authorization context — so every request answers who, through what software, running where.'],
            ['Decisions happen at the argument', 'Policy evaluates the specific tool call and its arguments at invocation — not once at token issuance, not just at the request boundary.'],
            ['Every decision is audit-ready', 'Allow, review, and deny all stream to a tamper-resistant log with the full chain: composite identity, task, matching rule, and outcome.'],
          ].map(([title, body], idx) => (
            <SpecCard
              key={title}
              label={`0${idx + 1} · takeaway`}
              className="surface-gradient group rounded-[18px]"
            >
              <div className="px-5 py-5">
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-fg-1">{title}</h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-fg-2">{body}</p>
              </div>
            </SpecCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
