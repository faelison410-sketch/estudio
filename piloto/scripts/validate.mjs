import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import ts from "typescript";
// Exercise production timing without maintaining a second implementation.
const compiled = ts.transpileModule(readFileSync("src/timing.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { TIMING, squareProgress, clockAngle } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
let checks = 0;
function check(test, message) {
  assert.ok(test, message);
  checks++;
}
check(
  TIMING.duration === 450 && TIMING.fps === 30,
  "Timeline must be exactly 15 seconds",
);
check(
  squareProgress(TIMING.squareClosed - 1) < 1,
  "Square must remain open before closure",
);
check(
  squareProgress(TIMING.squareClosed) === 1,
  "Square must close at the declared frame",
);
check(
  TIMING.clockStopped > TIMING.squareClosed,
  "Clock must stop after closure",
);
let speeds = [];
for (let f = TIMING.clockCut; f < TIMING.clockStopped; f++)
  speeds.push(clockAngle(f + 1) - clockAngle(f));
check(
  speeds.every((s, i) => s > 0 && (i === 0 || s < speeds[i - 1])),
  "Clock must decelerate monotonically",
);
check(
  Array.from({ length: 360 - TIMING.clockStopped }, (_, i) =>
    clockAngle(TIMING.clockStopped + i),
  ).every((a) => a === clockAngle(TIMING.clockStopped)),
  "Clock must remain exactly frozen",
);
const file = "out/PilotoQuadrado15s.mp4";
function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8" });
  if (r.error) throw r.error;
  assert.equal(r.status, 0, r.stderr);
  return r.stdout;
}
const metadata = JSON.parse(
  run("ffprobe", [
    "-v",
    "error",
    "-count_frames",
    "-show_streams",
    "-show_format",
    "-of",
    "json",
    file,
  ]),
);
const video = metadata.streams.find((s) => s.codec_type === "video");
check(video?.codec_name === "h264", "Must be H.264");
check(
  video.width === 1080 && video.height === 1920,
  "Must be full HD portrait",
);
check(video.r_frame_rate === "30/1", "Must be 30 fps");
check(Number(video.nb_read_frames) === 450, "Must decode exactly 450 frames");
check(Number(metadata.format.duration) === 15, "Must last exactly 15 seconds");
check(video.pix_fmt === "yuv420p", "Must support standard Windows players");
run("ffmpeg", ["-v", "error", "-xerror", "-i", file, "-f", "null", "-"]);
const report = {
  checksPassed: checks,
  fullDecode: "passed",
  file,
  bytes: readFileSync(file).length,
  sha256: createHash("sha256").update(readFileSync(file)).digest("hex"),
  video: {
    codec: video.codec_name,
    width: video.width,
    height: video.height,
    fps: video.r_frame_rate,
    frames: Number(video.nb_read_frames),
    duration: Number(metadata.format.duration),
    pixelFormat: video.pix_fmt,
  },
  timing: TIMING,
};
writeFileSync("out/validation.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
