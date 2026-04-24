export function CompositeIdentityDiagram() {
  return (
    <svg
      viewBox="0 0 820 760"
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
        <radialGradient id="ciUser" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3FE8C4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3FE8C4" stopOpacity="0.01" />
        </radialGradient>
        <radialGradient id="ciAgent" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D99A2B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#D99A2B" stopOpacity="0.01" />
        </radialGradient>
        <radialGradient id="ciWork" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7FB5FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7FB5FF" stopOpacity="0.01" />
        </radialGradient>
        <filter id="ciGlow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <g opacity="0.08">
        <circle
          cx="410"
          cy="380"
          r="360"
          fill="none"
          stroke="#3FE8C4"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle
          cx="410"
          cy="380"
          r="280"
          fill="none"
          stroke="#8991A6"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle
          cx="410"
          cy="380"
          r="200"
          fill="none"
          stroke="#8991A6"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </g>

      <circle
        cx="290"
        cy="300"
        r="220"
        fill="url(#ciUser)"
        stroke="#3FE8C4"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <circle
        cx="530"
        cy="300"
        r="220"
        fill="url(#ciAgent)"
        stroke="#D99A2B"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <circle
        cx="410"
        cy="500"
        r="220"
        fill="url(#ciWork)"
        stroke="#7FB5FF"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />

      {/* USER cluster */}
      <g
        transform="translate(187 178)"
        fill="none"
        stroke="#3FE8C4"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="28" cy="28" r="26" strokeOpacity="0.35" />
        <circle cx="28" cy="28" r="20" strokeOpacity="0.15" strokeDasharray="2 4" />
        <circle cx="28" cy="20" r="6" />
        <path d="M 18 42 Q 28 30 38 42" />
        <circle cx="28" cy="28" r="1.6" fill="#3FE8C4" stroke="none" />
      </g>
      <g fontFamily="DM Mono, IBM Plex Mono, monospace" textAnchor="middle">
        <text x="215" y="260" fill="#3FE8C4" fontSize="13" letterSpacing="2.5">
          USER
        </text>
        <text x="215" y="280" fill="#8991A6" fontSize="11" letterSpacing="1.5">
          u.olsen@acme
        </text>
      </g>

      {/* AGENT cluster */}
      <g
        transform="translate(577 178)"
        fill="none"
        stroke="#D99A2B"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <circle cx="28" cy="28" r="26" strokeOpacity="0.35" />
        <path d="M 28 10 L 43 19 L 43 37 L 28 46 L 13 37 L 13 19 Z" />
        <circle cx="28" cy="28" r="3" fill="#D99A2B" stroke="none" />
        <path
          d="M 28 19 L 28 15 M 28 41 L 28 37 M 36 23 L 40 21 M 16 21 L 20 23 M 36 33 L 40 35 M 16 35 L 20 33"
          strokeOpacity="0.8"
        />
        <circle cx="43" cy="19" r="1.5" fill="#D99A2B" stroke="none" />
        <circle cx="13" cy="19" r="1.5" fill="#D99A2B" stroke="none" />
        <circle cx="43" cy="37" r="1.5" fill="#D99A2B" stroke="none" />
        <circle cx="13" cy="37" r="1.5" fill="#D99A2B" stroke="none" />
      </g>
      <g fontFamily="DM Mono, IBM Plex Mono, monospace" textAnchor="middle">
        <text x="605" y="260" fill="#D99A2B" fontSize="13" letterSpacing="2.5">
          AGENT
        </text>
        <text x="605" y="280" fill="#8991A6" fontSize="11" letterSpacing="1.5">
          agent.pk-93f
        </text>
      </g>

      {/* WORKLOAD cluster */}
      <g
        transform="translate(382 563)"
        fill="none"
        stroke="#7FB5FF"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <circle cx="28" cy="28" r="26" strokeOpacity="0.35" />
        <rect x="10" y="10" width="36" height="36" rx="2" />
        <rect x="17" y="17" width="22" height="22" rx="1" />
        <path
          d="M 28 10 L 28 5 M 28 51 L 28 46 M 10 28 L 5 28 M 51 28 L 46 28"
          strokeOpacity="0.7"
        />
        <circle cx="28" cy="28" r="2" fill="#7FB5FF" stroke="none" />
      </g>
      <g fontFamily="DM Mono, IBM Plex Mono, monospace" textAnchor="middle">
        <text x="410" y="645" fill="#7FB5FF" fontSize="13" letterSpacing="2.5">
          WORKLOAD
        </text>
        <text x="410" y="665" fill="#8991A6" fontSize="11" letterSpacing="1.5">
          pod.sre-prod-4 · attested
        </text>
      </g>

      {/* Intersection token */}
      <g transform="translate(410 380)">
        <circle r="60" fill="#07080B" stroke="#3FE8C4" strokeWidth="1.5" />
        <circle
          r="60"
          fill="none"
          stroke="#3FE8C4"
          strokeWidth="1"
          opacity="0.3"
          filter="url(#ciGlow)"
        />
        <g
          fontFamily="DM Mono, IBM Plex Mono, monospace"
          fontSize="11"
          letterSpacing="1.8"
          textAnchor="middle"
        >
          <text y="-6" fill="#D3D8E3">
            ARCANE
          </text>
          <text y="10" fill="#3FE8C4">
            TOKEN
          </text>
          <text y="28" fill="#6B7389" fontSize="9">
            ∩ ttl 15m
          </text>
        </g>
      </g>

      <g fill="#D99A2B">
        <circle cx="290" cy="300" r="3" />
        <circle cx="530" cy="300" r="3" />
        <circle cx="410" cy="500" r="3" />
      </g>
    </svg>
  );
}
