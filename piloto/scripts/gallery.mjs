import { writeFileSync } from "node:fs";
const frames = [
  45, 90, 120, 165, 180, 210, 240, 257, 258, 269, 270, 290, 306, 307, 330, 359,
  360, 390, 420, 449,
];
writeFileSync(
  "out/review/index.html",
  `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>O Quadrado Proibido — revisão</title><style>body{background:#132933;color:#efdcad;font:16px system-ui;margin:32px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}figure{margin:0}img{width:100%}figcaption{padding:8px}video{max-width:360px;width:100%}</style><h1>O Quadrado Proibido</h1><p>450 quadros · 30 fps · 15 s · 1080 × 1920 · sem áudio</p><video src="../PilotoQuadrado15s.mp4" controls loop></video><p>Fechamento: quadro 258. Parada: quadro 307. Os quadros abaixo vêm do MP4 final.</p><main>${frames.map((f) => `<figure><img src="frame-${String(f).padStart(3, "0")}.png"><figcaption>Quadro ${f} · ${(f / 30).toFixed(2)} s</figcaption></figure>`).join("")}</main></html>`,
);
