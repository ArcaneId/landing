export function ArchitectureOverviewDiagram() {
  // Layout: two source lanes on the left (user+agent) merge into workload attestation,
  // flow into STS → Arcane Token → Policy fabric → Enforcement (split into SDK/Proxy lanes)
  // → Resource column on the right.
  return (
    <svg
      viewBox="0 0 1200 560"
      width="100%"
      role="img"
      aria-labelledby="archTitle archDesc"
      className="block"
    >
      <title id="archTitle">Arcane architecture overview</title>
      <desc id="archDesc">
        A user and an agent delegate through a workload, exchange at the Security Token Service
        for an Arcane Token, the token is evaluated by the policy fabric, and enforcement reaches
        the resource via either an embedded SDK or a transparent proxy.
      </desc>

      <defs>
        <pattern id="archDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#1FCBA6" opacity="0.14" />
        </pattern>
        <linearGradient id="archFlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3FE8C4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3FE8C4" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="archTokenFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A231B" />
          <stop offset="100%" stopColor="#04130D" />
        </linearGradient>
        <marker
          id="archArrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#3FE8C4" />
        </marker>
        <filter id="archGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1200" height="560" fill="#07080B" />
      <rect width="1200" height="560" fill="url(#archDots)" />

      {/* zone labels */}
      <text x="90" y="46" fontFamily="DM Mono, monospace" fontSize="9.5" letterSpacing="2.6" fill="#D99A2B">
        ◆ IDENTITY INPUTS
      </text>
      <text x="460" y="46" fontFamily="DM Mono, monospace" fontSize="9.5" letterSpacing="2.6" fill="#D99A2B">
        ◆ ARCANE CONTROL PLANE
      </text>
      <text x="900" y="46" fontFamily="DM Mono, monospace" fontSize="9.5" letterSpacing="2.6" fill="#D99A2B">
        ◆ ENFORCEMENT
      </text>
      <text x="1110" y="46" fontFamily="DM Mono, monospace" fontSize="9.5" letterSpacing="2.6" fill="#D99A2B" textAnchor="end">
        ◆ RESOURCE
      </text>

      {/* control-plane backing panel */}
      <rect
        x="410" y="70"
        width="440" height="420"
        rx="12"
        fill="#0A0C12"
        stroke="#12956F"
        strokeOpacity="0.5"
      />
      <rect
        x="410" y="70"
        width="440" height="28"
        fill="#052E24"
      />
      <text x="430" y="88" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="2" fill="#8BF5D8">
        ARCANE · sts.arcane / policy.arcane
      </text>

      {/* nodes — identity inputs (left column) */}
      <Node x={90} y={140} tag="01 · USER" title="u.olsen@acme" sub="IdP: Okta · role: finance" />
      <Node x={90} y={250} tag="02 · AGENT" title="agent.pk-93f" sub="client · trust tier 2" />
      <Node x={90} y={360} tag="03 · WORKLOAD" title="pod.sre-prod-4" sub="attested · SPIFFE" />

      {/* STS node */}
      <Node
        x={480} y={180}
        w={220}
        tag="04 · STS"
        title="Security Token Service"
        sub="RFC 8693 · compose + sign"
        accent="#D99A2B"
      />

      {/* Arcane Token chip */}
      <g transform="translate(590 310)">
        <rect
          x={-100} y={-38}
          width={200} height={76}
          rx={8}
          fill="url(#archTokenFill)"
          stroke="#3FE8C4"
          strokeWidth="1.2"
        />
        <text x="0" y="-16" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9.5" letterSpacing="2" fill="#8BF5D8">
          05 · ARCANE TOKEN
        </text>
        <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fontWeight="500" fill="#EEF1F7">
          scoped · task-bound
        </text>
        <text x="0" y="22" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10.5" fill="#D3D8E3">
          ttl 15m · signed
        </text>
      </g>

      {/* Policy fabric — hex */}
      <g transform="translate(750 420)">
        <path
          d="M-64 -44 L-24 -76 L24 -76 L64 -44 L64 44 L24 76 L-24 76 L-64 44 Z"
          fill="#0F1119"
          stroke="#3FE8C4"
          strokeWidth="1.2"
        />
        {[[-64, -44], [-24, -76], [24, -76], [64, -44], [64, 44], [24, 76], [-24, 76], [-64, 44]].map(
          ([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.4} fill="#D99A2B" />
          ),
        )}
        <text x="0" y="-10" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="2" fill="#D99A2B">
          06 · POLICY FABRIC
        </text>
        <text x="0" y="12" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fontWeight="500" fill="#EEF1F7">
          evaluate()
        </text>
        <text x="0" y="30" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9.5" fill="#8991A6">
          rego · cedar · abac
        </text>
      </g>

      {/* Enforcement lane 1 — SDK */}
      <Node
        x={960} y={180}
        w={180}
        tag="07a · SDK"
        title="MCP SDK"
        sub="embedded · in-proc"
        accent="#3FE8C4"
      />
      {/* Enforcement lane 2 — Proxy */}
      <Node
        x={960} y={420}
        w={180}
        tag="07b · PROXY"
        title="Arcane Proxy"
        sub="transparent · inline"
        accent="#3FE8C4"
      />

      {/* Resource column */}
      <Node
        x={1140} y={180}
        w={100}
        tag="08"
        title="Tool"
        sub="MCP · internal"
      />
      <Node
        x={1140} y={420}
        w={100}
        tag="08"
        title="SaaS"
        sub="third-party"
      />

      {/* ─── arrows ─── */}
      {/* identity layers → STS */}
      <Arrow from={[170, 140]} to={[370, 180]} />
      <Arrow from={[170, 250]} to={[370, 200]} />
      <Arrow from={[170, 360]} to={[370, 220]} />
      {/* STS → Token */}
      <Arrow from={[480, 222]} to={[590, 275]} />
      {/* Token → Policy */}
      <Arrow from={[590, 355]} to={[708, 405]} />
      {/* Policy → SDK lane */}
      <Arrow from={[820, 395]} to={[870, 210]} curve />
      {/* Policy → Proxy lane */}
      <Arrow from={[820, 445]} to={[870, 440]} />
      {/* SDK → Tool */}
      <Arrow from={[1050, 180]} to={[1090, 180]} />
      {/* Proxy → SaaS */}
      <Arrow from={[1050, 420]} to={[1090, 420]} />

      {/* decision annotation */}
      <text
        x="600"
        y="524"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#4A5167"
      >
        deterministic · &lt; 5 ms · cryptographically logged
      </text>
    </svg>
  );
}

function Node({
  x,
  y,
  w = 180,
  h = 72,
  tag,
  title,
  sub,
  accent = '#3FE8C4',
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tag: string;
  title: string;
  sub: string;
  accent?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill="#141722" stroke="#222738" />
      <rect x={-w / 2} y={-h / 2} width={3} height={h} fill={accent} />
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 18}
        fontFamily="DM Mono, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#D99A2B"
      >
        {tag}
      </text>
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 38}
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="13"
        fontWeight="500"
        fill="#EEF1F7"
      >
        {title}
      </text>
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 56}
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#8991A6"
      >
        {sub}
      </text>
    </g>
  );
}

function Arrow({
  from,
  to,
  curve,
}: {
  from: [number, number];
  to: [number, number];
  curve?: boolean;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  if (curve) {
    const midX = (x1 + x2) / 2;
    return (
      <path
        d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
        stroke="url(#archFlow)"
        strokeWidth="1.4"
        fill="none"
        markerEnd="url(#archArrow)"
      />
    );
  }
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#archFlow)"
      strokeWidth="1.4"
      markerEnd="url(#archArrow)"
    />
  );
}
