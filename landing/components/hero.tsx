import Image from 'next/image';
import { Container } from './ui/container';
import { Eyebrow } from './ui/eyebrow';
import { Button } from './ui/button';
import { GuardrailConsole } from './guardrail-console';
import { hero } from '@/lib/content';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border-2 px-7 pt-[72px] pb-[80px] lg:pt-[104px] lg:pb-[110px]"
    >
      {/* dot-grid backdrop */}
      <div
        aria-hidden
        className="bg-dotgrid pointer-events-none absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 35%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 35%, black 30%, transparent 75%)',
        }}
      />
      {/* large sigil watermark, centered-right */}
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-24%] opacity-[0.13]">
        <Image src="/assets/sigil.svg" alt="" width={820} height={820} />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-[900px] text-center">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            className="mt-6 font-medium text-fg-1"
            style={{
              fontSize: 'clamp(48px, 7.2vw, 84px)',
              lineHeight: 0.96,
              letterSpacing: '-0.042em',
            }}
          >
            {hero.headlineLead}{' '}
            <span className="serif-italic text-aether-400">{hero.headlineSerif}</span>
            <br />
            {hero.headlineTrail}
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.55] text-fg-2">
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="#cta" icon="→">
              {hero.primaryCta}
            </Button>
            <Button as="a" href="#architecture" variant="ghost">
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

        {/* guardrail console */}
        <div className="relative mt-16 lg:mt-20">
          <GuardrailConsole />
        </div>

        {/* trusted-by */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-4 uppercase">
            {hero.trustedByLabel}
          </span>
          {hero.trustedBy.map((l) => (
            <span
              key={l}
              className="font-mono text-[11px] font-semibold tracking-[0.2em] text-steel-400"
            >
              {l}
            </span>
          ))}
        </div>

        {/* inline spec strip */}
        <div className="mx-auto mt-10 grid max-w-[760px] grid-cols-1 overflow-hidden rounded-lg border border-border-2 bg-obsidian-950 sm:grid-cols-3">
          {hero.specs.map(([k, v], i) => (
            <div
              key={k}
              className={`px-5 py-3.5 ${
                i > 0 ? 'border-t border-border-2 sm:border-t-0 sm:border-l' : ''
              }`}
            >
              <div className="mb-1.5 font-mono text-[9.5px] tracking-[0.18em] text-rune-500 uppercase">
                {k}
              </div>
              <div className="font-mono text-[12.5px] text-fg-2">{v}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
