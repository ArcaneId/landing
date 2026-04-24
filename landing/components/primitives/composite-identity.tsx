import { Container } from '../ui/container';
import { Eyebrow } from '../ui/eyebrow';
import { SpecCard } from '../ui/spec-card';
import { CompositeIdentityDiagram } from '../diagrams/composite-identity';
import { compositeIdentity } from '@/lib/content';

export function CompositeIdentity() {
  return (
    <section id="composite-identity" className="px-7 py-[92px] lg:py-[112px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:items-start">
          <SpecCard label="◆ Composite identity" trailing="schema v1">
            <CompositeIdentityDiagram />
          </SpecCard>

          <div>
            <Eyebrow>{compositeIdentity.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[38px] font-medium leading-[1.03] tracking-[-0.032em] md:text-[52px]">
              {compositeIdentity.title}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.66] text-fg-2">{compositeIdentity.lead}</p>

            <div className="mt-7 flex flex-col gap-3">
              {compositeIdentity.layers.map((l) => (
                <div
                  key={l.tag}
                  className="grid gap-4 rounded-lg border border-border-1 bg-obsidian-800 p-4 sm:grid-cols-[176px_1fr] sm:px-5 sm:py-4"
                >
                  <div className="font-mono text-[10px] tracking-[0.16em] text-rune-500 uppercase">
                    {l.tag}
                  </div>
                  <div>
                    <div className="text-[15px] font-medium text-fg-1">{l.title}</div>
                    <div className="mt-1 font-mono text-[12px] text-fg-3">{l.sub}</div>
                    <div className="mt-1.5 font-mono text-[10.5px] tracking-[0.04em] text-fg-4">
                      ↪ {l.proves}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-md border border-[color-mix(in_oklab,var(--color-aether-500)_40%,transparent)] bg-[color-mix(in_oklab,var(--color-aether-500)_6%,transparent)] px-5 py-4">
              <div className="mb-1.5 font-mono text-[10px] tracking-[0.16em] text-aether-400 uppercase">
                The insight
              </div>
              <p className="text-[13.5px] leading-[1.6] text-fg-2">{compositeIdentity.insight}</p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
