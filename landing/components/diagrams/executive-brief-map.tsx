export function ExecutiveBriefMapDiagram() {
  return (
    <svg
      viewBox="0 0 900 360"
      width="100%"
      role="img"
      aria-label="Executive summary of Arcane control model"
      className="block"
    >
      <defs>
        <linearGradient id="briefGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3FE8C4" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F2C26B" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <rect width="900" height="360" fill="#07080B" />
      <rect x="40" y="50" width="820" height="260" rx="18" fill="#0A0C12" stroke="#222738" />
      <rect x="58" y="68" width="310" height="224" rx="14" fill="url(#briefGlow)" stroke="#2B3245" />
      <text x="82" y="96" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="2.2" fill="#D99A2B">
        ◆ BEFORE ARCANE
      </text>
      <text x="82" y="130" fontFamily="IBM Plex Sans, sans-serif" fontSize="15" fontWeight="500" fill="#EEF1F7">
        Broad credential
      </text>
      <text x="82" y="154" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fill="#AEB5C6">
        One token covers too much surface area.
      </text>
      <text x="82" y="210" fontFamily="DM Mono, monospace" fontSize="11" fill="#F26050">
        static key · invisible delegation
      </text>
      <text x="82" y="234" fontFamily="DM Mono, monospace" fontSize="11" fill="#F26050">
        no per-action policy decision
      </text>
      <text x="82" y="258" fontFamily="DM Mono, monospace" fontSize="11" fill="#F26050">
        weak audit story
      </text>

      <rect x="530" y="68" width="310" height="224" rx="14" fill="url(#briefGlow)" stroke="#12956F" />
      <text x="554" y="96" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="2.2" fill="#8BF5D8">
        △ WITH ARCANE
      </text>
      <text x="554" y="130" fontFamily="IBM Plex Sans, sans-serif" fontSize="15" fontWeight="500" fill="#EEF1F7">
        Governed action path
      </text>
      <text x="554" y="154" fontFamily="IBM Plex Sans, sans-serif" fontSize="12.5" fill="#AEB5C6">
        Identity, policy, and enforcement stay connected.
      </text>
      <text x="554" y="210" fontFamily="DM Mono, monospace" fontSize="11" fill="#3FE8C4">
        composite identity · short-lived token
      </text>
      <text x="554" y="234" fontFamily="DM Mono, monospace" fontSize="11" fill="#3FE8C4">
        inline allow / review / deny
      </text>
      <text x="554" y="258" fontFamily="DM Mono, monospace" fontSize="11" fill="#3FE8C4">
        signed decision trail
      </text>

      <g transform="translate(450 180)">
        <circle cx="0" cy="0" r="58" fill="#0F1119" stroke="#D99A2B" />
        <text x="0" y="-12" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="2" fill="#D99A2B">
          CONTROL
        </text>
        <text x="0" y="10" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="14" fontWeight="500" fill="#EEF1F7">
          Arcane
        </text>
        <text x="0" y="30" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="#8991A6">
          authorize()
        </text>
      </g>

      <path d="M368 180 C 400 180, 404 180, 392 180" stroke="#3A4256" strokeWidth="0" fill="none" />
      <path d="M368 180 C 394 180, 404 180, 424 180" stroke="#F26050" strokeWidth="2" fill="none" />
      <path d="M476 180 C 510 180, 520 180, 530 180" stroke="#3FE8C4" strokeWidth="2" fill="none" />

      <text x="450" y="330" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="2.2" fill="#4A5167">
        EXECUTIVE SUMMARY · FROM ACCESS CEILING TO GOVERNED ACTION
      </text>
    </svg>
  );
}
