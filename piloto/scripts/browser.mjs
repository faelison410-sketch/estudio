// Windows: omit REMOTION_BROWSER_EXECUTABLE to let Remotion manage Chrome.
export const browserExecutable =
  process.env.REMOTION_BROWSER_EXECUTABLE || undefined;
