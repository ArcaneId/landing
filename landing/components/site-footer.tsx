'use client';

import Image from 'next/image';
import { Container } from './ui/container';
import { footer } from '@/lib/content';

export function SiteFooter() {
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';
  const footerHrefMap: Record<string, string> = {
    'Composite identity': '/#composite-identity',
    'Security Token Service': '/#sts',
    'Policy fabric': '/#policy',
    'MCP SDK': '/#enforcement',
    'Proxy model': '/#enforcement',
    About: '/company',
    Customers: '/#cta',
    Careers: 'mailto:hello@arcane.id?subject=Careers%20at%20Arcane',
    Press: 'mailto:hello@arcane.id?subject=Press%20inquiry',
    'Architecture brief': '/brief',
    'Security posture': '/security',
    'Request access': '/#cta',
    'Book a briefing': bookingHref,
    'Security disclosure': 'mailto:security@arcane.id',
    'hello@arcane.id': 'mailto:hello@arcane.id',
  };

  return (
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
            <p className="max-w-[320px] text-[12.5px] leading-[1.6] text-fg-3">{footer.tagline}</p>
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
                    href={footerHrefMap[i] ?? '/#cta'}
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
  );
}
