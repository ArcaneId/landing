import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif, DM_Mono } from 'next/font/google';
import clsx from 'clsx';
import type { ReactNode } from 'react';

const plexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexSerif = IBM_Plex_Serif({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-plex-serif',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arcane Identity — Identity, authorization, and enforcement for AI agents',
  description:
    'Arcane is the identity, authorization, and policy enforcement layer for AI agents. Let agents interact with real systems — APIs, SaaS, internal tools, MCP servers — without handing them unchecked access.',
  metadataBase: new URL('https://arcane.id'),
  openGraph: {
    title: 'Arcane Identity',
    description: 'Identity, authorization, and enforcement for AI agents.',
    type: 'website',
  },
  icons: { icon: '/assets/logo-mark.png' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={clsx(plexSans.variable, plexSerif.variable, dmMono.variable)}>
      <body className="bg-obsidian-900 text-fg-1 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-aether-500 focus:px-3 focus:py-2 focus:text-obsidian-950"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
