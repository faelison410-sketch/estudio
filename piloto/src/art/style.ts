export const C = {
  ink: "#172e39",
  deep: "#132933",
  teal: "#30616a",
  mist: "#779a99",
  cream: "#efdcad",
  paper: "#f8edce",
  coral: "#cd6952",
  skin: "#dca377",
  shade: "#af6a55",
  gold: "#d6b374",
};
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
