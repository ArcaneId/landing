export function EnforcementLanesDiagram() {
  return (
    <svg
      viewBox="0 0 720 320"
      width="100%"
      role="img"
      aria-label="Enforcement plane: SDK and Proxy"
      className="block"
    >
      <rect width="720" height="320" fill="#0A0C12" />
      <line x1="0" y1="160" x2="720" y2="160" stroke="#222738" />

      <g>
        <text x="24" y="34" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="2" fill="#D99A2B">
          ◆ MCP SDK · EMBEDDED
        </text>

        <g transform="translate(100 86)">
          <rect x="-44" y="-22" width="88" height="44" rx="4" fill="#141722" stroke="#222738" />
          <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#EEF1F7">
            Agent
          </text>
        </g>

        <line x1="146" y1="86" x2="252" y2="86" stroke="#3FE8C4" strokeWidth="1.2" />
        <circle cx="252" cy="86" r="2.4" fill="#D99A2B" />

        <g transform="translate(370 86)">
          <rect x="-100" y="-32" width="200" height="64" rx="6" fill="#141722" stroke="#3FE8C4" strokeWidth="1" />
          <text x="-88" y="-10" fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="2" fill="#8BF5D8">
            MCP SERVER
          </text>
          <rect x="-60" y="4" width="120" height="20" rx="4" fill="#052E24" stroke="#1FCBA6" />
          <text x="0" y="18" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="#3FE8C4">
            arcane.sdk.authorize()
          </text>
        </g>

        <line x1="474" y1="86" x2="580" y2="86" stroke="#3FE8C4" strokeWidth="1.2" />

        <g transform="translate(620 86)">
          <rect x="-40" y="-22" width="80" height="44" rx="4" fill="#141722" stroke="#222738" />
          <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#EEF1F7">
            Tool
          </text>
        </g>
      </g>

      <g>
        <text x="24" y="194" fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="2" fill="#D99A2B">
          ◇ PROXY · TRANSPARENT
        </text>

        <g transform="translate(100 250)">
          <rect x="-44" y="-22" width="88" height="44" rx="4" fill="#141722" stroke="#222738" />
          <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#EEF1F7">
            Agent
          </text>
        </g>

        <line x1="146" y1="250" x2="252" y2="250" stroke="#3FE8C4" strokeWidth="1.2" />
        <circle cx="252" cy="250" r="2.4" fill="#D99A2B" />

        <g transform="translate(370 250)">
          <rect x="-100" y="-32" width="200" height="64" rx="6" fill="#141722" stroke="#3FE8C4" strokeWidth="1" />
          <text x="-88" y="-10" fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="2" fill="#8BF5D8">
            ARCANE PROXY
          </text>
          <rect x="-60" y="4" width="120" height="20" rx="4" fill="#052E24" stroke="#1FCBA6" />
          <text x="0" y="18" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="#3FE8C4">
            inspect · enforce
          </text>
        </g>

        <line
          x1="474"
          y1="250"
          x2="580"
          y2="250"
          stroke="#3FE8C4"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        <g transform="translate(620 250)">
          <rect x="-50" y="-22" width="100" height="44" rx="4" fill="#141722" stroke="#222738" />
          <text x="0" y="-2" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#AEB5C6">
            Legacy
          </text>
          <text x="0" y="14" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="#6B7389">
            SaaS · API
          </text>
        </g>
      </g>
    </svg>
  );
}
