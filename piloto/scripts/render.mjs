import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import { browserExecutable } from "./browser.mjs";
await mkdir("out", { recursive: true });
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const composition = await selectComposition({
  serveUrl,
  id: "PilotoQuadrado15s",
  browserExecutable,
});
let lastProgress = -1;
await renderMedia({
  serveUrl,
  composition,
  codec: "h264",
  crf: 18,
  pixelFormat: "yuv420p",
  colorSpace: "bt709",
  outputLocation: "out/PilotoQuadrado15s.mp4",
  concurrency: 2,
  browserExecutable,
  onProgress: ({ progress }) => {
    if (
      Math.round(progress * 100) % 10 === 0 &&
      Math.round(progress * 100) !== lastProgress
    ) {
      lastProgress = Math.round(progress * 100);
      process.stdout.write(`\rRender ${lastProgress}%`);
    }
  },
});
console.log("\nMP4 rendered.");
