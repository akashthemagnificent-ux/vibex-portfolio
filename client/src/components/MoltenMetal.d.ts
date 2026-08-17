import type { CSSProperties } from "react";

declare const MoltenMetal: (props: {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  colorMode?: "molten" | "ember" | "frost";
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}) => JSX.Element;

export default MoltenMetal;
