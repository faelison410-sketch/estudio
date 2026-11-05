import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import {
  CityShot,
  CrouchShot,
  DrawingShot,
  ClockShot,
  ReactionShot,
} from "./scenes/Shots";
export const PilotoQuadrado = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#132933" }}>
      <Sequence name="01 · Cidade de curvas" durationInFrames={3 * fps}>
        <CityShot />
      </Sequence>
      <Sequence
        name="02 · Lio e o giz"
        from={3 * fps}
        durationInFrames={3 * fps}
      >
        <CrouchShot />
      </Sequence>
      <Sequence
        name="03 · Quatro lados"
        from={6 * fps}
        durationInFrames={3 * fps}
      >
        <DrawingShot />
      </Sequence>
      <Sequence
        name="04 · O tempo para"
        from={9 * fps}
        durationInFrames={3 * fps}
      >
        <ClockShot />
      </Sequence>
      <Sequence
        name="05 · Algo acima"
        from={12 * fps}
        durationInFrames={3 * fps}
      >
        <ReactionShot />
      </Sequence>
    </AbsoluteFill>
  );
};
