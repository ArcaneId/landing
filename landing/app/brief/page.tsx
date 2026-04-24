import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/site-footer';
import { ExecutiveBriefMapDiagram } from '@/components/diagrams/executive-brief-map';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';

export const metadata: Metadata = {
  title: 'Architecture Brief — Arcane Identity',
  description:
    'A concise architecture brief for Arcane Identity: composite identity, short-lived tokens, policy evaluation, and enforcement for AI agents.',
};

const pillars = [
  {
    tag: 'Cryptographic composite identity',
    body: 'Every agent gets a verified identity via workload attestation — K8s service-account tokens, cloud instance identity, SPIFFE SVIDs, OIDC + device binding for local dev — normalized into Arcane’s entity model so policies stay portable across providers.',
  },
  {
    tag: 'Argument-level enforcement, two layers',
    body: 'Policy decides on the specific tool call and its arguments — not just "can this agent call GitHub" but "can it push to feature branches, not main." Enforced at both tool invocation and server egress, protocol-agnostic across MCP, A2A, CLI, and raw HTTP.',
  },
  {
    tag: 'Governance intelligence loop',
    body: 'Enforcement data feeds a system that auto-suggests least-privilege policies from observed traffic, detects drift, scores policy efficacy, and generates compliance-ready reports. The part of the stack competitors haven’t claimed.',
  },
];

export default function BriefPage() {
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';

  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden border-b border-border-2 px-7 py-[88px] lg:py-[112px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(63,232,196,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(242,194,107,0.12),transparent_32%)]"
          />
          <Container className="relative">
            <div className="max-w-[760px]">
              <Eyebrow tone="aether">Architecture brief</Eyebrow>
              <h1 className="mt-5 text-[40px] font-medium leading-[0.98] tracking-[-0.04em] text-fg-1 md:text-[64px]">
                The control plane between autonomous agents and the systems they touch.
              </h1>
              <p className="mt-6 max-w-[700px] text-[17px] leading-[1.7] text-fg-2">
                As organizations replace human workflows with AI agents, they lose the
                accountability, least-privilege discipline, and audit trails that came with human
                actors under IAM. Arcane binds composite identity, enforces down to the argument,
                and closes the governance loop with evolving policy and signed audit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="a" href={bookingHref} icon="→">
                  Book a briefing
                </Button>
                <Button as="a" href="/#architecture" variant="ghost">
                  View the full landing page
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="px-7 py-[76px] lg:py-[96px]">
          <Container>
            <div className="overflow-hidden rounded-[22px] border border-border-1 bg-obsidian-950 shadow-[0_32px_80px_-48px_rgba(0,0,0,0.82)]">
              <div className="flex items-center gap-2.5 border-b border-border-2 px-4 py-3">
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-aether-400 uppercase">
                  △ Executive map
                </span>
                <div className="flex-1" />
                <span className="font-mono text-[10px] text-fg-4">from access ceiling to governed action</span>
              </div>
              <ExecutiveBriefMapDiagram />
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {pillars.map((pillar) => (
                <article
                  key={pillar.tag}
                  className="rounded-[18px] border border-border-1 bg-obsidian-850 p-6 lg:p-7"
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] text-rune-500 uppercase">
                    {pillar.tag}
                  </div>
                  <p className="mt-4 text-[14.5px] leading-[1.78] text-fg-2">{pillar.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[20px] border border-border-1 bg-obsidian-950 p-7 lg:p-8">
                <h2 className="text-[28px] font-medium tracking-[-0.03em] text-fg-1">
                  What the brief commits to
                </h2>
                <ul className="mt-6 flex flex-col gap-5 text-[15px] leading-[1.75] text-fg-2">
                  <li>Agents never operate on permanent, task-outliving credentials — every call runs on a short-lived, task-intersected Arcane Token.</li>
                  <li>Authorization is explainable end-to-end: identity, context, and policy are evaluated together, and every allow, review, and deny is attributable to a signed rule and version.</li>
                  <li>You can start with systems you own (MCP SDK, in-process enforcement) and still govern the third-party SaaS you can’t modify (Arcane Proxy, transparent egress).</li>
                </ul>
              </div>
              <div className="rounded-[20px] border border-border-1 bg-[linear-gradient(180deg,rgba(20,23,34,0.96),rgba(7,8,11,0.98))] p-7 lg:p-8">
                <div className="font-mono text-[10px] tracking-[0.18em] text-aether-400 uppercase">
                  Best next step
                </div>
                <h2 className="mt-4 text-[26px] font-medium tracking-[-0.03em] text-fg-1">
                  Fifteen minutes with a founder, your systems on the table.
                </h2>
                <p className="mt-5 text-[15px] leading-[1.75] text-fg-2">
                  Arcane is evaluated through a security and platform conversation, not a signup
                  flow. We walk the architecture against your agents, your policy constraints, and
                  your audit requirements — and give you an honest answer on fit.
                </p>
                <div className="mt-7">
                  <Button as="a" href={bookingHref} icon="→">
                    Book a briefing
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
