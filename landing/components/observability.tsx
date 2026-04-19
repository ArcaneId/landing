import { Container } from './ui/container';
import { SectionHeader } from './ui/section-header';
import { observability } from '@/lib/content';

export function Observability() {
  return (
    <section
      id="observability"
      className="border-y border-border-2 bg-obsidian-950 px-7 py-[96px] lg:py-[120px]"
    >
      <Container>
        <SectionHeader
          eyebrow={observability.eyebrow}
          title={observability.title}
          lead={observability.lead}
          maxWidth={780}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {observability.pillars.map((p) => (
            <div
              key={p.tag}
              className="relative rounded-lg border border-border-1 bg-obsidian-800 p-6"
            >
              <div className="font-mono text-[10px] tracking-[0.18em] text-rune-500 uppercase">
                {p.tag}
              </div>
              <h3 className="mt-3 text-[16px] font-medium leading-[1.3] tracking-[-0.01em] text-fg-1">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-[1.6] text-fg-2">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
