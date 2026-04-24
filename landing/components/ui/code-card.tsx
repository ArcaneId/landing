import clsx from 'clsx';
import type { ReactNode } from 'react';
import { SpecCard } from './spec-card';

export function CodeCard({
  label,
  labelTone,
  trailing,
  children,
  className,
  contentClassName,
}: {
  label?: ReactNode;
  labelTone?: 'rune' | 'aether' | 'muted';
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <SpecCard
      label={label}
      labelTone={labelTone}
      trailing={trailing}
      className={clsx('bg-[var(--color-bg-inset)]', className)}
    >
      <pre
        className={clsx(
          'm-0 overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-fg-2',
          contentClassName,
        )}
      >
        {children}
      </pre>
    </SpecCard>
  );
}
