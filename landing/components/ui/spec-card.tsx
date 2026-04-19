import clsx from 'clsx';
import type { ReactNode } from 'react';

export function SpecCard({
  label,
  labelTone = 'rune',
  trailing,
  children,
  className,
  innerClassName,
}: {
  label?: ReactNode;
  labelTone?: 'rune' | 'aether' | 'muted';
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const toneClass =
    labelTone === 'aether'
      ? 'text-aether-400'
      : labelTone === 'muted'
        ? 'text-fg-3'
        : 'text-rune-500';
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-[10px] border border-border-1 bg-obsidian-950',
        className,
      )}
    >
      {(label || trailing) && (
        <div className="flex items-center gap-2.5 border-b border-border-2 px-3.5 py-2.5">
          {label && (
            <span
              className={clsx(
                'font-mono text-[10.5px] font-medium tracking-[0.16em] uppercase',
                toneClass,
              )}
            >
              {label}
            </span>
          )}
          <div className="flex-1" />
          {trailing && (
            <span className="font-mono text-[10px] tracking-[0.04em] text-fg-4">{trailing}</span>
          )}
        </div>
      )}
      <div className={innerClassName}>{children}</div>
    </div>
  );
}
