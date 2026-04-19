import Image from 'next/image';
import { Button } from './ui/button';

const links = [
  { label: 'Platform', href: '#architecture' },
  { label: 'Primitives', href: '#composite-identity' },
  { label: 'Security', href: '#defense' },
  { label: 'Docs', href: '#' },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-border-2 bg-[rgba(7,8,11,0.78)] backdrop-blur-[10px]"
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-8 px-7 py-3.5">
        <a href="#" className="flex items-center gap-2.5">
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
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-fg-2 transition-colors hover:text-fg-1"
            >
              {l.label}
            </a>
          ))}
          <div className="h-[18px] w-px bg-border-1" aria-hidden />
          <a href="#" className="text-[13px] text-fg-2 transition-colors hover:text-fg-1">
            Sign in
          </a>
        </div>
        <Button as="a" href="#cta">
          Request access
        </Button>
      </div>
    </nav>
  );
}
