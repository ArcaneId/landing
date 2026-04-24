import { Container } from './ui/container';
import { Eyebrow } from './ui/eyebrow';
import { threatModel } from '@/lib/content';

export function ThreatModel() {
  return (
    <section
      id="problem"
      className="border-y border-border-2 bg-obsidian-950 px-7 py-[96px] lg:py-[120px]"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow glyph="◇">{threatModel.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[40px] font-medium leading-[1.04] tracking-[-0.035em] md:text-[48px]">
              Agents are not users.
              <br />
              <span className="text-fg-3">Agents are not service accounts.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-fg-2">
              A human clicks one action. A service account does one narrow job. An agent accepts an
              abstract task, plans steps, decides what tools to call, transforms parameters, and
              performs hundreds of delegated actions in a day on behalf of a single employee.
            </p>
            <p className="mt-4 text-[16px] leading-[1.65] text-fg-2">
              Traditional OAuth scopes and API keys tell you the ceiling of what is{' '}
              <span className="serif-italic text-fg-1">possible</span>, not the safe subset of what
              should <span className="serif-italic text-fg-1">happen</span> in a specific task.
            </p>

            <div className="mt-8 inline-block rounded-lg border border-dashed border-[color-mix(in_oklab,var(--color-aether-500)_40%,transparent)] bg-[color-mix(in_oklab,var(--color-aether-500)_6%,transparent)] px-5 py-3">
              <span className="font-mono text-[10px] tracking-[0.16em] text-aether-400 uppercase">
                {threatModel.banner}
              </span>
            </div>
          </div>

          {/* control matrix */}
          <div>
            <div className="mb-3 hidden grid-cols-[1.2fr_1fr_0.8fr] gap-3 px-1 font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase md:grid">
              <span>Agent behavior</span>
              <span>Legacy auth expresses</span>
              <span>Gap</span>
            </div>

            <div className="overflow-hidden rounded-[10px] border border-border-1 bg-obsidian-800">
              {threatModel.rows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 gap-3 px-4 py-4 text-[13.5px] md:grid-cols-[1.2fr_1fr_0.8fr] ${
                    i > 0 ? 'border-t border-border-2' : ''
                  }`}
                >
                  <div>
                    <span className="font-mono text-[9.5px] tracking-[0.16em] text-fg-4 uppercase md:hidden">
                      Agent behavior
                    </span>
                    <div className="mt-1 text-fg-1 md:mt-0">{row.agent}</div>
                  </div>
                  <div>
                    <span className="font-mono text-[9.5px] tracking-[0.16em] text-fg-4 uppercase md:hidden">
                      Legacy auth
                    </span>
                    <div className="mt-1 font-mono text-[12px] text-fg-3 md:mt-0">{row.legacy}</div>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.04em] text-rune-400 uppercase md:self-start">
                    <span className="mr-2 text-fg-4 md:hidden">Gap</span>
                    {row.gap}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
