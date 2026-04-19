import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Eyebrow } from './eyebrow';

export function SectionHeader({
  eyebrow,
  eyebrowGlyph,
  title,
  lead,
  align = 'left',
  className,
  maxWidth = 720,
}: {
  eyebrow?: ReactNode;
  eyebrowGlyph?: string | null;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  maxWidth?: number;
}) {
  return (
    <div
      className={clsx(align === 'center' && 'mx-auto text-center', className)}
      style={{ maxWidth }}
    >
      {eyebrow && <Eyebrow glyph={eyebrowGlyph}>{eyebrow}</Eyebrow>}
      <h2
        className={clsx(
          'mt-4 text-[42px] font-medium leading-[1.05] tracking-[-0.032em] text-fg-1',
          'md:text-5xl',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-[16px] leading-[1.65] text-fg-2">{lead}</p>
      )}
    </div>
  );
}
