export function PolicyHexDiagram() {
  return (
    <svg
      viewBox="0 0 640 400"
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
      <rect width="640" height="400" fill="#0A0C12" />

      <g transform="translate(70 200)">
        <rect x="-48" y="-26" width="96" height="52" rx="5" fill="#141722" stroke="#2B3245" />
        <text
          x="0"
          y="-4"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#D99A2B"
        >
          INBOUND
        </text>
        <text x="0" y="14" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="#8BF5D8">
          arcane.token
        </text>
      </g>

      <g transform="translate(320 200)">
        <path
          d="M-54 -68 L54 -68 L80 0 L54 68 L-54 68 L-80 0 Z"
          fill="#0F1119"
          stroke="#3FE8C4"
          strokeWidth="1.4"
        />
        {[[-54, -68], [54, -68], [80, 0], [54, 68], [-54, 68], [-80, 0]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" fill="#D99A2B" />
        ))}
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fontFamily="DM Mono, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="#D99A2B"
        >
          POLICY FABRIC
        </text>
        <text x="0" y="-4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fontWeight="500" fill="#EEF1F7">
          evaluate()
        </text>
        {[14, 26, 38].map((y, i) => (
          <g key={i}>
            <line x1="-48" y1={y} x2="-16" y2={y} stroke="#3A4256" strokeWidth="1" />
            <line
              x1="-8"
              y1={y}
              x2="48"
              y2={y}
              stroke={['#3FD6A0', '#F2C26B', '#F26050'][i]}
              strokeWidth="1.4"
              strokeDasharray="1 2"
            />
          </g>
        ))}
      </g>

      {[
        { y: 100, color: '#3FD6A0', label: 'allow', path: 'M400 200 C 460 200 500 100 560 100', grad: 'url(#pdAllow2)' },
        { y: 200, color: '#F2C26B', label: 'review', path: 'M400 200 C 460 200 500 200 560 200', grad: 'url(#pdReview2)' },
        { y: 300, color: '#F26050', label: 'deny', path: 'M400 200 C 460 200 500 300 560 300', grad: 'url(#pdDeny2)' },
      ].map((o) => (
        <g key={o.label}>
          <path d={o.path} stroke={o.grad} strokeWidth="2.6" fill="none" />
          <g transform={`translate(585 ${o.y})`}>
            <rect x="-32" y="-18" width="64" height="36" rx="4" fill="#141722" stroke="#222738" />
            <circle cx="-20" cy="0" r="3" fill={o.color} />
            <text x="-10" y="4" fontFamily="DM Mono, monospace" fontSize="10" fill={o.color}>
              {o.label}
            </text>
          </g>
        </g>
      ))}

      <line x1="120" y1="200" x2="238" y2="200" stroke="#3FE8C4" strokeWidth="1.4" />
      <text
        x="320"
        y="368"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2"
        fill="#4A5167"
      >
        deterministic · &lt; 5ms · cryptographically logged
      </text>
    </svg>
  );
}
