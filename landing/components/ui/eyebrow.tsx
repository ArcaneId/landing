import clsx from 'clsx';
import type { ReactNode } from 'react';

type EyebrowTone = 'rune' | 'aether' | 'muted';

const toneClass: Record<EyebrowTone, string> = {
  rune: 'text-rune-500',
  aether: 'text-aether-400',
  muted: 'text-fg-4',
};

export function Eyebrow({
  children,
  glyph = '◆',
  tone = 'rune',
  className,
}: {
  children: ReactNode;
  glyph?: string | null;
  tone?: EyebrowTone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.18em] uppercase',
        toneClass[tone],
        className,
      )}
    >
      {glyph ? <span aria-hidden className="text-[10px]">{glyph}</span> : null}
      {children}
    </span>
  );
}
