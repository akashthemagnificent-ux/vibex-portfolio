declare module "@/components/FloatingLines" {
  import type { ComponentType } from "react";

  type WaveName = "top" | "middle" | "bottom";
  type WavePosition = { x?: number; y?: number; rotate?: number };

  export interface FloatingLinesProps {
    linesGradient?: string[];
    enabledWaves?: WaveName[];
    lineCount?: number | number[];
    lineDistance?: number | number[];
    topWavePosition?: WavePosition;
    middleWavePosition?: WavePosition;
    bottomWavePosition?: WavePosition;
    animationSpeed?: number;
    interactive?: boolean;
    bendRadius?: number;
    bendStrength?: number;
    mouseDamping?: number;
    parallax?: boolean;
    parallaxStrength?: number;
    mixBlendMode?: string;
  }

  const FloatingLines: ComponentType<FloatingLinesProps>;
  export default FloatingLines;
}
