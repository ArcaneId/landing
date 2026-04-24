'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { useAccessModal } from './access-modal';

export function Nav() {
  const access = useAccessModal();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const root = document.documentElement;
    const apply = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      root.style.setProperty('--nav-h', `${h}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener('resize', apply);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';
  const rootPrefix = pathname === '/' ? '' : '/';
  const sectionLinks = [
    { label: 'How It Works', href: `${rootPrefix}#how-it-works` },
    { label: 'Platform', href: `${rootPrefix}#architecture` },
    { label: 'Security', href: `${rootPrefix}#defense` },
  ];
  const pageLinks = [
    { label: 'Brief', href: '/brief' },
    { label: 'Company', href: '/company' },
    { label: 'Security Posture', href: '/security' },
  ];

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-border-2 bg-[rgba(7,8,11,0.78)] backdrop-blur-[10px]"
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-5 py-3.5 sm:px-7">
        <a href={pathname === '/' ? '#hero' : '/'} className="flex items-center gap-2.5">
          <Image
            src="/assets/logo-mark.png"
            alt="Arcane"
            width={26}
            height={26}
            className="h-[26px] w-auto object-contain"
            priority
          />
          <span className="font-sans text-[15px] font-medium tracking-[-0.02em] text-fg-1">
            Arcane<span className="ml-1.5 font-light text-fg-3">Identity</span>
          </span>
        </a>
        <div className="flex-1" />
        <div className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-fg-2 transition-colors hover:text-fg-1"
            >
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-fg-2 transition-colors hover:text-fg-1"
            >
              {l.label}
            </a>
          ))}
          <div className="h-[18px] w-px bg-border-1" aria-hidden />
          <a
            href={bookingHref}
            className="font-mono text-[10.5px] tracking-[0.14em] text-aether-300 uppercase drop-shadow-[0_0_8px_rgba(63,232,196,0.38)] transition-colors hover:text-aether-200"
          >
            Book a briefing
          </a>
        </div>
        <Button onClick={access.open}>Request access</Button>
      </div>
      <div className="border-t border-border-2 px-5 py-2 md:hidden sm:px-7">
        <div className="flex flex-wrap gap-2">
          {[...sectionLinks, ...pageLinks].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full border border-border-1 bg-obsidian-850 px-3 py-1.5 font-mono text-[10.5px] tracking-[0.12em] text-fg-2 uppercase transition-colors hover:border-border-strong hover:text-fg-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href={bookingHref}
            className="font-mono text-[10.5px] tracking-[0.14em] text-aether-300 uppercase drop-shadow-[0_0_8px_rgba(63,232,196,0.38)] transition-colors hover:text-aether-200"
          >
            Book
          </a>
        </div>
      </div>
    </nav>
  );
}
