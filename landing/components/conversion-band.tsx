'use client';

import { Button } from './ui/button';
import { Container } from './ui/container';
import { Eyebrow } from './ui/eyebrow';
import { useAccessModal } from './access-modal';
import { conversionMoments } from '@/lib/content';

export function ConversionBand() {
  const access = useAccessModal();
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';

  return (
    <section className="border-y border-border-2 bg-obsidian-950 px-7 py-12 lg:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] border border-border-1 bg-[linear-gradient(135deg,rgba(63,232,196,0.1),rgba(7,8,11,0.92)_38%,rgba(242,194,107,0.08))] px-6 py-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] lg:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_center,rgba(63,232,196,0.18),transparent_68%)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-[760px]">
              <Eyebrow tone="aether">{conversionMoments.inline.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-[30px] font-medium leading-[1.02] tracking-[-0.034em] text-fg-1 md:text-[40px]">
                {conversionMoments.inline.title}
              </h2>
              <p className="mt-4 max-w-[660px] text-[15px] leading-[1.7] text-fg-2">
                {conversionMoments.inline.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button as="a" href={bookingHref} icon="→">
                {conversionMoments.inline.primary}
              </Button>
              <Button variant="ghost" onClick={access.open}>
                {conversionMoments.inline.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
