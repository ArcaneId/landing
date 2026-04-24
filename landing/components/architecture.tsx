import { Container } from './ui/container';
import { SectionHeader } from './ui/section-header';
import { ArchitectureOverviewDiagram } from './diagrams/architecture-overview';
import { architecture } from '@/lib/content';

export function Architecture() {
  return (
    <section id="architecture" className="px-7 py-[96px] lg:py-[120px]">
      <Container>
        <SectionHeader
          eyebrow={architecture.eyebrow}
          title={architecture.title}
          lead={architecture.lead}
          maxWidth={820}
        />

        <div className="mt-12 overflow-hidden rounded-xl border border-border-1 bg-obsidian-950">
          <div className="flex items-center gap-2.5 border-b border-border-2 px-4 py-2.5">
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-fg-3 uppercase">
              △ System diagram
            </span>
            <div className="flex-1" />
            <span className="font-mono text-[10px] text-fg-4">schema v1 · last rev 26.4.18</span>
          </div>
          <div className="relative">
            <ArchitectureOverviewDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
