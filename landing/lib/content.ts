// Central copy store. Sourced from /Arcane/*.md one-pager, composite identity doc,
// pitch, platform features, and technical writeup.

export const hero = {
  eyebrow: 'Agent authorization · runtime policy · audit',
  headlineLead: 'Identity for',
  headlineSerif: 'the agents',
  headlineTrail: 'that act on your behalf.',
  sub:
    'Arcane is the identity, authorization, and governance layer for AI agents. Let agents interact with real systems — APIs, SaaS, internal tools, MCP servers — without handing them unchecked access.',
  primaryCta: 'Request access',
  secondaryCta: 'Read the architecture brief',
  specs: [
    ['Composite identity', 'user · agent · workload'],
    ['Runtime decisions', '< 5ms · deterministic'],
    ['Enforcement', 'SDK + transparent proxy'],
  ] as const,
  trustedByLabel: 'Deployed inside',
  trustedBy: ['SIGIL', 'OBELISK', 'HEXROW', 'AEGIS', 'ORYX'] as const,
  buyerSignals: [
    {
      title: 'Security teams keep approval lanes',
      body: 'Escalations become explicit review points instead of hidden side effects inside an agent run.',
    },
    {
      title: 'Platform teams ship without broad credentials',
      body: 'Short-lived, task-bound tokens replace static keys and shared service-account ceilings.',
    },
    {
      title: 'Compliance gets an audit trail that explains itself',
      body: 'Every allow, review, and deny is attributable to a rule, version, actor, and workload.',
    },
  ] as const,
};

export const buyerJourney = {
  eyebrow: 'Why buyers lean in',
  title: 'Agents move at machine speed without becoming a control failure.',
  lead:
    'Organizations are replacing human workflows with agents — and losing the accountability, least-privilege discipline, and audit trails that came with human actors under IAM. Arcane restores all three without slowing agent rollout.',
  cards: [
    {
      tag: '01',
      title: 'Sub-scope enforcement, not just scoped tokens',
      body: 'Not "can this agent call GitHub" — "this agent can push to feature branches, not main" and "can SELECT from logs, not users." Argument-level decisions no token broker can replicate.',
    },
    {
      tag: '02',
      title: 'Action-level observability across every protocol',
      body: 'Proxy-position enforcement sees what the agent actually did — MCP, A2A, CLI, or raw HTTP — not just that a token was issued. Every decision signed, every chain attributable.',
    },
    {
      tag: '03',
      title: 'Policy that evolves with agent behavior',
      body: 'Observed traffic auto-suggests least-privilege policies, detects drift, scores efficacy, and generates compliance-ready reports. Governance keeps pace as agents change.',
    },
  ] as const,
};

export const conversionMoments = {
  inline: {
    eyebrow: 'See the operating model',
    title: 'If the enforcement layer looks like the one your agents need, the next step is a technical briefing.',
    body:
      'Arcane is evaluated through a security and platform conversation — not a signup form. Fifteen minutes with a founder gets you the architecture in context, the policy model on your systems, and an honest answer on fit.',
    primary: 'Book a briefing',
    secondary: 'Request access',
  },
  final: {
    eyebrow: 'Adopt the control plane',
    title: 'Ship agents to production.',
    titleLine2: 'Keep your compliance posture.',
    sub:
      'Arcane Identity is in limited availability. We partner with security and platform teams at regulated enterprises putting agents on the critical path — with the argument-level enforcement, audit chain, and governance loop their auditors will ask about.',
    primary: 'Request access',
    secondary: 'Book a briefing',
  },
};

export const threatModel = {
  eyebrow: 'The problem',
  title: (
    // rendered inline in component; see threat-model.tsx
    true
  ),
  rows: [
    {
      agent: 'Plans a series of steps across tools',
      legacy: 'OAuth scope: app.read, app.write',
      gap: 'Cannot bound a single task',
    },
    {
      agent: 'Chains reads, writes, escalations in one task',
      legacy: 'Bearer token says "authorized"',
      gap: 'No per-action decision point',
    },
    {
      agent: 'Runs on behalf of a specific employee',
      legacy: 'Service account with shared rights',
      gap: 'Delegation is invisible',
    },
    {
      agent: 'Operates at machine speed, 100s of calls/day',
      legacy: 'Static API key, broad ceiling',
      gap: 'No constraints on context',
    },
    {
      agent: 'Executes from a specific runtime',
      legacy: 'IP allowlist at best',
      gap: 'Workload trust cannot be expressed',
    },
    {
      agent: 'May request escalation mid-task',
      legacy: 'All-or-nothing at issuance',
      gap: 'No conditional / review lane',
    },
  ] as const,
  banner: 'Arcane adds the missing layer.',
};

export const architecture = {
  eyebrow: 'Architecture at a glance',
  title: 'One policy engine. Two paths to the resource. Every action explained.',
  lead:
    'Arcane binds user · agent · workload into one composite identity, exchanges it for a short-lived token, evaluates it against policy, and enforces the decision in-line — either embedded in your MCP server or in front of a third-party resource.',
  controlPlane: [
    { tag: '01', name: 'Composite identity', sub: 'bind user · agent · workload' },
    { tag: '02', name: 'STS exchange', sub: 'RFC 8693 · compose + sign' },
    { tag: '03', name: 'Arcane Token', sub: 'scoped · task-bound · ttl 15m' },
    { tag: '04', name: 'Policy fabric', sub: 'rego · cedar · <5ms' },
  ] as const,
  audit: { label: 'audit log · signed', sub: 'per action' },
  enforcement: {
    sdk: {
      tag: 'MCP SDK',
      name: 'MCP Server · your infra',
      tagline: 'embedded · in-proc · pre-tool',
      codeLabel: 'arcane.sdk.authorize()',
      whenToUse: 'You own the server and can add a dependency.',
    },
    proxy: {
      tag: 'Arcane Proxy',
      name: 'Arcane Proxy · in-line',
      tagline: 'inspect · enforce · forward',
      codeLabel: 'inspect · enforce',
      whenToUse: 'The upstream is closed-source or off-limits.',
    },
  },
  lanesCaption: 'Two enforcement paths · one policy engine',
};

export const compositeIdentity = {
  eyebrow: 'Primitive 01 · Composite identity',
  title: 'Who is acting, through what agent, from what trusted environment.',
  lead:
    'A composite identity binds three independent layers into a single, verifiable authorization context — answering not just "who is asking?" but "who is asking, through what software, running where?"',
  layers: [
    {
      tag: 'User principal',
      title: 'The human delegating the action',
      sub: 'u.olsen@acme · role · entitlements',
      proves: 'issued by the IdP (Okta, Entra)',
    },
    {
      tag: 'Agent identity',
      title: 'The logical software actor',
      sub: 'agent.pk-93f · trust tier · version',
      proves: 'registered client credentials',
    },
    {
      tag: 'Workload principal',
      title: 'The runtime actually executing',
      sub: 'pod.sre-prod-4 · attested · corp-vpn',
      proves: 'SPIFFE SVID / platform OIDC token',
    },
  ] as const,
  insight:
    'Composite token scopes are the intersection of what each layer allows — not the union. All three must agree.',
};

export const sts = {
  eyebrow: 'Primitive 02 · Delegation & tokenization',
  title: 'Short-lived. Scoped. Bound to the task.',
  lead:
    'The Security Token Service turns a composite identity into a credential an agent can actually use. It evaluates the delegation context and issues an Arcane Token carrying only the permissions policy grants — for this task, in this environment, right now.',
  flow: [
    { n: '01', label: 'Delegate', sub: 'task descriptor' },
    { n: '02', label: 'Exchange', sub: 'sts.evaluate()' },
    { n: '03', label: 'Issue', sub: 'scoped · ttl 15m' },
    { n: '04', label: 'Consume', sub: 'policy-bound call' },
  ] as const,
  notBearer:
    'Not a bearer token. It doesn\'t just say "this caller is authorized." It says "this caller is authorized to do these specific things, in this context, right now."',
};

export const policy = {
  eyebrow: 'Primitive 03 · Authorization policy',
  title: 'Declarative rules. Deterministic decisions.',
  lead:
    'The policy engine evaluates the Arcane Token\'s composite identity and task context against your rules — rules that draw on the user\'s role, the agent\'s trust tier, the workload\'s network zone, or attributes of the target resource itself.',
  lanes: [
    { k: 'Allow', v: '92.4%', tone: 'allow' as const },
    { k: 'Review', v: '5.1%', tone: 'review' as const },
    { k: 'Deny', v: '2.5%', tone: 'deny' as const },
  ],
};

export const enforcement = {
  eyebrow: 'Primitive 04 · Enforcement plane',
  title: 'Two integration modes. One policy engine behind both.',
  lead:
    'Enforcement is where the decision becomes a fact. Arcane ships two modes so you can protect every system you run — not just the ones you can modify.',
  modes: [
    {
      glyph: '◆',
      tag: 'MCP SDK',
      title: 'Embedded at the tool boundary',
      body:
        'A drop-in library for MCP server developers. Extracts the Arcane Token from the request context, calls the policy engine, enforces the result — before the tool runs.',
      bullets: ['Identity propagation', 'Token validation', 'Authorization at invocation'],
      useWhen: 'You own the server and can add a dependency.',
    },
    {
      glyph: '◇',
      tag: 'Proxy model',
      title: 'Transparent enforcement for the rest',
      body:
        'For systems you cannot modify — third-party SaaS, legacy APIs, tools with no plugin model. The agent calls through Arcane; policy decides; the upstream never knows Arcane exists.',
      bullets: ['Zero upstream integration', 'Fine-grained over SaaS', 'Inline deny without leakage'],
      useWhen: 'The upstream is closed-source or off-limits.',
    },
  ] as const,
};

export const defenseInDepth = {
  eyebrow: 'Defense in depth',
  title: 'Every layer has to agree. That\'s the point.',
  lead:
    'No single identity layer covers every attack. Binding them gives you specific failure modes — so when something is wrong, the system can tell you which layer flagged it.',
  scenarios: [
    {
      attack: 'Stolen user token used from attacker\'s laptop',
      caught: 'Workload attestation fails',
      layer: 'Workload',
    },
    {
      attack: 'Compromised agent in prod cluster',
      caught: 'Agent identity not in allow-list',
      layer: 'Agent',
    },
    {
      attack: 'Legitimate agent deployed to rogue environment',
      caught: 'Workload attestation doesn\'t match',
      layer: 'Workload',
    },
    {
      attack: 'Insider using approved tooling from approved infra, but outside their role',
      caught: 'User principal lacks the required group',
      layer: 'User',
    },
    {
      attack: 'Agent issued a broad token, asked to do something narrow',
      caught: 'Token scope is task-intersected, not role-wide',
      layer: 'Token',
    },
    {
      attack: 'Legacy SaaS can\'t check tokens',
      caught: 'Proxy enforces at the request boundary',
      layer: 'Enforcement',
    },
  ] as const,
};

export const observability = {
  eyebrow: 'Observability & audit',
  title: 'Every decision is logged, signed, and explainable.',
  lead:
    'Nothing reaches the resource without a policy decision and a signed audit entry. Dry-run policy against real traffic before you ship it. Version policies. Attribute every allow and every deny to the rule that made the call.',
  pillars: [
    {
      tag: 'Decision log',
      title: 'Cryptographically signed',
      body: 'Every allow, review, and deny records the composite identity, the task, the matching rule, and the outcome.',
    },
    {
      tag: 'Policy versioning',
      title: 'Dry-run against live traffic',
      body: 'Promote a new policy in shadow mode. Compare lanes against production. Ship only when the deltas are acceptable.',
    },
    {
      tag: 'Metrics',
      title: 'Allow · review · deny over time',
      body: 'Per-agent, per-policy, per-resource. Integrates with Prometheus, Datadog, OpenTelemetry.',
    },
    {
      tag: 'Replay',
      title: 'Trace any action end-to-end',
      body: 'From delegation to enforcement. Reproduce the exact decision context for audit, IR, and policy tuning.',
    },
  ] as const,
};

export const compliance = {
  eyebrow: 'Compliance posture',
  title: 'Built for regulated enterprise from day one.',
  lead:
    'Arcane is the control plane. We never see your codebase, your agent traffic, or your resource contents. What we see — and what we attest to — is the authorization decision.',
  badges: ['SOC 2 Type II', 'ISO 27001', 'Data residency · US / EU', 'VPC-native deploy'] as const,
  tenets: [
    'We never see your codebase. A Claude Code skill generates a BOM of your agent\'s dependencies locally; only that declaration reaches us.',
    'Policy evaluation runs inside your VPC. No traffic leaves your perimeter for an allow/deny.',
    'Tokens are signed with keys you can rotate. JWKS lives in your control plane.',
    'The proxy is deployable as a sidecar, gateway, or per-region fleet. You own the topology.',
  ] as const,
};

export const accessForm = {
  title: 'Request access',
  lead:
    'Tell us a little about what you\'re building. We respond within one business day.',
  fields: {
    email: { label: 'Work email', placeholder: 'you@company.com' },
    company: { label: 'Company', placeholder: 'Acme Corp' },
    role: { label: 'Role', placeholder: 'Eng leader, security, founder…' },
    intent: {
      label: 'What are you trying to do?',
      placeholder: 'Agents touching production data, MCP servers in regulated env, etc.',
    },
  },
  submit: 'Request access',
  submitting: 'Submitting…',
  successTitle: 'You\'re on the list.',
  successSub:
    'A founder will be in touch shortly. While you\'re here, grab a kickoff call:',
  bookingCaption: '15 min · founder · no slides',
  errorCopy: 'Submission failed. Try again, or email access@arcane.id.',
  closeLabel: 'Close',
};

export const footer = {
  tagline: 'Agent authorization and governance control plane.',
  cols: [
    {
      h: 'Platform',
      l: ['Composite identity', 'Security Token Service', 'Policy fabric', 'MCP SDK', 'Proxy model'],
    },
    { h: 'Company', l: ['About', 'Customers', 'Careers', 'Press'] },
    { h: 'Resources', l: ['Architecture brief', 'Security posture', 'Request access'] },
    { h: 'Contact', l: ['Book a briefing', 'Security disclosure', 'hello@arcane.id'] },
  ] as const,
  legal: 'arcane identity · © 2026',
  compliance: 'built for regulated enterprise',
};
