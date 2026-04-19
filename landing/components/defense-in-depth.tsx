import { Container } from './ui/container';
import { SectionHeader } from './ui/section-header';
import { defenseInDepth } from '@/lib/content';

const layerColor: Record<string, string> = {
  User: 'text-aether-300',
  Agent: 'text-aether-300',
  Workload: 'text-rune-400',
  Token: 'text-rune-400',
  Enforcement: 'text-ember-400',
};

export function DefenseInDepth() {
  return (
    <section id="defense" className="px-7 py-[96px] lg:py-[120px]">
      <Container>
        <SectionHeader
          eyebrow={defenseInDepth.eyebrow}
          title={defenseInDepth.title}
          lead={defenseInDepth.lead}
          maxWidth={780}
        />

        <div className="mt-12 overflow-hidden rounded-xl border border-border-1 bg-obsidian-950">
          {/* header row */}
          <div className="hidden grid-cols-[1.4fr_1.2fr_180px] gap-4 border-b border-border-2 px-6 py-4 md:grid">
            <span className="font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase">
              Attack scenario
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase">
              How Arcane catches it
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase">
              Layer
            </span>
          </div>

          {defenseInDepth.scenarios.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 border-t border-border-2 px-6 py-5 first:border-t-0 md:grid-cols-[1.4fr_1.2fr_180px] md:gap-4 md:py-4"
            >
              <div>
                <span className="font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase md:hidden">
                  Attack
                </span>
                <div className="text-[14px] leading-[1.55] text-fg-1">{s.attack}</div>
              </div>
              <div>
                <span className="font-mono text-[9.5px] tracking-[0.18em] text-fg-4 uppercase md:hidden">
                  Caught by
                </span>
                <div className="font-mono text-[12.5px] leading-[1.55] text-aether-300">
                  → {s.caught}
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border border-border-1 bg-obsidian-850 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.18em] uppercase ${
                    layerColor[s.layer] ?? 'text-fg-2'
                  }`}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  {s.layer}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
