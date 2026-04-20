'use client';

import Image from 'next/image';
import { Container } from './ui/container';
import { Eyebrow } from './ui/eyebrow';
import { Button } from './ui/button';
import { useAccessModal } from './access-modal';
import { cta, footer } from '@/lib/content';

export function CtaAndFooter() {
  const access = useAccessModal();
  return (
    <>
      <section id="cta" className="relative overflow-hidden border-y border-border-2 px-7 py-[120px] lg:py-[140px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-[-10%] opacity-[0.35]"
        >
          <Image src="/assets/sigil.svg" alt="" width={600} height={600} />
        </div>
        <Container>
          <div className="relative max-w-[980px]">
            <Eyebrow>{cta.eyebrow}</Eyebrow>
            <h2
              className="mt-5 font-medium text-fg-1"
              style={{
                fontSize: 'clamp(44px, 6.2vw, 72px)',
                lineHeight: 0.98,
                letterSpacing: '-0.042em',
              }}
            >
              {cta.title}
              <br />
              <span className="text-fg-3">{cta.titleLine2}</span>
            </h2>
            <p className="mt-6 max-w-[640px] text-[17px] leading-[1.55] text-fg-2">{cta.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={access.open} icon="→">
                {cta.primary}
              </Button>
              <Button as="a" href="mailto:briefing@arcane.id" variant="ghost">
                {cta.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <footer className="bg-obsidian-950 px-7 pt-10 pb-7">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
            <div>
              <div className="mb-3.5 flex items-center gap-2.5">
                <Image
                  src="/assets/logo-mark.png"
                  alt="Arcane"
                  width={22}
                  height={22}
                  className="h-[22px] w-auto object-contain"
                />
                <span className="font-sans text-[14px] font-medium tracking-[-0.02em] text-fg-1">
                  Arcane
                  <span className="ml-1 font-light text-fg-3">Identity</span>
                </span>
              </div>
              <p className="max-w-[320px] text-[12.5px] leading-[1.6] text-fg-3">
                {footer.tagline}
              </p>
            </div>
            {footer.cols.map((c) => (
              <div key={c.h}>
                <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-fg-4 uppercase">
                  {c.h}
                </div>
                <div className="flex flex-col gap-2">
                  {c.l.map((i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-[13px] text-fg-2 transition-colors hover:text-fg-1"
                    >
                      {i}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-border-2 pt-5 font-mono text-[11.5px] tracking-[0.06em] text-fg-4">
            <span>{footer.legal}</span>
            <div className="flex-1" />
            <span>{footer.compliance}</span>
          </div>
        </Container>
      </footer>
    </>
  );
}
