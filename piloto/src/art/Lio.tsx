import { C } from "./style";
export const Head = ({
  look = 0,
  fear = 0,
  tilt = 0,
}: {
  look?: number;
  fear?: number;
  tilt?: number;
}) => (
  <g
    transform={`rotate(${tilt} 0 -75)`}
    stroke={C.ink}
    strokeWidth="3.5"
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    <path d="M-20-21L-22 12Q0 30 20 9L18-26" fill={C.skin} />
    <path
      d="M-57-92C-64-143 6-162 47-123C66-105 59-45 36-22C13 0-34-6-47-39Z"
      fill={C.skin}
    />
    <path
      d="M-46-79C-75-109-55-143-26-143C-30-158-11-171 4-153C29-166 36-150 37-140C73-137 79-104 54-81L36-99C17-82-9-93-20-111C-21-91-38-86-46-79Z"
      fill={C.ink}
    />
    <path d="M-51-64C-77-78-78-41-52-41" fill={C.skin} />
    <path d="M-60-57Q-68-63-64-49" fill="none" stroke={C.shade} />
    <path
      d="M-43-112Q-20-137 8-132M13-139Q33-139 43-126"
      stroke="#42636b"
      fill="none"
      strokeWidth="3"
    />
    {[-25, 23].map((x, i) => (
      <g key={x}>
        <ellipse
          cx={x}
          cy={-70 - look * 3}
          rx={14 + fear * 2}
          ry={11 + fear * 7}
          fill={C.paper}
        />
        <ellipse
          cx={x + look * 2.5}
          cy={-70 - look * 8}
          rx="5.2"
          ry={7 + fear}
          fill={C.ink}
        />
        <circle
          cx={x - 1 + look * 2.5}
          cy={-73 - look * 8}
          r="1.8"
          fill="white"
        />
        <path
          d={`M${x - 14} ${-91 - fear * 8 + i * 2}Q${x} ${-98 - fear * 12} ${x + 12} ${-89 - fear * 5}`}
          fill="none"
          strokeWidth="4"
        />
      </g>
    ))}
    <path d="M0-67Q-8-43 4-47" fill="none" stroke={C.shade} />
    <path
      d={fear > 0.4 ? "M-5-27Q3-39 13-29Q9-16-1-22Z" : "M-8-28Q3-23 14-29"}
      fill={fear > 0.4 ? C.ink : "none"}
      strokeWidth="2.5"
    />
    <g fill={C.shade} stroke="none">
      {[-37, -29, 31, 39].map((x, i) => (
        <circle key={i} cx={x} cy={-48 + (i % 2) * 4} r="1.7" />
      ))}
    </g>
    <path
      d="M-39-38Q-30-32-24-35"
      fill="none"
      stroke={C.coral}
      opacity=".4"
      strokeWidth="5"
    />
  </g>
);
export const Arm = ({
  angle = 0,
  bend = 0,
  chalk = false,
}: {
  angle?: number;
  bend?: number;
  chalk?: boolean;
}) => (
  <g
    transform={`rotate(${angle})`}
    stroke={C.ink}
    strokeWidth="3.5"
    strokeLinecap="round"
  >
    <path d="M0 0Q17-7 20 17L20 62Q12 74 2 61Z" fill={C.coral} />
    <g transform={`translate(12 60) rotate(${bend})`}>
      <path d="M-8 0Q-13 24-4 58Q4 67 12 56L9 1" fill={C.skin} />
      <ellipse cx="4" cy="59" rx="12" ry="14" fill={C.skin} />
      {chalk && (
        <path
          d="M9 63L18 78Q23 81 25 75L16 58Z"
          fill={C.paper}
          strokeWidth="2"
        />
      )}
    </g>
  </g>
);
export const Lio = ({
  crouch = 0,
  reach = 0,
  look = 0,
  fear = 0,
}: {
  crouch?: number;
  reach?: number;
  look?: number;
  fear?: number;
}) => (
  <g strokeLinejoin="round" strokeLinecap="round">
    <ellipse cy="172" rx="93" ry="16" fill={C.deep} opacity=".23" />
    <g transform={`translate(0 ${crouch * 75})`}>
      <path
        d={`M-32 69Q${-62 - crouch * 30} 112 ${-38 - crouch * 42} ${157 - crouch * 23}L-12 161Q5 111 10 78M10 78Q${70 + crouch * 20} 113 ${47 + crouch * 32} 162L21 165Q27 118-8 113`}
        fill="#314c56"
        stroke={C.ink}
        strokeWidth="5"
      />
      <path
        d={`M${-40 - crouch * 42} ${150 - crouch * 23}Q${-79 - crouch * 18} ${159 - crouch * 23} ${-72 - crouch * 27} ${170 - crouch * 23}Q-31 183-10 162M${45 + crouch * 32} 151Q${87 + crouch * 12} 156 ${89 + crouch * 12} 171Q58 184 20 166`}
        fill={C.ink}
        stroke={C.ink}
        strokeWidth="5"
      />
      <g transform={`rotate(${crouch * 17} 0 70)`}>
        <Arm angle={23 - crouch * 25} bend={-25 - crouch * 50} />
        <path
          d="M-36 4Q0-9 32 8L46 77Q3 98-45 76Z"
          fill={C.coral}
          stroke={C.ink}
          strokeWidth="4"
        />
        <path
          d="M-26 7Q-5 27 25 5L13 35Q-2 48-17 28Z"
          fill={C.gold}
          stroke={C.ink}
          strokeWidth="3"
        />
        <path d="M-18 32Q-25 61-10 74L3 48" fill={C.gold} />
        <path
          d="M-32 56Q-13 71 9 65M26 49L34 70"
          fill="none"
          stroke="#9c4d43"
          strokeWidth="3"
        />
        <g transform={`translate(0 ${-4 - crouch * 4})`}>
          <Head
            look={look - crouch * 0.65}
            fear={fear}
            tilt={crouch * 11 - look * 5}
          />
        </g>
        <g transform="translate(29 14)">
          <Arm angle={-18 + reach * 23} bend={-25 + reach * 26} chalk />
        </g>
      </g>
    </g>
  </g>
);
