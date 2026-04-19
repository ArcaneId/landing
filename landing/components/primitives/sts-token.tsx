import { Container } from '../ui/container';
import { Eyebrow } from '../ui/eyebrow';
import { CodeCard } from '../ui/code-card';
import { SpecCard } from '../ui/spec-card';
import { StsFlowDiagram } from '../diagrams/sts-flow';
import { sts } from '@/lib/content';

export function StsAndToken() {
  return (
    <section
      id="sts"
      className="border-y border-border-2 bg-obsidian-950 px-7 py-[96px] lg:py-[120px]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{sts.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[36px] font-medium leading-[1.05] tracking-[-0.032em] md:text-[44px]">
              {sts.title}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-fg-2">{sts.lead}</p>
            <p className="mt-4 text-[16px] leading-[1.65] text-fg-2">
              <span className="serif-italic">{sts.notBearer}</span>
            </p>
          </div>

          <CodeCard label="Arcane_token · decoded" labelTone="aether" trailing="issued 14:02:07 UTC">
            <code>
              <span className="text-fg-4">{`{`}</span>
              {'\n  '}
              <span className="text-rune-400">&quot;iss&quot;</span>:{' '}
              <span className="text-aether-300">&quot;sts.arcane&quot;</span>,{'\n  '}
              <span className="text-rune-400">&quot;sub&quot;</span>:{' '}
              <span className="text-aether-300">
                &quot;composite/u.olsen@acme|agent.pk-93f|pod.sre-prod-4&quot;
              </span>
              ,{'\n  '}
              <span className="text-rune-400">&quot;task&quot;</span>:{' '}
              <span className="text-aether-300">&quot;reconcile-invoices-q3&quot;</span>,{'\n  '}
              <span className="text-rune-400">&quot;scopes&quot;</span>: [
              <span className="text-aether-300">&quot;jira.read:proj/FIN&quot;</span>,{' '}
              <span className="text-aether-300">&quot;confluence.write:space/FIN-OPS&quot;</span>
              ],{'\n  '}
              <span className="text-rune-400">&quot;constraints&quot;</span>: {`{ `}
              <span className="text-rune-400">&quot;net&quot;</span>:{' '}
              <span className="text-aether-300">&quot;corp-vpn&quot;</span>,{' '}
              <span className="text-rune-400">&quot;rate&quot;</span>:{' '}
              <span style={{ color: '#F5C969' }}>60</span> {`}`},{'\n  '}
              <span className="text-rune-400">&quot;exp&quot;</span>:{' '}
              <span style={{ color: '#F5C969' }}>1744209120</span>{'  '}
              <span className="text-fg-4">{`// ttl: 15m`}</span>
              {'\n'}
              <span className="text-fg-4">{`}`}</span>
            </code>
          </CodeCard>
        </div>

        <div className="mt-14">
          <SpecCard label="△ STS flow" trailing="exchange → validate → issue → expire">
            <StsFlowDiagram />
          </SpecCard>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sts.flow.map((s) => (
              <div
                key={s.n}
                className="rounded-lg border border-border-1 bg-obsidian-850 px-4 py-3"
              >
                <div className="font-mono text-[9.5px] tracking-[0.18em] text-rune-500 uppercase">
                  {s.n}
                </div>
                <div className="mt-1 text-[13px] font-medium text-fg-1">{s.label}</div>
                <div className="mt-1 font-mono text-[10.5px] text-fg-3">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
