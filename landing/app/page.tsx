import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { ThreatModel } from '@/components/threat-model';
import { Architecture } from '@/components/architecture';
import { CompositeIdentity } from '@/components/primitives/composite-identity';
import { StsAndToken } from '@/components/primitives/sts-token';
import { PolicyEngine } from '@/components/primitives/policy-engine';
import { EnforcementPlane } from '@/components/primitives/enforcement';
import { DefenseInDepth } from '@/components/defense-in-depth';
import { Observability } from '@/components/observability';
import { Compliance } from '@/components/compliance';
import { CtaAndFooter } from '@/components/cta-footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ThreatModel />
        <Architecture />
        <CompositeIdentity />
        <StsAndToken />
        <PolicyEngine />
        <EnforcementPlane />
        <DefenseInDepth />
        <Observability />
        <Compliance />
        <CtaAndFooter />
      </main>
    </>
  );
}
