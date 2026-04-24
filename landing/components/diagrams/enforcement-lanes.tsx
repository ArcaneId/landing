type NodeProps = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  eyebrow: string;
  title: string;
  sub: string;
  accent?: string;
};

function Node({
  x,
  y,
  w = 168,
  h = 76,
  eyebrow,
  title,
  sub,
  accent = '#3FE8C4',
}: NodeProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill="#141722" stroke="#222738" />
      <rect x={-w / 2} y={-h / 2} width={3} height={h} fill={accent} />
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 20}
        fontFamily="DM Mono, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#D99A2B"
      >
        {eyebrow}
      </text>
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 40}
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="13"
        fontWeight="500"
        fill="#EEF1F7"
      >
        {title}
      </text>
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 58}
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#8991A6"
      >
        {sub}
      </text>
    </g>
  );
}

export function EnforcementLanesDiagram() {
  const LANE_1_Y = 110;
  const LANE_2_Y = 286;

  return (
    <svg
      viewBox="0 0 960 360"
      width="100%"
      role="img"
      aria-label="Enforcement plane: embedded SDK and transparent proxy"
      className="block"
    >
      <defs>
        <pattern id="enfDots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#1FCBA6" opacity="0.12" />
        </pattern>
        <marker
          id="enfArrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#3FE8C4" />
        </marker>
        <marker
          id="enfArrowMuted"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#6B7389" />
        </marker>
      </defs>

      <rect width="960" height="360" fill="#0A0C12" />
      <rect width="960" height="360" fill="url(#enfDots)" opacity="0.6" />

      {/* Lane 1 · MCP SDK · EMBEDDED */}
      <text
        x="32"
        y="34"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2.4"
        fill="#D99A2B"
      >
        ◆ MCP SDK · EMBEDDED
      </text>
      <text
        x="928"
        y="34"
        textAnchor="end"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#4A5167"
      >
        in-process · pre-tool
      </text>

      <Node x={140} y={LANE_1_Y} eyebrow="AGENT" title="Agent runtime" sub="mcp client" />
      <Node
        x={480}
        y={LANE_1_Y}
        w={240}
        eyebrow="POLICY CHECK"
        title="MCP Server"
        sub="arcane.sdk.authorize()"
        accent="#D99A2B"
      />
      <Node
        x={820}
        y={LANE_1_Y}
        eyebrow="TOOL"
        title="Protected call"
        sub="write · read · invoke"
        accent="#3A4256"
      />

      <line
        x1={224}
        y1={LANE_1_Y}
        x2={360}
        y2={LANE_1_Y}
        stroke="#3FE8C4"
        strokeWidth="1.4"
        markerEnd="url(#enfArrow)"
      />
      <line
        x1={600}
        y1={LANE_1_Y}
        x2={736}
        y2={LANE_1_Y}
        stroke="#3FE8C4"
        strokeWidth="1.4"
        markerEnd="url(#enfArrow)"
      />

      {/* Lane divider */}
      <line x1="32" y1="198" x2="928" y2="198" stroke="#222738" />

      {/* Lane 2 · PROXY · TRANSPARENT */}
      <text
        x="32"
        y="222"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2.4"
        fill="#D99A2B"
      >
        ◇ PROXY · TRANSPARENT
      </text>
      <text
        x="928"
        y="222"
        textAnchor="end"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#4A5167"
      >
        on-wire · no sdk required
      </text>

      <Node x={140} y={LANE_2_Y} eyebrow="AGENT" title="Agent runtime" sub="http client" />
      <Node
        x={480}
        y={LANE_2_Y}
        w={240}
        eyebrow="POLICY CHECK"
        title="Arcane Proxy"
        sub="inspect · enforce"
        accent="#D99A2B"
      />
      <Node
        x={820}
        y={LANE_2_Y}
        eyebrow="LEGACY"
        title="SaaS / API"
        sub="unmodified"
        accent="#3A4256"
      />

      <line
        x1={224}
        y1={LANE_2_Y}
        x2={360}
        y2={LANE_2_Y}
        stroke="#3FE8C4"
        strokeWidth="1.4"
        markerEnd="url(#enfArrow)"
      />
      <line
        x1={600}
        y1={LANE_2_Y}
        x2={736}
        y2={LANE_2_Y}
        stroke="#6B7389"
        strokeWidth="1.4"
        strokeDasharray="4 4"
        markerEnd="url(#enfArrowMuted)"
      />
    </svg>
  );
}
