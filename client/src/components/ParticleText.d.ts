declare module "@/components/ParticleText" {
  const ParticleText: (props: {
    text?: string;
    particleSize?: number;
    density?: number;
    color?: string;
    highlightColor?: string;
    scatter?: number;
    gatherDuration?: number;
    stagger?: number;
    pointerRepel?: number;
    repelRadius?: number;
    idleDrift?: number;
    trigger?: "mount" | "hover" | "click";
    fontSize?: string | number;
    fontWeight?: number | string;
    fontFamily?: string;
    glow?: boolean;
    lineHeight?: number;
    initiallySettled?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }) => JSX.Element;
  export default ParticleText;
}
