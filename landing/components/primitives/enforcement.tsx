import { Container } from '../ui/container';
import { SectionHeader } from '../ui/section-header';
import { SpecCard } from '../ui/spec-card';
import { EnforcementLanesDiagram } from '../diagrams/enforcement-lanes';
import { enforcement } from '@/lib/content';

export function EnforcementPlane() {
  return (
    <section
      id="enforcement"
      className="border-y border-border-2 bg-obsidian-950 px-7 py-[96px] lg:py-[120px]"
    >
      <Container>
        <SectionHeader
          eyebrow={enforcement.eyebrow}
          title={enforcement.title}
          lead={enforcement.lead}
          maxWidth={780}
        />

        <div className="mt-12">
          <SpecCard label="△ Two enforcement modes" trailing="one policy engine behind both">
            <EnforcementLanesDiagram />
          </SpecCard>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {enforcement.modes.map((m) => (
            <div
              key={m.tag}
              className="rounded-lg border border-border-1 bg-obsidian-800 p-7"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="font-mono text-[12px] text-rune-500">{m.glyph}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-rune-500 uppercase">
                  {m.tag}
                </span>
              </div>
              <h3 className="text-[20px] font-medium tracking-[-0.02em] text-fg-1">{m.title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.65] text-fg-2">{m.body}</p>

              <div className="mt-4 flex flex-col gap-2 border-t border-dashed border-border-2 pt-4">
                {m.bullets.map((b) => (
                  <div key={b} className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] text-aether-400">→</span>
                    <span className="text-[13px] text-fg-2">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-md border border-border-2 bg-obsidian-850 px-3.5 py-2.5">
                <div className="font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase">
                  Use when
                </div>
                <div className="mt-1 text-[12.5px] text-fg-2">{m.useWhen}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
