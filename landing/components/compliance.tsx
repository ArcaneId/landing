import { Container } from './ui/container';
import { Eyebrow } from './ui/eyebrow';
import { compliance } from '@/lib/content';

export function Compliance() {
  return (
    <section id="compliance" className="px-7 py-[96px] lg:py-[120px]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>{compliance.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[36px] font-medium leading-[1.05] tracking-[-0.032em] md:text-[44px]">
              {compliance.title}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-fg-2">{compliance.lead}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {compliance.badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-border-1 bg-obsidian-850 px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-fg-2 uppercase"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-aether-400 shadow-[0_0_6px_var(--aether-glow)]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border-1 bg-obsidian-800 p-7">
            <div className="mb-4 font-mono text-[10px] tracking-[0.18em] text-rune-500 uppercase">
              ◆ Operating tenets
            </div>
            <ul className="flex flex-col gap-4">
              {compliance.tenets.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[3px] font-mono text-[11px] text-aether-400">
                    0{i + 1}
                  </span>
                  <span className="text-[14px] leading-[1.6] text-fg-2">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
