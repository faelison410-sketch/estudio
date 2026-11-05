// Global frames: closure precedes the clock cut; stop has a 52-frame hold.
export const TIMING = {
  fps: 30,
  duration: 450,
  squareStart: 174,
  squareClosed: 258,
  clockCut: 270,
  clockStopped: 307,
  reaction: 360,
} as const;
export const squareProgress = (frame: number) =>
  Math.max(
    0,
    Math.min(
      1,
      (frame - TIMING.squareStart) / (TIMING.squareClosed - TIMING.squareStart),
    ),
  );
export const clockAngle = (frame: number) => {
  if (frame < TIMING.clockCut) return -80 + (frame - TIMING.clockCut) * 3;
  const t = Math.max(
    0,
    Math.min(
      1,
      (frame - TIMING.clockCut) / (TIMING.clockStopped - TIMING.clockCut),
    ),
  );
  return -80 + 102 * (1 - Math.pow(1 - t, 3));
};
