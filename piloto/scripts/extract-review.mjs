import { spawnSync } from "node:child_process";
import { mkdirSync, renameSync } from "node:fs";
const frames = [
  45, 90, 120, 165, 180, 210, 240, 257, 258, 269, 270, 290, 306, 307, 330, 359,
  360, 390, 420, 449,
];
mkdirSync("out/review", { recursive: true });
const filter = frames.map((f) => `eq(n\\,${f})`).join("+");
const r = spawnSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-y",
    "-i",
    "out/PilotoQuadrado15s.mp4",
    "-vf",
    `select=${filter}`,
    "-fps_mode",
    "vfr",
    "out/review/extracted-%03d.png",
  ],
  { encoding: "utf8" },
);
if (r.error) throw r.error;
if (r.status !== 0) throw new Error(r.stderr);
frames.forEach((f, i) =>
  renameSync(
    `out/review/extracted-${String(i + 1).padStart(3, "0")}.png`,
    `out/review/frame-${String(f).padStart(3, "0")}.png`,
  ),
);
await import("./gallery.mjs");
console.log("20 review frames extracted from the final MP4.");
const contact = spawnSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-y",
    "-i",
    "out/PilotoQuadrado15s.mp4",
    "-vf",
    "select=eq(n\\,45)+eq(n\\,165)+eq(n\\,258)+eq(n\\,330)+eq(n\\,449),scale=270:480,tile=5x1",
    "-frames:v",
    "1",
    "out/review/contact-sheet.jpg",
  ],
  { encoding: "utf8" },
);
if (contact.error) throw contact.error;
if (contact.status !== 0) throw new Error(contact.stderr);
console.log("Five-shot contact sheet generated.");
