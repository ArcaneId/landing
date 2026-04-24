import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';

export const metadata: Metadata = {
  title: 'Security Posture — Arcane Identity',
  description:
    'A lightweight overview of Arcane Identity security posture, deployment model, and how authorization decisions are kept within enterprise boundaries.',
};

const tenets = [
  'Policy evaluation runs inside your VPC. No agent traffic or resource payloads leave your perimeter for an allow or deny decision.',
  'Arcane is a control plane for authorization decisions — never a processor of business data, agent payloads, or resource content. We attest to the decision, not the data.',
  'Short-lived, task-intersected tokens (TTL 15m) replace static keys. JWKS lives in your control plane with keys you can rotate on your schedule.',
];

export default function SecurityPage() {
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';

  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden border-b border-border-2 px-7 py-[88px] lg:py-[112px]">
          <div aria-hidden className="section-atmosphere pointer-events-none absolute inset-0 opacity-90" />
          <Container className="relative">
            <div className="max-w-[760px]">
              <Eyebrow>Security posture</Eyebrow>
              <h1 className="mt-5 text-[40px] font-medium leading-[0.98] tracking-[-0.04em] text-fg-1 md:text-[62px]">
                Built for regulated enterprise from day one.
              </h1>
              <p className="mt-6 text-[17px] leading-[1.7] text-fg-2">
                Arcane is the control plane — we never see your codebase, your agent traffic, or
                your resource contents. What we see, and what we attest to, is the authorization
                decision. Deployable as a sidecar, gateway, or per-region fleet; you own the
                topology, the keys, and the data path.
              </p>
            </div>
          </Container>
        </section>

        <section className="px-7 py-[76px] lg:py-[96px]">
          <Container>
            <div className="grid gap-4 md:grid-cols-3">
              {tenets.map((tenet) => (
                <article key={tenet} className="surface-gradient rounded-[18px] border border-border-1 p-6">
                  <div className="font-mono text-[10px] tracking-[0.18em] text-aether-400 uppercase">
                    Operating tenet
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.7] text-fg-2">{tenet}</p>
                </article>
              ))}
            </div>

            <div className="surface-gradient mt-10 rounded-[22px] border border-border-1 p-7 lg:p-9">
              <h2 className="text-[28px] font-medium tracking-[-0.03em] text-fg-1">
                What we commit to on day one
              </h2>
              <ul className="mt-5 flex flex-col gap-4 text-[14px] leading-[1.7] text-fg-2">
                <li>SOC 2 Type II and ISO 27001 aligned; data residency across US and EU; VPC-native deploy with no egress required for policy decisions.</li>
                <li>A Claude Code skill generates a bill-of-materials of your agent’s dependencies locally — only that declaration reaches us, never your source.</li>
                <li>Every decision is cryptographically signed and streamed to your SIEM. The full chain — user, agent, workload, task, rule, outcome — is replayable for audit, IR, and policy tuning.</li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button as="a" href={bookingHref} icon="→">
                  Book a briefing
                </Button>
                <Button as="a" href="/brief" variant="ghost">
                  Read the brief
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
