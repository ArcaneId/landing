import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';

export const metadata: Metadata = {
  title: 'Company — Arcane Identity',
  description:
    'Arcane Identity builds identity, authorization, and governance infrastructure for AI agents operating in real enterprise environments.',
};

export default function CompanyPage() {
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';

  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden border-b border-border-2 px-7 py-[88px] lg:py-[112px]">
          <div aria-hidden className="section-atmosphere pointer-events-none absolute inset-0 opacity-90" />
          <Container className="relative">
            <div className="max-w-[760px]">
              <Eyebrow>Company</Eyebrow>
              <h1 className="mt-5 text-[40px] font-medium leading-[0.98] tracking-[-0.04em] text-fg-1 md:text-[62px]">
                Everyone else secures one layer. Arcane governs the whole chain and proves it’s working.
              </h1>
              <p className="mt-6 text-[17px] leading-[1.7] text-fg-2">
                We’re building the governance intelligence platform for AI agents: cryptographic
                composite identity through workload attestation, argument-level policy enforcement
                across tool invocation and server egress, and a feedback loop that turns
                enforcement into evolving policy and audit-ready evidence.
              </p>
            </div>
          </Container>
        </section>

        <section className="px-7 py-[76px] lg:py-[96px]">
          <Container>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                'Security-team-first — policies are authored by the people accountable for the decision, not only by the developers shipping the agent.',
                'Argument-level, protocol-agnostic — same policy model across MCP, A2A, CLI, and raw HTTP, down to specific tool arguments and API parameters.',
                'Governance intelligence, not just gateway logs — auto-suggested least-privilege policies, drift detection, policy efficacy scoring, and compliance-ready reports.',
              ].map((line, idx) => (
                <div key={idx} className="surface-gradient rounded-[18px] border border-border-1 p-6">
                  <div className="font-mono text-[10px] tracking-[0.18em] text-rune-500 uppercase">
                    0{idx + 1}
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.7] text-fg-2">{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[22px] border border-border-1 bg-[linear-gradient(135deg,rgba(63,232,196,0.1),rgba(10,12,18,0.96)_42%,rgba(242,194,107,0.1))] p-7 lg:p-9">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div>
                  <Eyebrow tone="aether">Who we serve</Eyebrow>
                  <h2 className="mt-4 text-[30px] font-medium tracking-[-0.03em] text-fg-1">
                    CISOs, platform engineering, and GRC — on the same control plane.
                  </h2>
                  <p className="mt-4 max-w-[660px] text-[15px] leading-[1.7] text-fg-2">
                    Security teams need to prove agent governance to boards and auditors. Platform
                    teams need to ship agents without hand-rolling credentials. GRC needs
                    audit-ready evidence, not log-file exports. Arcane is the one system that
                    speaks to all three.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Button as="a" href={bookingHref} icon="→">
                    Book a briefing
                  </Button>
                  <Button as="a" href="/#cta" variant="ghost">
                    Request access
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
