import React from "react";
import { C } from "./style";
export const Canvas = ({ children }: { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 540 960"
    width="1080"
    height="1920"
    style={{ position: "absolute", inset: 0 }}
  >
    <defs>
      <linearGradient id="sky" x2="0.2" y2="1">
        <stop stopColor="#193c4b" />
        <stop offset=".68" stopColor="#77978e" />
        <stop offset="1" stopColor="#c7bd95" />
      </linearGradient>
      <linearGradient id="stone" x2=".8" y2="1">
        <stop stopColor="#9aab97" />
        <stop offset="1" stopColor="#3e6b70" />
      </linearGradient>
      <radialGradient id="pool">
        <stop stopColor="#e2c58c" />
        <stop offset="1" stopColor="#9b936f" />
      </radialGradient>
      <radialGradient id="vignette">
        <stop offset=".45" stopColor="#0b202b" stopOpacity="0" />
        <stop offset="1" stopColor="#0b202b" stopOpacity=".45" />
      </radialGradient>
      <pattern id="grain" width="67" height="71" patternUnits="userSpaceOnUse">
        {Array.from({ length: 25 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 37) % 67}
            cy={(i * 23) % 71}
            r={i % 3 === 0 ? 0.8 : 0.4}
            fill={i % 2 ? C.paper : C.ink}
            opacity=".12"
          />
        ))}
      </pattern>
    </defs>
    {children}
    <path d="M0 0H540V960H0Z" fill="url(#grain)" pointerEvents="none" />
    <path d="M0 0H540V960H0Z" fill="url(#vignette)" pointerEvents="none" />
  </svg>
);
export const Window = ({
  x,
  y,
  s = 1,
}: {
  x: number;
  y: number;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path
      d="M-15 22C-25-10-9-32 4-29C22-26 28 9 15 23C7 31-8 31-15 22Z"
      fill={C.ink}
    />
    <path
      d="M-9 16C-15-8-5-23 3-21C13-19 18 7 10 17"
      fill="none"
      stroke={C.gold}
      strokeWidth="3"
      opacity=".65"
    />
  </g>
);
export const Building = ({
  x,
  y,
  s = 1,
  color = "url(#stone)",
  kind = 0,
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
  kind?: number;
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${s})`}
    stroke={C.ink}
    strokeWidth="3"
    strokeLinejoin="round"
  >
    <path
      d={
        kind
          ? "M-95 330C-122 220-99 143-52 101C-1 54-55-58 11-78C64-94 113-41 79 5C45 51 119 137 116 218C115 270 138 311 105 339Z"
          : "M-110 340C-123 219-89 132-77 51C-69-9-9-74 43-44C103-10 67 79 97 143C125 203 126 280 105 340Z"
      }
      fill={color}
    />
    <path
      d="M-72 290C-88 174-41 127-41 49C-43 12-15-26 16-28"
      fill="none"
      stroke={C.cream}
      opacity=".25"
      strokeWidth="9"
    />
    <path
      d="M-120 260Q0 224 123 262M-120 277Q0 241 123 279"
      fill="none"
      stroke={C.ink}
      opacity=".3"
    />
    {[-35, 35].map((xx, i) => (
      <Window key={i} x={xx} y={95 + i * 20} s={0.75} />
    ))}
    <Window x={12} y={-2} s={0.65} />
    <path d="M-31 337C-43 258-2 216 29 254C46 276 41 317 42 337" fill={C.ink} />
  </g>
);
export const ClockFace = ({
  angle = 0,
  r = 110,
}: {
  angle?: number;
  r?: number;
}) => (
  <g>
    <circle r={r + 18} fill={C.ink} />
    <circle r={r + 9} fill={C.gold} />
    <circle r={r} fill={C.cream} stroke={C.shade} strokeWidth="3" />
    <circle r={r - 14} fill="none" stroke={C.shade} opacity=".4" />
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse
        key={i}
        cy={-r + 24}
        rx="2.5"
        ry="5"
        fill={C.ink}
        transform={`rotate(${i * 30})`}
      />
    ))}
    <path
      d={`M0 11Q-6-13 0 ${-r * 0.52}`}
      fill="none"
      stroke={C.ink}
      strokeWidth="8"
      strokeLinecap="round"
      transform="rotate(55)"
    />
    <path
      d={`M0 12Q5-22 0 ${-r * 0.75}`}
      fill="none"
      stroke={C.ink}
      strokeWidth="5"
      strokeLinecap="round"
      transform="rotate(160)"
    />
    <g transform={`rotate(${angle})`}>
      <path
        d={`M0 19V${-r + 27}`}
        stroke={C.coral}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cy="15" r="6" fill={C.coral} />
    </g>
    <circle r="7" fill={C.gold} stroke={C.ink} strokeWidth="2" />
  </g>
);
export const City = ({
  time = 0,
  dim = false,
  clock = time * 45,
}: {
  time?: number;
  dim?: boolean;
  clock?: number;
}) => (
  <g>
    <path d="M0 0H540V960H0Z" fill="url(#sky)" />
    <circle cx="390" cy="195" r="76" fill={C.cream} opacity=".45" />
    <g transform={`translate(${-time * 3} 0)`} opacity=".34">
      <Building x={45} y={380} s={0.8} color={C.mist} />
      <Building x={270} y={330} s={0.9} color={C.mist} kind={1} />
      <Building x={485} y={370} s={0.8} color={C.mist} />
    </g>
    <g transform={`translate(${-time * 7} 0)`}>
      <Building x={65} y={465} s={1.12} />
      <Building x={450} y={450} s={1.08} color="#847e68" kind={1} />
      <path
        d="M0 735C170 655 353 665 540 742"
        fill="none"
        stroke={C.ink}
        strokeWidth="26"
      />
      <path
        d="M0 724C170 644 353 654 540 731"
        fill="none"
        stroke={C.gold}
        strokeWidth="5"
      />
      <g transform="translate(447 457) scale(.29)">
        <ClockFace angle={clock} />
      </g>
    </g>
    <path d="M0 813C163 733 363 744 540 800V960H0Z" fill="url(#pool)" />
    <path
      d="M-50 930C90 797 305 789 589 866M-40 954C107 833 317 823 577 900"
      fill="none"
      stroke={C.cream}
      strokeWidth="3"
      opacity=".35"
    />
    {dim && <path d="M0 0H540V960H0Z" fill={C.deep} opacity=".26" />}
  </g>
);
export const Motifs = () => (
  <g fill="none" stroke={C.gold} opacity=".18" strokeWidth="2">
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M${50 + i * 140} 120C${-40 + i * 140} 230 ${180 + i * 140} 290 ${85 + i * 140} 410S${10 + i * 140} 620 ${90 + i * 140} 710`}
      />
    ))}
  </g>
);
