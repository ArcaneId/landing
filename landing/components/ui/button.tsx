import clsx from 'clsx';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'secondary';

const base =
  'inline-flex items-center gap-2.5 rounded-md px-5 py-3 font-sans text-[13px] font-medium tracking-[0.005em] transition-colors duration-150';

const variants: Record<Variant, string> = {
  primary:
    'bg-aether-500 text-obsidian-950 shadow-aether hover:bg-aether-400 focus-visible:bg-aether-400',
  ghost:
    'bg-transparent text-fg-1 border border-border-1 hover:border-border-strong hover:bg-obsidian-850',
  secondary:
    'bg-obsidian-850 text-fg-1 border border-border-1 hover:bg-obsidian-800',
};

type ButtonProps =
  | ({ as?: 'button'; variant?: Variant; icon?: ReactNode; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'a'; variant?: Variant; icon?: ReactNode; children: ReactNode; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>);

export function Button({ variant = 'primary', icon, children, className, as, ...rest }: ButtonProps) {
  const classes = clsx(base, variants[variant], className);
  const inner = (
    <>
      {children}
      {icon ? <span className="font-mono text-sm leading-none">{icon}</span> : null}
    </>
  );
  if (as === 'a') {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
