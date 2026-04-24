export function PolicyHexDiagram() {
  return (
    <svg
      viewBox="0 0 700 430"
      width="100%"
      role="img"
      aria-label="Policy evaluation with three decision lanes"
      className="block"
    >
      <defs>
        <linearGradient id="pdAllow2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3FD6A0" stopOpacity="0" />
          <stop offset="50%" stopColor="#3FD6A0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3FD6A0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pdReview2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F2C26B" stopOpacity="0" />
          <stop offset="50%" stopColor="#F2C26B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F2C26B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pdDeny2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F26050" stopOpacity="0" />
          <stop offset="50%" stopColor="#F26050" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F26050" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="700" height="430" fill="#0A0C12" />

      <g transform="translate(82 215)">
        <rect x="-56" y="-31" width="112" height="62" rx="6" fill="#141722" stroke="#2B3245" />
        <text
          x="0"
          y="-6"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          letterSpacing="2"
          fill="#D99A2B"
        >
          INBOUND
        </text>
        <text x="0" y="16" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="11" fill="#8BF5D8">
          arcane.token
        </text>
      </g>

      <g transform="translate(350 215)">
        <path
          d="M-68 -82 L68 -82 L98 0 L68 82 L-68 82 L-98 0 Z"
          fill="#0F1119"
          stroke="#3FE8C4"
          strokeWidth="1.6"
        />
        {[[-68, -82], [68, -82], [98, 0], [68, 82], [-68, 82], [-98, 0]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#D99A2B" />
        ))}
        <text
          x="0"
          y="-26"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          letterSpacing="2"
          fill="#D99A2B"
        >
          POLICY FABRIC
        </text>
        <text x="0" y="-4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="15" fontWeight="500" fill="#EEF1F7">
          evaluate()
        </text>
        {[20, 34, 48].map((y, i) => (
          <g key={i}>
            <line x1="-58" y1={y} x2="-18" y2={y} stroke="#3A4256" strokeWidth="1.2" />
            <line
              x1="-6"
              y1={y}
              x2="58"
              y2={y}
              stroke={['#3FD6A0', '#F2C26B', '#F26050'][i]}
              strokeWidth="1.6"
              strokeDasharray="1 2"
            />
          </g>
        ))}
      </g>

      {[
        { y: 108, color: '#3FD6A0', label: 'allow', path: 'M448 215 C 508 215 548 108 610 108', grad: 'url(#pdAllow2)' },
        { y: 215, color: '#F2C26B', label: 'review', path: 'M448 215 C 508 215 548 215 610 215', grad: 'url(#pdReview2)' },
        { y: 322, color: '#F26050', label: 'deny', path: 'M448 215 C 508 215 548 322 610 322', grad: 'url(#pdDeny2)' },
      ].map((o) => (
        <g key={o.label}>
          <path d={o.path} stroke={o.grad} strokeWidth="3.1" fill="none" />
          <g transform={`translate(636 ${o.y})`}>
            <rect x="-37" y="-20" width="74" height="40" rx="5" fill="#141722" stroke="#222738" />
            <circle cx="-22" cy="0" r="3.5" fill={o.color} />
            <text x="-10" y="4.5" fontFamily="DM Mono, monospace" fontSize="11" fill={o.color}>
              {o.label}
            </text>
          </g>
        </g>
      ))}

      <line x1="138" y1="215" x2="252" y2="215" stroke="#3FE8C4" strokeWidth="1.6" />
      <text
        x="350"
        y="398"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="11"
        letterSpacing="2"
        fill="#4A5167"
      >
        deterministic · &lt; 5ms · cryptographically logged
      </text>
    </svg>
  );
}
