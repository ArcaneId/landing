export function StsFlowDiagram() {
  const Node = ({
    x,
    y,
    w = 170,
    h = 76,
    eyebrow,
    title,
    sub,
    accent = '#3FE8C4',
  }: {
    x: number;
    y: number;
    w?: number;
    h?: number;
    eyebrow: string;
    title: string;
    sub: string;
    accent?: string;
  }) => (
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

  return (
    <svg viewBox="0 0 960 280" width="100%" role="img" aria-label="STS delegation flow" className="block">
      <defs>
        <pattern id="stsDots2" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#1FCBA6" opacity="0.14" />
        </pattern>
        <marker
          id="stsArrow2"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="#3FE8C4" />
        </marker>
      </defs>
      <rect width="960" height="280" fill="#0A0C12" />
      <rect width="960" height="280" fill="url(#stsDots2)" opacity="0.7" />

      <text
        x="480"
        y="44"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2.4"
        fill="#8991A6"
      >
        ◇ EVERY ACTION · EPHEMERAL · SCOPED TO THE TASK
      </text>

      <Node x={110} y={150} eyebrow="01 · DELEGATE" title="User delegates" sub="task descriptor" />
      <Node x={340} y={150} eyebrow="02 · EXCHANGE" title="Security Token" sub="sts.evaluate()" accent="#D99A2B" />
      <Node x={570} y={150} eyebrow="03 · ISSUED" title="Arcane Token" sub="scoped · ttl 15m" />
      <Node x={820} y={150} eyebrow="04 · CONSUME" title="Resource call" sub="policy-bound" />

      {[
        [195, 150, 255, 150],
        [425, 150, 485, 150],
        [655, 150, 735, 150],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#3FE8C4"
          strokeWidth="1.4"
          markerEnd="url(#stsArrow2)"
        />
      ))}

      <text
        x="480"
        y="248"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#4A5167"
      >
        sts.exchange → validate composite → issue → expire
      </text>
    </svg>
  );
}
