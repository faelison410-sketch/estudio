import { useCurrentFrame } from "remotion";
import { Canvas, City, ClockFace, Motifs } from "../art/World";
import { Head, Lio } from "../art/Lio";
import { C, clamp, smooth } from "../art/style";
import { Camera } from "../art/Camera";
import { clockAngle, squareProgress } from "../timing";
export const CityShot = () => {
  const f = useCurrentFrame();
  const t = f / 90;
  return (
    <Canvas>
      <Camera scale={1 + t * 0.025} y={-t * 4}>
        <City time={t} clock={clockAngle(f)} />
        <g transform={`translate(279 787) scale(.25)`}>
          <Lio crouch={smooth((f - 48) / 42) * 0.12} />
        </g>
        <g fill={C.cream} opacity=".5">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={70 + i * 96 + Math.sin(f / 80 + i) * 12}
              cy={320 + (i % 3) * 98 - f * 0.12}
              rx="1.5"
              ry="2.5"
            />
          ))}
        </g>
      </Camera>
      <path
        d="M50 92Q80 80 110 92"
        fill="none"
        stroke={C.gold}
        strokeWidth="2"
      />
      <text
        x="50"
        y="123"
        fill={C.cream}
        fontSize="11"
        fontFamily="Georgia"
        letterSpacing="3"
      >
        O QUADRADO PROIBIDO
      </text>
      <text
        x="50"
        y="147"
        fill={C.cream}
        opacity=".65"
        fontSize="9"
        fontFamily="sans-serif"
        letterSpacing="2"
      >
        ESTUDO DE UM IMPOSSÍVEL
      </text>
    </Canvas>
  );
};
export const CrouchShot = () => {
  const f = useCurrentFrame();
  const down = smooth((f - 8) / 44);
  const reach = smooth((f - 45) / 35);
  return (
    <Canvas>
      <City time={1} dim clock={clockAngle(f + 90)} />
      <path d="M0 560C125 531 335 570 540 540V960H0Z" fill="url(#pool)" />
      <path
        d="M-60 876Q243 721 598 861M-40 920Q251 761 590 899"
        fill="none"
        stroke={C.cream}
        strokeWidth="3"
        opacity=".3"
      />
      <Camera scale={1 + f * 0.0004} cy={600}>
        <g
          transform={`translate(${246 + down * 5} ${482 + down * 17}) scale(1.5)`}
        >
          <Lio crouch={down} reach={reach} />
        </g>
        <ellipse
          cx="353"
          cy="866"
          rx="87"
          ry="16"
          fill={C.deep}
          opacity=".09"
        />
        <path
          d={`M285 867L${285 + 16 * clamp((f - 80) / 9)} 867`}
          stroke={C.paper}
          strokeWidth="4"
          strokeLinecap="round"
          opacity={clamp((f - 77) / 10)}
        />
      </Camera>
    </Canvas>
  );
};
export const DrawingShot = () => {
  const f = useCurrentFrame();
  const p = squareProgress(f + 180);
  const length = p * 1000;
  const u = p * 4;
  const side = Math.min(3, Math.floor(u));
  const v = u - side;
  const points = [
    [145, 350],
    [395, 350],
    [395, 600],
    [145, 600],
    [145, 350],
  ];
  const a = points[side];
  const b = points[side + 1];
  const x = p === 1 ? 145 : a[0] + (b[0] - a[0]) * v;
  const y = p === 1 ? 350 : a[1] + (b[1] - a[1]) * v;
  const withdraw = smooth((f - 79) / 10);
  return (
    <Canvas>
      <path d="M0 0H540V960H0Z" fill="url(#pool)" />
      <g stroke={C.cream} fill="none" strokeWidth="2" opacity=".24">
        <path d="M-10 209C177 109 355 152 560 217M-10 238C197 145 367 192 562 244M-20 759C204 683 355 711 564 799M-20 789C202 722 354 749 566 832" />
        <path d="M66 294Q34 314 61 332Q83 344 87 321Q89 306 75 314M458 681Q481 662 491 682Q494 704 474 701" />
      </g>
      <ellipse
        cx="285"
        cy="520"
        rx="205"
        ry="260"
        fill={C.cream}
        opacity=".05"
      />
      <g strokeLinejoin="miter">
        <path d="M145 350H395V600H145Z" fill={C.deep} opacity={p * 0.055} />
        <path
          d="M145 350H395V600H145V350"
          fill="none"
          stroke={C.paper}
          strokeWidth="6"
          strokeDasharray="1000"
          strokeDashoffset={1000 - length}
          strokeLinecap="butt"
        />
        <path
          d="M145 350H395V600H145V350"
          fill="none"
          stroke="white"
          opacity=".5"
          strokeWidth="1.3"
          strokeDasharray="1000"
          strokeDashoffset={1000 - length}
        />
      </g>
      {p === 1 && (
        <circle
          cx="145"
          cy="350"
          r={12 + (f - 78) * 9}
          fill="none"
          stroke={C.paper}
          strokeWidth="2"
          opacity={Math.max(0, 0.5 - (f - 78) * 0.04)}
        />
      )}
      <g
        transform={`translate(${x + withdraw * 80} ${y - withdraw * 95}) rotate(-10)`}
        opacity={1 - withdraw * 0.9}
      >
        <path
          d="M19 90C75 99 94 144 107 203L62 227C39 170 12 142-7 121Z"
          fill={C.deep}
          opacity=".12"
        />
        <path
          d="M21 41C43 43 58 68 56 96L61 161Q40 179 15 159L9 93C-4 76-13 72-7 60Q-1 49 9 58L6 45Q7 32 21 41Z"
          fill={C.skin}
          stroke={C.ink}
          strokeWidth="3"
        />
        <path
          d="M13 52L-5 10Q-8 1-2-3Q5-6 9 4L29 45"
          fill={C.paper}
          stroke={C.ink}
          strokeWidth="2"
        />
        <path
          d="M12 70Q2 38 15 37Q27 36 33 62M31 58Q35 45 44 57"
          fill="none"
          stroke={C.shade}
          strokeWidth="3"
        />
        <path
          d="M9 130Q35 142 61 129L83 220Q47 246 8 221Z"
          fill={C.coral}
          stroke={C.ink}
          strokeWidth="4"
        />
        <path
          d="M13 140Q40 152 64 140"
          stroke={C.gold}
          strokeWidth="5"
          fill="none"
        />
      </g>
      <g fill={C.paper} opacity={p < 1 ? 0.7 : 0.2}>
        {Array.from({ length: 8 }, (_, i) => (
          <circle
            key={i}
            cx={x + Math.sin(i * 4) * (7 + i * 2)}
            cy={y + Math.cos(i * 3) * (8 + i * 3)}
            r={i % 2 ? 1.1 : 0.7}
          />
        ))}
      </g>
    </Canvas>
  );
};
export const ClockShot = () => {
  const f = useCurrentFrame();
  const stopped = f >= 37;
  const pulse = stopped ? clamp(1 - (f - 37) / 18) : 0;
  return (
    <Canvas>
      <path d="M0 0H540V960H0Z" fill={C.deep} />
      <Motifs />
      <path
        d="M69 960C39 732 48 602 86 431C120 292 105 162 253 110C387 64 489 198 447 328C408 464 512 686 472 960Z"
        fill="url(#stone)"
        stroke={C.ink}
        strokeWidth="7"
      />
      <path
        d="M114 927C78 726 110 609 129 490"
        fill="none"
        stroke={C.gold}
        strokeWidth="8"
        opacity=".2"
      />
      <Camera scale={1 + f * 0.0006} cy={452}>
        <g transform="translate(270 454)">
          <path
            d="M-165-66C-174-241 129-280 175-93"
            fill="none"
            stroke={C.ink}
            strokeWidth="14"
          />
          <path
            d="M-166-75C-164-218 115-259 169-94"
            fill="none"
            stroke={C.gold}
            strokeWidth="3"
          />
          <ClockFace r={161} angle={clockAngle(f + 270)} />
          {stopped && (
            <circle
              r={179 + (f - 37) * 3}
              fill="none"
              stroke={C.paper}
              strokeWidth="2"
              opacity={pulse * 0.6}
            />
          )}
          <path
            d="M-45 212Q0 239 45 212M-35 228Q0 247 35 228"
            fill="none"
            stroke={C.ink}
            strokeWidth="4"
          />
          <g
            transform={`translate(${Math.sin((37 * (1 - Math.pow(1 - clamp(f / 37), 3))) / 10) * 8} 270)`}
          >
            <path d="M0-61V25" stroke={C.ink} strokeWidth="6" />
            <ellipse
              cy="31"
              rx="21"
              ry="28"
              fill={C.gold}
              stroke={C.ink}
              strokeWidth="4"
            />
          </g>
        </g>
      </Camera>
      <path d="M0 0H540V960H0Z" fill={C.paper} opacity={pulse * 0.09} />
    </Canvas>
  );
};
export const ReactionShot = () => {
  const f = useCurrentFrame();
  const anticipate = smooth(f / 16);
  const raise = smooth((f - 16) / 35);
  const fear = smooth((f - 12) / 24);
  const glint = smooth((f - 52) / 15);
  return (
    <Canvas>
      <path d="M0 0H540V960H0Z" fill="url(#sky)" />
      <Motifs />
      <path d="M0 845Q228 730 540 830V960H0Z" fill={C.teal} />
      <Camera scale={1 + f * 0.00065} cy={505}>
        <g
          transform={`translate(269 ${744 + anticipate * 7 - raise * 19}) scale(2.7)`}
        >
          <path
            d="M-66 87Q-58 15-28-2Q0-17 32 0Q65 18 72 86Z"
            fill={C.coral}
            stroke={C.ink}
            strokeWidth="4"
          />
          <path
            d="M-28 2Q-5 27 29 0L12 37Q-1 51-20 23Z"
            fill={C.gold}
            stroke={C.ink}
            strokeWidth="3"
          />
          <Head
            look={raise}
            fear={fear}
            tilt={8 + anticipate * 2 - raise * 14}
          />
          <g
            opacity={glint * 0.8}
            fill="none"
            stroke={C.paper}
            strokeWidth=".9"
          >
            <path d="M-30-85L-22-86L-21-78L-29-77Z" />
            <path d="M18-85L26-86L27-78L19-77Z" />
          </g>
        </g>
      </Camera>
      <ellipse
        cx="290"
        cy="263"
        rx="115"
        ry="32"
        fill={C.paper}
        opacity={glint * 0.025}
      />
    </Canvas>
  );
};
