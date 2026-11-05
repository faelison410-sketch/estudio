import React from "react";
export const Camera = ({
  children,
  scale = 1,
  x = 0,
  y = 0,
  cx = 270,
  cy = 480,
}: {
  children: React.ReactNode;
  scale?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
}) => (
  <g
    transform={`translate(${cx + x} ${cy + y}) scale(${scale}) translate(${-cx} ${-cy})`}
  >
    {children}
  </g>
);
