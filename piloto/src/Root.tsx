import { Composition } from "remotion";
import { PilotoQuadrado } from "./Composition";
export const RemotionRoot = () => (
  <Composition
    id="PilotoQuadrado15s"
    component={PilotoQuadrado}
    durationInFrames={450}
    fps={30}
    width={1080}
    height={1920}
  />
);
