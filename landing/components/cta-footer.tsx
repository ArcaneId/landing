'use client';

import Image from 'next/image';
import { Container } from './ui/container';
import { Eyebrow } from './ui/eyebrow';
import { Button } from './ui/button';
import { useAccessModal } from './access-modal';
import { SiteFooter } from './site-footer';
import { conversionMoments } from '@/lib/content';

export function CtaAndFooter() {
  const access = useAccessModal();
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';
  return (
    <>
      <section id="cta" className="relative overflow-hidden border-y border-border-2 bg-obsidian-950 px-7 py-[120px] lg:py-[140px]">
        <div aria-hidden className="section-atmosphere pointer-events-none absolute inset-0 opacity-90" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-[-10%] opacity-[0.35]"
        >
          <Image src="/assets/sigil.svg" alt="" width={600} height={600} />
        </div>
        <Container>
          <div className="relative max-w-[980px]">
            <Eyebrow>{conversionMoments.final.eyebrow}</Eyebrow>
            <h2
              className="mt-5 font-medium text-fg-1"
              style={{
                fontSize: 'clamp(36px, 5.8vw, 72px)',
                lineHeight: 0.98,
                letterSpacing: '-0.042em',
              }}
            >
              {conversionMoments.final.title}
              <br />
              <span className="text-fg-3">{conversionMoments.final.titleLine2}</span>
            </h2>
            <p className="mt-6 max-w-[640px] text-[17px] leading-[1.55] text-fg-2">
              {conversionMoments.final.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={access.open} icon="→">
                {conversionMoments.final.primary}
              </Button>
              <Button as="a" href={bookingHref} variant="ghost">
                {conversionMoments.final.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <SiteFooter />
    </>
  );
}
