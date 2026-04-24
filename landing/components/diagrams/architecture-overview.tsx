'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useRef, useState } from 'react';
import clsx from 'clsx';
import { architecture } from '@/lib/content';

type Lane = 'sdk' | 'proxy';

const VB = { w: 1460, h: 860 };
const IDENTITY_X = 160;
const JUNCTION_X = 332;
const JUNCTION_Y = 410;
const CP = {
  x: 400,
  y: 150,
  w: 760,
  h: 470,
  headerH: 36,
};
const CHIP_W = 200;
const CHIP_H = 88;
const CHIP_ROW_Y = 282;
const CHIP_CX = [534, 760, 986];
const POLICY = {
  x: 490,
  y: 390,
  w: 540,
  h: 140,
};
const AUDIT = {
  x: CP.x + 200,
  y: 560,
  w: CP.w - 400,
  h: 38,
};
const ENF = {
  x: 1200,
  y: 244,
  w: 236,
};
const RESOURCE = {
  x: 1200,
  y: 440,
  w: 236,
};

const PALETTE = {
  bg: '#07080B',
  panel: '#0B0E15',
  panelBorder: '#1A2130',
  nodeFill: '#121622',
  nodeStroke: '#222A3D',
  flow: '#3FE8C4',
  flowMuted: '#1FCBA6',
  text: '#EEF1F7',
  textMuted: '#9CA4B8',
  textDim: '#6B7389',
  eyebrow: '#6B7389',
  audit: '#D99A2B',
  auditText: '#E8B45C',
};

export function ArchitectureOverviewDiagram() {
  const [lane, setLane] = useState<Lane>('sdk');

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

  const [compositeCx, stsCx, tokenCx] = CHIP_CX;
  const policyCx = POLICY.x + POLICY.w / 2;
  const policyRight = POLICY.x + POLICY.w;
  const policyCy = POLICY.y + POLICY.h / 2;
  const enfCx = ENF.x + ENF.w / 2;
  const resourceCx = RESOURCE.x + RESOURCE.w / 2;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-b border-border-2 bg-obsidian-950 px-4 py-3">
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
        <span className="ml-auto font-mono text-[11px] tracking-[0.16em] text-fg-4 uppercase">
          {architecture.lanesCaption}
        </span>
      </div>

      <div role="tabpanel" id="arch-lane-panel">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
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
            <pattern id="archDots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#1FCBA6" opacity="0.08" />
            </pattern>
            <linearGradient id="archFlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={PALETTE.flow} stopOpacity="0.95" />
              <stop offset="100%" stopColor={PALETTE.flow} stopOpacity="0.65" />
            </linearGradient>
            <marker
              id="archArrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill={PALETTE.flow} />
            </marker>
            <marker
              id="archArrowMuted"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill={PALETTE.audit} />
            </marker>
            <filter id="archGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={VB.w} height={VB.h} fill={PALETTE.bg} />
          <rect width={VB.w} height={VB.h} fill="url(#archDots)" />

          <ZoneLabel x={IDENTITY_X} y={92} anchor="middle" text="IDENTITY INPUTS" />
          <ZoneLabel x={CP.x + CP.w / 2} y={90} anchor="middle" text="ARCANE CONTROL PLANE" />
          <ZoneLabel x={ENF.x + ENF.w / 2} y={90} anchor="middle" text="ENFORCEMENT / RESOURCE" />

          <rect
            x={CP.x}
            y={CP.y}
            width={CP.w}
            height={CP.h}
            rx={14}
            fill={PALETTE.panel}
            stroke={PALETTE.panelBorder}
          />
          <rect x={CP.x} y={CP.y} width={CP.w} height={CP.headerH} rx={14} fill="#071C17" />
          <rect x={CP.x} y={CP.y + CP.headerH - 14} width={CP.w} height={14} fill="#071C17" />
          <text
            x={CP.x + 20}
            y={CP.y + 22}
            fontFamily="DM Mono, monospace"
            fontSize="11"
            letterSpacing="2.2"
            fill="#8BF5D8"
          >
            ARCANE · sts.arcane / policy.arcane
          </text>

          <Node
            cx={IDENTITY_X}
            cy={240}
            w={230}
            tag="USER"
            title="u.olsen@acme"
            sub="IdP · Okta · finance"
          />
          <Node
            cx={IDENTITY_X}
            cy={JUNCTION_Y}
            w={230}
            tag="AGENT"
            title="agent.pk-93f"
            sub="client · trust tier 2"
          />
          <Node
            cx={IDENTITY_X}
            cy={580}
            w={230}
            tag="WORKLOAD"
            title="pod.sre-prod-4"
            sub="attested · SPIFFE"
          />

          <g>
            <circle
              cx={JUNCTION_X}
              cy={JUNCTION_Y}
              r={11}
              fill={PALETTE.bg}
              stroke={PALETTE.flow}
              strokeWidth={1.6}
            />
            <circle cx={JUNCTION_X} cy={JUNCTION_Y} r={3} fill={PALETTE.flow} />
          </g>
          <text
            x={JUNCTION_X}
            y={JUNCTION_Y + 38}
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="10"
            letterSpacing="1.6"
            fill={PALETTE.textDim}
          >
            bind
          </text>

          <ArrowPath
            d={`M ${IDENTITY_X + 115} 240 C ${JUNCTION_X - 70} 240, ${JUNCTION_X - 42} ${JUNCTION_Y}, ${JUNCTION_X - 12} ${JUNCTION_Y}`}
          />
          <ArrowPath d={`M ${IDENTITY_X + 115} ${JUNCTION_Y} L ${JUNCTION_X - 12} ${JUNCTION_Y}`} />
          <ArrowPath
            d={`M ${IDENTITY_X + 115} 580 C ${JUNCTION_X - 70} 580, ${JUNCTION_X - 42} ${JUNCTION_Y}, ${JUNCTION_X - 12} ${JUNCTION_Y}`}
          />

          <ArrowPath d={`M ${JUNCTION_X + 12} ${JUNCTION_Y} L ${compositeCx - CHIP_W / 2 - 6} ${CHIP_ROW_Y}`} />
          <EdgeLabel x={454} y={JUNCTION_Y - 34} text="claims" />

          {architecture.controlPlane.slice(0, 3).map((c, i) => (
            <Chip
              key={c.tag}
              cx={CHIP_CX[i]}
              cy={CHIP_ROW_Y}
              w={CHIP_W}
              h={CHIP_H}
              tag={c.tag}
              name={c.name}
              sub={c.sub}
              accent={PALETTE.flow}
            />
          ))}

          <ArrowPath
            d={`M ${compositeCx + CHIP_W / 2 + 6} ${CHIP_ROW_Y} L ${stsCx - CHIP_W / 2 - 6} ${CHIP_ROW_Y}`}
          />

          <ArrowPath
            d={`M ${stsCx + CHIP_W / 2 + 6} ${CHIP_ROW_Y} L ${tokenCx - CHIP_W / 2 - 6} ${CHIP_ROW_Y}`}
          />

          <LargePolicyCard
            x={POLICY.x}
            y={POLICY.y}
            w={POLICY.w}
            h={POLICY.h}
            tag={architecture.controlPlane[3].tag}
            name={architecture.controlPlane[3].name}
            sub={architecture.controlPlane[3].sub}
          />

          <ArrowPath
            d={`M ${policyCx} ${CHIP_ROW_Y + CHIP_H / 2 + 6} L ${policyCx} ${POLICY.y - 8}`}
          />
          <EdgeLabel x={policyCx + 104} y={CHIP_ROW_Y + 56} text="evaluate scoped token" />

          <AuditStrip
            x={AUDIT.x}
            y={AUDIT.y}
            w={AUDIT.w}
            h={AUDIT.h}
            text="AUDIT LOG · SIGNED · PER ACTION"
          />

          {(() => {
            const startX = policyRight + 8;
            const endX = ENF.x - 4;
            const endY = ENF.y + 64;
            const cornerX = startX + (endX - startX) * 0.55;
            return (
              <ArrowPath
                d={`M ${startX} ${policyCy} C ${cornerX} ${policyCy}, ${cornerX} ${endY}, ${endX} ${endY}`}
              />
            );
          })()}

          <AnimatePresence mode="wait">
            {lane === 'sdk' ? (
              <motion.g
                key="sdk"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <rect
                  x={ENF.x}
                  y={ENF.y}
                  width={ENF.w}
                  height={126}
                  rx={12}
                  fill={PALETTE.panel}
                  stroke={PALETTE.flow}
                  strokeOpacity={0.55}
                />
                <rect
                  x={ENF.x}
                  y={ENF.y}
                  width={ENF.w}
                  height={28}
                  rx={12}
                  fill="#071C17"
                />
                <rect x={ENF.x} y={ENF.y + 16} width={ENF.w} height={12} fill="#071C17" />
                <text
                  x={ENF.x + 14}
                  y={ENF.y + 19}
                  fontFamily="DM Mono, monospace"
                  fontSize="10.5"
                  letterSpacing="2"
                  fill="#8BF5D8"
                >
                  MCP SERVER · YOUR INFRA
                </text>
                <rect
                  x={ENF.x + 18}
                  y={ENF.y + 44}
                  width={ENF.w - 36}
                  height={34}
                  rx={5}
                  fill="#072E24"
                  stroke={PALETTE.flowMuted}
                />
                <text
                  x={ENF.x + ENF.w / 2}
                  y={ENF.y + 64}
                  textAnchor="middle"
                  fontFamily="DM Mono, monospace"
                  fontSize="11"
                  fill={PALETTE.flow}
                >
                  {architecture.enforcement.sdk.codeLabel}
                </text>
                <text
                  x={ENF.x + 18}
                  y={ENF.y + 95}
                  fontFamily="DM Mono, monospace"
                  fontSize="11"
                  fill={PALETTE.textMuted}
                >
                  {architecture.enforcement.sdk.tagline}
                </text>
                <text
                  x={ENF.x + 18}
                  y={ENF.y + 113}
                  fontFamily="DM Mono, monospace"
                  fontSize="11"
                  fill={PALETTE.textDim}
                >
                  → tool runs in-process
                </text>

                <Node
                  cx={resourceCx}
                  cy={RESOURCE.y + 50}
                  w={RESOURCE.w}
                  h={100}
                  tag="RESOURCE"
                  title="Tool"
                  sub="MCP · in-process"
                />

                <ArrowPath d={`M ${enfCx} ${ENF.y + 126 + 10} L ${resourceCx} ${RESOURCE.y}`} />
              </motion.g>
            ) : (
              <motion.g
                key="proxy"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Node
                  cx={enfCx}
                  cy={ENF.y + 48}
                  w={ENF.w}
                  h={110}
                  tag="ARCANE PROXY"
                  title="inspect · enforce"
                  sub="forward · deny inline"
                />
                <ArrowPath d={`M ${enfCx} ${ENF.y + 108 + 10} L ${resourceCx} ${RESOURCE.y}`} />
                <g transform={`translate(${resourceCx} ${RESOURCE.y + 50})`}>
                  <rect
                    x={-RESOURCE.w / 2}
                    y={-50}
                    width={RESOURCE.w}
                    height={100}
                    rx={8}
                    fill={PALETTE.nodeFill}
                    stroke={PALETTE.textDim}
                    strokeDasharray="3 3"
                  />
                  <text
                    x={-60}
                    y={-26}
                    fontFamily="DM Mono, monospace"
                    fontSize="10"
                    letterSpacing="2"
                    fill={PALETTE.eyebrow}
                  >
                    RESOURCE
                  </text>
                  <text
                    x={-60}
                    y={0}
                    fontFamily="IBM Plex Sans, sans-serif"
                    fontSize="14"
                    fontWeight={500}
                    fill={PALETTE.text}
                  >
                    Third-party SaaS
                  </text>
                  <text
                    x={-60}
                    y={22}
                    fontFamily="DM Mono, monospace"
                    fontSize="10.5"
                    fill={PALETTE.textMuted}
                  >
                    no integration required
                  </text>
                </g>
              </motion.g>
            )}
          </AnimatePresence>
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

function ZoneLabel({
  x,
  y,
  text,
  anchor = 'start',
}: {
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="DM Mono, monospace"
      fontSize="11"
      letterSpacing="3"
      fill={PALETTE.eyebrow}
    >
      {text}
    </text>
  );
}

function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="DM Mono, monospace"
      fontSize="10"
      letterSpacing="1.4"
      fill={PALETTE.textDim}
    >
      {text}
    </text>
  );
}

function Chip({
  cx,
  cy,
  w,
  h,
  tag,
  name,
  sub,
  accent = PALETTE.flow,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  tag: string;
  name: string;
  sub: string;
  accent?: string;
}) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={8}
        fill={PALETTE.nodeFill}
        stroke={PALETTE.nodeStroke}
      />
      <rect x={-w / 2} y={-h / 2} width={3} height={h} fill={accent} />
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 20}
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2"
        fill={PALETTE.eyebrow}
      >
        {tag}
      </text>
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 46}
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="14"
        fontWeight={500}
        fill={PALETTE.text}
      >
        {name}
      </text>
      <text
        x={-w / 2 + 14}
        y={-h / 2 + 68}
        fontFamily="DM Mono, monospace"
        fontSize="9.5"
        fill={PALETTE.textMuted}
      >
        {sub}
      </text>
    </g>
  );
}

function Node({
  cx,
  cy,
  w = 220,
  h = 86,
  tag,
  title,
  sub,
  accent = PALETTE.flow,
}: {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  tag: string;
  title: string;
  sub: string;
  accent?: string;
}) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={8}
        fill={PALETTE.nodeFill}
        stroke={PALETTE.nodeStroke}
      />
      <rect x={-w / 2} y={-h / 2} width={3} height={h} fill={accent} />
      <text
        x={-w / 2 + 16}
        y={-h / 2 + 20}
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2"
        fill={PALETTE.eyebrow}
      >
        {tag}
      </text>
      <text
        x={-w / 2 + 16}
        y={-h / 2 + 46}
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="15"
        fontWeight={500}
        fill={PALETTE.text}
      >
        {title}
      </text>
      <text
        x={-w / 2 + 16}
        y={-h / 2 + 68}
        fontFamily="DM Mono, monospace"
        fontSize="10.5"
        fill={PALETTE.textMuted}
      >
        {sub}
      </text>
    </g>
  );
}

function LargePolicyCard({
  x,
  y,
  w,
  h,
  tag,
  name,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tag: string;
  name: string;
  sub: string;
}) {
  const iconCx = x + w - 78;
  const iconCy = y + h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={PALETTE.nodeFill} stroke={PALETTE.nodeStroke} />
      <rect x={x} y={y} width={4} height={h} fill={PALETTE.audit} />
      <text
        x={x + 22}
        y={y + 28}
        fontFamily="DM Mono, monospace"
        fontSize="10"
        letterSpacing="2"
        fill={PALETTE.eyebrow}
      >
        {tag}
      </text>
      <text
        x={x + 22}
        y={y + 62}
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="20"
        fontWeight={500}
        fill={PALETTE.text}
      >
        {name}
      </text>
      <text
        x={x + 22}
        y={y + 88}
        fontFamily="DM Mono, monospace"
        fontSize="11.5"
        fill={PALETTE.textMuted}
      >
        {sub}
      </text>
      <text
        x={x + 22}
        y={y + 112}
        fontFamily="DM Mono, monospace"
        fontSize="10.5"
        letterSpacing="1.4"
        fill={PALETTE.textDim}
      >
        deterministic · signed decisions
      </text>
      <PolicyHexIcon cx={iconCx} cy={iconCy} size={86} />
    </g>
  );
}

function PolicyHexIcon({
  cx,
  cy,
  size,
}: {
  cx: number;
  cy: number;
  size: number;
}) {
  const r = size / 2;
  const dx = r * Math.cos(Math.PI / 6);
  const dy = r * Math.sin(Math.PI / 6);
  const points = [
    [cx, cy - r],
    [cx + dx, cy - dy],
    [cx + dx, cy + dy],
    [cx, cy + r],
    [cx - dx, cy + dy],
    [cx - dx, cy - dy],
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(' ');
  const checkStart: [number, number] = [cx - r * 0.36, cy + r * 0.02];
  const checkMid: [number, number] = [cx - r * 0.08, cy + r * 0.32];
  const checkEnd: [number, number] = [cx + r * 0.42, cy - r * 0.28];
  return (
    <g>
      <polygon
        points={points}
        fill="#062019"
        stroke={PALETTE.flow}
        strokeOpacity={0.75}
        strokeWidth={1.8}
      />
      <polygon
        points={points}
        fill="none"
        stroke={PALETTE.flow}
        strokeOpacity={0.18}
        strokeWidth={6}
      />
      <path
        d={`M ${checkStart[0]} ${checkStart[1]} L ${checkMid[0]} ${checkMid[1]} L ${checkEnd[0]} ${checkEnd[1]}`}
        stroke={PALETTE.flow}
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#archGlow)"
      />
    </g>
  );
}

function AuditStrip({
  x,
  y,
  w,
  h,
  text,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#140E05" stroke={PALETTE.audit} strokeOpacity={0.55} />
      <text
        x={x + w / 2}
        y={y + 24}
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="11"
        letterSpacing="2"
        fill={PALETTE.auditText}
      >
        {text}
      </text>
    </g>
  );
}

function ArrowPath({
  d,
  stroke = PALETTE.flow,
  strokeOpacity = 0.9,
  muted = false,
  animated = true,
}: {
  d: string;
  stroke?: string;
  strokeOpacity?: number;
  muted?: boolean;
  animated?: boolean;
}) {
  const dashPattern = '7 6';
  const dashCycle = 13;
  return (
    <path
      d={d}
      stroke={muted ? PALETTE.audit : stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={1.6}
      fill="none"
      strokeDasharray={dashPattern}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd={muted ? 'url(#archArrowMuted)' : 'url(#archArrow)'}
    >
      {animated ? (
        <animate
          attributeName="stroke-dashoffset"
          from={dashCycle}
          to={0}
          dur="1.2s"
          repeatCount="indefinite"
        />
      ) : null}
    </path>
  );
}
