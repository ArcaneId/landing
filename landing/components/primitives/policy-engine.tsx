import clsx from 'clsx';
import { Container } from '../ui/container';
import { Eyebrow } from '../ui/eyebrow';
import { CodeCard } from '../ui/code-card';
import { SpecCard } from '../ui/spec-card';
import { PolicyHexDiagram } from '../diagrams/policy-hex';
import { policy } from '@/lib/content';

const toneClass = {
  allow: 'text-allow',
  review: 'text-review',
  deny: 'text-deny',
} as const;

export function PolicyEngine() {
  return (
    <section id="policy" className="px-7 py-[96px] lg:py-[120px]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">
          <div>
            <Eyebrow>{policy.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[36px] font-medium leading-[1.05] tracking-[-0.032em] md:text-[44px]">
              {policy.title}
            </h2>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.65] text-fg-2">
              {policy.lead}
            </p>

            <div className="mt-7">
              <CodeCard label="policy / jira_finance.rego" trailing={<span className="text-allow">● ACTIVE</span>}>
                <code>
                  <span className="text-steel-400">{'# agents on the reconcile workflow may read Jira'}</span>
                  {'\n'}
                  <span className="text-steel-400">{'# in FIN projects, from corporate network only.'}</span>
                  {'\n'}
                  <span className="text-aether-400">allow</span> {`{`}
                  {'\n  input.agent.trust_tier >= '}
                  <span style={{ color: '#F5C969' }}>2</span>
                  {'\n  input.action == '}
                  <span className="text-aether-300">&quot;jira.read&quot;</span>
                  {'\n  startswith(input.resource.project, '}
                  <span className="text-aether-300">&quot;FIN-&quot;</span>
                  {')\n  input.workload.network == '}
                  <span className="text-aether-300">&quot;corp-vpn&quot;</span>
                  {'\n'}
                  <span className="text-aether-400">{'}'}</span>
                </code>
              </CodeCard>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {policy.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border-1 bg-obsidian-850 px-3 py-1.5 font-mono text-[11.5px] text-fg-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SpecCard label="△ Decision lanes" trailing="24h · 14.2M evals">
              <PolicyHexDiagram />
              <div className="grid grid-cols-3 border-t border-border-2 px-5 py-3">
                {policy.lanes.map((l) => (
                  <div key={l.k}>
                    <div className="font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase">
                      {l.k}
                    </div>
                    <div
                      className={clsx(
                        'mt-1 font-mono text-[20px] tracking-[-0.02em]',
                        toneClass[l.tone],
                      )}
                    >
                      {l.v}
                    </div>
                  </div>
                ))}
              </div>
            </SpecCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
