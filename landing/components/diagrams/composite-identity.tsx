export function CompositeIdentityDiagram() {
  return (
    <svg
      viewBox="0 0 720 520"
      width="100%"
      role="img"
      aria-labelledby="ciTitle ciDesc"
      className="block"
    >
      <title id="ciTitle">Composite identity</title>
      <desc id="ciDesc">
        Three principal rings — user, agent, and workload — overlap to form the Arcane Token at
        their intersection.
      </desc>
      <defs>
        <pattern id="ciDots2" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#1FCBA6" opacity="0.18" />
        </pattern>
        <radialGradient id="ciGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3FE8C4" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#1FCBA6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0C6B50" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ciTokenFill2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12956F" />
          <stop offset="100%" stopColor="#052E24" />
        </linearGradient>
      </defs>
      <rect width="720" height="520" fill="#07080B" />
      <rect width="720" height="520" fill="url(#ciDots2)" opacity="0.55" />

      <g>
        <circle cx="240" cy="230" r="128" fill="none" stroke="#2B3245" strokeWidth="1" />
        <circle cx="240" cy="230" r="128" fill="none" stroke="#3FE8C4" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.6" />
        <circle cx="480" cy="230" r="128" fill="none" stroke="#2B3245" strokeWidth="1" />
        <circle cx="480" cy="230" r="128" fill="none" stroke="#3FE8C4" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.6" />
        <circle cx="360" cy="360" r="128" fill="none" stroke="#2B3245" strokeWidth="1" />
        <circle cx="360" cy="360" r="128" fill="none" stroke="#3FE8C4" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.6" />
      </g>

      <circle cx="360" cy="295" r="120" fill="url(#ciGlow2)" />

      {[
        { eyebrow: 'USER', name: 'Principal', code: 'u.olsen@acme', x: 240, y: 140 },
        { eyebrow: 'AGENT', name: 'Identity', code: 'agent.pk-93f', x: 480, y: 140 },
        { eyebrow: 'WORKLOAD', name: 'Attestation', code: 'pod.sre-prod-4', x: 360, y: 470 },
      ].map((p) => (
        <g key={p.eyebrow}>
          <text
            x={p.x}
            y={p.y}
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="10"
            letterSpacing="2"
            fill="#D99A2B"
          >
            {p.eyebrow}
          </text>
          <text
            x={p.x}
            y={p.y + 18}
            textAnchor="middle"
            fontFamily="IBM Plex Sans, sans-serif"
            fontSize="14"
            fontWeight="500"
            fill="#EEF1F7"
          >
            {p.name}
          </text>
          <text
            x={p.x}
            y={p.y + 36}
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="11"
            fill="#8991A6"
          >
            {p.code}
          </text>
        </g>
      ))}

      <g transform="translate(360 295)">
        <rect
          x="-92"
          y="-38"
          width="184"
          height="76"
          rx="6"
          fill="url(#ciTokenFill2)"
          stroke="#3FE8C4"
          strokeWidth="1"
        />
        <text
          x="0"
          y="-16"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          letterSpacing="2"
          fill="#8BF5D8"
        >
          ARCANE TOKEN
        </text>
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="13"
          fontWeight="500"
          fill="#EEF1F7"
        >
          Composite binding
        </text>
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#D3D8E3"
        >
          ∩ intersection · ttl 15m
        </text>
      </g>
    </svg>
  );
}
