'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { architecture } from '@/lib/content';

type Lane = 'sdk' | 'proxy';

export function ArchitectureOverviewDiagram() {
  const [lane, setLane] = useState<Lane>('sdk');
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const showPackets = mounted && !reduced;

  const sdkRef = useRef<HTMLButtonElement>(null);
  const proxyRef = useRef<HTMLButtonElement>(null);

  const onTabKey = (e: React.KeyboardEvent, current: Lane) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next: Lane = current === 'sdk' ? 'proxy' : 'sdk';
      setLane(next);
      (next === 'sdk' ? sdkRef : proxyRef).current?.focus();
    }
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border-2 bg-obsidian-950 px-4 py-2.5">
        <div role="tablist" aria-label="Enforcement mode" className="flex gap-1.5">
          <LaneTab
            ref={sdkRef}
            active={lane === 'sdk'}
            onClick={() => setLane('sdk')}
            onKeyDown={(e) => onTabKey(e, 'sdk')}
            label={architecture.enforcement.sdk.tag}
          />
          <LaneTab
            ref={proxyRef}
            active={lane === 'proxy'}
            onClick={() => setLane('proxy')}
            onKeyDown={(e) => onTabKey(e, 'proxy')}
            label={architecture.enforcement.proxy.tag}
          />
        </div>
        <span className="ml-auto font-mono text-[10.5px] tracking-[0.16em] text-fg-4 uppercase">
          {architecture.lanesCaption}
        </span>
      </div>

      <div role="tabpanel" id="arch-lane-panel">
        <svg
          viewBox="0 0 1200 600"
          width="100%"
          role="img"
          aria-labelledby="archTitle archDesc"
          className="block"
        >
          <title id="archTitle">Arcane architecture overview</title>
          <desc id="archDesc">
            A user, agent, and workload are bound into a composite identity, exchanged at the
            Security Token Service for a scoped Arcane Token, evaluated by the policy fabric
            (producing a signed audit entry), and enforced either by an embedded MCP SDK inside
            your server or by the Arcane Proxy in front of a third-party resource.
          </desc>

          <defs>
            <pattern id="archDots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#1FCBA6" opacity="0.14" />
            </pattern>
            <linearGradient id="archFlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3FE8C4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3FE8C4" stopOpacity="0.5" />
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
            <marker
              id="archArrowMuted"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="#D99A2B" />
            </marker>
            <filter id="archGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="1200" height="600" fill="#07080B" />
          <rect width="1200" height="600" fill="url(#archDots)" />

          {/* zone labels */}
          <text
            x="90"
            y="46"
            fontFamily="DM Mono, monospace"
            fontSize="9.5"
            letterSpacing="2.6"
            fill="#D99A2B"
          >
            ◆ IDENTITY INPUTS
          </text>
          <text
            x="450"
            y="46"
            fontFamily="DM Mono, monospace"
            fontSize="9.5"
            letterSpacing="2.6"
            fill="#D99A2B"
          >
            ◆ ARCANE CONTROL PLANE
          </text>
          <text
            x="900"
            y="46"
            fontFamily="DM Mono, monospace"
            fontSize="9.5"
            letterSpacing="2.6"
            fill="#D99A2B"
          >
            ◆ ENFORCEMENT
          </text>
          <text
            x="1190"
            y="46"
            fontFamily="DM Mono, monospace"
            fontSize="9.5"
            letterSpacing="2.6"
            fill="#D99A2B"
            textAnchor="end"
          >
            ◆ RESOURCE
          </text>

          {/* control-plane backing panel */}
          <rect
            x="240"
            y="80"
            width="580"
            height="380"
            rx="12"
            fill="#0A0C12"
            stroke="#12956F"
            strokeOpacity="0.5"
          />
          <rect x="240" y="80" width="580" height="28" fill="#052E24" />
          <text
            x="260"
            y="98"
            fontFamily="DM Mono, monospace"
            fontSize="10"
            letterSpacing="2"
            fill="#8BF5D8"
          >
            ARCANE · sts.arcane / policy.arcane
          </text>

          {/* identity inputs */}
          <Node
            x={90}
            y={150}
            w={160}
            tag="01 · USER"
            title="u.olsen@acme"
            sub="IdP: Okta · finance"
          />
          <Node
            x={90}
            y={250}
            w={160}
            tag="02 · AGENT"
            title="agent.pk-93f"
            sub="client · trust tier 2"
          />
          <Node
            x={90}
            y={350}
            w={160}
            tag="03 · WORKLOAD"
            title="pod.sre-prod-4"
            sub="attested · SPIFFE"
          />

          {/* control-plane chips (composite → STS → Token → Policy) */}
          {architecture.controlPlane.map((c, i) => (
            <Chip
              key={c.tag}
              x={305 + i * 135}
              y={240}
              tag={`${c.tag} · ${c.name.split(' ')[0].toUpperCase()}`}
              name={c.name}
              sub={c.sub}
              accent={i === 3 ? '#D99A2B' : '#3FE8C4'}
            />
          ))}

          {/* audit pill */}
          <g transform="translate(710 388)">
            <rect
              x={-90}
              y={-22}
              width={180}
              height={44}
              rx={6}
              fill="#0F1119"
              stroke="#9F6D12"
              strokeOpacity="0.7"
            />
            <text
              x={0}
              y={-4}
              textAnchor="middle"
              fontFamily="DM Mono, monospace"
              fontSize="9"
              letterSpacing="2"
              fill="#D99A2B"
            >
              ◆ {architecture.audit.label.toUpperCase()}
            </text>
            <text
              x={0}
              y={14}
              textAnchor="middle"
              fontFamily="DM Mono, monospace"
              fontSize="10"
              fill="#AEB5C6"
            >
              {architecture.audit.sub}
            </text>
          </g>

          {/* visible flow arrows (static portion) */}
          {/* identity → composite */}
          <ArrowPath d="M170 150 C 200 150, 215 235, 242 232" />
          <ArrowPath d="M170 250 L 242 240" />
          <ArrowPath d="M170 350 C 200 350, 215 245, 242 248" />
          {/* composite → STS */}
          <ArrowPath d="M367 240 L 377 240" />
          {/* STS → Token */}
          <ArrowPath d="M502 240 L 512 240" />
          {/* Token → Policy */}
          <ArrowPath d="M637 240 L 647 240" />
          {/* Policy → audit (rune accent) */}
          <ArrowPath
            d="M710 272 L 710 364"
            stroke="#D99A2B"
            strokeOpacity={0.6}
            marker="url(#archArrowMuted)"
          />
          {/* Policy → enforcement (crosses container border) */}
          <ArrowPath d="M772 240 L 843 240" />

          {/* enforcement lane subtree — animated swap */}
          <AnimatePresence mode="wait">
            {lane === 'sdk' ? (
              <motion.g
                key="sdk"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {/* outer MCP server container */}
                <rect
                  x="845"
                  y="180"
                  width="180"
                  height="120"
                  rx="8"
                  fill="#141722"
                  stroke="#3FE8C4"
                  strokeOpacity="0.55"
                />
                <text
                  x="857"
                  y="200"
                  fontFamily="DM Mono, monospace"
                  fontSize="9"
                  letterSpacing="2"
                  fill="#8BF5D8"
                >
                  MCP SERVER · YOUR INFRA
                </text>
                {/* nested SDK chip */}
                <rect
                  x="865"
                  y="222"
                  width="140"
                  height="24"
                  rx="4"
                  fill="#052E24"
                  stroke="#1FCBA6"
                />
                <text
                  x="935"
                  y="238"
                  textAnchor="middle"
                  fontFamily="DM Mono, monospace"
                  fontSize="10"
                  fill="#3FE8C4"
                >
                  {architecture.enforcement.sdk.codeLabel}
                </text>
                <text
                  x="857"
                  y="266"
                  fontFamily="DM Mono, monospace"
                  fontSize="9.5"
                  fill="#8991A6"
                >
                  {architecture.enforcement.sdk.tagline}
                </text>
                <text
                  x="857"
                  y="282"
                  fontFamily="DM Mono, monospace"
                  fontSize="9.5"
                  fill="#6B7389"
                >
                  → tool runs in-process
                </text>

                {/* arrow → resource */}
                <ArrowPath d="M1025 240 L 1070 240" />
                {/* resource: tool */}
                <Node
                  x={1130}
                  y={240}
                  w={120}
                  tag="08 · RESOURCE"
                  title="Tool"
                  sub="MCP · in-process"
                />

                {showPackets && (
                  <g aria-hidden="true">
                    <Packet path="M843 240 L 1070 240" dur={2.0} begin={0} />
                  </g>
                )}
              </motion.g>
            ) : (
              <motion.g
                key="proxy"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {/* standalone proxy node */}
                <Node
                  x={935}
                  y={240}
                  w={180}
                  h={84}
                  tag="ARCANE PROXY"
                  title="inspect · enforce"
                  sub="forward · deny inline"
                  accent="#3FE8C4"
                />
                {/* arrow → resource (dashed = transparent, no upstream change) */}
                <ArrowPath d="M1025 240 L 1070 240" dashed />
                {/* resource: dashed border third-party */}
                <g transform="translate(1130 240)">
                  <rect
                    x={-60}
                    y={-36}
                    width={120}
                    height={72}
                    rx={6}
                    fill="#141722"
                    stroke="#6B7389"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={-46}
                    y={-16}
                    fontFamily="DM Mono, monospace"
                    fontSize="9"
                    letterSpacing="2"
                    fill="#D99A2B"
                  >
                    08 · RESOURCE
                  </text>
                  <text
                    x={-46}
                    y={4}
                    fontFamily="IBM Plex Sans, sans-serif"
                    fontSize="12"
                    fontWeight={500}
                    fill="#EEF1F7"
                  >
                    Third-party SaaS
                  </text>
                  <text x={-46} y={22} fontFamily="DM Mono, monospace" fontSize="9.5" fill="#8991A6">
                    no integration required
                  </text>
                </g>

                {showPackets && (
                  <g aria-hidden="true">
                    <Packet path="M843 240 L 1025 240" dur={1.4} begin={0} />
                    <Packet path="M1025 240 L 1070 240" dur={0.8} begin={1.4} />
                  </g>
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* packets — static segments (always present unless reduced motion) */}
          {showPackets && (
            <g aria-hidden="true">
              <Packet path="M170 150 C 200 150, 215 235, 242 232" dur={1.6} begin={0} />
              <Packet path="M170 250 L 242 240" dur={1.6} begin={0.2} />
              <Packet path="M170 350 C 200 350, 215 245, 242 248" dur={1.6} begin={0.4} />
              <Packet path="M367 240 L 377 240" dur={0.6} begin={0.8} />
              <Packet path="M502 240 L 512 240" dur={0.6} begin={1.0} />
              <Packet path="M637 240 L 647 240" dur={0.6} begin={1.2} />
              <Packet
                path="M710 272 L 710 364"
                dur={2.0}
                begin={1.4}
                color="#D99A2B"
                opacity={0.55}
              />
            </g>
          )}

          {/* decision annotation */}
          <text
            x="600"
            y="560"
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="10"
            letterSpacing="2"
            fill="#4A5167"
          >
            deterministic · &lt; 5 ms · cryptographically logged
          </text>
        </svg>
      </div>
    </div>
  );
}

const LaneTab = forwardRef<
  HTMLButtonElement,
  {
    active: boolean;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    label: string;
  }
>(function LaneTab({ active, onClick, onKeyDown, label }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="arch-lane-panel"
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={clsx(
        'rounded-md border px-3 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors',
        active
          ? 'border-aether-500 bg-aether-900 text-aether-300'
          : 'border-border-1 bg-obsidian-850 text-fg-3 hover:text-fg-2',
      )}
    >
      {label}
    </button>
  );
});

function Packet({
  path,
  dur,
  begin,
  color = '#3FE8C4',
  opacity = 1,
}: {
  path: string;
  dur: number;
  begin: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <circle r={2.6} fill={color} opacity={opacity} filter="url(#archGlow)">
      <animateMotion
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        path={path}
        rotate="auto"
      />
    </circle>
  );
}

function Chip({
  x,
  y,
  tag,
  name,
  sub,
  accent = '#3FE8C4',
}: {
  x: number;
  y: number;
  tag: string;
  name: string;
  sub: string;
  accent?: string;
}) {
  const w = 124;
  const h = 64;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={6}
        fill="#141722"
        stroke="#222738"
      />
      <rect x={-w / 2} y={-h / 2} width={3} height={h} fill={accent} />
      <text
        x={-w / 2 + 12}
        y={-h / 2 + 16}
        fontFamily="DM Mono, monospace"
        fontSize="8"
        letterSpacing="1.6"
        fill="#D99A2B"
      >
        {tag}
      </text>
      <text
        x={-w / 2 + 12}
        y={-h / 2 + 34}
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="11.5"
        fontWeight={500}
        fill="#EEF1F7"
      >
        {name}
      </text>
      <text
        x={-w / 2 + 12}
        y={-h / 2 + 52}
        fontFamily="DM Mono, monospace"
        fontSize="9"
        fill="#8991A6"
      >
        {sub}
      </text>
    </g>
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

function ArrowPath({
  d,
  stroke = 'url(#archFlow)',
  strokeOpacity = 1,
  dashed = false,
  marker = 'url(#archArrow)',
}: {
  d: string;
  stroke?: string;
  strokeOpacity?: number;
  dashed?: boolean;
  marker?: string;
}) {
  return (
    <path
      d={d}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth="1.4"
      fill="none"
      strokeDasharray={dashed ? '3 3' : undefined}
      markerEnd={marker}
    />
  );
}
