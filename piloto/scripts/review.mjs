import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import { browserExecutable } from "./browser.mjs";
await mkdir("out/review", { recursive: true });
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const composition = await selectComposition({
  serveUrl,
  id: "PilotoQuadrado15s",
  browserExecutable,
});
const frames = [
  45, 90, 120, 165, 180, 210, 240, 257, 258, 269, 270, 290, 306, 307, 330, 359,
  360, 390, 420, 449,
];
for (const frame of frames) {
  await renderStill({
    serveUrl,
    composition,
    frame,
    output: `out/review/frame-${String(frame).padStart(3, "0")}.png`,
    browserExecutable,
  });
  console.log(`Reviewed frame ${frame}`);
}
