export function CompositeIdentityDiagram() {
  return (
    <svg
      viewBox="0 0 760 560"
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
      <rect width="760" height="560" fill="#07080B" />
      <rect width="760" height="560" fill="url(#ciDots2)" opacity="0.55" />

      <g>
        <circle cx="250" cy="230" r="140" fill="none" stroke="#2B3245" strokeWidth="1" />
        <circle
          cx="250"
          cy="230"
          r="140"
          fill="none"
          stroke="#3FE8C4"
          strokeWidth="1.25"
          strokeDasharray="2 6"
          opacity="0.6"
        />
        <circle cx="510" cy="230" r="140" fill="none" stroke="#2B3245" strokeWidth="1" />
        <circle
          cx="510"
          cy="230"
          r="140"
          fill="none"
          stroke="#3FE8C4"
          strokeWidth="1.25"
          strokeDasharray="2 6"
          opacity="0.6"
        />
        <circle cx="380" cy="378" r="140" fill="none" stroke="#2B3245" strokeWidth="1" />
        <circle
          cx="380"
          cy="378"
          r="140"
          fill="none"
          stroke="#3FE8C4"
          strokeWidth="1.25"
          strokeDasharray="2 6"
          opacity="0.6"
        />
      </g>

      <circle cx="380" cy="280" r="130" fill="url(#ciGlow2)" />

      {[
        { eyebrow: 'USER', name: 'Principal', code: 'u.olsen@acme', x: 250, y: 152, iconY: 240, kind: 'user' as const },
        { eyebrow: 'AGENT', name: 'Identity', code: 'agent.pk-93f', x: 510, y: 152, iconY: 240, kind: 'agent' as const },
        { eyebrow: 'WORKLOAD', name: 'Attestation', code: 'pod.sre-prod-4', x: 380, y: 348, iconY: 432, kind: 'workload' as const },
      ].map((p) => (
        <g key={p.eyebrow}>
          <circle cx={p.x} cy={p.iconY} r="22" fill="#141722" stroke="#3A4256" />
          {p.kind === 'user' && (
            <g transform={`translate(${p.x} ${p.iconY}) scale(1.4)`} stroke="#8BF5D8" strokeWidth="1.3" fill="none">
              <circle cx="0" cy="-3.5" r="4" />
              <path d="M-8 7.2 C-5.8 2.7, 5.8 2.7, 8 7.2" />
            </g>
          )}
          {p.kind === 'agent' && (
            <g transform={`translate(${p.x} ${p.iconY}) scale(1.4)`} stroke="#8BF5D8" strokeWidth="1.2" fill="none">
              <rect x="-5.1" y="-5.1" width="10.2" height="10.2" rx="1.9" />
              <path d="M-8.6 0 H-5.9 M8.6 0 H5.9 M0 -8.6 V-5.9 M0 8.6 V5.9" />
            </g>
          )}
          {p.kind === 'workload' && (
            <g transform={`translate(${p.x} ${p.iconY}) scale(1.4)`} stroke="#8BF5D8" strokeWidth="1.05" fill="none">
              <rect x="-8.1" y="-7.6" width="16.2" height="4.2" rx="1.6" />
              <rect x="-8.1" y="-1.5" width="16.2" height="4.2" rx="1.6" />
              <rect x="-8.1" y="4.6" width="16.2" height="4.2" rx="1.6" />
            </g>
          )}
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
            y={p.y + 20}
            textAnchor="middle"
            fontFamily="IBM Plex Sans, sans-serif"
            fontSize="16"
            fontWeight="500"
            fill="#EEF1F7"
          >
            {p.name}
          </text>
          <text
            x={p.x}
            y={p.y + 42}
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="12"
            fill="#8991A6"
          >
            {p.code}
          </text>
        </g>
      ))}

      <g transform="translate(380 280)">
        <rect
          x="-68"
          y="-22"
          width="136"
          height="44"
          rx="6"
          fill="url(#ciTokenFill2)"
          stroke="#3FE8C4"
          strokeWidth="1"
        />
        <text
          x="0"
          y="-5"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="8"
          letterSpacing="1.6"
          fill="#8BF5D8"
        >
          ARCANE TOKEN
        </text>
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="11"
          fontWeight="500"
          fill="#EEF1F7"
        >
          Composite binding
        </text>
      </g>
    </svg>
  );
}
